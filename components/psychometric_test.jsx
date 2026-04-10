import { useState, useEffect, useRef } from "react";

const SPEC_MAP = {"btech_cse":{"specialization_id":"btech_cse","specialization_name":"Computer Science Engineering (CSE)","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["logical","analytical","problem_solver","tech_curious","detail_oriented"],"career_paths":["Software Engineer","Backend Developer","System Architect","Researcher"]},"btech_it":{"specialization_id":"btech_it","specialization_name":"Information Technology (IT)","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["tech_curious","systems_thinker","organized","practical","collaborative"],"career_paths":["IT Consultant","Network Engineer","IT Manager","DevOps Engineer"]},"btech_aiml":{"specialization_id":"btech_aiml","specialization_name":"Artificial Intelligence & Machine Learning (AI/ML)","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["curious","mathematical","research_oriented","innovative","data_driven"],"career_paths":["ML Engineer","Data Scientist","AI Researcher","NLP Engineer","Computer Vision Engineer"]},"btech_ds":{"specialization_id":"btech_ds","specialization_name":"Data Science","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["analytical","mathematical","data_driven","curious","statistical_thinking"],"career_paths":["Data Analyst","Data Engineer","Business Intelligence Analyst","Quantitative Analyst"]},"btech_mech":{"specialization_id":"btech_mech","specialization_name":"Mechanical Engineering","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["hands_on","mechanical_aptitude","design_thinking","practical","problem_solver"],"career_paths":["Mechanical Engineer","Design Engineer","Manufacturing Engineer","Automotive Engineer","ISRO/DRDO"]},"btech_civil":{"specialization_id":"btech_civil","specialization_name":"Civil Engineering","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["structured_thinker","spatial_reasoning","patient","detail_oriented","outdoor_oriented"],"career_paths":["Civil Engineer","Structural Engineer","Urban Planner","Project Manager (Infra)","Govt PSU Engineer"]},"btech_ece":{"specialization_id":"btech_ece","specialization_name":"Electronics & Communication Engineering (ECE)","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["technical","electronics_curious","systematic","analytical","hardware_oriented"],"career_paths":["Embedded Systems Engineer","VLSI Designer","Telecom Engineer","IoT Developer","R&D Engineer"]},"btech_electrical":{"specialization_id":"btech_electrical","specialization_name":"Electrical Engineering","course_id":"btech","course_name":"B.Tech / B.E.","stream":"science","psychometric_traits":["systematic","technical","math_oriented","problem_solver","precision_focused"],"career_paths":["Electrical Engineer","Power Systems Engineer","Control Systems Engineer","PSU (BHEL/NTPC/ONGC)"]},"bca_softdev":{"specialization_id":"bca_softdev","specialization_name":"Software Development","course_id":"bca","course_name":"BCA","stream":"science","psychometric_traits":["logical","coding_enthusiast","problem_solver","creative","detail_oriented"],"career_paths":["Software Developer","Full Stack Developer","Backend Engineer","DevOps Engineer"]},"bca_webdev":{"specialization_id":"bca_webdev","specialization_name":"Web Development","course_id":"bca","course_name":"BCA","stream":"science","psychometric_traits":["creative","visual_thinker","tech_savvy","user_empathy","fast_learner"],"career_paths":["Frontend Developer","Full Stack Developer","UI Engineer","Web Designer"]},"bca_aiml":{"specialization_id":"bca_aiml","specialization_name":"AI & Machine Learning","course_id":"bca","course_name":"BCA","stream":"science","psychometric_traits":["data_driven","mathematical","curious","innovative","research_oriented"],"career_paths":["Junior ML Engineer","Data Analyst","AI Product Associate","Research Assistant"]},"bba_marketing":{"specialization_id":"bba_marketing","specialization_name":"Marketing","course_id":"bba","course_name":"BBA","stream":"commerce","psychometric_traits":["extroverted","persuasive","creative","social","trend_aware"],"career_paths":["Marketing Manager","Brand Manager","Digital Marketer","Sales Manager","Product Manager"]},"bba_finance":{"specialization_id":"bba_finance","specialization_name":"Finance","course_id":"bba","course_name":"BBA","stream":"commerce","psychometric_traits":["analytical","numerical","risk_aware","disciplined","strategic_thinker"],"career_paths":["Financial Analyst","Investment Banker","CA (after additional exams)","CFO Track","Equity Researcher"]},"llb_corporate":{"specialization_id":"llb_corporate","specialization_name":"Corporate Law","course_id":"llb","course_name":"LLB / BA LLB","stream":"independent","psychometric_traits":["analytical","persuasive","detail_oriented","business_minded","strategic"],"career_paths":["Corporate Lawyer","In-house Counsel","Mergers & Acquisitions","Compliance Officer"]},"bcom_accounting_finance":{"specialization_id":"bcom_accounting_finance","specialization_name":"Accounting & Finance","course_id":"bcom","course_name":"B.Com","stream":"commerce","psychometric_traits":["numerical","precise","rule_follower","disciplined","detail_oriented"],"career_paths":["Chartered Accountant (CA)","Financial Accountant","Auditor","Tax Consultant","CFO Track"]},"bsc_cs":{"specialization_id":"bsc_cs","specialization_name":"Computer Science","course_id":"bsc","course_name":"B.Sc","stream":"science","psychometric_traits":["logical","tech_curious","mathematical","problem_solver","systematic"],"career_paths":["Software Developer","Data Analyst","Systems Programmer","MCA/MTech candidate"]},"bdes_uiux":{"specialization_id":"bdes_uiux","specialization_name":"UI/UX Design","course_id":"bdes","course_name":"B.Des","stream":"independent","psychometric_traits":["empathetic","visual_thinker","creative","user_centric","tech_comfortable"],"career_paths":["UX Designer","Product Designer","UI Engineer","Interaction Designer"]},"bjmc_journalism":{"specialization_id":"bjmc_journalism","specialization_name":"Journalism (Print/TV)","course_id":"bjmc","course_name":"BJMC","stream":"independent","psychometric_traits":["curious","communicative","investigative","socially_aware","storyteller"],"career_paths":["Print Journalist","TV Reporter","News Anchor","Investigative Reporter","Editor"]},"mbbs_general":{"specialization_id":"mbbs_general","specialization_name":"General Medicine (MBBS)","course_id":"mbbs","course_name":"MBBS","stream":"science","psychometric_traits":["empathetic","scientific","patient","decisive_under_pressure","service_oriented"],"career_paths":["General Physician","Specialist (via MD/MS)","Surgeon","Researcher","Medical Officer"]}};

const PSYCHOMETRIC_DATA = {"sections":[{"section_id":"interest","section_name":"Interest & Passion","description":"What genuinely excites you? There are no right or wrong answers.","icon":"🔥","questions":[{"question_id":"INT_01","question":"When you have free time and access to a computer, what are you most likely to do?","type":"single_choice","options":[{"option_id":"a","text":"Write code, build a small project or debug something","traits":[{"trait":"logical","weight":3},{"trait":"coding_enthusiast","weight":3},{"trait":"problem_solver","weight":2}]},{"option_id":"b","text":"Design a UI mockup, edit graphics or create digital art","traits":[{"trait":"creative","weight":3},{"trait":"visual_thinker","weight":3},{"trait":"user_centric","weight":2}]},{"option_id":"c","text":"Read about AI research, watch ML tutorials or experiment with models","traits":[{"trait":"curious","weight":3},{"trait":"research_oriented","weight":3},{"trait":"data_driven","weight":2}]},{"option_id":"d","text":"Read news, browse social media trends or write something","traits":[{"trait":"communicative","weight":3},{"trait":"socially_aware","weight":2},{"trait":"trend_aware","weight":2}]}]},{"question_id":"INT_02","question":"Which subject in school do / did you enjoy the most?","type":"single_choice","options":[{"option_id":"a","text":"Mathematics — I love solving equations and proofs","traits":[{"trait":"mathematical","weight":3},{"trait":"analytical","weight":2},{"trait":"logical","weight":2}]},{"option_id":"b","text":"Physics — circuits, mechanics, and how things work","traits":[{"trait":"technical","weight":3},{"trait":"electronics_curious","weight":2},{"trait":"mechanical_aptitude","weight":2}]},{"option_id":"c","text":"Biology / Chemistry — the science of life and matter","traits":[{"trait":"scientific","weight":3},{"trait":"patient","weight":2},{"trait":"detail_oriented","weight":2}]},{"option_id":"d","text":"Economics / Commerce — markets, money, and business","traits":[{"trait":"numerical","weight":3},{"trait":"strategic_thinker","weight":2},{"trait":"business_minded","weight":2}]},{"option_id":"e","text":"English / Arts — language, literature, and expression","traits":[{"trait":"communicative","weight":3},{"trait":"storyteller","weight":2},{"trait":"creative","weight":2}]}]},{"question_id":"INT_03","question":"Pick the project you'd most enjoy working on for a year:","type":"single_choice","options":[{"option_id":"a","text":"Building an app that millions of people use every day","traits":[{"trait":"problem_solver","weight":3},{"trait":"tech_curious","weight":2},{"trait":"innovative","weight":2}]},{"option_id":"b","text":"Designing and building a physical structure — a bridge, building, or machine","traits":[{"trait":"hands_on","weight":3},{"trait":"spatial_reasoning","weight":3},{"trait":"structured_thinker","weight":2}]},{"option_id":"c","text":"Researching a cure for a disease or a new scientific theory","traits":[{"trait":"scientific","weight":3},{"trait":"research_oriented","weight":3},{"trait":"curious","weight":2}]},{"option_id":"d","text":"Launching and growing a business from scratch","traits":[{"trait":"extroverted","weight":2},{"trait":"strategic_thinker","weight":3},{"trait":"risk_aware","weight":2}]},{"option_id":"e","text":"Investigating a social issue and writing stories that drive change","traits":[{"trait":"investigative","weight":3},{"trait":"socially_aware","weight":3},{"trait":"communicative","weight":2}]}]},{"question_id":"INT_04","question":"Which of these YouTube rabbit holes would you fall into at 2 AM?","type":"single_choice","options":[{"option_id":"a","text":"How neural networks actually learn — visualizations and explainers","traits":[{"trait":"data_driven","weight":3},{"trait":"mathematical","weight":2},{"trait":"curious","weight":2}]},{"option_id":"b","text":"How electronics / CPUs are made — chip fabrication and engineering","traits":[{"trait":"electronics_curious","weight":3},{"trait":"hardware_oriented","weight":3},{"trait":"technical","weight":2}]},{"option_id":"c","text":"How massive dams, skyscrapers, or roads are built","traits":[{"trait":"outdoor_oriented","weight":2},{"trait":"spatial_reasoning","weight":3},{"trait":"mechanical_aptitude","weight":2}]},{"option_id":"d","text":"UI/UX redesigns, design critiques, or colour theory deep-dives","traits":[{"trait":"visual_thinker","weight":3},{"trait":"user_empathy","weight":3},{"trait":"creative","weight":2}]},{"option_id":"e","text":"True crime documentaries or investigative journalism breakdowns","traits":[{"trait":"investigative","weight":3},{"trait":"storyteller","weight":2},{"trait":"analytical","weight":2}]}]},{"question_id":"INT_05","question":"Which of these roles sounds most exciting to you?","type":"single_choice","options":[{"option_id":"a","text":"Lawyer arguing a high-stakes corporate case","traits":[{"trait":"persuasive","weight":3},{"trait":"analytical","weight":2},{"trait":"business_minded","weight":2}]},{"option_id":"b","text":"Doctor diagnosing rare diseases and helping patients","traits":[{"trait":"empathetic","weight":3},{"trait":"scientific","weight":2},{"trait":"decisive_under_pressure","weight":2}]},{"option_id":"c","text":"Data Scientist finding hidden patterns in huge datasets","traits":[{"trait":"statistical_thinking","weight":3},{"trait":"data_driven","weight":3},{"trait":"analytical","weight":2}]},{"option_id":"d","text":"Financial Analyst managing investments for a firm","traits":[{"trait":"numerical","weight":3},{"trait":"risk_aware","weight":3},{"trait":"disciplined","weight":2}]},{"option_id":"e","text":"Journalist breaking a major news story","traits":[{"trait":"communicative","weight":3},{"trait":"investigative","weight":3},{"trait":"storyteller","weight":2}]}]},{"question_id":"INT_06","question":"Which type of work environment sounds most appealing?","type":"single_choice","options":[{"option_id":"a","text":"A quiet lab or research center where I can focus deeply","traits":[{"trait":"research_oriented","weight":3},{"trait":"patient","weight":2},{"trait":"detail_oriented","weight":2}]},{"option_id":"b","text":"A busy site — field, factory, hospital or construction zone","traits":[{"trait":"hands_on","weight":3},{"trait":"outdoor_oriented","weight":3},{"trait":"service_oriented","weight":2}]},{"option_id":"c","text":"A fast-paced office or startup where things change daily","traits":[{"trait":"fast_learner","weight":3},{"trait":"innovative","weight":2},{"trait":"collaborative","weight":2}]},{"option_id":"d","text":"Anywhere — I want to work remotely on my laptop","traits":[{"trait":"tech_savvy","weight":3},{"trait":"organized","weight":2},{"trait":"systematic","weight":2}]},{"option_id":"e","text":"A courtroom, studio, or public-facing setting","traits":[{"trait":"extroverted","weight":3},{"trait":"persuasive","weight":2},{"trait":"social","weight":2}]}]},{"question_id":"INT_07","question":"What kind of problem do you most enjoy solving?","type":"single_choice","options":[{"option_id":"a","text":"A logical puzzle or algorithm challenge","traits":[{"trait":"logical","weight":3},{"trait":"problem_solver","weight":3},{"trait":"systematic","weight":2}]},{"option_id":"b","text":"A design challenge — making something look and feel perfect","traits":[{"trait":"design_thinking","weight":3},{"trait":"creative","weight":3},{"trait":"user_centric","weight":2}]},{"option_id":"c","text":"A numbers problem — analysis, statistics, or financial modelling","traits":[{"trait":"numerical","weight":3},{"trait":"statistical_thinking","weight":3},{"trait":"precise","weight":2}]},{"option_id":"d","text":"A human problem — understanding why people behave the way they do","traits":[{"trait":"empathetic","weight":3},{"trait":"socially_aware","weight":2},{"trait":"user_empathy","weight":3}]},{"option_id":"e","text":"An engineering problem — optimizing a physical or electrical system","traits":[{"trait":"technical","weight":3},{"trait":"precision_focused","weight":3},{"trait":"systematic","weight":2}]}]},{"question_id":"INT_08","question":"How do you usually spend your school/college fest time?","type":"single_choice","options":[{"option_id":"a","text":"Competing in coding, quiz or debate events","traits":[{"trait":"logical","weight":2},{"trait":"analytical","weight":2},{"trait":"persuasive","weight":2}]},{"option_id":"b","text":"Performing, anchoring or running the media/coverage team","traits":[{"trait":"communicative","weight":3},{"trait":"extroverted","weight":3},{"trait":"storyteller","weight":2}]},{"option_id":"c","text":"Organising logistics, managing teams or sponsorships","traits":[{"trait":"organized","weight":3},{"trait":"collaborative","weight":2},{"trait":"systematic","weight":2}]},{"option_id":"d","text":"Designing posters, making videos or working on the website","traits":[{"trait":"creative","weight":3},{"trait":"visual_thinker","weight":3},{"trait":"tech_savvy","weight":2}]},{"option_id":"e","text":"Attending workshops and exploring new technical things","traits":[{"trait":"curious","weight":3},{"trait":"fast_learner","weight":3},{"trait":"innovative","weight":2}]}]},{"question_id":"INT_09","question":"If you could shadow a professional for a week, who would you pick?","type":"single_choice","options":[{"option_id":"a","text":"A structural or civil engineer working on a mega infrastructure project","traits":[{"trait":"spatial_reasoning","weight":3},{"trait":"outdoor_oriented","weight":2},{"trait":"structured_thinker","weight":3}]},{"option_id":"b","text":"A product manager at a top tech company (Google, Amazon)","traits":[{"trait":"systems_thinker","weight":3},{"trait":"strategic","weight":2},{"trait":"collaborative","weight":2}]},{"option_id":"c","text":"An AI researcher publishing papers at NeurIPS","traits":[{"trait":"research_oriented","weight":3},{"trait":"mathematical","weight":3},{"trait":"innovative","weight":2}]},{"option_id":"d","text":"A surgeon performing complex operations","traits":[{"trait":"decisive_under_pressure","weight":3},{"trait":"precision_focused","weight":3},{"trait":"patient","weight":2}]},{"option_id":"e","text":"A stock trader or investment banker managing millions","traits":[{"trait":"risk_aware","weight":3},{"trait":"numerical","weight":2},{"trait":"disciplined","weight":2}]}]},{"question_id":"INT_10","question":"Which of these clubs would you most likely join?","type":"single_choice","options":[{"option_id":"a","text":"Robotics or Electronics Club","traits":[{"trait":"hardware_oriented","weight":3},{"trait":"electronics_curious","weight":3},{"trait":"hands_on","weight":2}]},{"option_id":"b","text":"Entrepreneurship or Finance Club","traits":[{"trait":"business_minded","weight":3},{"trait":"strategic_thinker","weight":2},{"trait":"risk_aware","weight":2}]},{"option_id":"c","text":"Photography, Filmmaking or Journalism Club","traits":[{"trait":"storyteller","weight":3},{"trait":"investigative","weight":2},{"trait":"visual_thinker","weight":3}]},{"option_id":"d","text":"Competitive Programming or AI/ML Club","traits":[{"trait":"logical","weight":3},{"trait":"data_driven","weight":2},{"trait":"coding_enthusiast","weight":3}]},{"option_id":"e","text":"Social Work / NSS / Community Service","traits":[{"trait":"service_oriented","weight":3},{"trait":"empathetic","weight":3},{"trait":"social","weight":2}]}]}]},{"section_id":"aptitude","section_name":"Aptitude & Thinking Style","description":"How do you naturally think and process information?","icon":"🧠","questions":[{"question_id":"APT_01","question":"A function is supposed to return the second largest number in a list, but it's returning the wrong answer. How do you approach this?","type":"single_choice","options":[{"option_id":"a","text":"I trace through the logic step by step and find the exact line that's wrong","traits":[{"trait":"logical","weight":3},{"trait":"detail_oriented","weight":3},{"trait":"systematic","weight":2}]},{"option_id":"b","text":"I Google the error, find a Stack Overflow post and adapt the solution","traits":[{"trait":"fast_learner","weight":3},{"trait":"practical","weight":3},{"trait":"tech_savvy","weight":2}]},{"option_id":"c","text":"I rewrite the function from scratch with a cleaner approach","traits":[{"trait":"problem_solver","weight":3},{"trait":"innovative","weight":2},{"trait":"coding_enthusiast","weight":2}]},{"option_id":"d","text":"This scenario doesn't interest me — I'd move on to something else","traits":[{"trait":"creative","weight":1},{"trait":"trend_aware","weight":1}]}]},{"question_id":"APT_02","question":"You're given 3 years of sales data for a company. What's your first instinct?","type":"single_choice","options":[{"option_id":"a","text":"Plot the data and look for patterns, seasonality or anomalies","traits":[{"trait":"data_driven","weight":3},{"trait":"statistical_thinking","weight":3},{"trait":"analytical","weight":2}]},{"option_id":"b","text":"Calculate year-on-year growth, margins and forecast future revenue","traits":[{"trait":"numerical","weight":3},{"trait":"disciplined","weight":2},{"trait":"strategic_thinker","weight":2}]},{"option_id":"c","text":"Ask what decision needs to be made and what information actually matters","traits":[{"trait":"systems_thinker","weight":3},{"trait":"analytical","weight":2},{"trait":"organized","weight":2}]},{"option_id":"d","text":"Turn it into a visual story — a report or presentation","traits":[{"trait":"communicative","weight":3},{"trait":"visual_thinker","weight":2},{"trait":"storyteller","weight":2}]}]},{"question_id":"APT_03","question":"When you study a new concept, which approach works best for you?","type":"single_choice","options":[{"option_id":"a","text":"Read the theory thoroughly, then attempt problems","traits":[{"trait":"structured_thinker","weight":3},{"trait":"disciplined","weight":2},{"trait":"patient","weight":2}]},{"option_id":"b","text":"Jump straight in and learn by trial and error","traits":[{"trait":"hands_on","weight":3},{"trait":"fast_learner","weight":3},{"trait":"practical","weight":2}]},{"option_id":"c","text":"Watch a visual explanation or diagram first, then connect the dots","traits":[{"trait":"visual_thinker","weight":3},{"trait":"spatial_reasoning","weight":2},{"trait":"curious","weight":2}]},{"option_id":"d","text":"Discuss it with someone and build understanding through conversation","traits":[{"trait":"collaborative","weight":3},{"trait":"communicative","weight":2},{"trait":"social","weight":2}]}]},{"question_id":"APT_04","question":"Which task would you complete faster and more accurately?","type":"single_choice","options":[{"option_id":"a","text":"Spotting an error in a 500-line spreadsheet with financial data","traits":[{"trait":"precise","weight":3},{"trait":"numerical","weight":3},{"trait":"detail_oriented","weight":2}]},{"option_id":"b","text":"Drawing a floor plan or visualizing how a space could be redesigned","traits":[{"trait":"spatial_reasoning","weight":3},{"trait":"design_thinking","weight":3},{"trait":"visual_thinker","weight":2}]},{"option_id":"c","text":"Reading a legal contract and identifying the problematic clauses","traits":[{"trait":"analytical","weight":3},{"trait":"rule_follower","weight":2},{"trait":"strategic","weight":2}]},{"option_id":"d","text":"Dissecting a mechanical or electronic device to understand how it works","traits":[{"trait":"mechanical_aptitude","weight":3},{"trait":"hardware_oriented","weight":3},{"trait":"electronics_curious","weight":2}]}]},{"question_id":"APT_05","question":"How do you typically handle a complex, multi-week project?","type":"single_choice","options":[{"option_id":"a","text":"Break it into sub-tasks, set milestones, and track progress daily","traits":[{"trait":"organized","weight":3},{"trait":"disciplined","weight":3},{"trait":"systematic","weight":2}]},{"option_id":"b","text":"Sprint hard when inspired, then review everything at the end","traits":[{"trait":"innovative","weight":2},{"trait":"creative","weight":2},{"trait":"fast_learner","weight":2}]},{"option_id":"c","text":"Coordinate with others constantly and divide work by strengths","traits":[{"trait":"collaborative","weight":3},{"trait":"social","weight":2},{"trait":"systems_thinker","weight":2}]},{"option_id":"d","text":"Research first, experiment a lot, then commit to the best approach","traits":[{"trait":"research_oriented","weight":3},{"trait":"analytical","weight":2},{"trait":"curious","weight":2}]}]},{"question_id":"APT_06","question":"You need to understand how a power grid distributes electricity across a city. How do you think about it?","type":"single_choice","options":[{"option_id":"a","text":"I think of it as a graph or network — nodes, edges, load balancing","traits":[{"trait":"mathematical","weight":3},{"trait":"systematic","weight":3},{"trait":"logical","weight":2}]},{"option_id":"b","text":"I think of transformers, voltage levels and circuit components","traits":[{"trait":"technical","weight":3},{"trait":"math_oriented","weight":3},{"trait":"precision_focused","weight":2}]},{"option_id":"c","text":"I'd want to see the policy side — who regulates it and how pricing works","traits":[{"trait":"business_minded","weight":2},{"trait":"strategic","weight":2},{"trait":"analytical","weight":2}]},{"option_id":"d","text":"This doesn't really interest me","traits":[{"trait":"creative","weight":1},{"trait":"communicative","weight":1}]}]},{"question_id":"APT_07","question":"Someone asks you to explain a complex topic to a 12-year-old. What do you do?","type":"single_choice","options":[{"option_id":"a","text":"Use an analogy — compare it to something they already know","traits":[{"trait":"communicative","weight":3},{"trait":"user_empathy","weight":3},{"trait":"storyteller","weight":2}]},{"option_id":"b","text":"Draw a diagram or sketch it out visually","traits":[{"trait":"visual_thinker","weight":3},{"trait":"design_thinking","weight":2},{"trait":"spatial_reasoning","weight":2}]},{"option_id":"c","text":"Walk them through it step-by-step with examples","traits":[{"trait":"structured_thinker","weight":3},{"trait":"patient","weight":3},{"trait":"systematic","weight":2}]},{"option_id":"d","text":"Give them a hands-on activity so they can discover it themselves","traits":[{"trait":"hands_on","weight":3},{"trait":"service_oriented","weight":2},{"trait":"practical","weight":2}]}]},{"question_id":"APT_08","question":"You've noticed: every time it rains, your city's traffic app crashes. What do you do?","type":"single_choice","options":[{"option_id":"a","text":"Try to replicate the bug, isolate the cause and fix the code","traits":[{"trait":"logical","weight":3},{"trait":"coding_enthusiast","weight":2},{"trait":"detail_oriented","weight":3}]},{"option_id":"b","text":"Collect data on rainfall, traffic load and crash logs — and correlate","traits":[{"trait":"data_driven","weight":3},{"trait":"statistical_thinking","weight":3},{"trait":"analytical","weight":2}]},{"option_id":"c","text":"Report it as a public interest story","traits":[{"trait":"investigative","weight":3},{"trait":"socially_aware","weight":2},{"trait":"communicative","weight":2}]},{"option_id":"d","text":"Design a better UX / fallback screen so users aren't confused","traits":[{"trait":"user_centric","weight":3},{"trait":"creative","weight":2},{"trait":"user_empathy","weight":3}]}]},{"question_id":"APT_09","question":"Which of these is closest to how you make decisions?","type":"single_choice","options":[{"option_id":"a","text":"I analyze all options with data and logic before deciding","traits":[{"trait":"analytical","weight":3},{"trait":"disciplined","weight":2},{"trait":"risk_aware","weight":2}]},{"option_id":"b","text":"I go with my gut — fast decisions, course-correct later","traits":[{"trait":"decisive_under_pressure","weight":3},{"trait":"fast_learner","weight":2},{"trait":"innovative","weight":2}]},{"option_id":"c","text":"I consult people I trust, hear multiple perspectives, then decide","traits":[{"trait":"collaborative","weight":3},{"trait":"empathetic","weight":2},{"trait":"service_oriented","weight":2}]},{"option_id":"d","text":"I follow established rules or frameworks — consistency matters","traits":[{"trait":"rule_follower","weight":3},{"trait":"structured_thinker","weight":2},{"trait":"precise","weight":2}]}]},{"question_id":"APT_10","question":"A startup asks you to join. Which role would you naturally gravitate towards?","type":"single_choice","options":[{"option_id":"a","text":"Lead engineer — architect the backend systems","traits":[{"trait":"systems_thinker","weight":3},{"trait":"tech_curious","weight":3},{"trait":"problem_solver","weight":2}]},{"option_id":"b","text":"Product/UX lead — own the user experience end to end","traits":[{"trait":"user_centric","weight":3},{"trait":"user_empathy","weight":3},{"trait":"design_thinking","weight":2}]},{"option_id":"c","text":"Finance/ops lead — manage budgets, unit economics, hiring","traits":[{"trait":"numerical","weight":3},{"trait":"organized","weight":3},{"trait":"strategic_thinker","weight":2}]},{"option_id":"d","text":"Marketing/comms lead — build the brand and audience","traits":[{"trait":"persuasive","weight":3},{"trait":"trend_aware","weight":3},{"trait":"extroverted","weight":2}]}]}]},{"section_id":"personality","section_name":"Personality & Work Style","description":"How you naturally show up in life and work.","icon":"🪞","questions":[{"question_id":"PER_01","question":"Your friends would describe you as someone who…","type":"single_choice","options":[{"option_id":"a","text":"Always has a fix for anything technical or logical","traits":[{"trait":"problem_solver","weight":3},{"trait":"tech_curious","weight":2},{"trait":"logical","weight":2}]},{"option_id":"b","text":"Is incredibly creative and has great aesthetic taste","traits":[{"trait":"creative","weight":3},{"trait":"visual_thinker","weight":3},{"trait":"design_thinking","weight":2}]},{"option_id":"c","text":"Stays calm and thinks clearly even under pressure","traits":[{"trait":"patient","weight":3},{"trait":"decisive_under_pressure","weight":3},{"trait":"structured_thinker","weight":2}]},{"option_id":"d","text":"Is very organized and gets things done on time, every time","traits":[{"trait":"organized","weight":3},{"trait":"disciplined","weight":3},{"trait":"precise","weight":2}]},{"option_id":"e","text":"Lights up any room and makes everyone feel heard","traits":[{"trait":"extroverted","weight":3},{"trait":"social","weight":3},{"trait":"empathetic","weight":2}]}]},{"question_id":"PER_02","question":"How do you feel after spending 3 hours alone working deeply on something?","type":"single_choice","options":[{"option_id":"a","text":"Energized and satisfied — deep focus is my best state","traits":[{"trait":"research_oriented","weight":3},{"trait":"detail_oriented","weight":3},{"trait":"patient","weight":2}]},{"option_id":"b","text":"Accomplished but ready to share and get feedback","traits":[{"trait":"collaborative","weight":3},{"trait":"communicative","weight":2},{"trait":"fast_learner","weight":2}]},{"option_id":"c","text":"Drained — I do my best work in short bursts with breaks","traits":[{"trait":"social","weight":2},{"trait":"extroverted","weight":2},{"trait":"trend_aware","weight":1}]},{"option_id":"d","text":"It depends — great if solving something hard, awful if tedious","traits":[{"trait":"innovative","weight":2},{"trait":"problem_solver","weight":2},{"trait":"analytical","weight":1}]}]},{"question_id":"PER_03","question":"When you're part of a group project, which role do you naturally take?","type":"single_choice","options":[{"option_id":"a","text":"The one who takes charge and divides up the work","traits":[{"trait":"strategic","weight":3},{"trait":"organized","weight":2},{"trait":"decisive_under_pressure","weight":2}]},{"option_id":"b","text":"The one who quietly does the most technical/difficult work","traits":[{"trait":"detail_oriented","weight":3},{"trait":"problem_solver","weight":3},{"trait":"systematic","weight":2}]},{"option_id":"c","text":"The one who makes sure everyone is on the same page","traits":[{"trait":"collaborative","weight":3},{"trait":"empathetic","weight":2},{"trait":"communicative","weight":2}]},{"option_id":"d","text":"The one who comes up with the creative ideas and concepts","traits":[{"trait":"creative","weight":3},{"trait":"innovative","weight":3},{"trait":"design_thinking","weight":2}]}]},{"question_id":"PER_04","question":"How do you feel about following strict rules or standard procedures?","type":"single_choice","options":[{"option_id":"a","text":"I like them — they bring clarity and prevent mistakes","traits":[{"trait":"rule_follower","weight":3},{"trait":"precise","weight":3},{"trait":"disciplined","weight":2}]},{"option_id":"b","text":"I follow them but always look for ways to improve the process","traits":[{"trait":"systematic","weight":2},{"trait":"innovative","weight":2},{"trait":"analytical","weight":2}]},{"option_id":"c","text":"I prefer flexibility — I'll find my own best way to the result","traits":[{"trait":"creative","weight":2},{"trait":"fast_learner","weight":2},{"trait":"practical","weight":2}]},{"option_id":"d","text":"Rules are necessary in medicine/law but I hate bureaucracy","traits":[{"trait":"decisive_under_pressure","weight":2},{"trait":"service_oriented","weight":2},{"trait":"socially_aware","weight":2}]}]},{"question_id":"PER_05","question":"How comfortable are you with uncertainty and ambiguity?","type":"single_choice","options":[{"option_id":"a","text":"Very comfortable — ambiguity is where creativity lives","traits":[{"trait":"innovative","weight":3},{"trait":"curious","weight":3},{"trait":"creative","weight":2}]},{"option_id":"b","text":"Somewhat — I'm okay with it if I have a clear goal","traits":[{"trait":"strategic","weight":2},{"trait":"analytical","weight":2},{"trait":"problem_solver","weight":2}]},{"option_id":"c","text":"Not very — I prefer clear tasks with defined outcomes","traits":[{"trait":"structured_thinker","weight":3},{"trait":"precise","weight":2},{"trait":"organized","weight":2}]},{"option_id":"d","text":"I thrive under pressure but need some data to guide me","traits":[{"trait":"decisive_under_pressure","weight":3},{"trait":"data_driven","weight":2},{"trait":"risk_aware","weight":2}]}]},{"question_id":"PER_06","question":"A friend comes to you in an emotional crisis at midnight. You…","type":"single_choice","options":[{"option_id":"a","text":"Drop everything and listen without judgment until they feel better","traits":[{"trait":"empathetic","weight":3},{"trait":"patient","weight":3},{"trait":"service_oriented","weight":2}]},{"option_id":"b","text":"Listen, then immediately try to help them solve the problem","traits":[{"trait":"problem_solver","weight":2},{"trait":"decisive_under_pressure","weight":2},{"trait":"collaborative","weight":2}]},{"option_id":"c","text":"Ask what they need — listening, advice, or distraction — and do that","traits":[{"trait":"user_empathy","weight":3},{"trait":"service_oriented","weight":3},{"trait":"communicative","weight":2}]},{"option_id":"d","text":"This makes me uncomfortable — I struggle with emotional situations","traits":[{"trait":"technical","weight":1},{"trait":"systematic","weight":1},{"trait":"logical","weight":1}]}]},{"question_id":"PER_07","question":"How do you typically react to a failure or mistake you made?","type":"single_choice","options":[{"option_id":"a","text":"I analyse what went wrong, document it, and make sure it doesn't repeat","traits":[{"trait":"disciplined","weight":3},{"trait":"detail_oriented","weight":3},{"trait":"structured_thinker","weight":2}]},{"option_id":"b","text":"I feel bad briefly, then pivot and try a completely different approach","traits":[{"trait":"fast_learner","weight":3},{"trait":"innovative","weight":2},{"trait":"risk_aware","weight":2}]},{"option_id":"c","text":"I talk it through with someone to gain perspective","traits":[{"trait":"collaborative","weight":3},{"trait":"communicative","weight":2},{"trait":"social","weight":2}]},{"option_id":"d","text":"I stay calm and methodically check where the system/process broke down","traits":[{"trait":"systematic","weight":3},{"trait":"patient","weight":3},{"trait":"precise","weight":2}]}]},{"question_id":"PER_08","question":"You're asked to give a presentation to 200 people next week. You feel…","type":"single_choice","options":[{"option_id":"a","text":"Excited — I love being on stage and commanding an audience","traits":[{"trait":"extroverted","weight":3},{"trait":"persuasive","weight":3},{"trait":"social","weight":2}]},{"option_id":"b","text":"Okay — I'll prepare thoroughly and deliver it well","traits":[{"trait":"organized","weight":3},{"trait":"disciplined","weight":2},{"trait":"structured_thinker","weight":2}]},{"option_id":"c","text":"Nervous but I'll manage — public speaking isn't natural for me","traits":[{"trait":"detail_oriented","weight":2},{"trait":"research_oriented","weight":2},{"trait":"patient","weight":2}]},{"option_id":"d","text":"I'd rather send a detailed written report instead","traits":[{"trait":"precise","weight":2},{"trait":"systematic","weight":2},{"trait":"analytical","weight":2}]}]},{"question_id":"PER_09","question":"Which of these best describes how you spend weekends?","type":"single_choice","options":[{"option_id":"a","text":"Building or tinkering with something — hardware, code, or crafts","traits":[{"trait":"hands_on","weight":3},{"trait":"mechanical_aptitude","weight":2},{"trait":"coding_enthusiast","weight":2}]},{"option_id":"b","text":"Going out, meeting people, attending events","traits":[{"trait":"extroverted","weight":3},{"trait":"social","weight":3},{"trait":"trend_aware","weight":2}]},{"option_id":"c","text":"Reading, researching or consuming content I find interesting","traits":[{"trait":"curious","weight":3},{"trait":"research_oriented","weight":3},{"trait":"analytical","weight":2}]},{"option_id":"d","text":"Outdoor activities — trekking, sports, travel","traits":[{"trait":"outdoor_oriented","weight":3},{"trait":"hands_on","weight":2},{"trait":"practical","weight":2}]}]},{"question_id":"PER_10","question":"Which of these statements feels most true about you?","type":"single_choice","options":[{"option_id":"a","text":"I notice details that most people miss","traits":[{"trait":"detail_oriented","weight":3},{"trait":"precise","weight":3},{"trait":"analytical","weight":2}]},{"option_id":"b","text":"I naturally see the big picture and long-term patterns","traits":[{"trait":"strategic_thinker","weight":3},{"trait":"strategic","weight":3},{"trait":"systems_thinker","weight":2}]},{"option_id":"c","text":"I connect with people quickly and understand what they need","traits":[{"trait":"empathetic","weight":3},{"trait":"user_empathy","weight":3},{"trait":"social","weight":2}]},{"option_id":"d","text":"I learn new things very fast and adapt to any situation","traits":[{"trait":"fast_learner","weight":3},{"trait":"tech_comfortable","weight":3},{"trait":"innovative","weight":2}]}]}]},{"section_id":"values","section_name":"Values & Life Goals","description":"What matters to you most in life and career?","icon":"🎯","questions":[{"question_id":"VAL_01","question":"What's your biggest career goal?","type":"single_choice","options":[{"option_id":"a","text":"Build technology that changes how people live","traits":[{"trait":"innovative","weight":3},{"trait":"tech_curious","weight":3},{"trait":"problem_solver","weight":2}]},{"option_id":"b","text":"Earn high and build financial independence early","traits":[{"trait":"disciplined","weight":2},{"trait":"risk_aware","weight":3},{"trait":"strategic_thinker","weight":2}]},{"option_id":"c","text":"Help people directly — as a doctor, lawyer or social worker","traits":[{"trait":"service_oriented","weight":3},{"trait":"empathetic","weight":3},{"trait":"patient","weight":2}]},{"option_id":"d","text":"Make my mark creatively — in design, media, or storytelling","traits":[{"trait":"creative","weight":3},{"trait":"storyteller","weight":3},{"trait":"visual_thinker","weight":2}]},{"option_id":"e","text":"Build critical infrastructure — power, roads, systems that last","traits":[{"trait":"structured_thinker","weight":3},{"trait":"outdoor_oriented","weight":2},{"trait":"spatial_reasoning","weight":3}]}]},{"question_id":"VAL_02","question":"Which of these means more to you?","type":"single_choice","options":[{"option_id":"a","text":"Being the smartest person in the room (depth of knowledge)","traits":[{"trait":"research_oriented","weight":3},{"trait":"mathematical","weight":2},{"trait":"analytical","weight":2}]},{"option_id":"b","text":"Being the most connected person in the room (breadth of relationships)","traits":[{"trait":"social","weight":3},{"trait":"extroverted","weight":3},{"trait":"collaborative","weight":2}]},{"option_id":"c","text":"Being the person who gets things done (execution)","traits":[{"trait":"practical","weight":3},{"trait":"disciplined","weight":3},{"trait":"decisive_under_pressure","weight":2}]},{"option_id":"d","text":"Being the most creative person in the room (originality)","traits":[{"trait":"creative","weight":3},{"trait":"innovative","weight":3},{"trait":"design_thinking","weight":2}]}]},{"question_id":"VAL_03","question":"How important is job security to you?","type":"single_choice","options":[{"option_id":"a","text":"Very important — a government job or stable career is my priority","traits":[{"trait":"rule_follower","weight":3},{"trait":"disciplined","weight":3},{"trait":"systematic","weight":2}]},{"option_id":"b","text":"Moderately — I want stability but I'm open to opportunity","traits":[{"trait":"organized","weight":2},{"trait":"practical","weight":2},{"trait":"analytical","weight":2}]},{"option_id":"c","text":"Not much — I'd rather take risks for bigger rewards","traits":[{"trait":"risk_aware","weight":3},{"trait":"innovative","weight":2},{"trait":"fast_learner","weight":2}]},{"option_id":"d","text":"I want to build my own business — employment is the safety net","traits":[{"trait":"strategic_thinker","weight":3},{"trait":"business_minded","weight":3},{"trait":"persuasive","weight":2}]}]},{"question_id":"VAL_04","question":"Which of these impacts feels most meaningful to you?","type":"single_choice","options":[{"option_id":"a","text":"Writing a research paper that advances human knowledge","traits":[{"trait":"research_oriented","weight":3},{"trait":"curious","weight":3},{"trait":"mathematical","weight":2}]},{"option_id":"b","text":"Designing a product used by millions of people","traits":[{"trait":"user_centric","weight":3},{"trait":"design_thinking","weight":3},{"trait":"innovative","weight":2}]},{"option_id":"c","text":"Treating 50 patients a day and improving their health","traits":[{"trait":"service_oriented","weight":3},{"trait":"empathetic","weight":3},{"trait":"decisive_under_pressure","weight":2}]},{"option_id":"d","text":"Breaking a news story that changes public policy","traits":[{"trait":"investigative","weight":3},{"trait":"socially_aware","weight":3},{"trait":"communicative","weight":2}]},{"option_id":"e","text":"Building infrastructure that a city uses for 100 years","traits":[{"trait":"structured_thinker","weight":3},{"trait":"precision_focused","weight":3},{"trait":"outdoor_oriented","weight":2}]}]},{"question_id":"VAL_05","question":"Which value resonates with you most strongly?","type":"single_choice","options":[{"option_id":"a","text":"Precision and accuracy — doing things right the first time","traits":[{"trait":"precise","weight":3},{"trait":"detail_oriented","weight":3},{"trait":"rule_follower","weight":2}]},{"option_id":"b","text":"Curiosity and learning — constantly growing and discovering","traits":[{"trait":"curious","weight":3},{"trait":"fast_learner","weight":3},{"trait":"innovative","weight":2}]},{"option_id":"c","text":"Connection and community — building strong relationships","traits":[{"trait":"social","weight":3},{"trait":"collaborative","weight":3},{"trait":"empathetic","weight":2}]},{"option_id":"d","text":"Impact and scale — making a big difference in the world","traits":[{"trait":"service_oriented","weight":3},{"trait":"strategic","weight":2},{"trait":"socially_aware","weight":2}]}]},{"question_id":"VAL_06","question":"What do you want people to say about you at the end of your career?","type":"single_choice","options":[{"option_id":"a","text":"\"She/He was the best engineer/scientist in the field\"","traits":[{"trait":"technical","weight":3},{"trait":"precision_focused","weight":2},{"trait":"math_oriented","weight":2}]},{"option_id":"b","text":"\"She/He built systems that millions of people rely on\"","traits":[{"trait":"systems_thinker","weight":3},{"trait":"problem_solver","weight":3},{"trait":"strategic","weight":2}]},{"option_id":"c","text":"\"She/He truly cared about people and made their lives better\"","traits":[{"trait":"service_oriented","weight":3},{"trait":"empathetic","weight":3},{"trait":"patient","weight":2}]},{"option_id":"d","text":"\"She/He was a visionary — ahead of their time\"","traits":[{"trait":"innovative","weight":3},{"trait":"research_oriented","weight":2},{"trait":"data_driven","weight":2}]},{"option_id":"e","text":"\"She/He told stories that changed how people think\"","traits":[{"trait":"storyteller","weight":3},{"trait":"socially_aware","weight":2},{"trait":"communicative","weight":3}]}]},{"question_id":"VAL_07","question":"Which trade-off would you make?","type":"single_choice","options":[{"option_id":"a","text":"Lower salary but work that genuinely helps people","traits":[{"trait":"service_oriented","weight":3},{"trait":"empathetic","weight":2},{"trait":"patient","weight":2}]},{"option_id":"b","text":"Higher stress but cutting-edge, exciting work","traits":[{"trait":"decisive_under_pressure","weight":3},{"trait":"innovative","weight":2},{"trait":"tech_curious","weight":2}]},{"option_id":"c","text":"Stable income doing predictable, reliable work","traits":[{"trait":"disciplined","weight":3},{"trait":"systematic","weight":3},{"trait":"rule_follower","weight":2}]},{"option_id":"d","text":"High earnings doing financially complex work","traits":[{"trait":"numerical","weight":3},{"trait":"risk_aware","weight":3},{"trait":"strategic_thinker","weight":2}]}]},{"question_id":"VAL_08","question":"Which statement best reflects your relationship with technology?","type":"single_choice","options":[{"option_id":"a","text":"I want to build technology — I think in code and systems","traits":[{"trait":"tech_curious","weight":3},{"trait":"coding_enthusiast","weight":3},{"trait":"systems_thinker","weight":2}]},{"option_id":"b","text":"I use technology as a creative medium — design, content, media","traits":[{"trait":"tech_comfortable","weight":3},{"trait":"tech_savvy","weight":3},{"trait":"creative","weight":2}]},{"option_id":"c","text":"Technology is a tool — useful but not my passion","traits":[{"trait":"practical","weight":3},{"trait":"hands_on","weight":2},{"trait":"outdoor_oriented","weight":2}]},{"option_id":"d","text":"I'm interested in the hardware and electronics side of technology","traits":[{"trait":"hardware_oriented","weight":3},{"trait":"electronics_curious","weight":3},{"trait":"technical","weight":2}]}]},{"question_id":"VAL_09","question":"In 10 years, where do you see yourself?","type":"single_choice","options":[{"option_id":"a","text":"Running my own company or leading a major team","traits":[{"trait":"strategic","weight":3},{"trait":"business_minded","weight":3},{"trait":"decisive_under_pressure","weight":2}]},{"option_id":"b","text":"As a deep domain expert — the go-to person in my field","traits":[{"trait":"research_oriented","weight":3},{"trait":"curious","weight":2},{"trait":"mathematical","weight":2}]},{"option_id":"c","text":"In a role where I interact with and help people every day","traits":[{"trait":"service_oriented","weight":3},{"trait":"communicative","weight":2},{"trait":"empathetic","weight":2}]},{"option_id":"d","text":"Doing creative work that I'm proud of","traits":[{"trait":"creative","weight":3},{"trait":"visual_thinker","weight":2},{"trait":"storyteller","weight":2}]}]},{"question_id":"VAL_10","question":"What would make you quit a job that pays well?","type":"single_choice","options":[{"option_id":"a","text":"The work is ethically wrong or harms people","traits":[{"trait":"service_oriented","weight":3},{"trait":"socially_aware","weight":3},{"trait":"empathetic","weight":2}]},{"option_id":"b","text":"There's nothing to learn — I've stopped growing","traits":[{"trait":"curious","weight":3},{"trait":"fast_learner","weight":3},{"trait":"innovative","weight":2}]},{"option_id":"c","text":"The work is too repetitive — I need creative challenge","traits":[{"trait":"creative","weight":3},{"trait":"design_thinking","weight":2},{"trait":"trend_aware","weight":2}]},{"option_id":"d","text":"I'm not making enough impact or building enough depth","traits":[{"trait":"strategic","weight":3},{"trait":"research_oriented","weight":2},{"trait":"analytical","weight":2}]}]}]}]};

const ALL_QUESTIONS = PSYCHOMETRIC_DATA.sections.flatMap(s =>
  s.questions.map(q => ({ ...q, section_id: s.section_id, section_name: s.section_name, section_icon: s.icon }))
);
const TOTAL = ALL_QUESTIONS.length;

function computeResults(answers) {
  const traitScores = {};
  Object.entries(answers).forEach(([qid, optId]) => {
    const q = ALL_QUESTIONS.find(q => q.question_id === qid);
    if (!q) return;
    const opt = q.options.find(o => o.option_id === optId);
    if (!opt) return;
    opt.traits.forEach(({ trait, weight }) => {
      traitScores[trait] = (traitScores[trait] || 0) + weight;
    });
  });

  const scored = Object.entries(SPEC_MAP).map(([sid, spec]) => {
    const score = spec.psychometric_traits.reduce((sum, t) => sum + (traitScores[t] || 0), 0);
    return { ...spec, score };
  });

  const maxScore = Math.max(...scored.map(s => s.score));
  const withPct = scored.map(s => ({ ...s, pct: maxScore > 0 ? Math.round((s.score / maxScore) * 100) : 0 }));
  return withPct.sort((a, b) => b.score - a.score).slice(0, 5);
}

const COURSE_COLORS = {
  btech: "#1D9E75", bca: "#378ADD", bba: "#BA7517", llb: "#D85A30",
  bcom: "#7F77DD", bsc: "#1D9E75", bdes: "#D4537E", bjmc: "#888780", mbbs: "#E24B4A"
};
const SECTION_COLORS = { interest: "#1D9E75", aptitude: "#378ADD", personality: "#7F77DD", values: "#BA7517" };

export default function PsychometricTest() {
  const [screen, setScreen] = useState("welcome");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const topRef = useRef(null);

  const q = ALL_QUESTIONS[currentIdx];
  const answered = answers[q?.question_id];
  const progress = (Object.keys(answers).length / TOTAL) * 100;

  const sectionBreaks = [0, 10, 20, 30];
  const currentSection = PSYCHOMETRIC_DATA.sections.find(s => s.section_id === q?.section_id);

  useEffect(() => {
    setAnimKey(k => k + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentIdx]);

  const handleSelect = (optId) => {
    setAnswers(prev => ({ ...prev, [q.question_id]: optId }));
  };

  const handleNext = () => {
    if (currentIdx < TOTAL - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      const r = computeResults(answers);
      setResults(r);
      setScreen("results");
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1);
  };

  const restart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setResults(null);
    setScreen("welcome");
  };

  if (screen === "welcome") return <Welcome onStart={() => setScreen("test")} />;
  if (screen === "results") return <Results results={results} onRestart={restart} />;

  const isNewSection = sectionBreaks.includes(currentIdx);

  return (
    <div ref={topRef} style={{ fontFamily: "var(--font-sans)", maxWidth: 680, margin: "0 auto", padding: "1.5rem 1rem" }}>
      {/* Progress bar */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 500 }}>
            {currentSection?.icon} {currentSection?.section_name}
          </span>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            {currentIdx + 1} / {TOTAL}
          </span>
        </div>
        <div style={{ height: 4, background: "var(--color-background-secondary)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: SECTION_COLORS[q.section_id],
            width: `${((currentIdx + 1) / TOTAL) * 100}%`,
            transition: "width 0.3s ease"
          }} />
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
          {PSYCHOMETRIC_DATA.sections.map((sec, i) => (
            <div key={sec.section_id} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: sec.section_id === q.section_id
                ? SECTION_COLORS[sec.section_id]
                : (sectionBreaks[i] <= currentIdx ? SECTION_COLORS[sec.section_id] + "55" : "var(--color-border-tertiary)")
            }} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div key={animKey} style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1.5rem",
        marginBottom: "1rem"
      }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: SECTION_COLORS[q.section_id], textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.75rem" }}>
          Question {currentIdx + 1}
        </p>
        <p style={{ fontSize: 17, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 1.5rem", lineHeight: 1.5 }}>
          {q.question}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map(opt => {
            const sel = answered === opt.option_id;
            return (
              <button key={opt.option_id} onClick={() => handleSelect(opt.option_id)} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 14px",
                background: sel ? SECTION_COLORS[q.section_id] + "12" : "var(--color-background-secondary)",
                border: sel ? `1.5px solid ${SECTION_COLORS[q.section_id]}` : "0.5px solid var(--color-border-tertiary)",
                borderRadius: "var(--border-radius-md)",
                cursor: "pointer", textAlign: "left",
                transition: "all 0.15s ease"
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  border: sel ? `2px solid ${SECTION_COLORS[q.section_id]}` : "1.5px solid var(--color-border-secondary)",
                  background: sel ? SECTION_COLORS[q.section_id] : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 1
                }}>
                  {sel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                </div>
                <span style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.55, fontWeight: sel ? 500 : 400 }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        {currentIdx > 0 && (
          <button onClick={handleBack} style={{
            padding: "10px 20px", borderRadius: "var(--border-radius-md)",
            border: "0.5px solid var(--color-border-secondary)", background: "transparent",
            color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer"
          }}>Back</button>
        )}
        <button onClick={handleNext} disabled={!answered} style={{
          flex: 1, padding: "11px 20px", borderRadius: "var(--border-radius-md)",
          border: "none", fontSize: 14, fontWeight: 500, cursor: answered ? "pointer" : "not-allowed",
          background: answered ? SECTION_COLORS[q.section_id] : "var(--color-background-secondary)",
          color: answered ? "white" : "var(--color-text-tertiary)",
          transition: "all 0.15s ease"
        }}>
          {currentIdx === TOTAL - 1 ? "See my results" : "Next question"}
        </button>
      </div>
    </div>
  );
}

function Welcome({ onStart }) {
  const sections = PSYCHOMETRIC_DATA.sections;
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 600, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>EduGuide</p>
        <h1 style={{ fontSize: 26, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 0.5rem", lineHeight: 1.3 }}>
          Career Psychometric Test
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
          40 questions across 4 sections. Takes about 10–12 minutes. At the end, you'll get your top specialization matches — not just a course, but the exact branch that fits who you are.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.5rem" }}>
        {sections.map(sec => (
          <div key={sec.section_id} style={{
            background: "var(--color-background-secondary)",
            border: "0.5px solid var(--color-border-tertiary)",
            borderRadius: "var(--border-radius-md)",
            padding: "14px 16px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{sec.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>{sec.section_name}</span>
            </div>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>{sec.description}</p>
            <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "6px 0 0", fontWeight: 500 }}>10 questions</p>
          </div>
        ))}
      </div>

      <div style={{
        background: "var(--color-background-secondary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-md)",
        padding: "14px 16px", marginBottom: "1.5rem"
      }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 6px" }}>How scoring works</p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>
          Each option maps to career-relevant traits with weighted scores. Your answers are matched against 19 specializations across 9 courses — covering B.Tech, BCA, BBA, B.Com, LLB, B.Sc, B.Des, BJMC, and MBBS.
        </p>
      </div>

      <button onClick={onStart} style={{
        width: "100%", padding: "13px", borderRadius: "var(--border-radius-md)",
        border: "none", background: "#1D9E75", color: "white",
        fontSize: 15, fontWeight: 500, cursor: "pointer"
      }}>
        Start the test
      </button>
    </div>
  );
}

function Results({ results, onRestart }) {
  const [expanded, setExpanded] = useState(0);
  const top = results[0];

  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 640, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>Your results</p>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 0.25rem" }}>Top specialization matches</h2>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 1.5rem" }}>Based on your answers across all 4 sections</p>

      {/* Top match highlight */}
      <div style={{
        background: "var(--color-background-primary)",
        border: `2px solid ${COURSE_COLORS[top.course_id] || "#1D9E75"}`,
        borderRadius: "var(--border-radius-lg)",
        padding: "1.25rem",
        marginBottom: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 500, padding: "3px 10px",
            borderRadius: "var(--border-radius-md)",
            background: (COURSE_COLORS[top.course_id] || "#1D9E75") + "18",
            color: COURSE_COLORS[top.course_id] || "#1D9E75"
          }}>Best match</span>
          <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{top.pct}% fit</span>
        </div>
        <p style={{ fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>{top.specialization_name}</p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 12px" }}>{top.course_name}</p>

        <div style={{ height: 6, background: "var(--color-background-secondary)", borderRadius: 3, marginBottom: 12 }}>
          <div style={{ height: "100%", borderRadius: 3, width: `${top.pct}%`, background: COURSE_COLORS[top.course_id] || "#1D9E75" }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>Your matched traits</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {top.psychometric_traits.map(t => (
              <span key={t} style={{
                fontSize: 12, padding: "3px 10px",
                borderRadius: "var(--border-radius-md)",
                background: "var(--color-background-secondary)",
                border: "0.5px solid var(--color-border-tertiary)",
                color: "var(--color-text-secondary)"
              }}>{t.replace(/_/g, " ")}</span>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>Career paths</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {top.career_paths.map(cp => (
              <span key={cp} style={{
                fontSize: 12, padding: "3px 10px",
                borderRadius: "var(--border-radius-md)",
                background: (COURSE_COLORS[top.course_id] || "#1D9E75") + "10",
                border: `0.5px solid ${(COURSE_COLORS[top.course_id] || "#1D9E75")}40`,
                color: COURSE_COLORS[top.course_id] || "#1D9E75"
              }}>{cp}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Other matches */}
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>Other strong matches</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
        {results.slice(1).map((spec, i) => {
          const color = COURSE_COLORS[spec.course_id] || "#888";
          const isOpen = expanded === i + 1;
          return (
            <div key={spec.specialization_id} style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-md)",
              overflow: "hidden"
            }}>
              <button onClick={() => setExpanded(isOpen ? -1 : i + 1)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left"
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{spec.specialization_name}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "2px 0 0" }}>{spec.course_name}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color }}>{spec.pct}%</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{isOpen ? "▲" : "▼"}</span>
              </button>

              <div style={{ height: 3, background: "var(--color-background-secondary)" }}>
                <div style={{ height: "100%", width: `${spec.pct}%`, background: color, transition: "width 0.4s ease" }} />
              </div>

              {isOpen && (
                <div style={{ padding: "12px 14px", borderTop: "0.5px solid var(--color-border-tertiary)" }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>Traits</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {spec.psychometric_traits.map(t => (
                      <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)" }}>
                        {t.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>Career paths</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {spec.career_paths.map(cp => (
                      <span key={cp} style={{ fontSize: 11, padding: "2px 8px", borderRadius: "var(--border-radius-md)", background: color + "10", border: `0.5px solid ${color}40`, color }}>{cp}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button onClick={onRestart} style={{
        width: "100%", padding: "11px", borderRadius: "var(--border-radius-md)",
        border: "0.5px solid var(--color-border-secondary)", background: "transparent",
        color: "var(--color-text-secondary)", fontSize: 14, cursor: "pointer"
      }}>Retake the test</button>
    </div>
  );
}
