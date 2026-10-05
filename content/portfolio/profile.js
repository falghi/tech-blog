// Content for the portfolio homepage. Kept as data rather than markup so the
// same entries can drive the timeline, project cards, and meta tags.

export const profile = {
  name: "Firdaus Al Ghifari",
  initials: "FA",
  roles: ["Full Stack Web Developer", "Software Engineer"],
  location: "Tokyo, Japan",
  email: "firdausalghi01@gmail.com",
  summary:
    "A software engineer with experiences in Full-Stack Web Development, Machine Learning, and Competitive Programming. Loves to make innovative solution in technology to solve any kind of problems.",
  social: [
    { name: "GitHub", to: "https://github.com/falghi", icon: "github" },
    {
      name: "LinkedIn",
      to: "https://www.linkedin.com/in/alghi",
      icon: "linkedin",
    },
    {
      name: "Instagram",
      to: "https://www.instagram.com/alghi01/",
      icon: "instagram",
    },
    {
      name: "Medium",
      to: "https://medium.com/@firdaus.alghifari",
      icon: "medium",
    },
    { name: "Twitter", to: "https://twitter.com/alghihere", icon: "twitter" },
  ],
}

export const skillGroups = [
  {
    label: "Architecture & Process",
    skills: ["System Design", "Agile", "Scrum", "Technical Writing"],
  },
  {
    label: "Languages",
    skills: ["TypeScript", "Python", "Java", "Go", "Kotlin", "SQL"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Ruby on Rails", "Styled Components"],
  },
  {
    label: "Backend",
    skills: ["Express", "Django", "FastAPI", "Spring", "REST API Design"],
  },
  {
    label: "Data & Messaging",
    skills: ["PostgreSQL", "MySQL", "Redis", "Kafka", "GraphQL"],
  },
  {
    label: "Infrastructure",
    skills: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD"],
  },
]

export const experience = [
  {
    role: "Software Engineer",
    company: "Money Forward, Inc.",
    period: "November 2023 - Present",
    location: "Tokyo, Japan",
    points: [
      "Contribute to a SaaS Payroll platform serving 4M+ users using React, GraphQL, Ruby on Rails, Java/Kotlin, and AWS infrastructure (Docker, Kubernetes, Terraform). Collaborate closely with product managers, designers, and QA to support legal compliance updates and UX improvements",
      "Architected a standardized REST API framework for the Payroll domain using React and Ruby on Rails, adopted by 4 engineering teams and used to deliver multiple production projects with zero incidents",
      "Designed and implemented a feature flag management system using Flipt and OpenFeature, improving deployment safety and enabling controlled feature rollouts across teams",
      "Drove engineering quality and consistency by introducing development improvement initiatives, including standardization of front-end tools like React Hook Form and Zod",
    ],
  },
  {
    role: "Software Engineer",
    company: "Pintarnya",
    period: "July 2022 - October 2023",
    location: "Jakarta, Indonesia",
    points: [
      "Architected and developed scalable backend systems for Indonesia's leading job-seeking platform, serving over 1 million users on Google Play Store",
      "Built robust microservices and APIs using Golang, PostgreSQL, and Google Cloud Platform (GCP) to support high-traffic job matching operations",
    ],
  },
  {
    role: "Technical Lead",
    company: "Purwalenta",
    period: "July 2020 - July 2022",
    location: "Jakarta, Indonesia",
    points: [
      "Spearheaded the complete migration of legacy PHP + MySQL backend to modern Django + PostgreSQL architecture, successfully transferring 100+ online courses",
      "Led and mentored a 4-member engineering team to develop the company's flagship web application using React, NextJS, and Redux",
      "Designed and implemented comprehensive course management dashboard enabling instructors to efficiently manage content and process payments",
    ],
  },
  {
    role: "Software Engineer Part-Time",
    company: "TamanSchool.com",
    period: "December 2019 - July 2020",
    location: "Depok, Indonesia",
    points: [
      "Designed and launched the company’s first online tutoring platform, leveraging React, Django, Docker, and AWS for a robust and scalable solution",
      "Enabled the platform to securely process approximately $7,500 in monthly transactions",
      "Engineered and maintained server infrastructure, including CI/CD pipelines, cost optimization, automated backups, and seamless server migrations",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "GDP Labs",
    period: "June 2019 - August 2019",
    location: "Jakarta, Indonesia",
    points: [
      "Contributed to a 100+ employee software product development company focused on enterprise solutions",
      "Engineered a reusable UI component library using modern web component technologies (Stencil, Lit Element, Angular Element), significantly improving front-end development efficiency and code standardization across teams",
    ],
  },
]

export const education = [
  {
    role: "Bachelor's Degree in Computer Science",
    company: "University of Indonesia",
    period: "August 2018 - July 2022",
    points: [
      "Most Outstanding Student in Entrepreneurship, Faculty of Computer Science (2022)",
      "Most Outstanding Student Finalist (Top 5), Faculty of Computer Science (2021)",
      "Teaching Assistant for Operating Systems, Data Structures and Algorithms, Programming Fundamentals, and Introduction to Computer Organization",
    ],
  },
  {
    role: "High School Diploma",
    company: "SMAN 2 Depok",
    period: "July 2015 - May 2018",
    points: [
      "Head of SMAN 2 Depok Study Club (2017-2018)",
      "Treasurer of SMAN 2 Depok Islamic Club (2016-2017)",
      "Secretary of SMAN 2 Depok Volleyball Club (2016-2017)",
    ],
  },
]

export const leadership = [
  {
    role: "Co-Founder",
    company: "SQNA",
    period: "October 2021 - November 2021",
    points: [
      "Co-founded and developed an AI-powered educational platform leveraging state-of-the-art Natural Language Processing transformers to automatically generate question-answer pairs from text content",
      "Built full-stack solution using React, FastAPI, Python, PyTorch, and AWS, implementing advanced transformer models for intelligent content processing",
    ],
  },
  {
    role: "Head of Software Engineering",
    company: "CompFest 12",
    period: "December 2019 - October 2020",
    points: [
      "Directed a cross-functional engineering team to architect and deliver multiple high-scale applications for Indonesia's largest IT competition and conference",
      "Successfully launched competition registration system, interactive coding playground, and virtual job fair platform, collectively serving over 1 million visitors",
      "Implemented robust, scalable solutions using React, React Native, Django, and AWS infrastructure to handle massive concurrent user loads",
    ],
  },
]

// `image` refers to a file in assets/portfolio, resolved by gatsby-plugin-image.
export const projects = [
  {
    title: "Alghi Blog",
    blurb: "A blog about technology, AI, and tutorials.",
    image: "portfolio/alghi-blogs.png",
    to: "/blog/",
    stack: ["React", "Gatsby", "React Native", "Contentful"],
    category: "Web Development",
  },
  {
    title: "Taman Siswa",
    blurb: "A startup MVP for a fast growing education startup in Indonesia.",
    image: "portfolio/tamansiswa.jpg",
    to: "https://taman-siswa.com/",
    stack: ["React", "Gatsby", "Django", "AWS"],
    category: "Web Development",
  },
  {
    title: "COMPFEST",
    blurb:
      "Led the engineering team to build various CompFest apps: competition registration, online playground, and online job fair.",
    image: "portfolio/compfest.jpg",
    to: "https://compfest.id/",
    stack: ["React", "Django", "AWS", "Contentful"],
    category: "Web Development",
  },
  {
    title: "AlghiJudge",
    blurb:
      "An open source project that aims to help students solve algorithm and data structure problems.",
    image: "portfolio/alghijudge.png",
    to: "https://judge.falghifari.com/",
    stack: ["React", "Node.js", "Express", "Heroku"],
    category: "Web Development",
  },
  {
    title: "Alghi History",
    blurb:
      "An interactive explorer for Indonesian history, built for a national education initiative.",
    image: "portfolio/alghistory.png",
    to: "https://history.falghifari.com/",
    stack: ["React", "Gatsby", "Django", "GraphQL"],
    category: "Web Development",
  },
  {
    title: "Genki Food",
    blurb: "A food review platform focused on discovery and community reviews.",
    image: "portfolio/genkifood.jpg",
    to: "https://genkifood.falghifari.com/",
    stack: ["React", "Gatsby", "GraphQL", "GCP"],
    category: "Web Development",
  },
  {
    title: "My Face Recognition",
    blurb:
      "Recognizes and marks the faces in a submitted picture. The more you submit, the higher your rank.",
    image: "portfolio/facerecognition.png",
    to: "https://myfacerecognition.herokuapp.com/",
    stack: ["React", "Node.js", "PostgreSQL", "Clarifai API"],
    category: "Machine Learning",
  },
  {
    title: "Yolo Adventure",
    blurb: "A 2D roguelike game about killing slimes and leveling up.",
    image: "portfolio/yolo-adventure.png",
    to: "https://www.dropbox.com/s/ebme1vl8ysnu84y/YoloAdventureSetup.exe?dl=0",
    stack: ["Unity 2D", "C#", "Tiled"],
    category: "Game Development",
  },
  {
    title: "Webmakers ID",
    blurb:
      "A business providing web development, web maintenance, and IT consultation services.",
    image: "portfolio/webmakers.png",
    to: "https://webmakers.falghifari.com/",
    stack: ["JavaScript", "Bootstrap", "PHP", "MySQL"],
    category: "Web Development",
  },
]

export const services = [
  {
    title: "IT Consultation",
    blurb:
      "I can help you find the solution for your problem using technological innovation.",
    icon: "consult",
  },
  {
    title: "Web Development",
    blurb:
      "I can help you build any kind of website that will solve your problem.",
    icon: "code",
  },
  {
    title: "RESTful API Design",
    blurb: "I can help you design and build a RESTful API for your business.",
    icon: "api",
  },
  {
    title: "Algorithm Design",
    blurb:
      "I can help you solve any problem in your business that requires advanced analysis.",
    icon: "algo",
  },
]

const portfolio = {
  profile,
  skillGroups,
  experience,
  education,
  leadership,
  projects,
  services,
}

export default portfolio
