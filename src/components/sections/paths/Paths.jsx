import './Paths.css';

function Paths() {
  return (
    <section className="paths section" id="solutions" aria-labelledby="paths-title">
      <div className="container">
        <div className="paths__header">
          <p className="paths__eyebrow">How we help</p>

          <h2 id="paths-title" className="paths__title">
            One company.
            <span>Two ways to move forward.</span>
          </h2>

          <p className="paths__intro">
            Whether you need technology built or the right people to build it,
            Dceetechbro gives your business a direct path forward.
          </p>
        </div>

        <div className="paths__grid">
          <a className="path-card path-card--dark" href="#build">
            <div className="path-card__top">
              <span className="path-card__number">01</span>

              <span className="path-card__arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="path-card__content">
              <p className="path-card__label">Build a solution</p>

              <h3 className="path-card__title">
                Turn your idea into something people can use.
              </h3>

              <p className="path-card__description">
                We design and build digital products, websites, platforms,
                and business systems around the way your business actually
                works.
              </p>
            </div>

            <div className="path-card__footer">
              <span>Product development</span>
              <span>Web platforms</span>
              <span>Business systems</span>
            </div>
          </a>

          <a className="path-card path-card--light" href="#talent">
            <div className="path-card__top">
              <span className="path-card__number">02</span>

              <span className="path-card__arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className="path-card__content">
              <p className="path-card__label">Hire talent</p>

              <h3 className="path-card__title">
                Bring the right technology talent into your team.
              </h3>

              <p className="path-card__description">
                Connect with skilled technology professionals who can
                contribute to your projects, strengthen your team, and help
                you move faster.
              </p>
            </div>

            <div className="path-card__footer">
              <span>Frontend</span>
              <span>Design</span>
              <span>Technology</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Paths;