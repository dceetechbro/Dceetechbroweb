import './footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <a
              className="footer__logo-link"
              href="/"
              aria-label="Dceetechbro home"
            >
              <img
                className="footer__logo"
                src="/images/dceelogo.png"
                alt="Dceetechbro"
              />
            </a>

            <p>
              Technology. Talent. Solutions.
            </p>

            <span>
              Building technology and connecting businesses
              with the talent to move their ideas forward.
            </span>
          </div>

          <nav
            className="footer__nav"
            aria-label="Footer navigation"
          >
            <div>
              <span>Explore</span>

              <a href="#solutions">Solutions</a>
              <a href="#talent">Talent</a>
              <a href="#work">Work</a>
              <a href="#company">Company</a>
            </div>

            <div>
              <span>Start</span>

              <a href="#contact">Start a project</a>
              <a href="#solutions">Build a solution</a>
              <a href="#talent">Hire talent</a>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} Dceetechbro. All rights reserved.
          </span>

          <a href="/admin/login">
            Admin portal
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;