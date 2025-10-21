"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeaderProps {
  showNavLinks?: boolean;
}

export default function Header({ showNavLinks = true }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sw-nav ${isScrolled ? "sw-nav-scrolled" : ""}`}>
      <div className="sw-nav-container">
        <Link href="/" className="sw-nav-brand">
          <span className="sw-brand-icon">🚀</span>
          {!isScrolled && <span className="sw-brand-text">Skywalking.dev</span>}
        </Link>

        {showNavLinks && (
          <>
            <div className="sw-nav-links">
              <a href="#servicios" className="sw-nav-link">Servicios</a>
              <a href="#contacto" className="sw-nav-link sw-cta-button">Contáctanos</a>
            </div>

            <button
              className={`sw-mobile-menu-button ${isMobileMenuOpen ? "open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {showNavLinks && (
        <div className={`sw-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <a
            href="#servicios"
            className="sw-mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Servicios
          </a>
          <a
            href="#contacto"
            className="sw-mobile-menu-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contáctanos
          </a>
        </div>
      )}
    </nav>
  );
}
