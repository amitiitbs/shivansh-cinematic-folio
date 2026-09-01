import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Menu,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";

import portrait from "@/assets/shivansh-portrait-placeholder.jpg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LINKEDIN = "https://www.linkedin.com/in/shivansh-mishra-940b25379";
const GITHUB = "https://github.com/Shivansh15-web";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shivansh Mishra — Full Stack Developer" },
      {
        name: "description",
        content:
          "Shivansh Mishra is a Full Stack Developer building modern, scalable and thoughtful digital experiences.",
      },
      { property: "og:title", content: "Shivansh Mishra — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Shivansh Mishra is a Full Stack Developer building modern, scalable and thoughtful digital experiences.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navItems = ["Home", "About", "Work", "Skills", "Contact"];

const reveal = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="hover:text-foreground">
      {children}
    </a>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>
      <nav className="page-shell flex h-[72px] items-center justify-between" aria-label="Primary">
        <a href="#home" className="text-[11px] font-medium uppercase text-foreground">
          Shivansh
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-5 text-[11px] text-soft md:flex">
          <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>
          <ExternalLink href={GITHUB}>GitHub</ExternalLink>
          <span className="menu-pill">Menu</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="heroOutline" size="icon" className="rounded-full md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-border bg-background px-6 pt-20 text-foreground">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-5">
              {navItems.map((item) => (
                <SheetClose asChild key={item}>
                  <a href={`#${item.toLowerCase()}`} className="display-text text-5xl">
                    {item}
                  </a>
                </SheetClose>
              ))}
              <div className="mt-8 flex gap-3">
                <SocialButton href={LINKEDIN} label="LinkedIn"><Linkedin /></SocialButton>
                <SocialButton href={GITHUB} label="GitHub"><Github /></SocialButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Button asChild variant="circle" size="circle">
      <a href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>
    </Button>
  );
}

function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const cursor = document.querySelector<HTMLElement>("[data-cursor]");
    if (!cursor) return;
    const move = (event: MouseEvent) => {
      cursor.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursor.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      cursor.dataset["active"] = String(Boolean(target.closest("a, button")));
      cursor.dataset["project"] = String(Boolean(target.closest("[data-project]")));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return <div data-cursor aria-hidden="true"><span>View</span></div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="micro-label flex items-center gap-2"><span className="status-dot" />{children}</div>;
}

function Index() {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.2 }, variants: reveal, transition: { duration: 0.8 } };

  return (
    <div className="site-frame">
      <CustomCursor />
      <Navigation />

      <main>
        <section id="home" className="hero">
          <div className="hero-light" />
          <motion.img
            initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            src={portrait}
            alt="Anonymous portrait placeholder for Shivansh Mishra"
            width={1024}
            height={1536}
            className="hero-portrait"
            fetchPriority="high"
          />
          <div className="page-shell hero-grid">
            <motion.div
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="hero-copy"
            >
              <motion.div variants={reveal} transition={{ duration: 0.7 }}><SectionLabel>Full Stack Developer</SectionLabel></motion.div>
              <h1 className="hero-title" aria-label="Building digital experiences">
                {['Building', 'digital', 'experiences.'].map((line) => (
                  <motion.span key={line} variants={reveal} transition={{ duration: 0.9 }}>{line}</motion.span>
                ))}
              </h1>
              <motion.p variants={reveal} transition={{ duration: 0.8 }} className="hero-description">
                Full Stack Developer focused on creating modern, scalable and thoughtful digital experiences.
              </motion.p>
              <motion.div variants={reveal} transition={{ duration: 0.8 }} className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="hero"><a href="#work">View My Work <ArrowDown /></a></Button>
                <Button asChild variant="heroOutline" size="hero"><a href="#contact">Let's Connect</a></Button>
              </motion.div>
            </motion.div>

            <div className="hero-service" aria-label="Services">
              <span>I build</span><strong>Web experiences</strong><strong>Full stack</strong><strong>Interactive</strong>
            </div>

            <motion.div className="float-card float-card-one" animate={reducedMotion ? {} : { y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <span>Full stack</span><strong>Frontend</strong><strong>Backend</strong><strong>Database</strong>
            </motion.div>
            <motion.div className="float-card float-card-two" animate={reducedMotion ? {} : { y: [0, 5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
              <span>Building</span><strong>Digital</strong><strong>Experiences</strong>
            </motion.div>
            <motion.div className="float-card float-card-three" animate={reducedMotion ? {} : { y: [0, -4, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
              <span>Open to</span><strong>Projects</strong><strong>Collaborations</strong>
            </motion.div>

            <div className="hero-bottom">
              <div><span className="micro-label">Available for</span><p>Web projects / Collaborations</p></div>
              <div className="flex gap-5 text-[11px] text-soft"><ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink><ExternalLink href={GITHUB}>GitHub</ExternalLink></div>
            </div>
          </div>
        </section>

        <section id="about" className="section-space pt-24">
          <motion.div {...motionProps} className="page-shell">
            <article className="about-panel">
              <div className="flex items-center gap-3 text-muted"><Globe2 className="size-5 stroke-[1.5]" /><span className="micro-label">About Shivansh</span></div>
              <p className="about-statement">I build modern digital experiences with a focus on clean interfaces, thoughtful engineering and scalable web solutions.</p>
              <div className="flex items-end justify-between border-t border-border pt-8">
                <p className="max-w-xs text-sm leading-relaxed text-soft">A full stack practice shaped by clarity, care and intentional problem-solving.</p>
                <div className="flex gap-2"><SocialButton href={LINKEDIN} label="LinkedIn"><Linkedin /></SocialButton><SocialButton href={GITHUB} label="GitHub"><Github /></SocialButton></div>
              </div>
            </article>
          </motion.div>
        </section>

        <section id="skills" className="section-space">
          <div className="page-shell">
            <motion.div {...motionProps} className="section-heading-grid">
              <SectionLabel>Capability index</SectionLabel>
              <h2 className="section-title">Across the<br /><span className="text-primary">whole stack.</span></h2>
            </motion.div>
            <div className="capability-grid">
              {[
                ["01", "Frontend", "Interfaces & interaction", Layers3],
                ["02", "Backend", "Systems & logic", Code2],
                ["03", "Database", "Structure & data", Database],
                ["04", "Tools", "Workflow & delivery", Wrench],
              ].map(([number, title, detail, Icon], index) => {
                const CapabilityIcon = Icon as typeof Layers3;
                return (
                  <motion.article {...motionProps} transition={{ duration: 0.8, delay: index * 0.08 }} className="capability-row" key={title as string}>
                    <span className="mono-label">{number as string}</span>
                    <CapabilityIcon className="capability-icon" />
                    <h3>{title as string}</h3><p>{detail as string}</p><span className="status-dot" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space overflow-hidden">
          <div className="page-shell">
            <motion.div {...motionProps} className="evolving-grid">
              <h2 className="section-title">Building.<br />Learning.<br /><span className="text-primary">Evolving.</span></h2>
              <div className="verification-note">
                <span className="micro-label">The record</span>
                <div className="timeline-line" />
                <p>Experience and education details will appear here once verified source material is available.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="work" className="section-space">
          <div className="page-shell">
            <motion.div {...motionProps} className="section-heading-grid mb-20">
              <SectionLabel>Selected projects</SectionLabel>
              <h2 className="section-title">Selected<br />Work.</h2>
            </motion.div>
            <motion.article {...motionProps} data-project className="work-index">
              <div className="work-visual"><Code2 className="size-10 stroke-[1]" /><span>Project archive</span></div>
              <div className="work-copy"><span className="mono-label">01 — ONWARD</span><h3>Case studies in progress.</h3><p>Verified project names, links and visuals will be added here without substituting fictional work.</p></div>
              <ArrowUpRight className="work-arrow" />
            </motion.article>
          </div>
        </section>

        <section className="statement-section">
          <motion.div {...motionProps} className="page-shell">
            <p className="statement">Code is not just<br />about making things work.<br /><span>It’s about making them feel right.</span></p>
          </motion.div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-shell">
            <motion.div {...motionProps}>
              <SectionLabel>Start something</SectionLabel>
              <h2 className="contact-title">Let’s build<br />something <span>meaningful.</span></h2>
              <div className="contact-bottom">
                <p>Have an idea, opportunity or project in mind?<br />Let’s turn it into something real.</p>
                <Button asChild variant="hero" size="hero"><a href={LINKEDIN} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight /></a></Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-shell footer-grid"><span>Shivansh Mishra</span><span>Full Stack Developer</span><div><ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink><ExternalLink href={GITHUB}>GitHub</ExternalLink></div></div>
        <div className="page-shell mt-8 border-t border-border pt-5 text-[10px] text-muted">© 2026 Shivansh Mishra</div>
      </footer>
    </div>
  );
}
