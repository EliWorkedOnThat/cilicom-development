import type { Dictionary } from "./sq";

const en: Dictionary = {
  // Search results and link previews. Titles up to ~60 characters (page titles get " · cilicom" added),
  // descriptions up to ~155, or Google cuts them off.
  meta: {
    title: "Software development, automation & AI in Albania · cilicom",
    description:
      "cilicom is a software studio in Albania. We build management systems, web apps, automations and custom AI solutions, and look after them long after launch.",
  },

  nav: {
    home: "Home",
    homeAria: "cilicom, home page",
    links: [
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/pricing", label: "Working together" },
      { href: "/about", label: "About" },
    ],
    contact: "Contact",
    cta: "Start a project",
    menu: "Menu",
    open: "Open menu",
    close: "Close menu",
    location: "Albania",
    language: "Language",
  },

  footer: {
    tagline: "Software built with care, for businesses that want to grow.",
    pages: "Pages",
    whereTitle: "Where we are",
    where: "Albania",
    whereNote: "We work with clients everywhere.",
    statusTitle: "Status",
    status: "Taking on new projects",
    sitemap: "Sitemap",
    top: "Top",
    instagram: "cilicom on Instagram",
  },

  cta: {
    title: "Let's build it together.",
    body: "Tell us what you have in mind. We reply within one working day.",
    button: "Let's start",
  },

  services: [
    {
      id: "menaxhim",
      title: "Management systems",
      short: "One place for your stock, clients, invoices and staff.",
      long: "ERPs, CRMs and internal systems built around the way your business works, not the other way round. Clean data, roles and permissions, reports you understand at a glance.",
      examples: ["Inventory & warehouse", "CRM", "Invoicing", "Bookings", "Reporting dashboards"],
    },
    {
      id: "automatizim",
      title: "Automation",
      short: "The system does the repetitive work, you run the business.",
      long: "We connect the tools you already use, remove manual copying of data and build processes that run on their own, 24 hours a day.",
      examples: ["API integrations", "Automatic reports", "Notifications", "Data sync", "Approval flows"],
    },
    {
      id: "web",
      title: "Web applications",
      short: "Fast, secure platforms that look great on every screen.",
      long: "Client portals, SaaS platforms, dashboards and websites that convert. Built on modern technology that scales with you.",
      examples: ["Client portals", "SaaS", "Dashboards", "E-commerce", "Websites"],
    },
    {
      id: "ai",
      title: "AI & LLM solutions",
      short: "Artificial intelligence that works with your own data.",
      long: "Assistants that know your documents, chatbots for your customers, automatic data extraction from invoices and contracts, and agents that carry out real tasks.",
      examples: ["Document assistants", "Chatbots", "Data extraction", "AI agents", "Classification"],
    },
    {
      id: "personalizuar",
      title: "Custom applications",
      short: "When no off-the-shelf software fits.",
      long: "Web, desktop or mobile apps designed for one specific problem: yours. No unnecessary licences, no compromises.",
      examples: ["Web", "Mobile", "Desktop", "Internal tools"],
    },
    {
      id: "ide",
      title: "From idea to product",
      short: "Got an idea? We turn it into a product that works.",
      long: "We start with a conversation, turn it into a prototype you can click through, then into a first version (MVP) you can put in front of real customers.",
      examples: ["Idea workshop", "Prototype", "MVP", "Launch"],
    },
    {
      id: "dixhital",
      title: "Digital solutions",
      short: "From Excel and paper to a real system.",
      long: "We move your business from scattered files and manual work to simple digital tools, with training for your team.",
      examples: ["Process digitisation", "Data migration", "Training", "Consulting"],
    },
    {
      id: "mirembajtje",
      title: "Maintenance & support",
      short: "We don't disappear after launch.",
      long: "Monitoring, security updates, fixes and ongoing improvements. Your system stays fast, secure and up to date.",
      examples: ["Monitoring", "Updates", "Backups", "Support", "Improvements"],
    },
  ],

  home: {
    hero: {
      eyebrow: "Software studio · Albania",
      title: "Your idea, turned into software.",
      verb: "we build",
      rotating: [
        "management systems",
        "automations",
        "web applications",
        "AI solutions",
        "custom applications",
        "ideas that come to life",
      ],
      body: "From management systems to automation and AI, we build the software your business needs, and look after it long after launch.",
      primary: "Tell us your idea",
      secondary: "Services",
    },
    marquee: {
      label: "What we do",
      items: [
        "Management systems",
        "Automation",
        "Web applications",
        "AI & LLM",
        "Custom applications",
        "Digital transformation",
        "Maintenance",
      ],
    },
    rail: {
      eyebrow: "01 — Services",
      title: "Everything your digital business needs.",
      all: "All services →",
      prev: "Previous service",
      next: "Next service",
    },
    process: {
      eyebrow: "02 — Process",
      title: "From a conversation to a system that works.",
      body: "No surprises, no jargon. You always know where the project stands, what it costs and what comes next.",
      step: "Step",
      steps: [
        {
          title: "We listen",
          body: "We start with a conversation: how you work today, where time gets lost, what success means to you.",
          out: "Summary of the problem & goals",
        },
        {
          title: "We design",
          body: "We map out the solution and build a prototype you can try before a single line of code is written.",
          out: "Interactive prototype · plan · clear quote",
        },
        {
          title: "We build",
          body: "We develop in short cycles. Every week you see real progress and give your feedback.",
          out: "Working, tested version",
        },
        {
          title: "We launch & look after it",
          body: "We put it to work, train your team and stay close for maintenance and improvements.",
          out: "Live system + ongoing support",
        },
      ],
    },
    ai: {
      eyebrow: "03 — AI & LLM",
      title: "AI that knows your business.",
      body: "We connect the most advanced language models to your systems, securely and under your control.",
      capabilities: [
        { title: "Assistants on your data", body: "Ask your system in plain language and get answers from your invoices, contracts and reports." },
        { title: "Automatic extraction", body: "Invoices, forms and emails turn themselves into structured data." },
        { title: "Agents that act", body: "Not just answers: AI sends reminders, fills in records and lets you know when it matters." },
      ],
      window: "assistant · demo",
      question: "How many invoices are still unpaid this month?",
      tools: ["searching the invoicing system…", "filter: status = unpaid, month = October", "calculating totals and due dates…"],
      answer:
        "You have 12 unpaid invoices, €8,430 in total. Three of them are past their due date. Would you like me to send those clients a reminder?",
      actions: ["Yes, send reminders", "Show the list"],
      note: "* Illustrative example of an assistant we build.",
    },
    principles: {
      eyebrow: "04 — Why cilicom",
      title: "A technology partner, not just a supplier.",
      items: [
        {
          title: "One team, start to finish",
          body: "The same team listens, designs, builds and maintains. Nothing gets lost along the way.",
        },
        {
          title: "The code is yours",
          body: "Everything we build belongs to you. No hidden dependencies, no licences holding you hostage.",
        },
        {
          title: "We speak your language",
          body: "We explain everything clearly, in English or Albanian, without technical jargon. You decide, we deliver.",
        },
        {
          title: "Technology that lasts",
          body: "We use modern, proven tools so your system is fast today and easy to extend tomorrow.",
        },
      ],
    },
  },

  servicesPage: {
    metaTitle: "Software, automation & AI services",
    metaDescription:
      "Management systems (ERP, CRM), automation, web applications, AI & LLM solutions, custom apps and maintenance, built around the way your business works.",
    label: "Services",
    title: "Eight ways we move your business forward.",
    intro:
      "Some clients come with a clear problem, others with just a feeling that something could work better. Both are good places to start.",
    indexLabel: "List of services",
    ctaTitle: "Can't find what you're looking for?",
    ctaBody: "Most of our projects don't fit in a single box. Tell us the problem and we'll find the solution together.",
  },

  projectsPage: {
    metaTitle: "Projects and software products",
    metaDescription:
      "Our products, an online academy platform and the Eztemplate Gmail extension, plus examples of systems we build for clinics, retail, restaurants and startups.",
    label: "Projects",
    title: "What we build, in practice.",
    intro: "Some typical examples of the solutions we build for different sectors. Full case studies are coming soon.",
    ctaTitle: "Your project could be next.",
    productLabel: "Our product",
    productLink: "View product",
    products: [
      {
        title: "Academy platform",
        body: "Live lessons, materials, recordings, students and payments for academies and course centres, all in one place.",
        stack: ["Live lessons", "Web", "Mobile", "Payments"],
        href: "/projects/academy",
        icon: "/academy/icon.svg",
        external: false,
      },
      {
        title: "Eztemplate",
        body: "A browser extension that saves your best emails as designed HTML templates and drops them into any Gmail draft in one click.",
        stack: ["Gmail", "Chrome", "Brave", "Edge"],
        href: "/eztemplate/",
        icon: "/eztemplate/icon.png",
        external: true,
      },
    ],
    ideas: [
      {
        sector: "Healthcare",
        title: "A clinic with no queue on the phone",
        body: "Online bookings, electronic patient records and automatic SMS reminders before every appointment.",
        stack: ["Bookings", "Records", "Notifications"],
      },
      {
        sector: "Retail & logistics",
        title: "A warehouse that counts itself",
        body: "Real-time stock, automatic reorders when items run low and daily reports for the owner.",
        stack: ["Inventory", "Automation", "Reports"],
      },
      {
        sector: "Professional services",
        title: "An AI assistant for contracts",
        body: "Ask about any contract or document in plain language and get the answer with the exact reference.",
        stack: ["LLM", "Semantic search", "Security"],
      },
      {
        sector: "Tourism & restaurants",
        title: "From order to kitchen, paper-free",
        body: "Digital menus, ordering from the table, a kitchen display and a sales report at the end of the day.",
        stack: ["Web app", "Tablet", "Dashboard"],
      },
      {
        sector: "Manufacturing",
        title: "The production line on one screen",
        body: "Order tracking through every stage, downtime, quality and shift performance.",
        stack: ["Management system", "IoT", "Analytics"],
      },
      {
        sector: "Startup",
        title: "From sketch to MVP in weeks, not months",
        body: "A prototype you test with real customers, then the first product ready to launch.",
        stack: ["Prototype", "MVP", "Launch"],
      },
    ],
  },

  academyPage: {
    metaTitle: "Online academy platform with live lessons",
    metaDescription:
      "A platform for academies and course centres: live lessons, materials, recordings, students and payments in one place, on computer and phone.",
    eyebrow: "For academies and course centres",
    title: "Your online courses, all in one place.",
    lead: "Live classes, materials, recordings, students and payments. Simple for the teacher, easy for students, on computer and phone.",
    primaryCta: "Request a demo",
    secondaryCta: "How it works",
    trust: ["Live lessons inside the page", "On phone and computer", "In Albanian"],
    // The phone mock-up shows the real (Albanian) app, so its text stays in Albanian.
    mock: {
      live: "Live tani",
      course: "Grim profesional",
      lesson: "Trajtim fytyre",
      time: "E enjte · 18:00 – 20:00",
      tabs: ["Klasa", "Materialet", "Regjistrimet"],
      started: "Mësimi ka filluar",
      hint: "Klikoni \"Bashkohu\" për të hyrë në klasë.",
      join: "Bashkohu",
      toastTitle: "Mësimi ka filluar",
      toastBody: "Trajtim fytyre · tani",
    },
    featuresLabel: "Features",
    featuresTitle: "Everything an online academy needs.",
    features: [
      { icon: "live", title: "Live lessons", body: "The teacher starts class in one click and students join inside the page. No links passed around in groups." },
      { icon: "play", title: "Materials and recordings", body: "Videos, PDFs and photos for every lesson. The class recording is added automatically afterwards." },
      { icon: "calendar", title: "Calendar and lessons", body: "Repeating lessons, a colour for each course and the whole month at a glance." },
      { icon: "shield", title: "Controlled access", body: "Invitations with an expiry, access until the date you set. Without access, nobody gets in." },
      { icon: "bell", title: "Automatic notifications", body: "An email when class starts or the schedule changes, and a reminder for the teacher before every lesson." },
      { icon: "wallet", title: "Students and payments", body: "Who has paid, who is behind and what's left. Add students from Excel, too." },
      { icon: "star", title: "Student feedback", body: "After every lesson and at the end of a course, students leave stars and a comment." },
      { icon: "globe", title: "A website, free", body: "The academy's website comes with the platform, in your logo and colours." },
    ],
    stepsLabel: "How it works",
    stepsTitle: "From lesson to live class in three steps.",
    steps: [
      { title: "Create the lesson", body: "Pick the course, date and time. Weekly lessons are created once for the whole period." },
      { title: "Invite your students", body: "Send one invitation link on WhatsApp. Each student signs in with their own account." },
      { title: "Start the class", body: "One click and class begins. Students are told instantly and join from their phone." },
    ],
    audiences: [
      {
        label: "For the academy",
        title: "The whole academy from one dashboard.",
        points: [
          "Lessons, calendar and students in one place",
          "Payments by month, with what's owed and who's late",
          "Upload materials once, reuse them anywhere",
          "No more manual WhatsApp messages",
        ],
      },
      {
        label: "For students",
        title: "One click and they're in class.",
        points: [
          "Nothing to install, right from the phone's browser",
          "Materials and recordings always in order",
          "Class keeps playing in the corner while they browse",
          "A notification the moment the lesson starts",
        ],
      },
    ],
    faqLabel: "Questions",
    faqTitle: "What people ask us most.",
    faq: [
      { q: "Do students need to install anything?", a: "No. Students sign in from the browser on their phone or computer, and the live lesson opens inside the page." },
      { q: "Does the platform take online payments?", a: "No, on purpose: you record payments made in cash or by bank transfer, with no commission. The platform shows who has paid and who is behind." },
      { q: "What happens to class recordings?", a: "The recording is added to the lesson automatically after class, and students can rewatch it until the deadline you set." },
      { q: "Can it use the academy's logo and colours?", a: "Yes. The platform and the website are built with your logo, colours and courses." },
      { q: "What if we need something different?", a: "We add, remove or change features to fit the way you work, so the platform suits your academy." },
    ],
    ctaTitle: "Want it for your academy?",
    ctaBody: "A 10-minute call where we show you the platform live and find out what you need.",
  },

  testimonialsPage: {
    metaTitle: "Client testimonials",
    metaDescription:
      "What clients say about working with cilicom, a software studio in Albania that builds management systems, web apps, automations and AI solutions.",
    label: "Testimonials",
    title: "What our clients say.",
    intro: "In the words of the businesses we've worked with.",
    emptyTitle: "The first testimonials are coming soon.",
    emptyBody: "Have you worked with us? Tell us how it went and, with your permission, we'll publish it here.",
    emptyButton: "Send your testimonial",
    ctaTitle: "Your project could be next.",
    // Only real words from real clients, published with their permission. Add one per client, in both sq.ts and en.ts:
    // { quote: "…", name: "Client name", role: "Role, Company" },
    items: [],
  },

  pricingPage: {
    metaTitle: "Pricing and ways to work together",
    metaDescription:
      "How we price software projects: fixed-price builds, monthly partnerships and maintenance plans. Free first conversation and a clear quote before we start.",
    label: "Working together",
    title: "Clear ways to work together.",
    intro: "No hidden costs. Before we start, you know exactly what you get, when, and at what price.",
    featured: "Most popular",
    request: "Request a quote",
    faqTitle: "Frequently asked questions",
    models: [
      {
        name: "Project",
        tag: "Fixed price",
        body: "For a product with a clear goal: a system, an app, a website.",
        points: ["Analysis and prototype before the quote", "Price and deadline fixed in writing", "Weekly demos", "30 days of support after launch"],
      },
      {
        name: "Partnership",
        tag: "Monthly",
        body: "For businesses that want a dedicated technology team without hiring one.",
        points: ["Reserved hours every month", "Development priority", "Shared roadmap planning", "Monthly work report"],
      },
      {
        name: "Maintenance",
        tag: "Subscription",
        body: "For systems already in use, built by us or by others.",
        points: ["Monitoring and backups", "Security updates", "Quick fixes", "Guaranteed response time"],
      },
    ],
    faqs: [
      {
        q: "How much does a project cost?",
        a: "It depends on size and complexity. After a free first conversation we send you a detailed fixed-price quote, so you know the cost before we start.",
      },
      {
        q: "How long does it take?",
        a: "A prototype is usually ready within 1–2 weeks. A first working version usually within 4–10 weeks, depending on the project.",
      },
      {
        q: "Who owns the code?",
        a: "You do. Once paid, the code, data and documentation are entirely yours.",
      },
      {
        q: "Can you take over an existing system?",
        a: "Yes. We start with a short audit, then propose how to stabilise, maintain or improve it.",
      },
      {
        q: "Do you work with clients outside Albania?",
        a: "Yes. We work remotely with clients everywhere and communicate in English or Albanian.",
      },
    ],
  },

  aboutPage: {
    metaTitle: "About us: a software studio in Albania",
    metaDescription:
      "cilicom is a software studio in Albania that builds custom management systems, automations, web apps and AI solutions, with one team from idea to maintenance.",
    label: "About",
    title: "We build the software we'd want to use ourselves.",
    paragraphs: [
      "is a software studio that helps businesses work faster, smarter and with less manual work.",
      "We build management systems, automations, web applications and AI solutions, always designed around the way our client works.",
      "We don't sell ready-made packages. We listen, understand the problem and build exactly what's needed, then stay close so everything keeps running.",
    ],
    beliefsTitle: "What we believe",
    beliefs: [
      { title: "Simplicity wins.", body: "The best software is the one your team uses without thinking twice." },
      { title: "Technology is a tool.", body: "We care about results for your business, not about using the newest tool." },
      { title: "A relationship, not a transaction.", body: "The project ends, the partnership continues. We build to grow together." },
    ],
  },

  contactPage: {
    metaTitle: "Contact us about your project",
    metaDescription:
      "Tell us about your project and get a reply within one working day. The first conversation is free. Email team@cilicom.net or fill in the two-minute brief.",
    hero: {
      badge: "Taking on new projects",
      title: "Let's talk",
      direct: "Write to us directly",
      copy: "Copy",
      copied: "Copied ✓",
      briefLine1: "or fill in",
      briefLine2: "the project brief",
      instagram: "or message us on Instagram",
    },
    briefEyebrow: "Project brief",
    briefTitle: "Four steps. Two minutes.",
    briefBody: "The more you tell us, the more accurate our reply will be.",
    nextTitle: "What happens next",
    next: [
      { title: "We read your brief", body: "We review it carefully and, if needed, ask a few follow-up questions." },
      { title: "We talk", body: "A short meeting, online or in person, to properly understand your needs." },
      { title: "You get a proposal", body: "A clear plan with the solution, timeline and cost, with no obligation." },
    ],
  },

  form: {
    step1: "What do you want to build?",
    step1Hint: "Pick one or more.",
    step2: "When do you need it?",
    step3: "Rough budget",
    step3Hint: "Helps us propose the right solution. It doesn't commit you.",
    step4: "About you",
    timelines: ["As soon as possible", "Within 1–3 months", "In 3+ months", "I'm flexible"],
    budgets: ["Up to €2,000", "€2,000 – 5,000", "€5,000 – 15,000", "Over €15,000", "Not sure yet"],
    name: "Your name *",
    email: "Email *",
    company: "Company",
    message: "Tell us about the idea or problem *",
    summary: "Your brief",
    services: "Services",
    timeline: "Timeline",
    budget: "Budget",
    contact: "Contact",
    messageShort: "Message",
    send: "Send brief",
    sendShort: "Send",
    barLabel: "Brief",
    sentTitle: "Almost there!",
    sentBody: "Your email app opened with the brief filled in. Just press Send.",
    orDirect: "or directly:",
    mail: {
      subject: "New project",
      name: "Name",
      email: "Email",
      company: "Company",
      services: "Services",
      timeline: "Timeline",
      budget: "Budget",
    },
  },
};

export default en;
