'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Header.module.css';

const navItems = [
  { name: 'About', hash: '#about' },
  { name: 'Projects', hash: '#projects' },
  { name: 'Skills', hash: '#skills' },
  { name: 'Credentials', hash: '#education' },
  { name: 'Contact', hash: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // focused in the center-top of the screen
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.querySelector(item.hash);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.querySelector(item.hash);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetEl = document.querySelector(hash);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      // Update active state immediately
      setActiveSection(hash);
      // Soft-push hash history without full jump
      window.history.pushState(null, '', hash);
    }
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <nav className={styles.nav}>
          <a href="#" className={styles.logo} onClick={(e) => handleLinkClick(e, '#about')}>
            SEJAL P <span className={styles.logoDot} />
          </a>

          {/* Desktop Menu */}
          <ul className={styles.menuList}>
            {navItems.map((item) => (
              <li key={item.hash}>
                <a
                  href={item.hash}
                  onClick={(e) => handleLinkClick(e, item.hash)}
                  className={`${styles.link} ${activeSection === item.hash ? styles.linkActive : ''}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.toggleActive : ''}`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.hamburger} />
          </button>
        </nav>
      </header>

      {/* Mobile Glass Drawer */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.hash}
            href={item.hash}
            onClick={(e) => handleLinkClick(e, item.hash)}
            className={`${styles.mobileLink} ${activeSection === item.hash ? styles.mobileLinkActive : ''}`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </>
  );
}
