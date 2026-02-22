import { useState, useEffect } from "react";

const ATHANOR_CONTEXT = `Athanor is America's first vertically integrated nitrogen chemicals manufacturing platform. Starting with creatine production as a commercial wedge, Athanor addresses critical supply chain vulnerabilities — the US imports 100% of defense-critical chemicals like cyanamide from China and Germany. The founder is Alexander Cortes (AJAC), who also runs Ferta Supplements (clinical-dose creatine for women's fertility) and has 400K+ social media followers. Athanor is raising a $6M seed round. Key themes: American chemical sovereignty, national security, defense-critical materials, vertical integration, novel synthesis methods (mechanochemistry, continuous flow), consumer distribution advantage.`;

const RAW_INVESTORS = [{"tier":1,"name":"8VC","hq":"Austin, TX","thesis":"Industrial infrastructure and logistics.","website":"8vc.com","category":"Industrial Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":1,"name":"Accel","hq":"Palo Alto, CA","thesis":"Early-stage technical B2B and infra.","website":"accel.com","category":"Tier 1 Multi-Stage","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"America's Frontier Fund","hq":"Washington, DC","thesis":"Reshoring critical technologies and supply chains to US.","website":"americasfrontierfund.com","category":"Reshoring/National Security","whyRelevant":"PERFECT FIT - explicitly reshoring mandate, government connections","source":"New Addition","isPriority":true},{"tier":1,"name":"Bessemer Venture Partners","hq":"San Francisco","thesis":"Manufacturing and heavy industry.","website":"bvp.com","category":"Manufacturing/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Breakthrough Energy Ventures","hq":"Kirkland, WA","thesis":"Bill Gates-backed fund for climate/energy/materials breakthroughs. $2B+ AUM.","website":"breakthroughenergy.org","category":"Climate/Energy","whyRelevant":"Deep materials & chemicals focus, massive check sizes, strategic value","source":"New Addition","isPriority":true},{"tier":1,"name":"Coatue Management","hq":"New York, NY","thesis":"Technology crossover fund with public/private flexibility.","website":"coatue.com","category":"Tier 1 Crossover","whyRelevant":"Massive AUM, can lead large rounds","source":"New Addition","isPriority":false},{"tier":1,"name":"DCVC","hq":"Palo Alto, CA","thesis":"Compute-driven physical science.","website":"dcvc.com","category":"Deep Tech/Science","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Founders Fund","hq":"Miami / SF","thesis":"Transformational tech (SpaceX, Anduril).","website":"foundersfund.com","category":"Tier 1 Transformational","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"GV (Google Ventures)","hq":"Mountain View, CA","thesis":"Broad portfolio across life sciences, enterprise, and frontier tech.","website":"gv.com","category":"Tier 1 Multi-Stage","whyRelevant":"Active in industrial tech, provides strategic resources","source":"New Addition","isPriority":false},{"tier":1,"name":"General Catalyst","hq":"SF / Boston","thesis":"Complex industrial and health systems.","website":"generalcatalyst.com","category":"Industrial/Health Systems","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Gigafund","hq":"Austin, TX","thesis":"Multi-decade, concentrated bets on world-transforming businesses (SpaceX, Boring Co, Last Energy).","website":"gigafund.com","category":"Transformational Bets","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":1,"name":"Greylock Partners","hq":"Menlo Park, CA","thesis":"Enterprise infrastructure and transformative technology.","website":"greylock.com","category":"Tier 1 Multi-Stage","whyRelevant":"Deep enterprise/B2B experience","source":"New Addition","isPriority":false},{"tier":1,"name":"Grishin Robotics","hq":"Menlo Park, CA","thesis":"Bridging the digital and physical worlds; specializing in robotics, AI, IoT, and consumerized enterprise tech.","website":"grishinrobotics.com","category":"Robotics/Physical Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"IVP (Institutional Venture Partners)","hq":"Menlo Park, CA","thesis":"Growth-stage technology companies across sectors.","website":"ivp.com","category":"Tier 1 Growth","whyRelevant":"Later stage but good for Series A/B planning","source":"New Addition","isPriority":false},{"tier":1,"name":"Insight Partners","hq":"New York, NY","thesis":"Scaling hardware and deep tech.","website":"insightpartners.com","category":"Deep Tech Growth","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Intel Capital","hq":"Santa Clara, CA","thesis":"Industrial hardware and chip infra.","website":"intelcapital.com","category":"Industrial Hardware","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Khosla Ventures","hq":"Menlo Park","thesis":"Energy and materials breakthroughs.","website":"khoslaventures.com","category":"Energy/Materials","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Kleiner Perkins","hq":"Menlo Park","thesis":"Biotech and clean industrial tech.","website":"kleinerperkins.com","category":"Biotech/Clean Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Lightspeed Venture Partners","hq":"Menlo Park","thesis":"Enterprise, energy, and manufacturing.","website":"lsvp.com","category":"Enterprise/Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Lux Capital","hq":"NY / SF","thesis":"Matter-based science: Chemicals & robotics.","website":"luxcapital.com","category":"Deep Tech/Science","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":1,"name":"NEA","hq":"Chevy Chase, MD","thesis":"Multi-stage energy and engineering.","website":"nea.com","category":"Tier 1 Multi-Stage","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Norwest Venture Partners","hq":"Palo Alto, CA","thesis":"Multi-stage across consumer, enterprise, and healthcare.","website":"nvp.com","category":"Tier 1 Multi-Stage","whyRelevant":"Large fund, patient capital, consumer expertise","source":"New Addition","isPriority":false},{"tier":1,"name":"Sequoia Capital","hq":"Menlo Park","thesis":"Broad-stage deep tech and energy.","website":"sequoia.com","category":"Tier 1 Multi-Stage","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Shield Capital","hq":"Washington, DC","thesis":"Defense technology and national security infrastructure.","website":"shieldcap.com","category":"Defense/National Security","whyRelevant":"PERFECT FIT - explicitly national security focused, supply chain resilience","source":"New Addition","isPriority":true},{"tier":1,"name":"Spark Capital","hq":"Boston / SF","thesis":"Consumer and enterprise technology at seed through growth.","website":"sparkcapital.com","category":"Tier 1 Multi-Stage","whyRelevant":"Strong consumer brand building expertise","source":"New Addition","isPriority":false},{"tier":1,"name":"Thrive Capital","hq":"New York, NY","thesis":"Infrastructure and deep tech stacks.","website":"thrivecapital.com","category":"Infrastructure/Deep Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Union Square Ventures","hq":"New York, NY","thesis":"Climate and physical efficiency.","website":"usv.com","category":"Climate/Physical","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Venrock","hq":"Palo Alto, CA","thesis":"Hard tech and materials science.","website":"venrock.com","category":"Hard Tech/Materials","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"a16z (American Dynamism)","hq":"SF / NY","thesis":"National interest and manufacturing.","website":"a16z.com","category":"National Interest/Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Alumni Ventures","hq":"NY / Global","thesis":"Dedicated Deep Tech and Energy funds.","website":"av.vc","category":"Deep Tech/Energy","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Anzu Partners","hq":"New York, NY","thesis":"Deep technology companies serving security and industrial markets.","website":"anzupartners.com","category":"Defense/Industrial","whyRelevant":"Security + industrial intersection matches your thesis","source":"New Addition","isPriority":false},{"tier":2,"name":"B Capital","hq":"NY / Global","thesis":"Low carbon and industrial tech.","website":"bcapgroup.com","category":"Industrial Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"BASF Venture Capital","hq":"Ludwigshafen, Germany / US","thesis":"Strategic investments in chemistry, materials, and industrial tech.","website":"basf.com/venture-capital","category":"Chemical Industry Strategic","whyRelevant":"STRATEGIC FIT - world's largest chemical company, potential customer/partner","source":"New Addition","isPriority":true},{"tier":2,"name":"Battery Ventures","hq":"Boston / LA","thesis":"Industrial tech and manufacturing.","website":"battery.com","category":"Industrial Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Cantos","hq":"San Francisco, CA","thesis":"American industrial revival and manufacturing renaissance.","website":"cantos.vc","category":"Reshoring/Manufacturing","whyRelevant":"PERFECT FIT - explicitly American manufacturing revival thesis","source":"New Addition","isPriority":true},{"tier":2,"name":"Celesta Capital","hq":"San Francisco","thesis":"Advanced manufacturing & systems.","website":"celestacap.com","category":"Advanced Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Coefficient Capital","hq":"New York, NY","thesis":"Next-generation consumer brands and CPG.","website":"coefficient.vc","category":"Consumer/CPG","whyRelevant":"STRONG FIT - DTC brand expertise, subscription models, health/wellness focus","source":"New Addition","isPriority":true},{"tier":2,"name":"Congruent Ventures","hq":"San Francisco, CA","thesis":"Sustainable systems and climate solutions.","website":"congruentvc.com","category":"Climate/Sustainability","whyRelevant":"Sustainability + industrial intersection","source":"New Addition","isPriority":false},{"tier":2,"name":"Construct Capital","hq":"San Francisco, CA","thesis":"Physical infrastructure and industrial systems.","website":"constructcap.com","category":"Infrastructure/Industrial","whyRelevant":"Industrial infrastructure focus, founded 2020","source":"New Addition","isPriority":false},{"tier":2,"name":"Decisive Point","hq":"Washington, DC","thesis":"National security and dual-use technology.","website":"decisivepoint.co","category":"Defense/National Security","whyRelevant":"Dual-use thesis aligns with your industrial + defense positioning","source":"New Addition","isPriority":false},{"tier":2,"name":"Eclipse Ventures","hq":"Palo Alto, CA","thesis":"Digitally transforming physical industries like manufacturing, supply chain, and battery storage.","website":"eclipse.vc","category":"Manufacturing/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Emerson Collective","hq":"Palo Alto, CA","thesis":"Laurene Powell Jobs - impact and innovation.","website":"emersoncollective.com","category":"Impact/Family Office","whyRelevant":"Impact investing, American jobs angle","source":"New Addition","isPriority":false},{"tier":2,"name":"Energy Impact Partners","hq":"New York, NY","thesis":"Utility-backed energy and sustainability.","website":"energyimpactpartners.com","category":"Energy/Industrial","whyRelevant":"Industrial energy infrastructure, utility connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Evonik Venture Capital","hq"import { useState } from "react";

const ATHANOR_CONTEXT = `Athanor is America's first vertically integrated nitrogen chemicals manufacturing platform. Starting with creatine production as a commercial wedge, Athanor addresses critical supply chain vulnerabilities — the US imports 100% of defense-critical chemicals like cyanamide from China and Germany. The founder is Alexander Cortes (AJAC), who also runs Ferta Supplements (clinical-dose creatine for women's fertility) and has 400K+ social media followers. Athanor is raising a $6M seed round. Key themes: American chemical sovereignty, national security, defense-critical materials, vertical integration, novel synthesis methods (mechanochemistry, continuous flow), consumer distribution advantage.`;

const RAW_INVESTORS = [{"tier":1,"name":"8VC","hq":"Austin, TX","thesis":"Industrial infrastructure and logistics.","website":"8vc.com","category":"Industrial Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":1,"name":"Accel","hq":"Palo Alto, CA","thesis":"Early-stage technical B2B and infra.","website":"accel.com","category":"Tier 1 Multi-Stage","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"America's Frontier Fund","hq":"Washington, DC","thesis":"Reshoring critical technologies and supply chains to US.","website":"americasfrontierfund.com","category":"Reshoring/National Security","whyRelevant":"PERFECT FIT - explicitly reshoring mandate, government connections","source":"New Addition","isPriority":true},{"tier":1,"name":"Bessemer Venture Partners","hq":"San Francisco","thesis":"Manufacturing and heavy industry.","website":"bvp.com","category":"Manufacturing/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Breakthrough Energy Ventures","hq":"Kirkland, WA","thesis":"Bill Gates-backed fund for climate/energy/materials breakthroughs. $2B+ AUM.","website":"breakthroughenergy.org","category":"Climate/Energy","whyRelevant":"Deep materials & chemicals focus, massive check sizes, strategic value","source":"New Addition","isPriority":true},{"tier":1,"name":"Coatue Management","hq":"New York, NY","thesis":"Technology crossover fund with public/private flexibility.","website":"coatue.com","category":"Tier 1 Crossover","whyRelevant":"Massive AUM, can lead large rounds","source":"New Addition","isPriority":false},{"tier":1,"name":"DCVC","hq":"Palo Alto, CA","thesis":"Compute-driven physical science.","website":"dcvc.com","category":"Deep Tech/Science","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Founders Fund","hq":"Miami / SF","thesis":"Transformational tech (SpaceX, Anduril).","website":"foundersfund.com","category":"Tier 1 Transformational","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"GV (Google Ventures)","hq":"Mountain View, CA","thesis":"Broad portfolio across life sciences, enterprise, and frontier tech.","website":"gv.com","category":"Tier 1 Multi-Stage","whyRelevant":"Active in industrial tech, provides strategic resources","source":"New Addition","isPriority":false},{"tier":1,"name":"General Catalyst","hq":"SF / Boston","thesis":"Complex industrial and health systems.","website":"generalcatalyst.com","category":"Industrial/Health Systems","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Gigafund","hq":"Austin, TX","thesis":"Multi-decade, concentrated bets on world-transforming businesses (SpaceX, Boring Co, Last Energy).","website":"gigafund.com","category":"Transformational Bets","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":1,"name":"Greylock Partners","hq":"Menlo Park, CA","thesis":"Enterprise infrastructure and transformative technology.","website":"greylock.com","category":"Tier 1 Multi-Stage","whyRelevant":"Deep enterprise/B2B experience","source":"New Addition","isPriority":false},{"tier":1,"name":"Grishin Robotics","hq":"Menlo Park, CA","thesis":"Bridging the digital and physical worlds; specializing in robotics, AI, IoT, and consumerized enterprise tech.","website":"grishinrobotics.com","category":"Robotics/Physical Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"IVP (Institutional Venture Partners)","hq":"Menlo Park, CA","thesis":"Growth-stage technology companies across sectors.","website":"ivp.com","category":"Tier 1 Growth","whyRelevant":"Later stage but good for Series A/B planning","source":"New Addition","isPriority":false},{"tier":1,"name":"Insight Partners","hq":"New York, NY","thesis":"Scaling hardware and deep tech.","website":"insightpartners.com","category":"Deep Tech Growth","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Intel Capital","hq":"Santa Clara, CA","thesis":"Industrial hardware and chip infra.","website":"intelcapital.com","category":"Industrial Hardware","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Khosla Ventures","hq":"Menlo Park","thesis":"Energy and materials breakthroughs.","website":"khoslaventures.com","category":"Energy/Materials","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Kleiner Perkins","hq":"Menlo Park","thesis":"Biotech and clean industrial tech.","website":"kleinerperkins.com","category":"Biotech/Clean Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Lightspeed Venture Partners","hq":"Menlo Park","thesis":"Enterprise, energy, and manufacturing.","website":"lsvp.com","category":"Enterprise/Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Lux Capital","hq":"NY / SF","thesis":"Matter-based science: Chemicals & robotics.","website":"luxcapital.com","category":"Deep Tech/Science","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":1,"name":"NEA","hq":"Chevy Chase, MD","thesis":"Multi-stage energy and engineering.","website":"nea.com","category":"Tier 1 Multi-Stage","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Norwest Venture Partners","hq":"Palo Alto, CA","thesis":"Multi-stage across consumer, enterprise, and healthcare.","website":"nvp.com","category":"Tier 1 Multi-Stage","whyRelevant":"Large fund, patient capital, consumer expertise","source":"New Addition","isPriority":false},{"tier":1,"name":"Sequoia Capital","hq":"Menlo Park","thesis":"Broad-stage deep tech and energy.","website":"sequoia.com","category":"Tier 1 Multi-Stage","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Shield Capital","hq":"Washington, DC","thesis":"Defense technology and national security infrastructure.","website":"shieldcap.com","category":"Defense/National Security","whyRelevant":"PERFECT FIT - explicitly national security focused, supply chain resilience","source":"New Addition","isPriority":true},{"tier":1,"name":"Spark Capital","hq":"Boston / SF","thesis":"Consumer and enterprise technology at seed through growth.","website":"sparkcapital.com","category":"Tier 1 Multi-Stage","whyRelevant":"Strong consumer brand building expertise","source":"New Addition","isPriority":false},{"tier":1,"name":"Thrive Capital","hq":"New York, NY","thesis":"Infrastructure and deep tech stacks.","website":"thrivecapital.com","category":"Infrastructure/Deep Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Union Square Ventures","hq":"New York, NY","thesis":"Climate and physical efficiency.","website":"usv.com","category":"Climate/Physical","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"Venrock","hq":"Palo Alto, CA","thesis":"Hard tech and materials science.","website":"venrock.com","category":"Hard Tech/Materials","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":1,"name":"a16z (American Dynamism)","hq":"SF / NY","thesis":"National interest and manufacturing.","website":"a16z.com","category":"National Interest/Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Alumni Ventures","hq":"NY / Global","thesis":"Dedicated Deep Tech and Energy funds.","website":"av.vc","category":"Deep Tech/Energy","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Anzu Partners","hq":"New York, NY","thesis":"Deep technology companies serving security and industrial markets.","website":"anzupartners.com","category":"Defense/Industrial","whyRelevant":"Security + industrial intersection matches your thesis","source":"New Addition","isPriority":false},{"tier":2,"name":"B Capital","hq":"NY / Global","thesis":"Low carbon and industrial tech.","website":"bcapgroup.com","category":"Industrial Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"BASF Venture Capital","hq":"Ludwigshafen, Germany / US","thesis":"Strategic investments in chemistry, materials, and industrial tech.","website":"basf.com/venture-capital","category":"Chemical Industry Strategic","whyRelevant":"STRATEGIC FIT - world's largest chemical company, potential customer/partner","source":"New Addition","isPriority":true},{"tier":2,"name":"Battery Ventures","hq":"Boston / LA","thesis":"Industrial tech and manufacturing.","website":"battery.com","category":"Industrial Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Cantos","hq":"San Francisco, CA","thesis":"American industrial revival and manufacturing renaissance.","website":"cantos.vc","category":"Reshoring/Manufacturing","whyRelevant":"PERFECT FIT - explicitly American manufacturing revival thesis","source":"New Addition","isPriority":true},{"tier":2,"name":"Celesta Capital","hq":"San Francisco","thesis":"Advanced manufacturing & systems.","website":"celestacap.com","category":"Advanced Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Coefficient Capital","hq":"New York, NY","thesis":"Next-generation consumer brands and CPG.","website":"coefficient.vc","category":"Consumer/CPG","whyRelevant":"STRONG FIT - DTC brand expertise, subscription models, health/wellness focus","source":"New Addition","isPriority":true},{"tier":2,"name":"Congruent Ventures","hq":"San Francisco, CA","thesis":"Sustainable systems and climate solutions.","website":"congruentvc.com","category":"Climate/Sustainability","whyRelevant":"Sustainability + industrial intersection","source":"New Addition","isPriority":false},{"tier":2,"name":"Construct Capital","hq":"San Francisco, CA","thesis":"Physical infrastructure and industrial systems.","website":"constructcap.com","category":"Infrastructure/Industrial","whyRelevant":"Industrial infrastructure focus, founded 2020","source":"New Addition","isPriority":false},{"tier":2,"name":"Decisive Point","hq":"Washington, DC","thesis":"National security and dual-use technology.","website":"decisivepoint.co","category":"Defense/National Security","whyRelevant":"Dual-use thesis aligns with your industrial + defense positioning","source":"New Addition","isPriority":false},{"tier":2,"name":"Eclipse Ventures","hq":"Palo Alto, CA","thesis":"Digitally transforming physical industries like manufacturing, supply chain, and battery storage.","website":"eclipse.vc","category":"Manufacturing/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Emerson Collective","hq":"Palo Alto, CA","thesis":"Laurene Powell Jobs - impact and innovation.","website":"emersoncollective.com","category":"Impact/Family Office","whyRelevant":"Impact investing, American jobs angle","source":"New Addition","isPriority":false},{"tier":2,"name":"Energy Impact Partners","hq":"New York, NY","thesis":"Utility-backed energy and sustainability.","website":"energyimpactpartners.com","category":"Energy/Industrial","whyRelevant":"Industrial energy infrastructure, utility connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Evonik Venture Capital","hq":"Essen, Germany / US","thesis":"Specialty chemicals and materials innovation.","website":"evonik.com","category":"Chemical Industry Strategic","whyRelevant":"Specialty chemicals focus, potential supply chain partner","source":"New Addition","isPriority":false},{"tier":2,"name":"FirstMark Capital","hq":"New York, NY","thesis":"AI-driven industrial tech.","website":"firstmark.com","category":"AI/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Ironspring Ventures","hq":"Austin, TX","thesis":"Industrial supply chain & manufacturing.","website":"ironspring.com","category":"Industrial Supply Chain","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Koch Disruptive Technologies","hq":"Wichita, KS","thesis":"Industrial technology and materials.","website":"kochdisruptivetechnologies.com","category":"Family Office/Strategic","whyRelevant":"STRATEGIC FIT - Koch Industries is chemicals, potential customer + investor","source":"New Addition","isPriority":true},{"tier":2,"name":"L Catterton","hq":"Greenwich, CT","thesis":"Consumer-focused private equity across all stages.","website":"lcatterton.com","category":"Consumer PE/VC","whyRelevant":"Largest consumer-focused PE, deep retail/DTC expertise","source":"New Addition","isPriority":false},{"tier":2,"name":"Lerer Hippeau","hq":"New York, NY","thesis":"Sustainable materials & hardware.","website":"lererhippeau.com","category":"Sustainable Materials","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Live Oak Venture Partners","hq":"Austin, TX","thesis":"Texas-focused enterprise and frontier tech.","website":"liveoakvp.com","category":"Texas Regional","whyRelevant":"Austin's largest local VC, deep Texas network","source":"New Addition","isPriority":true},{"tier":2,"name":"Lowercarbon Capital","hq":"Oakland, CA","thesis":"Climate solutions and decarbonization.","website":"lowercarboncapital.com","category":"Climate","whyRelevant":"Domestic manufacturing reduces shipping emissions","source":"New Addition","isPriority":false},{"tier":2,"name":"Matrix Partners","hq":"Boston / SF","thesis":"Technical infrastructure and engineering.","website":"matrixpartners.com","category":"Technical Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Polaris Partners","hq":"Boston / LA","thesis":"Physical science and biotechnology.","website":"polarispartners.com","category":"Physical Science","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Prelude Ventures","hq":"San Francisco, CA","thesis":"Climate and sustainability solutions.","website":"preludeventures.com","category":"Climate/Sustainability","whyRelevant":"Climate focus, domestic supply chain resilience angle","source":"New Addition","isPriority":false},{"tier":2,"name":"Primary Venture Partners","hq":"New York, NY","thesis":"NYC-focused logistics and manufacturing.","website":"primary.vc","category":"NYC Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Prime Movers Lab","hq":"Jackson, WY","thesis":"Breakthrough science and R&D.","website":"primemoverslab.com","category":"Breakthrough Science","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"RRE Ventures","hq":"New York, NY","thesis":"Space and physical infrastructure.","website":"rre.com","category":"Physical Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Razor's Edge Ventures","hq":"Arlington, VA","thesis":"Veteran-led fund investing in defense and dual-use.","website":"razorsedgevc.com","category":"Defense/National Security","whyRelevant":"Strong defense network, DoD connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Revolution (Rise of the Rest)","hq":"Washington, DC","thesis":"Steve Case fund for startups outside coastal hubs.","website":"revolution.com","category":"Regional/Non-Coastal","whyRelevant":"Texas focus, American manufacturing narrative","source":"New Addition","isPriority":false},{"tier":2,"name":"S3 Ventures","hq":"Austin, TX","thesis":"Long-term patient capital for healthcare and business software.","website":"s3vc.com","category":"Texas Regional","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Silverton Partners","hq":"Austin, TX","thesis":"Texas-based technology companies.","website":"silvertonpartners.com","category":"Texas Regional","whyRelevant":"Strong Austin ecosystem connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Solvay Ventures","hq":"Brussels / Princeton, NJ","thesis":"Advanced materials and specialty chemicals.","website":"solvay.com","category":"Chemical Industry Strategic","whyRelevant":"Materials science focus, global distribution","source":"New Addition","isPriority":false},{"tier":2,"name":"Sway Ventures","hq":"San Francisco, CA","thesis":"Technology-led transformation within Supply Chain sectors.","website":"swayvc.com","category":"Supply Chain","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Third Sphere","hq":"Brooklyn, NY","thesis":"The Moving Molecules Thesis.","website":"thirdsphere.com","category":"Molecules/Chemicals","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Toyota Ventures","hq":"San Francisco","thesis":"Materials and energy (Hydrogen).","website":"toyota.ventures","category":"Materials/Energy","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Trust Ventures","hq":"Austin, TX","thesis":"Helping hard tech startups overcome regulatory barriers in energy, food, and housing.","website":"trustventures.com","category":"Hard Tech/Regulatory","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Two Sigma Ventures","hq":"New York, NY","thesis":"Data-science for hardware and bio.","website":"twosigmaventures.com","category":"Data/Hardware","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Upfront Ventures","hq":"Los Angeles, CA","thesis":"Frontier tech in Southern California.","website":"upfront.com","category":"Frontier Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"VMG Partners","hq":"San Francisco, CA","thesis":"Consumer brands in health, wellness, and personal care.","website":"vmgpartners.com","category":"Consumer/Health Brands","whyRelevant":"Health/wellness brand scaling expertise, retail distribution","source":"New Addition","isPriority":false},{"tier":2,"name":"Valor Equity Partners","hq":"Chicago, IL","thesis":"Operational growth equity (Tesla, SpaceX ties).","website":"valorep.com","category":"Growth Equity","whyRelevant":"Operational expertise, Musk network connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Voyager Ventures","hq":"San Francisco","thesis":"Foundational industrial technology.","website":"voyagerventures.com","category":"Industrial Technology","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"645 Ventures","hq":"New York, NY","thesis":"Technical B2B infrastructure.","website":"645ventures.com","category":"B2B Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"AccelFoods","hq":"New York, NY","thesis":"Food and beverage innovation.","website":"accelfoods.com","category":"Food/Nutrition","whyRelevant":"Functional food expertise, retail distribution network","source":"New Addition","isPriority":false},{"tier":3,"name":"AlleyCorp","hq":"New York, NY","thesis":"Complex robotics and health science.","website":"alleycorp.com","category":"Robotics/Health","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Bee Partners","hq":"San Francisco","thesis":"Robotics and physical automation.","website":"beepartners.vc","category":"Robotics/Automation","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Boost VC","hq":"San Mateo, CA","thesis":"Energy, aerospace, and engineering.","website":"boost.vc","category":"Energy/Aerospace","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Cargill Ventures","hq":"Minneapolis, MN","thesis":"Food, agriculture, and nutrition innovation.","website":"cargill.com","category":"AgriFood Strategic","whyRelevant":"Massive food/nutrition distribution, potential B2B partner","source":"New Addition","isPriority":false},{"tier":3,"name":"CircleUp","hq":"San Francisco, CA","thesis":"Data-driven CPG and consumer brand investing.","website":"circleup.com","category":"Consumer/CPG","whyRelevant":"Consumer brand analytics, retail placement expertise","source":"New Addition","isPriority":false},{"tier":3,"name":"Clean Energy Ventures","hq":"Boston, MA","thesis":"Clean energy and decarbonization technology.","website":"cleanenergyventures.com","category":"Clean Energy","whyRelevant":"Industrial decarbonization focus","source":"New Addition","isPriority":false},{"tier":3,"name":"Compound","hq":"New York, NY","thesis":"Robotics and bio-foundries.","website":"compound.vc","category":"Robotics/Bio","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Countdown Capital","hq":"Remote / SF","thesis":"Hard tech and deep tech at earliest stages.","website":"countdown.capital","category":"Deep Tech","whyRelevant":"Pre-seed/seed hard tech specialists, founded 2021","source":"New Addition","isPriority":false},{"tier":3,"name":"Courtside Ventures","hq":"Menlo Park, CA","thesis":"Sports, health, and performance technology.","website":"courtside.vc","category":"Sports/Health","whyRelevant":"Sports performance focus aligns with creatine market","source":"New Addition","isPriority":false},{"tier":3,"name":"DSM Venturing","hq":"Netherlands / US","thesis":"Health, nutrition, and sustainable materials.","website":"dsm.com","category":"Chemical/Nutrition Strategic","whyRelevant":"Nutrition science expertise, potential B2B customer for creatine","source":"New Addition","isPriority":true},{"tier":3,"name":"Elemental Excelerator","hq":"Honolulu / Oakland","thesis":"Climate solutions and clean energy.","website":"elementalexcelerator.com","category":"Climate","whyRelevant":"Non-dilutive grants + equity, project deployment help","source":"New Addition","isPriority":false},{"tier":3,"name":"Energize Capital","hq":"Chicago, IL","thesis":"Sustainable infrastructure and energy tech.","website":"energizecap.com","category":"Energy Infrastructure","whyRelevant":"Infrastructure focus, Midwest network","source":"New Addition","isPriority":false},{"tier":3,"name":"Eniac Ventures","hq":"New York, NY","thesis":"Industrial IoT.","website":"eniac.vc","category":"Industrial IoT","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Fifty Years","hq":"San Francisco","thesis":"Biology/Chemistry for global impact.","website":"fiftyyears.com","category":"Biology/Chemistry","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Genoa Ventures","hq":"San Francisco","thesis":"Biology and physical tech crossover.","website":"genoaventures.com","category":"Biology/Physical Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"In-Q-Tel","hq":"Arlington, VA","thesis":"CIA/IC strategic venture arm for national security tech.","website":"iqt.org","category":"Government/Strategic","whyRelevant":"Strategic investor, validates national security angle, opens government doors","source":"New Addition","isPriority":false},{"tier":3,"name":"KdT Ventures","hq":"Austin, TX","thesis":"Biophysics & Molecular science.","website":"kdtvc.com","category":"Biophysics/Molecular","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Material Impact","hq":"Boston, MA","thesis":"Advanced materials and manufacturing.","website":"materialimpact.com","category":"Materials Science","whyRelevant":"STRONG FIT - materials science focus, industrial expertise","source":"New Addition","isPriority":true},{"tier":3,"name":"Maveron","hq":"Seattle / SF","thesis":"Consumer-only fund (Starbucks founder).","website":"maveron.com","category":"Consumer","whyRelevant":"Elite consumer brand building, subscription expertise","source":"New Addition","isPriority":false},{"tier":3,"name":"Mercury Fund","hq":"Houston, TX","thesis":"Texas technology and energy.","website":"mercuryfund.com","category":"Texas Regional","whyRelevant":"Houston-based, energy/industrial expertise, close to target facility area","source":"New Addition","isPriority":true},{"tier":3,"name":"Moonshots Capital","hq":"Austin / LA","thesis":"Leadership-driven frontier tech.","website":"moonshotscapital.com","category":"Frontier Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Next Coast Ventures","hq":"Austin, TX","thesis":"Texas B2B and enterprise technology.","website":"nextcoastventures.com","category":"Texas Regional","whyRelevant":"Austin-based, B2B focus","source":"New Addition","isPriority":false},{"tier":3,"name":"Pear VC","hq":"Menlo Park","thesis":"Tech-transfer and university science.","website":"pear.vc","category":"Tech Transfer/University","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Perot Jain","hq":"Dallas, TX","thesis":"Texas-focused healthcare and enterprise.","website":"perotjain.com","category":"Texas Regional","whyRelevant":"Perot family backing, Texas roots","source":"New Addition","isPriority":false},{"tier":3,"name":"SOSV / HAX","hq":"NY / Global","thesis":"Hardware accelerators and funds.","website":"sosv.com","category":"Hardware Accelerator","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Scout Ventures","hq":"Austin, TX","thesis":"Dual-use frontier tech.","website":"scout.vc","category":"Dual-Use/Defense","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"SeventySix Capital","hq":"Philadelphia, PA","thesis":"Sports technology and fan engagement.","website":"seventysixcapital.com","category":"Sports Tech","whyRelevant":"Sports industry connections, athlete network","source":"New Addition","isPriority":false},{"tier":3,"name":"Third Prime","hq":"New York, NY","thesis":"Industrial processing and transport.","website":"thirdprime.vc","category":"Industrial Processing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Union Labs","hq":"NY / SF","thesis":"High-risk physical systems.","website":"unionlabs.com","category":"Physical Systems","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Wireframe Ventures","hq":"San Francisco","thesis":"Heavy real-world industry solutions.","website":"wireframe.vc","category":"Industrial Solutions","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"ATX Venture Partners","hq":"Austin, TX","thesis":"Early-stage Austin technology.","website":"atxvp.com","category":"Texas Regional","whyRelevant":"Local Austin presence, seed focus","source":"New Addition","isPriority":false},{"tier":4,"name":"At One Ventures","hq":"San Francisco","thesis":"Net-positive physical infra.","website":"atoneventures.com","category":"Physical Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Beyond Earth Ventures","hq":"Remote","thesis":"Energy and industrial deep tech.","website":"beyondearth.vc","category":"Energy/Deep Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Capital Factory","hq":"Austin, TX","thesis":"Texas accelerator and seed fund.","website":"capitalfactory.com","category":"Texas Accelerator","whyRelevant":"Texas ecosystem hub, mentor network","source":"New Addition","isPriority":false},{"tier":4,"name":"Energy Capital Ventures","hq":"Chicago, IL","thesis":"Green Molecules & Infrastructure.","website":"energycapitalventures.com","category":"Green Molecules","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Humba Ventures","hq":"Austin, TX","thesis":"Hard tech and physical products.","website":"humba.vc","category":"Hard Tech","whyRelevant":"Austin-based, hard tech focus, new fund","source":"New Addition","isPriority":false},{"tier":4,"name":"KeyFrame Capital","hq":"New York, NY","thesis":"Energy and industrial logistics.","website":"keyframecapital.com","category":"Energy/Logistics","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"M1C (Mission 1st)","hq":"San Francisco","thesis":"Energy abundance and industrial edge.","website":"mission1st.com","category":"Energy/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Nomadic Venture Partners","hq":"Golden, CO","thesis":"Critical minerals and metals.","website":"nomadicvp.com","category":"Critical Minerals","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Overlander VC","hq":"Austin, TX","thesis":"Supply chain and industrial tech.","website":"overlandervc.com","category":"Supply Chain/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Pillar VC","hq":"Boston, MA","thesis":"Founder-first investing across tech sectors.","website":"pillar.vc","category":"Generalist","whyRelevant":"Jamie Goldstein's new fund, founder-friendly terms","source":"New Addition","isPriority":false},{"tier":4,"name":"Red Sea Ventures","hq":"San Francisco, CA","thesis":"Deep tech and frontier companies.","website":"redseaventures.com","category":"Deep Tech","whyRelevant":"New fund, deep tech focus","source":"New Addition","isPriority":false},{"tier":4,"name":"Sapphire Sport","hq":"Austin, TX","thesis":"Sports, health, and fitness technology.","website":"sapphiresport.com","category":"Sports/Fitness","whyRelevant":"Austin-based, health/fitness focus","source":"New Addition","isPriority":false},{"tier":4,"name":"Seaplane Ventures","hq":"Austin, TX","thesis":"Early-stage industrial networks.","website":"seaplane.vc","category":"Industrial Networks","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Silent Ventures","hq":"Los Angeles, CA","thesis":"Unconventional hard tech & defense.","website":"silentvc.com","category":"Hard Tech/Defense","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Walden Catalyst","hq":"Palo Alto, CA","thesis":"Data-driven physical science.","website":"waldencatalyst.com","category":"Physical Science","whyRelevant":"On original target list","source":"Original List","isPriority":false}];

const STAGES = ["Prospect","Researched","Outreach Sent","In Conversation","Pass","Committed"];
const STAGE_COLORS = {"Prospect":"#4a5568","Researched":"#3182ce","Outreach Sent":"#d69e2e","In Conversation":"#38a169","Pass":"#e53e3e","Committed":"#2f855a"};

export default function App() {
  const [state, setState] = useState(() =>
    RAW_INVESTORS.map((inv, i) => ({...inv, id: i, stage: "Prospect", notes: "", pitchHook: "", partner: "", lastContact: ""}))
  );
  const [selected, setSelected] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [tierF, setTierF] = useState("All");
  const [stageF, setStageF] = useState("All");
  const [priorityF, setPriorityF] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (id, field, val) => {
    setState(p => p.map(i => i.id === id ? {...i, [field]: val} : i));
    setSelected(p => p?.id === id ? {...p, [field]: val} : p);
  };

  const filtered = state.filter(inv => {
    if (tierF !== "All" && inv.tier !== +tierF) return false;
    if (stageF !== "All" && inv.stage !== stageF) return false;
    if (priorityF && !inv.isPriority) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!inv.name.toLowerCase().includes(q) && !inv.category.toLowerCase().includes(q) && !inv.hq.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const stats = {
    total: state.length,
    priority: state.filter(i => i.isPriority).length,
    active: state.filter(i => i.stage === "In Conversation").length,
    committed: state.filter(i => i.stage === "Committed").length,
    outreach: state.filter(i => i.stage === "Outreach Sent").length,
  };

  const generatePitch = async (inv) => {
    setGenerating(true);
    try {
      const res = await fetch("/api/anthropic", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Generate investor outreach materials for Athanor targeting ${inv.name}.

ATHANOR: ${ATHANOR_CONTEXT}

FIRM: ${inv.name} | ${inv.hq} | Tier ${inv.tier}
THESIS: ${inv.thesis}
CATEGORY: ${inv.category}
WHY RELEVANT: ${inv.whyRelevant}

Output EXACTLY this format:

HOOK:
[3-4 sentences. Open with a national security / chemical sovereignty angle specific to this firm's thesis. Connect to their known focus or portfolio. Close with Athanor's wedge. No hedging. Confident and direct.]

ALIGNMENT:
• [Most compelling reason this specific firm should care — 1 crisp sentence]
• [Their thesis or portfolio overlap with Athanor — 1 sentence]
• [Strategic value they bring beyond capital — 1 sentence]

SUBJECT LINE:
[Cold email subject. Specific. Max 8 words.]`
          }]
        })
      });
      const d = await res.json();
      update(inv.id, "pitchHook", d.content?.[0]?.text || "Generation failed.");
    } catch(e) {
      update(inv.id, "pitchHook", "Error generating pitch. Check API key.");
    }
    setGenerating(false);
  };

  const copy = () => {
    if (selected?.pitchHook) {
      navigator.clipboard.writeText(selected.pitchHook);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sel = selected ? state.find(i => i.id === selected.id) || selected : null;

  return (
    <div style={{fontFamily:"'IBM Plex Mono','Courier New',monospace",background:"#070707",height:"100vh",color:"#e2e8f0",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; }
        .row:hover { background: rgba(200,169,110,0.06) !important; cursor: pointer; }
        input, select, textarea {
          background: #0d0d0d; border: 1px solid #1e1e1e; color: #e2e8f0;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px;
          padding: 6px 10px; outline: none; width: 100%;
        }
        input:focus, select:focus, textarea:focus { border-color: #c8a96e; }
        select option { background: #111; }
        .btn {
          background: none; border: 1px solid #1e1e1e; color: #4a5568;
          padding: 4px 10px; font-family: 'IBM Plex Mono', monospace;
          font-size: 9px; letter-spacing: 1px; cursor: pointer;
          text-transform: uppercase; transition: all 0.15s; white-space: nowrap;
        }
        .btn:hover { border-color: #c8a96e; color: #c8a96e; }
        .btn.on { border-color: #c8a96e; color: #c8a96e; background: rgba(200,169,110,0.08); }
        .btn.gold { background: #c8a96e; border-color: #c8a96e; color: #070707; font-weight: 700; font-size: 10px; padding: 6px 14px; }
        .btn.gold:hover:not(:disabled) { background: #e6c27d; }
        .btn.gold:disabled { opacity: 0.4; cursor: not-allowed; }
        .pill { font-size: 8px; padding: 2px 6px; border-radius: 1px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; }
        .label { font-size: 8px; color: #2d3748; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
      `}</style>

      {/* Header */}
      <div style={{background:"#040404",borderBottom:"1px solid #111",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"baseline",gap:14}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:5,color:"#c8a96e"}}>ATHANOR</div>
          <div style={{fontSize:8,color:"#1a1a1a",letterSpacing:3,textTransform:"uppercase"}}>Investor Intelligence · $6M Seed Round</div>
        </div>
        <div style={{display:"flex",gap:20}}>
          {[{l:"Total",v:stats.total,c:"#e2e8f0"},{l:"Priority",v:stats.priority,c:"#c8a96e"},{l:"Outreach",v:stats.outreach,c:"#d69e2e"},{l:"Active",v:stats.active,c:"#48bb78"},{l:"Committed",v:stats.committed,c:stats.committed>0?"#48bb78":"#1a1a1a"}].map(s=>(
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontSize:7,color:"#1a1a1a",letterSpacing:2,textTransform:"uppercase"}}>{s.l}</div>
              <div style={{fontSize:18,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{background:"#070707",borderBottom:"1px solid #0f0f0f",padding:"6px 24px",display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",flexShrink:0}}>
        <input placeholder="Search firm, category, location..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:200}}/>
        <div style={{display:"flex",gap:3}}>
          {["All","1","2","3","4"].map(t=><button key={t} className={`btn${tierF===t?" on":""}`} onClick={()=>setTierF(t)}>{t==="All"?"All Tiers":`Tier ${t}`}</button>)}
        </div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {["All",...STAGES].map(s=><button key={s} className={`btn${stageF===s?" on":""}`} onClick={()=>setStageF(s)}>{s==="All"?"All Stages":s}</button>)}
        </div>
        <button className={`btn${priorityF?" on":""}`} onClick={()=>setPriorityF(p=>!p)}>★ Priority</button>
        <div style={{marginLeft:"auto",fontSize:9,color:"#1a1a1a"}}>{filtered.length} / {state.length} firms</div>
      </div>

      {/* Body */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* List */}
        <div style={{width:370,flexShrink:0,overflowY:"auto",borderRight:"1px solid #0d0d0d"}}>
          {filtered.length===0&&<div style={{padding:24,textAlign:"center",color:"#1a1a1a",fontSize:11}}>No results</div>}
          {filtered.map(inv=>(
            <div key={inv.id} className="row" onClick={()=>setSelected(inv)}
              style={{padding:"10px 14px",borderBottom:"1px solid #0c0c0c",background:sel?.id===inv.id?"rgba(200,169,110,0.07)":"transparent",borderLeft:sel?.id===inv.id?"3px solid #c8a96e":"3px solid transparent",transition:"all 0.1s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                    {inv.isPriority&&<span style={{color:"#c8a96e",fontSize:8}}>★</span>}
                    <span style={{fontSize:11,fontWeight:600,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.name}</span>
                    <span style={{fontSize:8,color:"#1a1a1a",flexShrink:0}}>T{inv.tier}</span>
                  </div>
                  <div style={{fontSize:9,color:"#4a5568",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.category} · {inv.hq}</div>
                </div>
                <span className="pill" style={{background:`${STAGE_COLORS[state.find(i=>i.id===inv.id)?.stage||inv.stage]}18`,color:STAGE_COLORS[state.find(i=>i.id===inv.id)?.stage||inv.stage],border:`1px solid ${STAGE_COLORS[state.find(i=>i.id===inv.id)?.stage||inv.stage]}33`,flexShrink:0}}>
                  {state.find(i=>i.id===inv.id)?.stage||inv.stage}
                </span>
              </div>
              {state.find(i=>i.id===inv.id)?.pitchHook&&<div style={{fontSize:7,color:"#c8a96e",marginTop:3,letterSpacing:1}}>✓ PITCH READY</div>}
            </div>
          ))}
        </div>

        {/* Detail */}
        {sel ? (
          <div style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14}}>
            <div style={{borderBottom:"1px solid #0f0f0f",paddingBottom:12,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  {sel.isPriority&&<span style={{color:"#c8a96e"}}>★</span>}
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,color:"#c8a96e"}}>{sel.name}</div>
                  <span className="pill" style={{background:"#0f0f0f",color:"#222",border:"1px solid #111"}}>TIER {sel.tier}</span>
                </div>
                <div style={{fontSize:10,color:"#4a5568"}}>{sel.hq} · {sel.category}</div>
                <a href={`https://${sel.website?.replace(/^https?:\/\//,"")}`} target="_blank" rel="noreferrer"
                  style={{fontSize:9,color:"#c8a96e",opacity:0.5,textDecoration:"none"}}>{sel.website} ↗</a>
              </div>
              <select value={sel.stage} onChange={e=>update(sel.id,"stage",e.target.value)} style={{width:160}}>
                {STAGES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div className="label">Investment Thesis</div>
                <div style={{fontSize:11,color:"#a0aec0",lineHeight:1.7}}>{sel.thesis}</div>
              </div>
              <div>
                <div className="label">Why Relevant</div>
                <div style={{fontSize:11,lineHeight:1.7,color:sel.whyRelevant.match(/PERFECT|STRONG|STRATEGIC/)?"#c8a96e":"#a0aec0"}}>{sel.whyRelevant}</div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <div className="label">Key Partner / Contact</div>
                <input value={sel.partner||""} onChange={e=>update(sel.id,"partner",e.target.value)} placeholder="Name, email, intro path..." />
              </div>
              <div>
                <div className="label">Last Contact</div>
                <input type="date" value={sel.lastContact||""} onChange={e=>update(sel.id,"lastContact",e.target.value)} />
              </div>
            </div>

            <div>
              <div className="label">Notes</div>
              <textarea value={sel.notes||""} onChange={e=>update(sel.id,"notes",e.target.value)}
                placeholder="Intro path, meeting notes, follow-up actions, next steps..." rows={3}
                style={{resize:"vertical",lineHeight:1.7}} />
            </div>

            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div className="label" style={{marginBottom:0}}>Pitch Intelligence</div>
                <div style={{display:"flex",gap:6}}>
                  {sel.pitchHook&&<button className="btn" onClick={copy}>{copied?"✓ COPIED":"COPY"}</button>}
                  <button className="btn gold" onClick={()=>generatePitch(sel)} disabled={generating}>
                    {generating?"GENERATING...":sel.pitchHook?"REGENERATE ↺":"GENERATE PITCH →"}
                  </button>
                </div>
              </div>
              {sel.pitchHook ? (
                <div style={{background:"#0a0a0a",border:"1px solid #1a2a3a",borderLeft:"3px solid #c8a96e",padding:16,whiteSpace:"pre-wrap",fontSize:11,lineHeight:2,color:"#cbd5e0"}}>
                  {sel.pitchHook}
                </div>
              ) : (
                <div style={{border:"1px dashed #111",padding:24,textAlign:"center",color:"#111",fontSize:11}}>
                  Click GENERATE PITCH → to produce a tailored hook, alignment points, and cold email subject line for {sel.name}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{textAlign:"center",color:"#0f0f0f"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:4,marginBottom:6}}>SELECT A FIRM</div>
              <div style={{fontSize:10}}>Click any investor from the list to view details and generate pitch intelligence</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}:"Essen, Germany / US","thesis":"Specialty chemicals and materials innovation.","website":"evonik.com","category":"Chemical Industry Strategic","whyRelevant":"Specialty chemicals focus, potential supply chain partner","source":"New Addition","isPriority":false},{"tier":2,"name":"FirstMark Capital","hq":"New York, NY","thesis":"AI-driven industrial tech.","website":"firstmark.com","category":"AI/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Ironspring Ventures","hq":"Austin, TX","thesis":"Industrial supply chain & manufacturing.","website":"ironspring.com","category":"Industrial Supply Chain","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Koch Disruptive Technologies","hq":"Wichita, KS","thesis":"Industrial technology and materials.","website":"kochdisruptivetechnologies.com","category":"Family Office/Strategic","whyRelevant":"STRATEGIC FIT - Koch Industries is chemicals, potential customer + investor","source":"New Addition","isPriority":true},{"tier":2,"name":"L Catterton","hq":"Greenwich, CT","thesis":"Consumer-focused private equity across all stages.","website":"lcatterton.com","category":"Consumer PE/VC","whyRelevant":"Largest consumer-focused PE, deep retail/DTC expertise","source":"New Addition","isPriority":false},{"tier":2,"name":"Lerer Hippeau","hq":"New York, NY","thesis":"Sustainable materials & hardware.","website":"lererhippeau.com","category":"Sustainable Materials","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Live Oak Venture Partners","hq":"Austin, TX","thesis":"Texas-focused enterprise and frontier tech.","website":"liveoakvp.com","category":"Texas Regional","whyRelevant":"Austin's largest local VC, deep Texas network","source":"New Addition","isPriority":true},{"tier":2,"name":"Lowercarbon Capital","hq":"Oakland, CA","thesis":"Climate solutions and decarbonization.","website":"lowercarboncapital.com","category":"Climate","whyRelevant":"Domestic manufacturing reduces shipping emissions","source":"New Addition","isPriority":false},{"tier":2,"name":"Matrix Partners","hq":"Boston / SF","thesis":"Technical infrastructure and engineering.","website":"matrixpartners.com","category":"Technical Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Polaris Partners","hq":"Boston / LA","thesis":"Physical science and biotechnology.","website":"polarispartners.com","category":"Physical Science","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Prelude Ventures","hq":"San Francisco, CA","thesis":"Climate and sustainability solutions.","website":"preludeventures.com","category":"Climate/Sustainability","whyRelevant":"Climate focus, domestic supply chain resilience angle","source":"New Addition","isPriority":false},{"tier":2,"name":"Primary Venture Partners","hq":"New York, NY","thesis":"NYC-focused logistics and manufacturing.","website":"primary.vc","category":"NYC Manufacturing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Prime Movers Lab","hq":"Jackson, WY","thesis":"Breakthrough science and R&D.","website":"primemoverslab.com","category":"Breakthrough Science","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"RRE Ventures","hq":"New York, NY","thesis":"Space and physical infrastructure.","website":"rre.com","category":"Physical Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Razor's Edge Ventures","hq":"Arlington, VA","thesis":"Veteran-led fund investing in defense and dual-use.","website":"razorsedgevc.com","category":"Defense/National Security","whyRelevant":"Strong defense network, DoD connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Revolution (Rise of the Rest)","hq":"Washington, DC","thesis":"Steve Case fund for startups outside coastal hubs.","website":"revolution.com","category":"Regional/Non-Coastal","whyRelevant":"Texas focus, American manufacturing narrative","source":"New Addition","isPriority":false},{"tier":2,"name":"S3 Ventures","hq":"Austin, TX","thesis":"Long-term patient capital for healthcare and business software.","website":"s3vc.com","category":"Texas Regional","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Silverton Partners","hq":"Austin, TX","thesis":"Texas-based technology companies.","website":"silvertonpartners.com","category":"Texas Regional","whyRelevant":"Strong Austin ecosystem connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Solvay Ventures","hq":"Brussels / Princeton, NJ","thesis":"Advanced materials and specialty chemicals.","website":"solvay.com","category":"Chemical Industry Strategic","whyRelevant":"Materials science focus, global distribution","source":"New Addition","isPriority":false},{"tier":2,"name":"Sway Ventures","hq":"San Francisco, CA","thesis":"Technology-led transformation within Supply Chain sectors.","website":"swayvc.com","category":"Supply Chain","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Third Sphere","hq":"Brooklyn, NY","thesis":"The Moving Molecules Thesis.","website":"thirdsphere.com","category":"Molecules/Chemicals","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Toyota Ventures","hq":"San Francisco","thesis":"Materials and energy (Hydrogen).","website":"toyota.ventures","category":"Materials/Energy","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Trust Ventures","hq":"Austin, TX","thesis":"Helping hard tech startups overcome regulatory barriers in energy, food, and housing.","website":"trustventures.com","category":"Hard Tech/Regulatory","whyRelevant":"On original target list","source":"Original List","isPriority":true},{"tier":2,"name":"Two Sigma Ventures","hq":"New York, NY","thesis":"Data-science for hardware and bio.","website":"twosigmaventures.com","category":"Data/Hardware","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"Upfront Ventures","hq":"Los Angeles, CA","thesis":"Frontier tech in Southern California.","website":"upfront.com","category":"Frontier Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":2,"name":"VMG Partners","hq":"San Francisco, CA","thesis":"Consumer brands in health, wellness, and personal care.","website":"vmgpartners.com","category":"Consumer/Health Brands","whyRelevant":"Health/wellness brand scaling expertise, retail distribution","source":"New Addition","isPriority":false},{"tier":2,"name":"Valor Equity Partners","hq":"Chicago, IL","thesis":"Operational growth equity (Tesla, SpaceX ties).","website":"valorep.com","category":"Growth Equity","whyRelevant":"Operational expertise, Musk network connections","source":"New Addition","isPriority":false},{"tier":2,"name":"Voyager Ventures","hq":"San Francisco","thesis":"Foundational industrial technology.","website":"voyagerventures.com","category":"Industrial Technology","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"645 Ventures","hq":"New York, NY","thesis":"Technical B2B infrastructure.","website":"645ventures.com","category":"B2B Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"AccelFoods","hq":"New York, NY","thesis":"Food and beverage innovation.","website":"accelfoods.com","category":"Food/Nutrition","whyRelevant":"Functional food expertise, retail distribution network","source":"New Addition","isPriority":false},{"tier":3,"name":"AlleyCorp","hq":"New York, NY","thesis":"Complex robotics and health science.","website":"alleycorp.com","category":"Robotics/Health","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Bee Partners","hq":"San Francisco","thesis":"Robotics and physical automation.","website":"beepartners.vc","category":"Robotics/Automation","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Boost VC","hq":"San Mateo, CA","thesis":"Energy, aerospace, and engineering.","website":"boost.vc","category":"Energy/Aerospace","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Cargill Ventures","hq":"Minneapolis, MN","thesis":"Food, agriculture, and nutrition innovation.","website":"cargill.com","category":"AgriFood Strategic","whyRelevant":"Massive food/nutrition distribution, potential B2B partner","source":"New Addition","isPriority":false},{"tier":3,"name":"CircleUp","hq":"San Francisco, CA","thesis":"Data-driven CPG and consumer brand investing.","website":"circleup.com","category":"Consumer/CPG","whyRelevant":"Consumer brand analytics, retail placement expertise","source":"New Addition","isPriority":false},{"tier":3,"name":"Clean Energy Ventures","hq":"Boston, MA","thesis":"Clean energy and decarbonization technology.","website":"cleanenergyventures.com","category":"Clean Energy","whyRelevant":"Industrial decarbonization focus","source":"New Addition","isPriority":false},{"tier":3,"name":"Compound","hq":"New York, NY","thesis":"Robotics and bio-foundries.","website":"compound.vc","category":"Robotics/Bio","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Countdown Capital","hq":"Remote / SF","thesis":"Hard tech and deep tech at earliest stages.","website":"countdown.capital","category":"Deep Tech","whyRelevant":"Pre-seed/seed hard tech specialists, founded 2021","source":"New Addition","isPriority":false},{"tier":3,"name":"Courtside Ventures","hq":"Menlo Park, CA","thesis":"Sports, health, and performance technology.","website":"courtside.vc","category":"Sports/Health","whyRelevant":"Sports performance focus aligns with creatine market","source":"New Addition","isPriority":false},{"tier":3,"name":"DSM Venturing","hq":"Netherlands / US","thesis":"Health, nutrition, and sustainable materials.","website":"dsm.com","category":"Chemical/Nutrition Strategic","whyRelevant":"Nutrition science expertise, potential B2B customer for creatine","source":"New Addition","isPriority":true},{"tier":3,"name":"Elemental Excelerator","hq":"Honolulu / Oakland","thesis":"Climate solutions and clean energy.","website":"elementalexcelerator.com","category":"Climate","whyRelevant":"Non-dilutive grants + equity, project deployment help","source":"New Addition","isPriority":false},{"tier":3,"name":"Energize Capital","hq":"Chicago, IL","thesis":"Sustainable infrastructure and energy tech.","website":"energizecap.com","category":"Energy Infrastructure","whyRelevant":"Infrastructure focus, Midwest network","source":"New Addition","isPriority":false},{"tier":3,"name":"Eniac Ventures","hq":"New York, NY","thesis":"Industrial IoT.","website":"eniac.vc","category":"Industrial IoT","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Fifty Years","hq":"San Francisco","thesis":"Biology/Chemistry for global impact.","website":"fiftyyears.com","category":"Biology/Chemistry","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Genoa Ventures","hq":"San Francisco","thesis":"Biology and physical tech crossover.","website":"genoaventures.com","category":"Biology/Physical Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"In-Q-Tel","hq":"Arlington, VA","thesis":"CIA/IC strategic venture arm for national security tech.","website":"iqt.org","category":"Government/Strategic","whyRelevant":"Strategic investor, validates national security angle, opens government doors","source":"New Addition","isPriority":false},{"tier":3,"name":"KdT Ventures","hq":"Austin, TX","thesis":"Biophysics & Molecular science.","website":"kdtvc.com","category":"Biophysics/Molecular","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Material Impact","hq":"Boston, MA","thesis":"Advanced materials and manufacturing.","website":"materialimpact.com","category":"Materials Science","whyRelevant":"STRONG FIT - materials science focus, industrial expertise","source":"New Addition","isPriority":true},{"tier":3,"name":"Maveron","hq":"Seattle / SF","thesis":"Consumer-only fund (Starbucks founder).","website":"maveron.com","category":"Consumer","whyRelevant":"Elite consumer brand building, subscription expertise","source":"New Addition","isPriority":false},{"tier":3,"name":"Mercury Fund","hq":"Houston, TX","thesis":"Texas technology and energy.","website":"mercuryfund.com","category":"Texas Regional","whyRelevant":"Houston-based, energy/industrial expertise, close to target facility area","source":"New Addition","isPriority":true},{"tier":3,"name":"Moonshots Capital","hq":"Austin / LA","thesis":"Leadership-driven frontier tech.","website":"moonshotscapital.com","category":"Frontier Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Next Coast Ventures","hq":"Austin, TX","thesis":"Texas B2B and enterprise technology.","website":"nextcoastventures.com","category":"Texas Regional","whyRelevant":"Austin-based, B2B focus","source":"New Addition","isPriority":false},{"tier":3,"name":"Pear VC","hq":"Menlo Park","thesis":"Tech-transfer and university science.","website":"pear.vc","category":"Tech Transfer/University","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Perot Jain","hq":"Dallas, TX","thesis":"Texas-focused healthcare and enterprise.","website":"perotjain.com","category":"Texas Regional","whyRelevant":"Perot family backing, Texas roots","source":"New Addition","isPriority":false},{"tier":3,"name":"SOSV / HAX","hq":"NY / Global","thesis":"Hardware accelerators and funds.","website":"sosv.com","category":"Hardware Accelerator","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Scout Ventures","hq":"Austin, TX","thesis":"Dual-use frontier tech.","website":"scout.vc","category":"Dual-Use/Defense","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"SeventySix Capital","hq":"Philadelphia, PA","thesis":"Sports technology and fan engagement.","website":"seventysixcapital.com","category":"Sports Tech","whyRelevant":"Sports industry connections, athlete network","source":"New Addition","isPriority":false},{"tier":3,"name":"Third Prime","hq":"New York, NY","thesis":"Industrial processing and transport.","website":"thirdprime.vc","category":"Industrial Processing","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Union Labs","hq":"NY / SF","thesis":"High-risk physical systems.","website":"unionlabs.com","category":"Physical Systems","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":3,"name":"Wireframe Ventures","hq":"San Francisco","thesis":"Heavy real-world industry solutions.","website":"wireframe.vc","category":"Industrial Solutions","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"ATX Venture Partners","hq":"Austin, TX","thesis":"Early-stage Austin technology.","website":"atxvp.com","category":"Texas Regional","whyRelevant":"Local Austin presence, seed focus","source":"New Addition","isPriority":false},{"tier":4,"name":"At One Ventures","hq":"San Francisco","thesis":"Net-positive physical infra.","website":"atoneventures.com","category":"Physical Infrastructure","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Beyond Earth Ventures","hq":"Remote","thesis":"Energy and industrial deep tech.","website":"beyondearth.vc","category":"Energy/Deep Tech","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Capital Factory","hq":"Austin, TX","thesis":"Texas accelerator and seed fund.","website":"capitalfactory.com","category":"Texas Accelerator","whyRelevant":"Texas ecosystem hub, mentor network","source":"New Addition","isPriority":false},{"tier":4,"name":"Energy Capital Ventures","hq":"Chicago, IL","thesis":"Green Molecules & Infrastructure.","website":"energycapitalventures.com","category":"Green Molecules","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Humba Ventures","hq":"Austin, TX","thesis":"Hard tech and physical products.","website":"humba.vc","category":"Hard Tech","whyRelevant":"Austin-based, hard tech focus, new fund","source":"New Addition","isPriority":false},{"tier":4,"name":"KeyFrame Capital","hq":"New York, NY","thesis":"Energy and industrial logistics.","website":"keyframecapital.com","category":"Energy/Logistics","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"M1C (Mission 1st)","hq":"San Francisco","thesis":"Energy abundance and industrial edge.","website":"mission1st.com","category":"Energy/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Nomadic Venture Partners","hq":"Golden, CO","thesis":"Critical minerals and metals.","website":"nomadicvp.com","category":"Critical Minerals","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Overlander VC","hq":"Austin, TX","thesis":"Supply chain and industrial tech.","website":"overlandervc.com","category":"Supply Chain/Industrial","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Pillar VC","hq":"Boston, MA","thesis":"Founder-first investing across tech sectors.","website":"pillar.vc","category":"Generalist","whyRelevant":"Jamie Goldstein's new fund, founder-friendly terms","source":"New Addition","isPriority":false},{"tier":4,"name":"Red Sea Ventures","hq":"San Francisco, CA","thesis":"Deep tech and frontier companies.","website":"redseaventures.com","category":"Deep Tech","whyRelevant":"New fund, deep tech focus","source":"New Addition","isPriority":false},{"tier":4,"name":"Sapphire Sport","hq":"Austin, TX","thesis":"Sports, health, and fitness technology.","website":"sapphiresport.com","category":"Sports/Fitness","whyRelevant":"Austin-based, health/fitness focus","source":"New Addition","isPriority":false},{"tier":4,"name":"Seaplane Ventures","hq":"Austin, TX","thesis":"Early-stage industrial networks.","website":"seaplane.vc","category":"Industrial Networks","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Silent Ventures","hq":"Los Angeles, CA","thesis":"Unconventional hard tech & defense.","website":"silentvc.com","category":"Hard Tech/Defense","whyRelevant":"On original target list","source":"Original List","isPriority":false},{"tier":4,"name":"Walden Catalyst","hq":"Palo Alto, CA","thesis":"Data-driven physical science.","website":"waldencatalyst.com","category":"Physical Science","whyRelevant":"On original target list","source":"Original List","isPriority":false}];

const STAGES = ["Prospect","Researched","Outreach Sent","In Conversation","Pass","Committed"];
const STAGE_COLORS = {"Prospect":"#4a5568","Researched":"#3182ce","Outreach Sent":"#d69e2e","In Conversation":"#38a169","Pass":"#e53e3e","Committed":"#2f855a"};

const STORAGE_KEY = "athanor-crm-v1";

const initState = () =>
  RAW_INVESTORS.map((inv, i) => ({...inv, id: i, stage: "Prospect", notes: "", pitchHook: "", partner: "", lastContact: ""}));

export default function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved data with RAW_INVESTORS in case new firms were added
        const savedMap = {};
        parsed.forEach(inv => { savedMap[inv.id] = inv; });
        return initState().map(inv => savedMap[inv.id] ? { ...inv, ...savedMap[inv.id] } : inv);
      }
    } catch {}
    return initState();
  });

  const [selected, setSelected] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [tierF, setTierF] = useState("All");
  const [stageF, setStageF] = useState("All");
  const [priorityF, setPriorityF] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-save to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const update = (id, field, val) => {
    setState(p => p.map(i => i.id === id ? {...i, [field]: val} : i));
    setSelected(p => p?.id === id ? {...p, [field]: val} : p);
  };

  const filtered = state.filter(inv => {
    if (tierF !== "All" && inv.tier !== +tierF) return false;
    if (stageF !== "All" && inv.stage !== stageF) return false;
    if (priorityF && !inv.isPriority) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!inv.name.toLowerCase().includes(q) && !inv.category.toLowerCase().includes(q) && !inv.hq.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const stats = {
    total: state.length,
    priority: state.filter(i => i.isPriority).length,
    active: state.filter(i => i.stage === "In Conversation").length,
    committed: state.filter(i => i.stage === "Committed").length,
    outreach: state.filter(i => i.stage === "Outreach Sent").length,
  };

  const generatePitch = async (inv) => {
    setGenerating(true);
    try {
      const res = await fetch("/api/anthropic", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Generate investor outreach materials for Athanor targeting ${inv.name}.

ATHANOR: ${ATHANOR_CONTEXT}

FIRM: ${inv.name} | ${inv.hq} | Tier ${inv.tier}
THESIS: ${inv.thesis}
CATEGORY: ${inv.category}
WHY RELEVANT: ${inv.whyRelevant}

Output EXACTLY this format:

HOOK:
[3-4 sentences. Open with a national security / chemical sovereignty angle specific to this firm's thesis. Connect to their known focus or portfolio. Close with Athanor's wedge. No hedging. Confident and direct.]

ALIGNMENT:
• [Most compelling reason this specific firm should care — 1 crisp sentence]
• [Their thesis or portfolio overlap with Athanor — 1 sentence]
• [Strategic value they bring beyond capital — 1 sentence]

SUBJECT LINE:
[Cold email subject. Specific. Max 8 words.]`
          }]
        })
      });
      const d = await res.json();
      update(inv.id, "pitchHook", d.content?.[0]?.text || "Generation failed.");
    } catch(e) {
      update(inv.id, "pitchHook", "Error generating pitch. Check API key.");
    }
    setGenerating(false);
  };

  const copy = () => {
    if (selected?.pitchHook) {
      navigator.clipboard.writeText(selected.pitchHook);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sel = selected ? state.find(i => i.id === selected.id) || selected : null;

  return (
    <div style={{fontFamily:"'IBM Plex Mono','Courier New',monospace",background:"#070707",height:"100vh",color:"#e2e8f0",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #c8a96e; }
        .row:hover { background: rgba(200,169,110,0.06) !important; cursor: pointer; }
        input, select, textarea {
          background: #0d0d0d; border: 1px solid #1e1e1e; color: #e2e8f0;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px;
          padding: 6px 10px; outline: none; width: 100%;
        }
        input:focus, select:focus, textarea:focus { border-color: #c8a96e; }
        select option { background: #111; }
        .btn {
          background: none; border: 1px solid #1e1e1e; color: #4a5568;
          padding: 4px 10px; font-family: 'IBM Plex Mono', monospace;
          font-size: 9px; letter-spacing: 1px; cursor: pointer;
          text-transform: uppercase; transition: all 0.15s; white-space: nowrap;
        }
        .btn:hover { border-color: #c8a96e; color: #c8a96e; }
        .btn.on { border-color: #c8a96e; color: #c8a96e; background: rgba(200,169,110,0.08); }
        .btn.gold { background: #c8a96e; border-color: #c8a96e; color: #070707; font-weight: 700; font-size: 10px; padding: 6px 14px; }
        .btn.gold:hover:not(:disabled) { background: #e6c27d; }
        .btn.gold:disabled { opacity: 0.4; cursor: not-allowed; }
        .pill { font-size: 8px; padding: 2px 6px; border-radius: 1px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; white-space: nowrap; }
        .label { font-size: 8px; color: #2d3748; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; }
      `}</style>

      {/* Header */}
      <div style={{background:"#040404",borderBottom:"1px solid #111",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"baseline",gap:14}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:5,color:"#c8a96e"}}>ATHANOR</div>
          <div style={{fontSize:8,color:"#1a1a1a",letterSpacing:3,textTransform:"uppercase"}}>Investor Intelligence · $6M Seed Round</div>
        </div>
        <div style={{display:"flex",gap:20}}>
          {[{l:"Total",v:stats.total,c:"#e2e8f0"},{l:"Priority",v:stats.priority,c:"#c8a96e"},{l:"Outreach",v:stats.outreach,c:"#d69e2e"},{l:"Active",v:stats.active,c:"#48bb78"},{l:"Committed",v:stats.committed,c:stats.committed>0?"#48bb78":"#1a1a1a"}].map(s=>(
            <div key={s.l} style={{textAlign:"center"}}>
              <div style={{fontSize:7,color:"#1a1a1a",letterSpacing:2,textTransform:"uppercase"}}>{s.l}</div>
              <div style={{fontSize:18,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,color:s.c}}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{background:"#070707",borderBottom:"1px solid #0f0f0f",padding:"6px 24px",display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",flexShrink:0}}>
        <input placeholder="Search firm, category, location..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:200}}/>
        <div style={{display:"flex",gap:3}}>
          {["All","1","2","3","4"].map(t=><button key={t} className={`btn${tierF===t?" on":""}`} onClick={()=>setTierF(t)}>{t==="All"?"All Tiers":`Tier ${t}`}</button>)}
        </div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
          {["All",...STAGES].map(s=><button key={s} className={`btn${stageF===s?" on":""}`} onClick={()=>setStageF(s)}>{s==="All"?"All Stages":s}</button>)}
        </div>
        <button className={`btn${priorityF?" on":""}`} onClick={()=>setPriorityF(p=>!p)}>★ Priority</button>
        <div style={{marginLeft:"auto",fontSize:9,color:"#1a1a1a"}}>{filtered.length} / {state.length} firms</div>
      </div>

      {/* Body */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* List */}
        <div style={{width:370,flexShrink:0,overflowY:"auto",borderRight:"1px solid #0d0d0d"}}>
          {filtered.length===0&&<div style={{padding:24,textAlign:"center",color:"#1a1a1a",fontSize:11}}>No results</div>}
          {filtered.map(inv=>(
            <div key={inv.id} className="row" onClick={()=>setSelected(inv)}
              style={{padding:"10px 14px",borderBottom:"1px solid #0c0c0c",background:sel?.id===inv.id?"rgba(200,169,110,0.07)":"transparent",borderLeft:sel?.id===inv.id?"3px solid #c8a96e":"3px solid transparent",transition:"all 0.1s"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}>
                    {inv.isPriority&&<span style={{color:"#c8a96e",fontSize:8}}>★</span>}
                    <span style={{fontSize:11,fontWeight:600,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.name}</span>
                    <span style={{fontSize:8,color:"#1a1a1a",flexShrink:0}}>T{inv.tier}</span>
                  </div>
                  <div style={{fontSize:9,color:"#4a5568",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.category} · {inv.hq}</div>
                </div>
                <span className="pill" style={{background:`${STAGE_COLORS[state.find(i=>i.id===inv.id)?.stage||inv.stage]}18`,color:STAGE_COLORS[state.find(i=>i.id===inv.id)?.stage||inv.stage],border:`1px solid ${STAGE_COLORS[state.find(i=>i.id===inv.id)?.stage||inv.stage]}33`,flexShrink:0}}>
                  {state.find(i=>i.id===inv.id)?.stage||inv.stage}
                </span>
              </div>
              {state.find(i=>i.id===inv.id)?.pitchHook&&<div style={{fontSize:7,color:"#c8a96e",marginTop:3,letterSpacing:1}}>✓ PITCH READY</div>}
            </div>
          ))}
        </div>

        {/* Detail */}
        {sel ? (
          <div style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14}}>
            <div style={{borderBottom:"1px solid #0f0f0f",paddingBottom:12,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  {sel.isPriority&&<span style={{color:"#c8a96e"}}>★</span>}
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:3,color:"#c8a96e"}}>{sel.name}</div>
                  <span className="pill" style={{background:"#0f0f0f",color:"#222",border:"1px solid #111"}}>TIER {sel.tier}</span>
                </div>
                <div style={{fontSize:10,color:"#4a5568"}}>{sel.hq} · {sel.category}</div>
                <a href={`https://${sel.website?.replace(/^https?:\/\//,"")}`} target="_blank" rel="noreferrer"
                  style={{fontSize:9,color:"#c8a96e",opacity:0.5,textDecoration:"none"}}>{sel.website} ↗</a>
              </div>
              <select value={sel.stage} onChange={e=>update(sel.id,"stage",e.target.value)} style={{width:160}}>
                {STAGES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div className="label">Investment Thesis</div>
                <div style={{fontSize:11,color:"#a0aec0",lineHeight:1.7}}>{sel.thesis}</div>
              </div>
              <div>
                <div className="label">Why Relevant</div>
                <div style={{fontSize:11,lineHeight:1.7,color:sel.whyRelevant.match(/PERFECT|STRONG|STRATEGIC/)?"#c8a96e":"#a0aec0"}}>{sel.whyRelevant}</div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div>
                <div className="label">Key Partner / Contact</div>
                <input value={sel.partner||""} onChange={e=>update(sel.id,"partner",e.target.value)} placeholder="Name, email, intro path..." />
              </div>
              <div>
                <div className="label">Last Contact</div>
                <input type="date" value={sel.lastContact||""} onChange={e=>update(sel.id,"lastContact",e.target.value)} />
              </div>
            </div>

            <div>
              <div className="label">Notes</div>
              <textarea value={sel.notes||""} onChange={e=>update(sel.id,"notes",e.target.value)}
                placeholder="Intro path, meeting notes, follow-up actions, next steps..." rows={3}
                style={{resize:"vertical",lineHeight:1.7}} />
            </div>

            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div className="label" style={{marginBottom:0}}>Pitch Intelligence</div>
                <div style={{display:"flex",gap:6}}>
                  {sel.pitchHook&&<button className="btn" onClick={copy}>{copied?"✓ COPIED":"COPY"}</button>}
                  <button className="btn gold" onClick={()=>generatePitch(sel)} disabled={generating}>
                    {generating?"GENERATING...":sel.pitchHook?"REGENERATE ↺":"GENERATE PITCH →"}
                  </button>
                </div>
              </div>
              {sel.pitchHook ? (
                <div style={{background:"#0a0a0a",border:"1px solid #1a2a3a",borderLeft:"3px solid #c8a96e",padding:16,whiteSpace:"pre-wrap",fontSize:11,lineHeight:2,color:"#cbd5e0"}}>
                  {sel.pitchHook}
                </div>
              ) : (
                <div style={{border:"1px dashed #111",padding:24,textAlign:"center",color:"#111",fontSize:11}}>
                  Click GENERATE PITCH → to produce a tailored hook, alignment points, and cold email subject line for {sel.name}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{textAlign:"center",color:"#0f0f0f"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:4,marginBottom:6}}>SELECT A FIRM</div>
              <div style={{fontSize:10}}>Click any investor from the list to view details and generate pitch intelligence</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
