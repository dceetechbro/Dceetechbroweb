import './WhyDceetechbro.css';

function WhyDceetechbro() {
  const principles = [
    {
      number: '01',
      title: 'We start with the problem.',
      description:
        'Before choosing a technology or writing code, we understand what the business needs to achieve and who the product is being built for.',
    },
    {
      number: '02',
      title: 'We build with purpose.',
      description:
        'Every interface, feature, and system should serve a clear purpose. We focus on useful technology rather than adding complexity for its own sake.',
    },
    {
      number: '03',
      title: 'We think beyond launch.',
      description:
        'A product should be able to evolve. We build with maintainability, performance, scalability, and future improvements in mind.',
    },
    {
      number: '04',
      title: 'We connect people with opportunity.',
      description:
        'When a business needs more than a product, Dceetechbro can connect it with technology talent that can contribute to the next stage of growth.',
    },
  ];

  return (
    <section
      className="why-dceetechbro section"
      id="company"
      aria-labelledby="why-dceetechbro-title"
    >
      <div className="container">
        <div className="why-dceetechbro__intro">
          <p className="why-dceetechbro__eyebrow">Why Dceetechbro</p>

          <h2
            id="why-dceetechbro-title"
            className="why-dceetechbro__title"
          >
            Technology should make
            <span>business move better.</span>
          </h2>

          <p className="why-dceetechbro__description">
            We combine product thinking, frontend engineering, technology
            systems, and access to talent to help businesses turn ideas into
            useful digital experiences.
          </p>
        </div>

        <div className="why-dceetechbro__statement">
          <span className="why-dceetechbro__statement-mark">“</span>

          <p>
            Dceetechbro builds technology and connects businesses with the
            talent to move their ideas forward.
          </p>
        </div>

        <div className="why-dceetechbro__principles">
          {principles.map((principle) => (
            <article
              className="why-principle"
              key={principle.number}
            >
              <span className="why-principle__number">
                {principle.number}
              </span>

              <div className="why-principle__content">
                <h3>{principle.title}</h3>

                <p>{principle.description}</p>
              </div>

              <span
                className="why-principle__arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDceetechbro;