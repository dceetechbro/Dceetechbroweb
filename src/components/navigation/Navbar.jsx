import { useState } from 'react';

import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a
          className="navbar__brand"
          href="/"
          aria-label="Dceetechbro home"
          onClick={closeMenu}
        >
          <img
            className="navbar__logo"
            src="/images/dceelogo.png"
            alt="Dceetechbro"
          />
        </a>

        <button
          className={`navbar__menu-toggle ${
            isMenuOpen
              ? 'navbar__menu-toggle--open'
              : ''
          }`}
          type="button"
          aria-label={
            isMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() =>
            setIsMenuOpen((current) => !current)
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          id="primary-navigation"
          className={`navbar__links ${
            isMenuOpen
              ? 'navbar__links--open'
              : ''
          }`}
          aria-label="Primary navigation"
        >
          <a href="#solutions" onClick={closeMenu}>
            Solutions
          </a>

          <a href="#talent" onClick={closeMenu}>
            Talent
          </a>

          <a href="#work" onClick={closeMenu}>
            Work
          </a>

          <a href="/about" onClick={closeMenu}>
            Company
          </a>

          <a
            className="navbar__mobile-cta"
            href="#contact"
            onClick={closeMenu}
          >
            Start a project
          </a>
        </nav>

        <a
          className="navbar__cta"
          href="#contact"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}

export default Navbar;