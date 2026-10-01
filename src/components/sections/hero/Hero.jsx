import './Hero.css';

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow">Technology. Talent. Solutions.</p>

          <h1 id="hero-title" className="hero__title">
            We build the technology
            <span>that moves businesses forward.</span>
          </h1>

          <p className="hero__description">
            Dceetechbro helps businesses turn ideas into digital products
            while connecting them with the technology talent they need to
            grow.
          </p>

          <div className="hero__actions">
            <a className="hero__button hero__button--primary" href="#solutions">
              Build a solution
              <span aria-hidden="true">↗</span>
            </a>

            <a className="hero__button hero__button--secondary" href="#talent">
              Hire talent
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__visual-card hero__visual-card--main">
            <span className="hero__visual-label">DCEETECHBRO</span>

            <div className="hero__visual-heading">
              <span>Ideas</span>
              <span>→</span>
              <span>Technology</span>
            </div>

            <div className="hero__visual-footer">
              <span>BUILD</span>
              <span>HIRE</span>
              <span>GROW</span>
            </div>
          </div>

            <a
              className="hero__visual-card hero__visual-card--small"
              href="https://wa.me/2349132304100"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Dceetechbro on WhatsApp"
              >
          <span className="hero__status-dot"></span>
          <span>Available for projects</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;