'use client';

import { useState, useRef } from 'react';
import VideoIntro from '@/components/VideoIntro';
import Header from '@/components/Header';

/* ─── Reusable section wrapper ─────────────────────────────── */
function Section({ id, children, style }) {
  return (
    <section id={id} style={{
      padding: 'clamp(4rem, 10vh, 7rem) clamp(1.5rem, 6vw, 5rem)',
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
      ...style,
    }}>
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.68rem',
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'rgba(255,160,60,0.7)',
      marginBottom: '1.25rem',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <span style={{ display:'inline-block', width:5, height:5, borderRadius:'50%', background:'#ff9a40', boxShadow:'0 0 8px 2px rgba(255,154,64,.6)' }} />
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', 'Impact', sans-serif",
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      color: '#fff',
      letterSpacing: '0.04em',
      lineHeight: 0.9,
      marginBottom: 'clamp(2rem, 5vh, 3.5rem)',
    }}>
      {children}
    </h2>
  );
}

/* ─── Premium Glass Card with Mouse Hover Glow Spotlight ───── */
function GlassCard({ children, style, accentLine = false, hoverGlow = true }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        padding: '2.2rem 2rem',
        background: 'rgba(255, 255, 255, 0.015)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.4s',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        borderColor: isHovered ? 'rgba(255, 154, 64, 0.25)' : 'rgba(255, 255, 255, 0.06)',
        boxShadow: isHovered 
          ? '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 154, 64, 0.04)' 
          : 'none',
        ...style,
      }}
    >
      {accentLine && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 154, 64, 0.6), transparent)'
        }} />
      )}

      {hoverGlow && isHovered && (
        <div style={{
          position: 'absolute',
          top: coords.y - 120,
          left: coords.x - 120,
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(255, 154, 64, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Projects data ─────────────────────────────────────────── */
const projects = [
  {
    title: 'AI Code Arena',
    tag: 'Software Engineering · AI',
    desc: 'Built a multi-model code evaluation platform supporting GPT, Gemini, and Claude. Features automated benchmarking, code execution, complexity analysis, and performance comparison.',
    stack: ['FastAPI', 'PostgreSQL', 'Next.js', 'Docker', 'Python'],
    github: 'https://github.com/sejalP07/ai-code-arena',
  },

  {
    title: 'Research Copilot',
    tag: 'AI · RAG System',
    desc: 'Developed an intelligent research assistant with document ingestion, semantic search, citation generation, and AI-powered question answering using Retrieval-Augmented Generation.',
    stack: ['FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'Python'],
    github: 'https://github.com/sejalP07/research-copilot',
  },

  {
    title: 'E-Commerce Backend Platform',
    tag: 'Backend · API Development',
    desc: 'Designed and developed scalable REST APIs for user authentication, product catalog management, shopping cart operations, and order processing with secure JWT authentication.',
    stack: ['FastAPI', 'PostgreSQL', 'Docker', 'JWT', 'Python'],
    github: '#',
  },

  {
    title: 'Capacity Management Simulator',
    tag: 'Simulation · Operations Research',
    desc: 'Developed a capacity planning and resource allocation simulator to analyze workload distribution, utilization rates, bottlenecks, and operational efficiency. Implemented scenario-based simulations and performance metrics visualization for decision-making.',
    stack: ['Python', 'Simulation', 'Data Analysis', 'Optimization'],
    github: 'https://github.com/sejalP07/Capacity-Management-Simulator',
  },

  {
    title: 'Smart Attendance & College Management System',
    tag: 'Full Stack · Web Application',
    desc: 'Developed a QR-based attendance tracking and college management platform with role-based authentication, attendance reporting, and automated record management.',
    stack: ['React.js', 'Flask', 'MySQL', 'Python'],
    github: 'https://github.com/sejalP07/Smart-QRCode-Attendance-System',
  }
];

/* ─── Skills data ────────────────────────────────────────────── */
const skillGroups = [
  {
    label: 'Languages',
    items: ['Java', 'Python', 'SQL', 'JavaScript']
  },

  {
    label: 'Backend',
    items: ['FastAPI', 'Flask', 'REST APIs', 'JWT Authentication']
  },

  {
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'HTML', 'CSS', 'Bootstrap']
  },

  {
    label: 'Databases',
    items: ['PostgreSQL', 'MySQL', 'MongoDB']
  },

  {
    label: 'Cloud & DevOps',
    items: ['Docker', 'Git', 'GitHub', 'Linux', 'GCP']
  },

  {
    label: 'AI & Data',
    items: ['TensorFlow', 'Scikit-learn', 'Apache Spark', 'Hadoop']
  },

  {
    label: 'Core CS',
    items: [
      'Data Structures',
      'Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'System Design'
    ]
  }
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('sejalmesta539@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('9480418141');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <main style={{ background: '#030306', color: '#fff', overflowX: 'hidden' }}>

      {/* FLOATING HEADER */}
      <Header />

      {/* HERO */}
      <VideoIntro videoSrc="/hero-video.mp4" />

      {/* ABOUT */}
      <div style={{ background: '#060609', position: 'relative' }}>
        <Section id="about">
          <SectionLabel>About Me</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <SectionTitle>Motivated.<br />Curious.<br />Builder.</SectionTitle>
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.1rem, 1.7vw, 1.25rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              MCA graduate passionate about Software Engineering, Backend Development, Cloud Computing, and AI-powered applications. Experienced in building scalable systems using Python, FastAPI, PostgreSQL, Docker, and modern web technologies.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                Passionate about problem-solving, enterprise application development, and emerging technologies in cloud and AI. Currently pursuing MCA 2024–2026.
              </p>
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'CGPA', value: '8.58' },
                  { label: 'Grad Year', value: '2026' },
                  { label: 'Projects', value: '5+' },
                  { label: 'DSA Solved', value: '100+' },
                ].map(s => (
                  <div key={s.label} style={{
                    textAlign: 'center',
                    padding: '1.2rem 1.8rem',
                    border: '1px solid rgba(255,160,60,0.15)',
                    borderRadius: '12px',
                    background: 'rgba(255,140,40,0.03)',
                    transition: 'all 0.3s ease',
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = 'rgba(255,160,60,0.35)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,154,64,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,160,60,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', color: '#ff9a40', lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* PROJECTS */}
      <div style={{ background: '#030306' }}>
        <Section id="projects">
          <SectionLabel>Projects</SectionLabel>
          <SectionTitle>Selected<br />Work</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map((p, i) => (
              <GlassCard key={p.title} accentLine={i === 0}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,160,60,0.75)', marginBottom: '0.75rem' }}>{p.tag}</p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', letterSpacing: '0.04em', color: '#fff', marginBottom: '1.1rem', lineHeight: 1.1 }}>{p.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.75rem' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {p.stack.map(t => (
                    <span key={t} style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,160,60,0.7)',
                      border: '1px solid rgba(255,160,60,0.18)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: 'rgba(255,140,40,0.02)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ff9a40';
                      e.currentTarget.style.borderColor = 'rgba(255,160,60,0.45)';
                      e.currentTarget.style.background = 'rgba(255,140,40,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,160,60,0.7)';
                      e.currentTarget.style.borderColor = 'rgba(255,160,60,0.18)';
                      e.currentTarget.style.background = 'rgba(255,140,40,0.02)';
                    }}>{t}</span>
                  ))}
                </div>
                {p.github && (
  <a
    href={p.github}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-block',
      marginTop: '1rem',
      color: '#ff9a40',
      textDecoration: 'none',
      fontSize: '0.8rem'
    }}
  >
    View on GitHub →
  </a>
)}
              </GlassCard>
            ))}
          </div>
        </Section>
      </div>

      {/* SKILLS */}
      <div style={{ background: '#060609' }}>
        <Section id="skills">
          <SectionLabel>Skills</SectionLabel>
          <SectionTitle>Technical<br />Arsenal</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {skillGroups.map(g => (
              <div key={g.label} style={{
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '1.75rem',
                background: 'rgba(255,255,255,0.01)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,160,60,0.2)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
              }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,160,60,0.65)', marginBottom: '1.2rem' }}>{g.label}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {g.items.map(item => (
                    <span key={item} style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.68rem',
                      color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255,255,255,0.02)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = 'rgba(255,160,60,0.45)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(255,154,64,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* EDUCATION & AWARDS */}
      <div style={{ background: '#030306' }}>
        <Section id="education">
          <SectionLabel>Education &amp; Achievements</SectionLabel>
          <SectionTitle>Credentials</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '🎓',
                title: 'MCA — Computer Applications',
                sub: 'RV Institute of Technology and Management',
                detail: 'Bangalore · 2024 – 2026 · CGPA 8.58',
              },
              {
                icon: '🏆',
                title: '2nd Prize — Code Quest',
                sub: 'St. Joseph University',
                detail: 'Competitive programming achievement',
              },
              {
              icon: '☁️',
                title: 'Microsoft Azure Fundamentals',
                 sub: 'Microsoft',
                detail: 'AZ-900 (Pursuing)',
              },
            {
              icon: '🤖',
              title: 'Introduction to Generative AI',
              sub: 'Google Cloud',
              detail: 'Certified',
              },
              {
                icon: '📜',
                title: 'Python Basics Certification',
                sub: 'HackerRank',
                detail: 'Verified programming credential',
              },
            ].map((item) => (
              <GlassCard key={item.title} hoverGlow={true}>
                <span style={{ fontSize: '1.75rem', marginBottom: '0.5rem', display: 'block' }}>{item.icon}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '0.04em', color: '#fff', lineHeight: 1.2, marginBottom: '0.25rem' }}>{item.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1rem', color: 'rgba(255,160,60,0.85)', marginBottom: '0.5rem' }}>{item.sub}</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}>{item.detail}</p>
              </GlassCard>
            ))}
          </div>
        </Section>
      </div>

      {/* CONTACT FOOTER */}
      <div style={{ background: '#060609', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Section id="contact" style={{ textAlign: 'center' }}>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2rem, 6vw, 5rem)', color: '#fff', letterSpacing: '0.04em', marginBottom: '1.5rem', lineHeight: 0.9 }}>
            Let&apos;s Build<br />Something Great
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem' }}>
            Open to internships, collaborations, and full-time opportunities.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>

            {/* Email Contact with Copy Button */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <a href="mailto:sejalmesta539@gmail.com" style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,160,60,0.9)',
                border: '1px solid rgba(255,160,60,0.3)',
                padding: '12px 24px',
                borderRadius: '100px',
                textDecoration: 'none',
                background: 'rgba(255,140,40,0.06)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,160,60,0.6)';
                e.currentTarget.style.background = 'rgba(255,140,40,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,160,60,0.9)';
                e.currentTarget.style.borderColor = 'rgba(255,160,60,0.3)';
                e.currentTarget.style.background = 'rgba(255,140,40,0.06)';
              }}>
                sejalmesta539@gmail.com
              </a>
              <button onClick={copyEmail} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
              title="Copy email to clipboard">
                {copiedEmail ? (
                  <span style={{ fontSize: '0.72rem', color: '#ff9a40', fontWeight: 'bold' }}>✓</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Phone Contact with Copy Button */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <a href="tel:+919480418141" style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 24px',
                borderRadius: '100px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'transparent';
              }}>
                +91 94804 18141
              </a>
              <button onClick={copyPhone} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
              }}
              title="Copy phone to clipboard">
                {copiedPhone ? (
                  <span style={{ fontSize: '0.72rem', color: '#ff9a40', fontWeight: 'bold' }}>✓</span>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
              </button>
            </div>
          
          </div>
          <div
  style={{
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
  }}
>
  {/* LinkedIn */}
  <a
    href="YOUR_LINKEDIN_URL"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#ffffff',
      transition: '0.3s',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zM3.743 5.18c.837 0 1.358-.554 1.358-1.248-.015-.709-.521-1.248-1.342-1.248S2.4 3.223 2.4 3.932c0 .694.521 1.248 1.327 1.248h.016zm4.1 8.214h2.4V9.359c0-.216.016-.432.08-.586.174-.431.57-.878 1.235-.878.87 0 1.218.662 1.218 1.633v3.866h2.4V9.25c0-2.22-1.184-3.253-2.764-3.253-1.274 0-1.845.7-2.165 1.193h.016V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
    </svg>
  </a>

  {/* GitHub */}
  <a
    href="https://github.com/sejalP07"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#ffffff',
      transition: '0.3s',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
      -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
      .07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
      -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.7 7.7 0 012-.27c.68 0 1.36.09 2 .27
      1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
      0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2
      0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  </a>
</div>

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.18)', marginTop: '4.5rem', textTransform: 'uppercase' }}>
            © 2026 Sejal P · Bangalore
          </p>
        </Section>
      </div>

    </main>
  );
}

