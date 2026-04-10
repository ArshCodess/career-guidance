'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
 
import {
    Code, Database, Bot, Globe, Gamepad2, Shield,
    FlaskConical, Palette, TrendingUp, Wrench,
    ArrowLeft, ArrowRight, Star, BookOpen, Users,
    DollarSign, Target, Clock, Award, MapPin,
    CheckCircle, Circle, ChevronRight, Heart,
    PenTool, Cpu, Music, Landmark, Briefcase,
    HeartPulse, Calculator, Zap, Microscope,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

/* ─── Types ──────────────────────────────────────────────── */
interface CareerPath {
    id: string;
    title: string;
    stream: string;
    degree_required: string;
    description: string;
    preparation_for: string[];
    job_opportunities: string[];
    salary_range?: string;
    growth_rate?: string;
    difficulty?: string;
}

interface RoadmapStep {
    phase: string;
    duration: string;
    activities: string[];
    skills: string[];
    milestones: string[];
}

interface CareerRoadmap {
    careerId: string;
    overview: string;
    keySkills: string[];
    roadmap: RoadmapStep[];
    salaryProgression: { level: string; range: string; experience: string }[];
    jobTitles: string[];
    preparationTips: string[];
    resources: string[];
}

/* ─── Static fallback data (shown when DB is empty / loading) */
const FALLBACK: Record<string, CareerPath[]> = {
    Science: [
        { id: '1', title: 'Software Developer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Build software applications and systems', preparation_for: ['GATE', 'Private IT Firms', 'Startups'], job_opportunities: ['Google', 'Infosys', 'TCS'], salary_range: '₹6-15 LPA', growth_rate: 'High', difficulty: 'Medium' },
        { id: '2', title: 'Data Scientist', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Analyse large datasets to derive insights', preparation_for: ['M.Sc.', 'Private Firms', 'Govt. Research'], job_opportunities: ['Amazon', 'Flipkart', 'ISRO'], salary_range: '₹8-20 LPA', growth_rate: 'Very High', difficulty: 'Hard' },
        { id: '3', title: 'Artificial Intelligence Engineer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Design AI/ML systems and models', preparation_for: ['GATE', 'IIT-JAM', 'Tech Companies'], job_opportunities: ['Microsoft', 'OpenAI', 'DeepMind'], salary_range: '₹10-25 LPA', growth_rate: 'Very High', difficulty: 'Hard' },
        { id: '4', title: 'Web Developer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Build responsive websites and web apps', preparation_for: ['GATE', 'IT Companies', 'Startups'], job_opportunities: ['Wipro', 'HCL', 'Freelance'], salary_range: '₹4-12 LPA', growth_rate: 'High', difficulty: 'Easy' },
        { id: '5', title: 'Game Developer', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Create video games for multiple platforms', preparation_for: ['GATE', 'Game Studios', 'Indie Dev'], job_opportunities: ['Ubisoft', 'EA', 'Rockstar'], salary_range: '₹5-18 LPA', growth_rate: 'High', difficulty: 'Medium' },
        { id: '6', title: 'Cybersecurity Analyst', stream: 'Science', degree_required: 'B.Sc. Computer Science', description: 'Protect systems from digital threats', preparation_for: ['GATE', 'DRDO', 'Tech Firms'], job_opportunities: ['ISRO', 'NIC', 'Cisco'], salary_range: '₹7-16 LPA', growth_rate: 'High', difficulty: 'Medium' },
    ],
    Arts: [
        { id: '7', title: 'Graphic Designer', stream: 'Arts', degree_required: 'B.F.A.', description: 'Create visual content for brands', preparation_for: ['Design Agencies', 'Ad Firms', 'Freelance'], job_opportunities: ['WPP', 'Ogilvy', 'Publicis'], salary_range: '₹3-10 LPA', growth_rate: 'Medium', difficulty: 'Easy' },
        { id: '8', title: 'Content Writer', stream: 'Arts', degree_required: 'B.A. English', description: 'Craft engaging written content', preparation_for: ['Media Houses', 'Publishing', 'Digital'], job_opportunities: ['HarperCollins', 'TOI', 'BuzzFeed'], salary_range: '₹3-8 LPA', growth_rate: 'Medium', difficulty: 'Easy' },
        { id: '9', title: 'Film Director', stream: 'Arts', degree_required: 'B.F.A.', description: 'Direct films and visual narratives', preparation_for: ['FTII', 'Film Studios', 'OTT'], job_opportunities: ['Bollywood', 'Netflix', 'Amazon Prime'], salary_range: '₹5-50 LPA', growth_rate: 'High', difficulty: 'Hard' },
        { id: '10', title: 'UX Designer', stream: 'Arts', degree_required: 'B.Des', description: 'Design user-centred digital experiences', preparation_for: ['Design Bootcamps', 'Tech Firms', 'Agencies'], job_opportunities: ['Google', 'Swiggy', 'Zomato'], salary_range: '₹6-15 LPA', growth_rate: 'High', difficulty: 'Medium' },
        { id: '11', title: 'Journalist', stream: 'Arts', degree_required: 'B.A. Journalism', description: 'Report and investigate news stories', preparation_for: ['IIMC', 'Media Houses', 'Freelance'], job_opportunities: ['NDTV', 'The Hindu', 'Reuters'], salary_range: '₹3-12 LPA', growth_rate: 'Medium', difficulty: 'Medium' },
        { id: '12', title: 'Musician', stream: 'Arts', degree_required: 'B.Music', description: 'Compose and perform music professionally', preparation_for: ['Music Labels', 'Film Industry', 'Teaching'], job_opportunities: ['T-Series', 'Sony Music', 'Spotify'], salary_range: '₹2-20 LPA', growth_rate: 'Medium', difficulty: 'Medium' },
    ],
    Commerce: [
        { id: '13', title: 'Chartered Accountant', stream: 'Commerce', degree_required: 'B.Com', description: 'Manage accounts, audits and taxation', preparation_for: ['CA Exams', 'Big 4 Firms', 'Govt'], job_opportunities: ['Deloitte', 'KPMG', 'EY'], salary_range: '₹8-25 LPA', growth_rate: 'Very High', difficulty: 'Hard' },
        { id: '14', title: 'Investment Banker', stream: 'Commerce', degree_required: 'BBA', description: 'Manage large financial transactions', preparation_for: ['MBA Finance', 'SEBI', 'Banks'], job_opportunities: ['Goldman Sachs', 'JP Morgan', 'HDFC'], salary_range: '₹12-50 LPA', growth_rate: 'Very High', difficulty: 'Hard' },
        { id: '15', title: 'Marketing Manager', stream: 'Commerce', degree_required: 'BBA', description: 'Drive brand growth and campaigns', preparation_for: ['MBA Marketing', 'Agencies', 'FMCG'], job_opportunities: ['HUL', 'P&G', 'Nestle'], salary_range: '₹8-20 LPA', growth_rate: 'High', difficulty: 'Medium' },
        { id: '16', title: 'Entrepreneur', stream: 'Commerce', degree_required: 'BBA', description: 'Build and scale your own business', preparation_for: ['Startup Incubators', 'VC Funding', 'IIM'], job_opportunities: ['Own Startup', 'Accelerators', 'CXO Roles'], salary_range: '₹0-100 LPA', growth_rate: 'Very High', difficulty: 'Hard' },
        { id: '17', title: 'Financial Analyst', stream: 'Commerce', degree_required: 'B.Com', description: 'Analyse financial data and investments', preparation_for: ['CFA', 'SEBI', 'Mutual Funds'], job_opportunities: ['Motilal Oswal', 'Zerodha', 'ICICI'], salary_range: '₹6-18 LPA', growth_rate: 'High', difficulty: 'Medium' },
        { id: '18', title: 'HR Manager', stream: 'Commerce', degree_required: 'BBA', description: 'Manage talent and organisational culture', preparation_for: ['MBA HR', 'Corporates', 'Consulting'], job_opportunities: ['Infosys', 'TCS', 'Accenture'], salary_range: '₹7-15 LPA', growth_rate: 'High', difficulty: 'Medium' },
    ],
    Vocational: [
        { id: '19', title: 'Electrician', stream: 'Vocational', degree_required: 'ITI', description: 'Install and maintain electrical systems', preparation_for: ['NSDC Exams', 'PSUs', 'Contracting'], job_opportunities: ['BSNL', 'NTPC', 'Construction'], salary_range: '₹2-6 LPA', growth_rate: 'Medium', difficulty: 'Easy' },
        { id: '20', title: 'Chef', stream: 'Vocational', degree_required: 'Hotel Management', description: 'Create culinary experiences in hospitality', preparation_for: ['Hotel Chains', 'Restaurants', 'Catering'], job_opportunities: ['Taj Hotels', 'ITC', 'Marriott'], salary_range: '₹3-12 LPA', growth_rate: 'Medium', difficulty: 'Medium' },
        { id: '21', title: 'Nursing Assistant', stream: 'Vocational', degree_required: 'GNM', description: 'Provide patient care in healthcare settings', preparation_for: ['Hospitals', 'Clinics', 'NGOs'], job_opportunities: ['AIIMS', 'Apollo', 'Fortis'], salary_range: '₹2-5 LPA', growth_rate: 'Medium', difficulty: 'Easy' },
        { id: '22', title: 'Automobile Technician', stream: 'Vocational', degree_required: 'ITI', description: 'Service and repair vehicles', preparation_for: ['NSDC', 'Auto Companies', 'Dealerships'], job_opportunities: ['Maruti', 'Tata Motors', 'Bosch'], salary_range: '₹2-7 LPA', growth_rate: 'Medium', difficulty: 'Easy' },
        { id: '23', title: 'Fashion Designer', stream: 'Vocational', degree_required: 'NIFT', description: 'Design clothing and fashion collections', preparation_for: ['NIFT Exam', 'Fashion Houses', 'Retail'], job_opportunities: ['Fab India', 'Myntra', 'Freelance'], salary_range: '₹3-15 LPA', growth_rate: 'High', difficulty: 'Medium' },
        { id: '24', title: 'Photographer', stream: 'Vocational', degree_required: 'Mass Media', description: 'Capture professional photography', preparation_for: ['Journalism', 'Agencies', 'Events'], job_opportunities: ['Getty Images', 'News Agencies', 'Freelance'], salary_range: '₹2-10 LPA', growth_rate: 'Medium', difficulty: 'Easy' },
    ],
};

/* ─── Icon map ───────────────────────────────────────────── */
const ICON_MAP: Record<string, any> = {
    'Software Developer': Code,
    'Data Scientist': Database,
    'Artificial Intelligence Engineer': Bot,
    'Web Developer': Globe,
    'Game Developer': Gamepad2,
    'Cybersecurity Analyst': Shield,
    'Graphic Designer': PenTool,
    'Content Writer': BookOpen,
    'Film Director': Zap,
    'UX Designer': Cpu,
    'Journalist': Globe,
    'Musician': Music,
    'Chartered Accountant': Calculator,
    'Investment Banker': Landmark,
    'Marketing Manager': TrendingUp,
    'Entrepreneur': Briefcase,
    'Financial Analyst': TrendingUp,
    'HR Manager': Briefcase,
    'Electrician': Wrench,
    'Chef': Zap,
    'Nursing Assistant': HeartPulse,
    'Automobile Technician': Wrench,
    'Fashion Designer': Palette,
    'Photographer': Cpu,
};

/* ─── Comprehensive Career Roadmaps ─────────────────────── */
const CAREER_ROADMAPS: Record<string, CareerRoadmap> = {
    '1': { // Software Developer
        careerId: '1',
        overview: 'A software developer designs, develops, and maintains software applications. This career offers excellent growth opportunities in the rapidly evolving tech industry.',
        keySkills: ['Programming Languages (Java, Python, JavaScript)', 'Data Structures & Algorithms', 'Database Management', 'Version Control (Git)', 'Problem Solving', 'Agile/Scrum', 'API Development', 'Testing & Debugging'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete B.Sc. Computer Science degree', 'Learn basic programming (C, Java)', 'Build small projects', 'Participate in coding competitions'],
                skills: ['Basic Programming', 'Problem Solving', 'Mathematics'],
                milestones: ['Complete degree with good grades', 'Build 5+ personal projects', 'Learn 2 programming languages']
            },
            {
                phase: 'Skill Development (Years 3-4)',
                duration: '2 years',
                activities: ['Master data structures & algorithms', 'Learn web development (HTML, CSS, JS)', 'Contribute to open source', 'Complete internships', 'Learn database management'],
                skills: ['DSA', 'Web Development', 'SQL', 'Git', 'Linux'],
                milestones: ['Complete 2 internships', 'Contribute to 3+ open source projects', 'Build full-stack applications']
            },
            {
                phase: 'Professional Growth (Years 5-7)',
                duration: '3 years',
                activities: ['Join a tech company', 'Work on complex projects', 'Learn advanced frameworks', 'Mentor junior developers', 'Pursue certifications'],
                skills: ['System Design', 'Cloud Computing', 'Microservices', 'Leadership'],
                milestones: ['Get promoted to Senior Developer', 'Lead a team/project', 'Earn industry certifications']
            },
            {
                phase: 'Expertise & Leadership (Years 8+)',
                duration: 'Ongoing',
                activities: ['Specialize in a domain', 'Take leadership roles', 'Contribute to architecture decisions', 'Mentor and train teams'],
                skills: ['Architecture Design', 'Team Management', 'Strategic Planning'],
                milestones: ['Become Tech Lead/Architect', 'Start own consultancy', 'Speak at conferences']
            }
        ],
        salaryProgression: [
            { level: 'Junior Developer', range: '₹4-6 LPA', experience: '0-2 years' },
            { level: 'Developer', range: '₹6-10 LPA', experience: '2-4 years' },
            { level: 'Senior Developer', range: '₹10-18 LPA', experience: '4-7 years' },
            { level: 'Tech Lead', range: '₹18-30 LPA', experience: '7+ years' }
        ],
        jobTitles: ['Junior Developer', 'Software Developer', 'Senior Developer', 'Tech Lead', 'Software Architect', 'Engineering Manager'],
        preparationTips: [
            'Focus on building strong fundamentals in programming',
            'Practice coding problems daily on platforms like LeetCode',
            'Build real-world projects and maintain a GitHub portfolio',
            'Network with professionals on LinkedIn',
            'Stay updated with latest technologies and trends'
        ],
        resources: [
            'LeetCode, HackerRank for coding practice',
            'freeCodeCamp, MDN Web Docs',
            'GitHub for project hosting',
            'Coursera, Udemy for courses',
            'Stack Overflow for problem solving'
        ]
    },
    '2': { // Data Scientist
        careerId: '2',
        overview: 'Data scientists extract insights from complex datasets to drive business decisions. This role combines statistics, programming, and domain expertise.',
        keySkills: ['Python/R Programming', 'Statistics & Mathematics', 'Machine Learning', 'Data Visualization', 'SQL', 'Big Data Tools', 'Deep Learning', 'Business Intelligence'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete B.Sc. degree', 'Learn Python/R basics', 'Study statistics & probability', 'Work with small datasets'],
                skills: ['Basic Programming', 'Statistics', 'Mathematics'],
                milestones: ['Complete degree', 'Build basic data analysis projects', 'Learn statistical concepts']
            },
            {
                phase: 'Technical Skills (Years 3-4)',
                duration: '2 years',
                activities: ['Master machine learning algorithms', 'Learn data visualization', 'Work with big data tools', 'Complete data science projects'],
                skills: ['ML Algorithms', 'Data Viz', 'SQL', 'Python Libraries'],
                milestones: ['Build ML models', 'Complete Kaggle competitions', 'Work on real datasets']
            },
            {
                phase: 'Professional Development (Years 5-7)',
                duration: '3 years',
                activities: ['Join data science teams', 'Work on complex problems', 'Learn advanced ML techniques', 'Present insights to stakeholders'],
                skills: ['Advanced ML', 'Business Acumen', 'Communication'],
                milestones: ['Lead data projects', 'Get domain expertise', 'Publish research/findings']
            },
            {
                phase: 'Leadership (Years 8+)',
                duration: 'Ongoing',
                activities: ['Lead data science teams', 'Drive AI initiatives', 'Consult on data strategy', 'Mentor junior data scientists'],
                skills: ['Leadership', 'Strategy', 'Team Management'],
                milestones: ['Become Chief Data Officer', 'Start data consultancy', 'Speak at industry conferences']
            }
        ],
        salaryProgression: [
            { level: 'Junior Data Analyst', range: '₹5-8 LPA', experience: '0-2 years' },
            { level: 'Data Scientist', range: '₹8-15 LPA', experience: '2-5 years' },
            { level: 'Senior Data Scientist', range: '₹15-25 LPA', experience: '5-8 years' },
            { level: 'Principal Data Scientist', range: '₹25-40 LPA', experience: '8+ years' }
        ],
        jobTitles: ['Data Analyst', 'Data Scientist', 'Senior Data Scientist', 'Data Science Manager', 'Chief Data Officer'],
        preparationTips: [
            'Build strong foundation in statistics and mathematics',
            'Practice on Kaggle and participate in competitions',
            'Learn both theory and practical implementation',
            'Understand business context behind data problems',
            'Develop storytelling skills to communicate insights'
        ],
        resources: [
            'Kaggle for competitions and datasets',
            'Coursera Data Science specialization',
            'Towards Data Science blog',
            'Scikit-learn, TensorFlow documentation',
            'SQLZoo, Mode Analytics for SQL practice'
        ]
    },
    '3': { // AI Engineer
        careerId: '3',
        overview: 'AI engineers design and implement artificial intelligence systems, focusing on machine learning, deep learning, and intelligent automation.',
        keySkills: ['Python Programming', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP', 'MLOps', 'Cloud AI Services'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete CS degree', 'Learn Python programming', 'Study linear algebra & calculus', 'Build basic ML models'],
                skills: ['Python', 'Mathematics', 'Basic ML'],
                milestones: ['Complete degree', 'Build classification/regression models', 'Understand ML theory']
            },
            {
                phase: 'Specialization (Years 3-4)',
                duration: '2 years',
                activities: ['Master deep learning frameworks', 'Learn computer vision & NLP', 'Work on AI projects', 'Contribute to research'],
                skills: ['TensorFlow/PyTorch', 'CNNs/RNNs', 'Transformers', 'Research'],
                milestones: ['Build complex AI models', 'Publish research papers', 'Complete AI internships']
            },
            {
                phase: 'Professional Growth (Years 5-7)',
                duration: '3 years',
                activities: ['Join AI teams at tech companies', 'Deploy AI systems at scale', 'Research new AI techniques', 'Lead AI projects'],
                skills: ['MLOps', 'System Design', 'Leadership'],
                milestones: ['Deploy production AI systems', 'Lead AI initiatives', 'Get patents/publications']
            },
            {
                phase: 'Expertise (Years 8+)',
                duration: 'Ongoing',
                activities: ['Drive AI strategy', 'Lead AI research teams', 'Consult for enterprises', 'Innovate new AI applications'],
                skills: ['AI Strategy', 'Innovation', 'Executive Leadership'],
                milestones: ['Become AI Director/VP', 'Start AI company', 'Shape AI industry standards']
            }
        ],
        salaryProgression: [
            { level: 'AI/ML Engineer', range: '₹8-15 LPA', experience: '0-3 years' },
            { level: 'Senior AI Engineer', range: '₹15-25 LPA', experience: '3-6 years' },
            { level: 'Principal AI Engineer', range: '₹25-40 LPA', experience: '6-10 years' },
            { level: 'AI Director/VP', range: '₹40-80 LPA', experience: '10+ years' }
        ],
        jobTitles: ['AI Engineer', 'Machine Learning Engineer', 'Deep Learning Engineer', 'AI Research Scientist', 'AI Director'],
        preparationTips: [
            'Focus on mathematics (linear algebra, calculus, probability)',
            'Build projects with real datasets',
            'Stay updated with latest research papers',
            'Learn both theory and practical implementation',
            'Network with AI researchers and practitioners'
        ],
        resources: [
            'Papers with Code for latest research',
            'Fast.ai, DeepLearning.AI courses',
            'PyTorch, TensorFlow documentation',
            'ArXiv for research papers',
            'Hugging Face for NLP models'
        ]
    },
    '7': { // Graphic Designer
        careerId: '7',
        overview: 'Graphic designers create visual content for brands, combining creativity with digital tools to communicate messages effectively.',
        keySkills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Branding', 'UI/UX Design', 'Print Design', 'Digital Marketing', 'Client Communication'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete B.F.A. degree', 'Learn design fundamentals', 'Master Adobe tools', 'Build design portfolio'],
                skills: ['Design Principles', 'Adobe Photoshop', 'Basic Illustration'],
                milestones: ['Complete degree', 'Create 20+ design pieces', 'Build online portfolio']
            },
            {
                phase: 'Skill Development (Years 3-4)',
                duration: '2 years',
                activities: ['Learn advanced design techniques', 'Specialize in a niche', 'Work with real clients', 'Learn marketing principles'],
                skills: ['Advanced Adobe Suite', 'Branding', 'Marketing', 'Client Management'],
                milestones: ['Complete freelance projects', 'Win design competitions', 'Build client relationships']
            },
            {
                phase: 'Professional Growth (Years 5-7)',
                duration: '3 years',
                activities: ['Join design agencies', 'Lead design projects', 'Mentor junior designers', 'Build personal brand'],
                skills: ['Project Management', 'Team Leadership', 'Business Development'],
                milestones: ['Become Senior Designer', 'Lead creative teams', 'Start own design studio']
            },
            {
                phase: 'Leadership (Years 8+)',
                duration: 'Ongoing',
                activities: ['Lead creative departments', 'Consult for brands', 'Teach design courses', 'Innovate design trends'],
                skills: ['Creative Direction', 'Strategy', 'Education'],
                milestones: ['Become Creative Director', 'Speak at design conferences', 'Influence design industry']
            }
        ],
        salaryProgression: [
            { level: 'Junior Designer', range: '₹2-4 LPA', experience: '0-2 years' },
            { level: 'Graphic Designer', range: '₹4-8 LPA', experience: '2-5 years' },
            { level: 'Senior Designer', range: '₹8-15 LPA', experience: '5-8 years' },
            { level: 'Creative Director', range: '₹15-30 LPA', experience: '8+ years' }
        ],
        jobTitles: ['Junior Designer', 'Graphic Designer', 'Senior Designer', 'Art Director', 'Creative Director'],
        preparationTips: [
            'Build a strong portfolio showcasing diverse work',
            'Learn design trends and stay updated',
            'Develop both creative and technical skills',
            'Network with design community',
            'Understand business and marketing aspects'
        ],
        resources: [
            'Adobe Creative Cloud',
            'Dribbble, Behance for inspiration',
            'Smashing Magazine, AIGA',
            'Coursera design courses',
            'Design conferences and meetups'
        ]
    },
    '13': { // Chartered Accountant
        careerId: '13',
        overview: 'Chartered accountants provide financial expertise, including auditing, taxation, and financial planning for businesses and individuals.',
        keySkills: ['Financial Accounting', 'Taxation', 'Auditing', 'Financial Reporting', 'Corporate Law', 'Financial Analysis', 'Risk Management', 'Business Advisory'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete B.Com degree', 'Register for CA foundation', 'Study accounting basics', 'Learn business laws'],
                skills: ['Basic Accounting', 'Business Mathematics', 'Commercial Laws'],
                milestones: ['Pass CA Foundation exam', 'Complete B.Com degree', 'Gain practical accounting exposure']
            },
            {
                phase: 'Intermediate (Years 3-4)',
                duration: '2 years',
                activities: ['Complete CA Intermediate', 'Gain articleship training', 'Learn advanced accounting', 'Study taxation laws'],
                skills: ['Advanced Accounting', 'Taxation', 'Auditing Standards'],
                milestones: ['Pass CA Intermediate exams', 'Complete 2.5 years articleship', 'Get practical training']
            },
            {
                phase: 'Final Stage (Years 5-6)',
                duration: '2 years',
                activities: ['Complete CA Final course', 'Specialize in a domain', 'Work on complex cases', 'Prepare for CA Final exam'],
                skills: ['Advanced Taxation', 'Corporate Law', 'Financial Management'],
                milestones: ['Pass CA Final exam', 'Become Chartered Accountant', 'Get job offers from Big 4']
            },
            {
                phase: 'Professional Growth (Years 7+)',
                duration: 'Ongoing',
                activities: ['Join Big 4 firms', 'Specialize in practice areas', 'Build client relationships', 'Pursue additional certifications'],
                skills: ['Specialization', 'Client Management', 'Business Development'],
                milestones: ['Become Partner/Director', 'Start own CA practice', 'Become industry expert']
            }
        ],
        salaryProgression: [
            { level: 'Articleship', range: '₹15,000-25,000/month', experience: 'During training' },
            { level: 'Junior CA', range: '₹6-10 LPA', experience: '0-3 years post-CA' },
            { level: 'Senior CA', range: '₹10-18 LPA', experience: '3-7 years' },
            { level: 'Partner/Director', range: '₹18-50 LPA', experience: '7+ years' }
        ],
        jobTitles: ['Audit Assistant', 'Tax Consultant', 'Financial Analyst', 'Audit Manager', 'Partner', 'Financial Advisor'],
        preparationTips: [
            'Maintain consistent study schedule for CA exams',
            'Focus on understanding concepts rather than rote learning',
            'Gain practical experience during articleship',
            'Network with CA professionals',
            'Stay updated with changing laws and regulations'
        ],
        resources: [
            'ICAI study material',
            'CA coaching institutes (Jain, VSI, etc.)',
            'Taxmann, Padhuka publications',
            'ICAI journal and announcements',
            'Professional networking on LinkedIn'
        ]
    },
    '14': { // Investment Banker
        careerId: '14',
        overview: 'Investment bankers advise companies and governments on financial transactions, including mergers, acquisitions, and capital raising.',
        keySkills: ['Financial Modeling', 'Valuation', 'M&A', 'Capital Markets', 'Financial Analysis', 'Pitch Book Preparation', 'Client Relationship Management', 'Regulatory Compliance'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete BBA degree', 'Learn financial concepts', 'Study economics & finance', 'Build Excel skills'],
                skills: ['Financial Mathematics', 'Basic Valuation', 'Excel Modeling'],
                milestones: ['Complete BBA with finance specialization', 'Learn advanced Excel', 'Understand financial markets']
            },
            {
                phase: 'Skill Development (Years 3-4)',
                duration: '2 years',
                activities: ['Pursue MBA Finance', 'Learn financial modeling', 'Complete internships', 'Study investment banking'],
                skills: ['Financial Modeling', 'Valuation Techniques', 'M&A Concepts'],
                milestones: ['Complete MBA', 'Build comprehensive financial models', 'Secure IB internship']
            },
            {
                phase: 'Entry Level (Years 5-6)',
                duration: '2 years',
                activities: ['Join investment bank as analyst', 'Work on live deals', 'Learn deal execution', 'Build industry knowledge'],
                skills: ['Deal Execution', 'Industry Analysis', 'Client Interaction'],
                milestones: ['Complete analyst program', 'Work on multiple deals', 'Get promoted to Associate']
            },
            {
                phase: 'Senior Roles (Years 7+)',
                duration: 'Ongoing',
                activities: ['Lead deal teams', 'Manage client relationships', 'Specialize in sector/group', 'Mentor junior bankers'],
                skills: ['Leadership', 'Client Management', 'Strategic Advisory'],
                milestones: ['Become VP/Director', 'Lead major transactions', 'Start own advisory firm']
            }
        ],
        salaryProgression: [
            { level: 'Analyst', range: '₹12-18 LPA', experience: '0-2 years' },
            { level: 'Associate', range: '₹18-28 LPA', experience: '2-4 years' },
            { level: 'Vice President', range: '₹28-45 LPA', experience: '4-7 years' },
            { level: 'Director/MD', range: '₹45-100 LPA', experience: '7+ years' }
        ],
        jobTitles: ['Investment Banking Analyst', 'Associate', 'Vice President', 'Director', 'Managing Director'],
        preparationTips: [
            'Develop strong financial modeling skills',
            'Network extensively in finance industry',
            'Prepare for case studies and interviews',
            'Stay updated with market developments',
            'Build relationships with alumni and professionals'
        ],
        resources: [
            'Investment Banking courses on Coursera',
            'Wall Street Prep, Corp Finance Institute',
            'Bloomberg Terminal access',
            'Financial Times, Economist',
            'Networking events and finance conferences'
        ]
    },
    '19': { // Electrician
        careerId: '19',
        overview: 'Electricians install, maintain, and repair electrical systems in residential, commercial, and industrial settings.',
        keySkills: ['Electrical Wiring', 'Circuit Design', 'Safety Protocols', 'Troubleshooting', 'Electrical Codes', 'Power Systems', 'Maintenance', 'Blueprints Reading'],
        roadmap: [
            {
                phase: 'Foundation (Years 1-2)',
                duration: '2 years',
                activities: ['Complete ITI Electrician course', 'Learn basic electrical concepts', 'Practice wiring techniques', 'Study safety procedures'],
                skills: ['Basic Wiring', 'Electrical Fundamentals', 'Safety Practices'],
                milestones: ['Complete ITI certification', 'Learn basic tools usage', 'Understand electrical codes']
            },
            {
                phase: 'Skill Development (Years 3-4)',
                duration: '2 years',
                activities: ['Work as apprentice', 'Learn advanced wiring', 'Study motor controls', 'Practice troubleshooting'],
                skills: ['Advanced Wiring', 'Motor Controls', 'Troubleshooting', 'Installation'],
                milestones: ['Get wireman license', 'Complete apprenticeship', 'Work on diverse projects']
            },
            {
                phase: 'Professional Growth (Years 5-7)',
                duration: '3 years',
                activities: ['Work on commercial projects', 'Supervise teams', 'Learn project management', 'Specialize in industrial systems'],
                skills: ['Project Management', 'Team Supervision', 'Industrial Systems'],
                milestones: ['Become certified electrician', 'Lead installation teams', 'Start own contracting business']
            },
            {
                phase: 'Expertise (Years 8+)',
                duration: 'Ongoing',
                activities: ['Specialize in automation', 'Consult for large projects', 'Train apprentices', 'Manage electrical departments'],
                skills: ['Automation', 'Consulting', 'Training', 'Management'],
                milestones: ['Become master electrician', 'Own electrical contracting firm', 'Consult for industrial projects']
            }
        ],
        salaryProgression: [
            { level: 'Apprentice', range: '₹8,000-12,000/month', experience: '0-2 years' },
            { level: 'Electrician', range: '₹15,000-25,000/month', experience: '2-5 years' },
            { level: 'Senior Electrician', range: '₹25,000-40,000/month', experience: '5-8 years' },
            { level: 'Electrical Contractor', range: '₹50,000-200,000/month', experience: '8+ years' }
        ],
        jobTitles: ['Apprentice Electrician', 'Electrician', 'Senior Electrician', 'Electrical Contractor', 'Electrical Supervisor'],
        preparationTips: [
            'Get proper ITI certification',
            'Learn under experienced electricians',
            'Understand electrical safety thoroughly',
            'Stay updated with new technologies',
            'Build practical experience through projects'
        ],
        resources: [
            'ITI Electrician course',
            'Electrical safety manuals',
            'Wiring diagrams and blueprints',
            'Electrical code books',
            'Practical training workshops'
        ]
    }
};

/* ─── Stream Metadata ────────────────────────────────────── */
const STREAM_META: Record<string, { tab: string; cardGrads: string[]; pill: string }> = {
    Science: {
        tab: 'linear-gradient(135deg,#667eea,#764ba2)',
        pill: '#667eea',
        cardGrads: [
            'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
            'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
            'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
            'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
            'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
            'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
        ],
    },
    Arts: {
        tab: 'linear-gradient(135deg,#f093fb,#f5576c)',
        pill: '#f5576c',
        cardGrads: [
            'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
            'linear-gradient(135deg,#fccb90 0%,#d57eeb 100%)',
            'linear-gradient(135deg,#fd7043 0%,#ff8a65 100%)',
            'linear-gradient(135deg,#e96c8a 0%,#ee9ca7 100%)',
            'linear-gradient(135deg,#c471ed 0%,#f64f59 100%)',
            'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
        ],
    },
    Commerce: {
        tab: 'linear-gradient(135deg,#ff6b6b,#ffa726)',
        pill: '#ff6b6b',
        cardGrads: [
            'linear-gradient(135deg,#ff6b6b 0%,#ffa726 100%)',
            'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
            'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
            'linear-gradient(135deg,#fc4a1a 0%,#f7b733 100%)',
            'linear-gradient(135deg,#16a085 0%,#f4d03f 100%)',
            'linear-gradient(135deg,#e44d26 0%,#f16529 100%)',
        ],
    },
    Vocational: {
        tab: 'linear-gradient(135deg,#11998e,#38ef7d)',
        pill: '#11998e',
        cardGrads: [
            'linear-gradient(135deg,#11998e 0%,#38ef7d 100%)',
            'linear-gradient(135deg,#005c97 0%,#363795 100%)',
            'linear-gradient(135deg,#1d976c 0%,#93f9b9 100%)',
            'linear-gradient(135deg,#56ab2f 0%,#a8e063 100%)',
            'linear-gradient(135deg,#2196f3 0%,#21cbf3 100%)',
            'linear-gradient(135deg,#134e5e 0%,#71b280 100%)',
        ],
    },
};

/* ─── Components ─────────────────────────────────────────── */
function RoadmapStep({ step, index, total }: { step: RoadmapStep; index: number; total: number }) {
    return (
        <div className="relative">
            {/* Timeline line */}
            {index < total - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-blue-400 to-blue-200 opacity-30" />
            )}

            <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{step.phase}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{step.duration}</span>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-blue-50 rounded-full">
                            <span className="text-xs font-semibold text-blue-700">Phase {index + 1}</span>
                        </div>
                    </div>

                    {/* Activities */}
                    <div className="mb-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Key Activities
                        </h4>
                        <ul className="space-y-1">
                            {step.activities.map((activity, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                    {activity}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            Skills to Develop
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {step.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Milestones */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-orange-600" />
                            Milestones
                        </h4>
                        <ul className="space-y-1">
                            {step.milestones.map((milestone, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                                    {milestone}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CareerStats({ career }: { career: CareerPath }) {
    const getDifficultyColor = (difficulty?: string) => {
        switch (difficulty) {
            case 'Easy': return '#10b981';
            case 'Medium': return '#f59e0b';
            case 'Hard': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getGrowthColor = (growth?: string) => {
        switch (growth) {
            case 'Very High': return '#10b981';
            case 'High': return '#3b82f6';
            case 'Medium': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Salary Range</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{career.salary_range || '₹4-8 LPA'}</p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5" style={{ color: getGrowthColor(career.growth_rate) }} />
                    <span className="text-sm font-semibold text-gray-700">Growth Rate</span>
                </div>
                <p className="text-lg font-bold" style={{ color: getGrowthColor(career.growth_rate) }}>
                    {career.growth_rate || 'Medium'}
                </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5" style={{ color: getDifficultyColor(career.difficulty) }} />
                    <span className="text-sm font-semibold text-gray-700">Difficulty</span>
                </div>
                <p className="text-lg font-bold" style={{ color: getDifficultyColor(career.difficulty) }}>
                    {career.difficulty || 'Medium'}
                </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Degree</span>
                </div>
                <p className="text-sm font-bold text-gray-800">{career.degree_required}</p>
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function CareerRoadmapPage() {
    const params = useParams();
    const router = useRouter();
    const [career, setCareer] = useState<CareerPath | null>(null);
    const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
    const [loading, setLoading] = useState(true);

    const stream = params.stream as string;
    const careerId = params.careerId as string;

    useEffect(() => {
        const loadCareerData = async () => {
        };

        loadCareerData();
    }, [careerId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!career) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Career Not Found</h1>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const Icon = ICON_MAP[career.title] || Code;
    const meta = STREAM_META[career.stream];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Careers</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: meta?.pill ? `${meta.pill}20` : '#667eea20' }}
                            >
                                <Icon className="w-4 h-4" style={{ color: meta?.pill || '#667eea' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-600 capitalize">{career.stream}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Career Overview */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                    {/* Hero Section */}
                    <div
                        className="relative h-48 flex items-center justify-between p-8 overflow-hidden"
                        style={{ background: meta?.cardGrads?.[0] || 'linear-gradient(135deg,#667eea,#764ba2)' }}
                    >
                        {/* Decorative elements */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.5)' }} />
                        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-15" style={{ background: 'rgba(255,255,255,0.4)' }} />

                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">{career.title}</h1>
                                    <p className="text-white/80 text-sm">{career.degree_required}</p>
                                </div>
                            </div>
                            <p className="text-white/90 text-sm leading-relaxed max-w-lg">{career.description}</p>
                        </div>

                        <div className="relative z-10 hidden sm:block">
                            <div className="w-24 h-24 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
                                <Icon className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="p-8">
                        <CareerStats career={career} />
                    </div>
                </div>

                {/* Roadmap Section */}
                {roadmap && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Career Roadmap</h2>
                                <p className="text-gray-600 text-sm">Your journey to becoming a {career.title}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700 leading-relaxed">{roadmap.overview}</p>
                        </div>

                        {/* Roadmap Steps */}
                        <div className="space-y-8">
                            {roadmap.roadmap.map((step, index) => (
                                <RoadmapStep
                                    key={index}
                                    step={step}
                                    index={index}
                                    total={roadmap.roadmap.length}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Skills */}
                {roadmap && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Award className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Key Skills Required</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {roadmap.keySkills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="w-8 h-8 rounded-lg bg-purple-200 flex items-center justify-center">
                                        <span className="text-sm font-bold text-purple-700">{index + 1}</span>
                                    </div>
                                    <span className="text-sm font-medium text-purple-900">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Salary Progression */}
                {roadmap && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Salary Progression</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {roadmap.salaryProgression.map((level, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-xl">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-gray-800">{level.level}</h3>
                                        <span className="text-sm text-gray-500">{level.experience}</span>
                                    </div>
                                    <p className="text-lg font-semibold text-green-600">{level.range}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Job Opportunities */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Top Recruiters & Job Opportunities</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {career.job_opportunities.slice(0, 8).map((company, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-xl text-center border border-gray-200">
                                <span className="text-sm font-medium text-gray-700">{company}</span>
                            </div>
                        ))}
                    </div>
                    {roadmap && (
                        <div>
                            <h3 className="font-bold text-gray-800 mb-3">Career Progression</h3>
                            <div className="flex flex-wrap gap-2">
                                {roadmap.jobTitles.map((title, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                        {title}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Preparation Tips */}
                {roadmap && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Preparation Tips</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roadmap.preparationTips.map((tip, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                                    <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-bold text-orange-700">{index + 1}</span>
                                    </div>
                                    <p className="text-sm text-orange-900 leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resources */}
                {roadmap && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Recommended Resources</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {roadmap.resources.map((resource, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-200 flex items-center justify-center">
                                        <ChevronRight className="w-4 h-4 text-indigo-700" />
                                    </div>
                                    <span className="text-sm font-medium text-indigo-900">{resource}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Take our career assessment quiz to get personalized recommendations and create your custom career roadmap.
                    </p>
                    <button
                        onClick={() => router.push('/career-quiz')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg"
                    >
                        Take Career Quiz <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}