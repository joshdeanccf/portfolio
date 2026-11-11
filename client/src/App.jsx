import SkillsMarquee from "./SkillsMarquee";
import React, { useEffect, useState } from "react";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

import {

  ArrowUpRight,

  ArrowDown,

  Menu,

  X,

  Mail,

  ExternalLink,

  Github,

  Linkedin,

  Instagram,

  MoveRight,

  Award,

  CalendarDays,

  FileImage,

  FileText,

  Eye,

} from "lucide-react";

const API_BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// EDIT YOUR DETAILS HERE. Replace demo URLs before publishing.

const profile = {

  firstName: "Josh Dean Carlitos",

  lastName: "Figura",

  role: "Backend Developer",

  location: "Based in the Philippines",

  email: "joshdeanccf@gmail.com",

  about:

    "Building resilient server-side architectures that balance high performance, scalability, and proactive defense. Current deep-dive into application security fundamentals allows me to write cleaner, more defensive backend code.",

  tagline: "Designing experiences. Building possibilities.",

  availability: "OPEN TO OPPORTUNITIES",

  socials: [

    { name: "GitHub", url: "https\://github.com/joshdeanccf" },

    { name: "LinkedIn", url: "https\://www.linkedin.com/in/joshdeanfigura/" },

    { name: "Instagram", url: "https\://www.instagram.com/joshdeymmm/" },

    { name: "Facebook", url: "https\://www.facebook.com/misterdeanofficial" },

  ],

};

const demoProjects = [

  {

    _id: "demo-1",

    number: "01",

    title: "TRUSTPERMIT",

    category: "CAPSTONE PROJECT",

    year: "2026",

    description:

      "A capstone web platform that helps Antipolo City residents access business permit and licensing services online.",



    accent: "#d9d5ce",

    image: "/projects/project1.png",

    type: "editorial",

    tags: ["React", "MongoDB"],

    link: "https\://trustpermit-webclient.vercel.app/",

  },

  {

    _id: "demo-2",

    number: "02",

    title: "WEB PROGRAMMING LAB ACTIVITY",

    category: "LABORATORY ACTIVITY",

    year: "2026",

    description:

      "A web programming lab project applying JavaScript, React, and MongoDB to build a full-stack web application.",

    accent: "#c4cbd0",

    image: "/projects/project2.png",

    type: "dashboard",

    tags: ["JavaScript", "React", "MongoDB"],

    link: "https\://figura-client.vercel.app/",

  },

  {

    _id: "demo-3",

    number: "03",

    title: "Car Rental",

    category: "FINAL PROJECT",

    year: "2024",

    description:

      "A car rental application for browsing available vehicles and organizing rental bookings through a straightforward interface.",

    accent: "#d9d0c5",

    image: "/projects/project3.png",

    type: "mobile",

    tags: ["HTML", "CSS", "SQL"],

    link: "",

  },

];

// CERTIFICATIONS & TRAINING

const credentials = [

  { id: "cert-1", 

    category: "Certifications", 

    title: "Browse the internet safely", 

    issuer: "Learning to Earning (Accenture)", 

    date: "October 2026", 

    file: "/certificates/Browse the internet safely (Learning to Earning).pdf" },



  { id: "cert-2", 

    category: "Certifications", 

    title: "Cloud cybersecurity", 

    issuer: "Learning to Earning (Accenture)", 

    date: "November 2026", 

    file: "/certificates/Cloud cybersecurity (Learning to Earning).pdf" },



  { id: "cert-3", 

    category: "Certifications", 

    title: "Fundamentals of Cybersecurity I", 

    issuer: "Learning to Earning (Accenture)", 

    date: "October 2026", 

    file: "/certificates/Fundamentals of Cybersecurity I (Learning to Earning).pdf" },



  { id: "cert-4", 

    category: "Certifications", 

    title: "Introduction to Cybersecurity", 

    issuer: "Cisco Networking Academy", 

    date: "October 2026", 

    file: "/certificates/Introduction to Cybersecurity (Cisco Networking Academy).pdf" },



  { id: "cert-5", 

    category: "Certifications", 

    title: "Networking Basics", 

    issuer: "Cisco Networking Academy", 

    date: "May 2025", 

    file: "/certificates/Networking Basics (Cisco Networking Academy).pdf" },



  { id: "cert-6", 

    category: "Certifications", 

    title: "Networking Devices and Initial Configuration Networking", 

    issuer: "Cisco Networking Academy", 

    date: "June 2025", 

    file: "/certificates/Networking Devices and Initial Configuration Networking (Cisco Networking Academy).pdf" },



  { id: "cert-7", 

    category: "Certifications", 

    title: "Pentesting", 

    issuer: "Learning to Earning (Accenture)", 

    date: "November 2026", 

    file: "/certificates/Pentesting (Learning to Earning).pdf" },



  { id: "cert-8", 

    category: "Seminars/Webinars", 

    title: "Debugging your Resume", 

    issuer: "National University College of Computing in Information Technology", 

    date: "August 2026", 

    file: "/certificates/DEBUGGING YOUR RESUME.jfif" },



];

const credentialFilters = ["All", "Certifications", "Seminars/Webinars", "Training", "Workshops"];



const experience = [

  {

    role: "Backend Developer",

    org: "Personal Projects",

    date: "2025 — Present",

    desc: "Building server-side features, connecting APIs to databases, and developing reliable foundations for web applications.",

  },

  {

    role: "Capstone Project",

    org: "Academic & Independent Work",

    date: "2025 — 2026",

    desc: "Planning and developing a capstone application, from defining its requirements to implementing and refining its core features.",

  },

  {

    role: "Learning Cybersecurity",

    org: "Continuous Development",

    date: "Ongoing",

    desc: "Studying security principles, networking, and common threats while building practical cybersecurity knowledge through ongoing learning.",

  },

];


const fade = {

  hidden: { opacity: 0, y: 36 },

  show: {

    opacity: 1,

    y: 0,

    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },

  },

};

function Reveal({ children, className = "", delay = 0 }) {

  return (

    <motion.div

      className={className}

      variants={fade}

      initial="hidden"

      whileInView="show"

      viewport={{ once: true, amount: 0.15 }}

      transition={{ delay }}

    >

      {children}

    </motion.div>

  );

}

function SectionHeading({ num, label, title }) {

  return (

    <div className="section-heading">

      <div className="section-meta">

        <span>{num} / 06</span>

        <span>{label}</span>

      </div>

      <Reveal>

        <h2>{title}</h2>

      </Reveal>

    </div>

  );

}

function ProjectVisual({ project }) {

  if (project.image) {

    return (

      <div className="project-art project-art-image" style={{ "--art": project.accent || "#d9d5ce" }}>

        <img className="project-preview-image" src={project.image} alt={`${project.title} website screenshot`} loading="lazy" />

      </div>

    );

  }

  return (

    <div

      className={"project-art " + (project.type || "editorial")}

      style={{ "--art": project.accent || "#d9d5ce" }}

    >

      <div className="art-browser">

        <div className="art-browser-top">

          <span>● ● ●</span>

          <span>STUDIO / PREVIEW</span>

          <span>↗</span>

        </div>

        {project.type === "dashboard" ? (

          <div className="mock-dashboard">

            <div className="mock-side">

              <i />

              <i />

              <i />

              <i />

            </div>

            <div className="mock-content">

              <small>ANALYTICS OVERVIEW</small>

              <strong>Insights at a glance.</strong>

              <div className="mock-stats">

                <b>24.8K</b>

                <b>+18.4%</b>

                <b>82.6%</b>

              </div>

              <div className="mock-bars">

                {[45, 68, 53, 82, 59, 96, 73, 88, 62, 100, 77, 91].map(

                  (v, i) => (

                    <i key={i} style={{ height: v + "%" }} />

                  ),

                )}

              </div>

            </div>

          </div>

        ) : project.type === "mobile" ? (

          <div className="mock-mobile">

            <div className="phone">

              <span>FORM / FLOW</span>

              <div className="phone-circle" />

              <strong>Made to move.</strong>

              <small>01 — DISCOVER MORE</small>

            </div>

            <div className="phone second">

              <span>YOUR NEXT IDEA</span>

              <strong>Explore the unexpected.</strong>

              <div className="phone-lines" />

            </div>

          </div>

        ) : (

          <div className="mock-editorial">

            <span>THE CREATIVE PRACTICE</span>

            <strong>

              FORM

              <br />

              <em>FOLLOWS</em>

              <br />

              FEELING.

            </strong>

            <div className="mock-editorial-foot">

              <span>Selected work — 2026</span>

              <span>↗</span>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

function ProjectCard({ project, index }) {

  const CardLink = project.link ? "a" : "div";

  return (

    <Reveal className="project-card">

      <CardLink

        className={project.link ? "project-card-link" : undefined}

        href={project.link || undefined}

        target={project.link ? "_blank" : undefined}

        rel={project.link ? "noreferrer" : undefined}

        aria-label={project.link ? `Visit ${project.title}` : undefined}

      >

        <div className="project-card-head">

          <span>({String(index + 1).padStart(2, "0")})</span>

          <span>{project.category}</span>

          <span>{project.year}</span>

        </div>

        <ProjectVisual project={project} />

        <div className="project-card-bottom">

          <div>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="tags">

              {(project.tags || []).map((t) => (

                <span key={t}>{t}</span>

              ))}

            </div>

          </div>

          {project.link ? (

            <span className="circle-link" aria-hidden="true">

              <ArrowUpRight />

            </span>

          ) : (

            <span

              className="circle-link disabled"

              title="Add a project URL to activate"

            >

              <ArrowUpRight />

            </span>

          )}

        </div>

      </CardLink>

    </Reveal>

  );

}



function CredentialsSection() {

  const [activeFilter, setActiveFilter] = useState("All");

  const visibleCredentials = credentials.filter(

    (item) =>

      Boolean(item.file?.trim()) &&

      (activeFilter === "All" || item.category === activeFilter)

  );



  return (

    <section id="certifications" className="credentials-section container">

      <SectionHeading

        num="04"

        label="CERTIFICATIONS & TRAINING"

        title={<>CERTIFICATIONS <em>& TRAINING.</em></>}

      />

      <div className="credentials-layout">

        <Reveal className="credentials-intro">

          <span className="eyebrow">MY CREDENTIALS</span>

          <h3>Learning,<br />Training,<br /><em>Certified.</em></h3>

          <p>A collection of certifications, training programs, workshops, and seminars that reflect my continued professional growth.</p>

          <div className="credentials-decoration" aria-hidden="true">✳</div>

        </Reveal>

        <div className="credentials-main">

          <div className="credentials-filters" role="group" aria-label="Filter credentials">

            {credentialFilters.map((filter) => (

              <button

                type="button"

                key={filter}

                className={activeFilter === filter ? "credentials-filter active" : "credentials-filter"}

                onClick={() => setActiveFilter(filter)}

                aria-pressed={activeFilter === filter}

              >

                {filter}

              </button>

            ))}

          </div>

          {visibleCredentials.length ? (

            <div className="credentials-grid">

              {visibleCredentials.map((item) => {

                const isPdf = /\.pdf(?:[?#].*)?$/i.test(item.file);

                const isImage = /\.(?:png|jpe?g|webp|gif|avif|jfif)(?:[?#].*)?$/i.test(item.file);

                return (

                  <Reveal key={item.id} className="credential-card">

                    <div className="credential-icon" aria-hidden="true">

                      {isImage ? <FileImage size={32} strokeWidth={1.5} /> : isPdf ? <FileText size={32} strokeWidth={1.5} /> : <Award size={32} strokeWidth={1.5} />}

                    </div>

                    <div className="credential-content">

                      <span className="credential-type">{item.category === "Certifications" ? "CERTIFICATION" : item.category.slice(0, -1).toUpperCase()}</span>

                      <h4>{item.title}</h4>

                      <p>{item.issuer}</p>

                      <span className="credential-date"><CalendarDays size={14} /> {item.date}</span>

                      <a className="credential-view" href={item.file} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} ${isPdf ? "PDF" : "file"}`}>

                        <Eye size={15} /> VIEW {isPdf ? "PDF" : isImage ? "IMAGE" : "FILE"} <ArrowUpRight size={14} />

                      </a>

                    </div>

                    <a className="credential-arrow" href={item.file} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title}`}><ArrowUpRight size={20} /></a>

                  </Reveal>

                );

              })}

            </div>

          ) : (

            <p className="credentials-empty-state" role="status" aria-live="polite">

              {activeFilter === "All"

                ? "Certificates and training records will appear here when available."

                : `No ${activeFilter.toLowerCase()} are available yet.`}

            </p>

          )}

        </div>

      </div>

    </section>

  );

}



// Removes the near-white BACKGROUND connected to the photo's edges.

// It deliberately does not erase enclosed white areas such as a shirt.

// For perfect hair edges, use professionally cut-out transparent PNGs instead.

async function makeBackgroundTransparent(source) {

  const image = new Image();

  image.src = source;

  await image.decode();



  const canvas = document.createElement("canvas");

  canvas.width = image.naturalWidth;

  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) return source;

  context.drawImage(image, 0, 0);



  const { width, height } = canvas;

  const frame = context.getImageData(0, 0, width, height);

  const pixels = frame.data;

  const visited = new Uint8Array(width * height);

  const queue = new Int32Array(width * height);

  let head = 0;

  let tail = 0;



  // Only flood-fill pale, neutral pixels reachable from the outer border.

  const isBackground = (index) => {

    const offset = index * 4;

    const red = pixels[offset];

    const green = pixels[offset + 1];

    const blue = pixels[offset + 2];

    return (

      Math.min(red, green, blue) >= 222 &&

      Math.max(red, green, blue) - Math.min(red, green, blue) <= 24

    );

  };



  const enqueue = (index) => {

    if (visited[index] || !isBackground(index)) return;

    visited[index] = 1;

    queue[tail++] = index;

  };



  for (let x = 0; x < width; x++) {

    enqueue(x);

  }
  for (let y = 0; y < height; y++) {

    enqueue(y * width);

    enqueue(y * width + width - 1);

  }



  while (head < tail) {

    const index = queue[head++];

    pixels[index * 4 + 3] = 0;

    const x = index % width;

    if (x > 0) enqueue(index - 1);

    if (x < width - 1) enqueue(index + 1);

    if (index >= width) enqueue(index - width);

    if (index < width * (height - 1)) enqueue(index + width);

  }



  // Soften the one-pixel halo along the removed background boundary.

  for (let i = 0; i < tail; i++) {

    const index = queue[i];

    const x = index % width;

    const neighbors = [

      x > 0 ? index - 1 : -1,

      x < width - 1 ? index + 1 : -1,

      index >= width ? index - width : -1,

      index < width * (height - 1) ? index + width : -1,

    ];
    for (const neighbor of neighbors) {

      if (neighbor < 0 || visited[neighbor]) continue;

      const offset = neighbor * 4;

      const whiteness = Math.min(pixels[offset], pixels[offset + 1], pixels[offset + 2]);

      if (whiteness > 180) {

        pixels[offset + 3] = Math.min(pixels[offset + 3], Math.round(255 * (235 - whiteness) / 55));

      }

    }

  }



  context.putImageData(frame, 0, 0);

  return new Promise((resolve) => canvas.toBlob((blob) => {

    resolve(blob ? URL.createObjectURL(blob) : source);

  }, "image/png"));

}



const aboutImages = [
  "/aboutme/Image1.jfif",
  "/aboutme/Image2.jfif",
  "/aboutme/Image3.jpg",
];

function AboutCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutImages.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  const image = aboutImages[activeIndex];

  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.img
        key={image}
        className="about-image-slide"
        src={image}
        alt={`About me photo ${activeIndex + 1}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
    </AnimatePresence>
  );
}

function App() {

  const [menu, setMenu] = useState(false);



  // Eye-controlled theme: open eyes = light, closed eyes = dark.

  const [darkMode, setDarkMode] = useState(() => {

    try {

      return window.localStorage.getItem("portfolio-theme") === "dark";

    } catch {

      return false;

    }

  });



  useEffect(() => {

    document.documentElement.setAttribute(

      "data-theme",

      darkMode ? "dark" : "light"

    );

    try {

      window.localStorage.setItem(

        "portfolio-theme",

        darkMode ? "dark" : "light"

      );

    } catch {

      // Storage may be unavailable in private browsing.

    }

  }, [darkMode]);



  const toggleTheme = () => setDarkMode((current) => !current);



  // Light photo: remove white backdrop. Dark photo: use white-suit image.

  // Use only the two files already in client/public.

  const [portraitSources, setPortraitSources] = useState({

    open: "/MyImage.jfif",

    // Reuse your previously generated white-suit, eyes-closed portrait.

    closed: "/MyImageClosed.png",

  });



  useEffect(() => {

    let active = true;

    let generated = [];

    Promise.all([

      makeBackgroundTransparent("/MyImage.jfif"),

      // Keep the existing closed-eyes portrait unchanged; CSS blends its border.

      Promise.resolve("/MyImageClosed.png"),

    ])

      .then(([open, closed]) => {

        generated = [open, closed].filter((url) => url.startsWith("blob:"));

        if (active) setPortraitSources({ open, closed });

        else generated.forEach((url) => URL.revokeObjectURL(url));

      })

      .catch((error) => console.warn("Portrait background processing failed:", error));

    return () => {

      active = false;

      generated.forEach((url) => URL.revokeObjectURL(url));

    };

  }, []);





  const [projects, setProjects] = useState(demoProjects);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [status, setStatus] = useState("");

  const [sending, setSending] = useState(false);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {

    stiffness: 100,

    damping: 30,

    restDelta: 0.001,

  });

  useEffect(() => {

    fetch(`${API_BASE_URL}/api/projects`)

      .then((r) => (r.ok ? r.json() : []))

      .then((data) => {

        if (Array.isArray(data) && data.length) {

          setProjects(data.map((project, index) => {

            if (project.title?.trim().toUpperCase() === "TRUSTPERMIT") {

              return {

                ...project,

                image: project.image || "/projects/project1.png",

                link: project.link || "https\://trustpermit-webclient.vercel.app/",

              };

            }

            if (index === 1) {

              return {

                ...project,

                image: "/projects/project2.png",

                link: project.link || "https\\://figura-client.vercel.app/",

              };

            }

            if (index === 2) {
              return {
                ...project,
                image: "/projects/project3.png",
              };
            }

            return project;

          }));

        }

      })

      .catch(() => {});

  }, []);

  async function send(e) {

    e.preventDefault();

    setSending(true);

    setStatus("");

    try {

      const r = await fetch(`${API_BASE_URL}/api/contact`, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(form),

      });

      const responseBody = await r.text();

      let data = {};

      if (responseBody) {

        try {

          data = JSON.parse(responseBody);

        } catch {

          data = { error: responseBody };

        }

      }

      if (!r.ok) {

        throw Error(data.error || `Unable to send (HTTP ${r.status})`);

      }

      setStatus("Thanks! Your message was saved.");

      setForm({ name: "", email: "", message: "" });

    } catch (err) {

      setStatus(

        err instanceof TypeError

          ? "Could not reach the contact service. Check that the backend is running."

          : err.message || "Unable to send your message.",

      );

    } finally {

      setSending(false);

    }

  }

  return (

    <>

      <motion.div className="progress" style={{ scaleX }} />

      <header className="nav">

        <a href="#home" className="logo">

          JDCCF<span></span>

        </a>

        <nav className={menu ? "nav-links open" : "nav-links"}>

          {[

            ["Home", "#home"],

            ["About", "#about"],

            ["Work", "#work"],

            ["Experience", "#experience"],

            ["Certifications", "#certifications"],

            ["Contact", "#contact"],

          ].map(([n, h]) => (

            <a key={n} href={h} onClick={() => setMenu(false)}>

              {n}

            </a>

          ))}

        </nav>

        <a href="#contact" className="nav-cta">

          LET'S TALK <ArrowUpRight size={15} />

        </a>

        <button

          className="menu-toggle"

          aria-label="Toggle navigation"

          onClick={() => setMenu(!menu)}

        >

          {menu ? <X /> : <Menu />}

        </button>

      </header>

      <main>

        <section id="home" className="hero container">

          <div className="hero-kicker">

            <span>

              <i className="status-dot" /> {profile.availability}

            </span>

            <span>PORTFOLIO / 2026</span>

          </div>

          <div className="hero-title">

            <motion.div

              initial={{ opacity: 0, y: 80 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}

            >

              <span className="outline">{profile.firstName}</span>

            </motion.div>

            <motion.div

              initial={{ opacity: 0, y: 80 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{

                duration: 1,

                delay: 0.13,

                ease: [0.22, 1, 0.36, 1],

              }}

            >

              <span>{profile.lastName}</span>

            </motion.div>

          </div>

          <div className="hero-bottom">

            <div className="hero-description">

              <span className="eyebrow">HELLO, I'M A</span>

              <h1>{profile.role}</h1>

              <p>{profile.tagline}</p>

              <a className="pill dark" href="#work">

                EXPLORE MY WORK <ArrowUpRight size={16} />

              </a>

            </div>

            <div className="portrait-wrap">

              {/* Accessible full-portrait toggle; both photos share one frame. */}

              <button

                type="button"

                className="portrait-graphic eye-toggle"

                onClick={toggleTheme}

                aria-label={

                  darkMode

                    ? "Open my eyes and switch to light mode"

                    : "Close my eyes and switch to dark mode"

                }

                aria-pressed={darkMode}

                title={darkMode ? "Wake up: light mode" : "Sleep: dark mode"}

              >

                <img

                  className="portrait-image portrait-open"

                  src={portraitSources.open}

                  alt={`${profile.firstName} ${profile.lastName}, eyes open`}

                />

                <img

                  className={`portrait-image portrait-closed${darkMode ? " is-visible" : ""}`}

                  src={portraitSources.closed}

                  alt=""

                  aria-hidden="true"

                />

                <span className="eye-toggle-hint" aria-hidden="true">

                  {darkMode ? "CLICK TO WAKE UP ☀" : "CLICK TO SLEEP ☾"}

                </span>

              </button>

            </div>

            <div className="hero-aside">

              <span>01 — 06</span>

              <span>{profile.location}</span>

              <a href="#about">

                SCROLL TO EXPLORE <ArrowDown size={15} />

              </a>

            </div>

          </div>

          <div className="hero-footer">

            <span>INDEPENDENT CREATIVE PORTFOLIO</span>

            <span>SCROLL DOWN ↓</span>

          </div>

        </section>

        <section id="about" className="about-section container">

          <SectionHeading

            num="01"

            label="A LITTLE INTRODUCTION"

            title={

              <>

                ABOUT <em>ME.</em>

              </>

            }

          />

          <div className="about-grid">

            <Reveal>

              <div className="about-visual">

                <AboutCarousel />

                <div className="about-visual-shade" aria-hidden="true" />

                <span>THINK / CREATE / BUILD</span>

              <span>ALWAYS CURIOUS. ALWAYS EXPLORING.</span>

              </div>

            </Reveal>

            <Reveal>

              <div className="about-copy">

                <span className="eyebrow">THE PERSON BEHIND THE CODE</span>

                <h3>

                  Curiosity meets <em>craft.</em>

                </h3>

                <p>{profile.about}</p>

                <a href="#contact" className="text-link">

                  LET'S CONNECT <ArrowUpRight size={17} />

                </a>

              </div>

            </Reveal>

          </div>

          <SkillsMarquee />
        </section>

        <section id="work" className="work-section container">

          <SectionHeading

            num="02"

            label="THINGS I'VE CREATED"

            title={

              <>

                SELECTED <em>WORK.</em>

              </>

            }

          />

          <div className="work-intro">

            <p>

              A collection of projects where creativity meets functionality.

              Replace these demo projects with your own work.

            </p>

            <span>2024 — 2026 ↗</span>

          </div>

          <div className="projects-grid">

            {projects.map((p, i) => (

              <ProjectCard key={p._id || i} project={p} index={i} />

            ))}

          </div>

        </section>

        <section id="experience" className="experience-section">

          <div className="container">

            <SectionHeading

              num="03"

              label="THE JOURNEY SO FAR"

              title={

                <>

                  EXPERI<em>ENCE.</em>

                </>

              }

            />

            <div className="experience-grid">

              <Reveal>

                <div className="experience-lead">

                  <span>THE STORY SO FAR</span>

                  <p>

                    Every step is an opportunity to learn, improve, and create

                    something meaningful.

                  </p>

                  <div className="exp-decoration">✳</div>

                </div>

              </Reveal>

              <div className="timeline">

                {experience.map((x, i) => (

                  <Reveal key={i}>

                    <div className="timeline-item">

                      <span className="timeline-index">0{i + 1}</span>

                      <div>

                        <h3>{x.role}</h3>

                        <span>{x.org}</span>

                        <p>{x.desc}</p>

                      </div>

                      <time>{x.date}</time>

                    </div>

                  </Reveal>

                ))}

              </div>

            </div>

          </div>

        </section>

        <section className="statement-section container">

          <Reveal>

            <span className="eyebrow">WHAT DRIVES ME</span>

            <h2>

              IN CODE

              <br />

              <span>WE TRUST.</span>

            </h2>

            <p>Let's make something that matters.</p>

          </Reveal>

        </section>

        <CredentialsSection />

        <section id="contact" className="contact-section container">

          <SectionHeading

            num="05"

            label="LET'S MAKE IT HAPPEN"

            title={

              <>

                HAVE A PROJECT

                <br />

                <em>IN MIND?</em>

              </>

            }

          />

          <div className="contact-grid">

            <div className="contact-left">

              <p>

                Have an idea, an opportunity, or just want to say hello? I'd

                love to hear from you.

              </p>

              <a
                className="contact-email"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Email ${profile.email} using Gmail`}
              >

                {profile.email} <ArrowUpRight size={20} />

              </a>

              <div className="socials">

                {profile.socials.map((s) => (

                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer">

                    {s.name}

                    <ArrowUpRight size={14} />

                  </a>

                ))}

              </div>

            </div>

            <form className="contact-form" onSubmit={send}>

              <label>

                YOUR NAME

                <input

                  required

                  maxLength={100}

                  value={form.name}

                  onChange={(e) => setForm({ ...form, name: e.target.value })}

                  placeholder="How should I call you?"

                />

              </label>

              <label>

                EMAIL ADDRESS

                <input

                  type="email"

                  required

                  maxLength={200}

                  value={form.email}

                  onChange={(e) => setForm({ ...form, email: e.target.value })}

                  placeholder="you@example.com"

                />

              </label>

              <label>

                YOUR MESSAGE

                <textarea

                  required

                  maxLength={3000}

                  rows="4"

                  value={form.message}

                  onChange={(e) =>

                    setForm({ ...form, message: e.target.value })

                  }

                  placeholder="Tell me a little about your project..."

                />

              </label>

              <button type="submit" className="pill dark" disabled={sending}>

                {sending ? "SENDING..." : "SEND MESSAGE"}{" "}

                <MoveRight size={17} />

              </button>

              {status && (

                <p className="form-status" role="status">

                  {status}

                </p>

              )}

            </form>

          </div>

          <footer>

            <span>

              © {new Date().getFullYear()} {profile.firstName}{" "}

              {profile.lastName}

            </span>

            <span>DESIGNED WITH PURPOSE. BUILT WITH CARE.</span>

            <a href="#home">BACK TO TOP ↑</a>

          </footer>

        </section>

      </main>

    </>

  );

}

export default App;
