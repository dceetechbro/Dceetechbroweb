import './Capabilities.css';

function Capabilities() {
  const capabilities = [
    {
      number: '01',
      title: 'Web & Product Development',
      description:
        'Websites, platforms, and digital products built around your users, business goals, and growth plans.',
      tags: ['React', 'JavaScript', 'Responsive UI'],
    },
    {
      number: '02',
      title: 'Business Systems',
      description:
        'Digital systems that help businesses manage operations, customers, data, payments, and internal workflows.',
      tags: ['Firebase', 'APIs', 'Cloud Systems'],
    },
    {
      number: '03',
      title: 'UI & Frontend Engineering',
      description:
        'Fast, responsive interfaces that turn product ideas and designs into polished experiences people enjoy using.',
      tags: ['Frontend', 'UX', 'Performance'],
    },
    {
      number: '04',
      title: 'Technology Talent',
      description:
        'Connect your business with technology professionals who can contribute to projects and strengthen your team.',
      tags: ['Developers', 'Designers', 'Technical Talent'],
    },
  ];

  return (
    <section className="capabilities section" id="capabilities">
      <div className="container">
        <div className="capabilities__top">
          <div className="capabilities__heading">
            <p className="capabilities__eyebrow">What we do</p>

            <h2 className="capabilities__title">
              Technology that solves
              <span>real business problems.</span>
            </h2>
          </div>

          <p className="capabilities__intro">
            From the first idea to the finished product, we combine product
            thinking, engineering, and technology talent to help businesses
            build and grow.
          </p>
        </div>

        <div className="capabilities__list">
          {capabilities.map((capability) => (
            <article className="capability" key={capability.number}>
              <div className="capability__number">
                {capability.number}
              </div>

              <div className="capability__main">
                <h3 className="capability__title">
                  {capability.title}
                </h3>

                <p className="capability__description">
                  {capability.description}
                </p>
              </div>

              <div className="capability__tags" aria-label="Technologies">
                {capability.tags.map((tag) => (
                  <span className="capability__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <span className="capability__arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Capabilities;