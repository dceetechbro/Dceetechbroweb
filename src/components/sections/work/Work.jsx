import "./Work.css";

function Work() {
  const projects = [
    {
      number: "01",
      category: "Conference Platform",
      title: "The Resurrected Life Conference",
      description:
        "A digital conference experience designed to communicate the event, guide attendees, support partnership, and present the conference brand online.",
      tags: ["JavaScript", "Firebase", "Responsive Web"],
      type: "Live project",
      theme: "dark",
      url: "https://trlc.web.app",
    },
    {
      number: "02",
      category: "Personal Portfolio",
      title: "Dceetechbro",
      description:
        "A product-focused portfolio and technology platform built to showcase frontend engineering, selected projects, technical capabilities, and the way Dceetechbro approaches digital products.",
      tags: ["React", "JavaScript", "Frontend", "Firebase"],
      type: "Portfolio",
      theme: "light",
      url: null,
    },
    {
      number: "03",
      category: "Official Website",
      title: "OfficialJudikay",
      description:
        "An upcoming official digital experience for Minister Judikay, bringing her ministry, music, books, eyewear, bookings, and digital presence into one platform.",
      tags: ["React","JavaScript", "Firebase", "Digital Experience"],
      type: "Coming soon",
      theme: "dark",
      url: null,
    },
  ];

  return (
    <section
      className="work section"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container">
        <div className="work__header">
          <div>
            <p className="work__eyebrow">Selected work</p>

            <h2 id="work-title" className="work__title">
              Built for real
              <span>business needs.</span>
            </h2>
          </div>

          <p className="work__intro">
            A selection of digital products, platforms, and experiences
            created through Dceetechbro.
          </p>
        </div>

        <div className="work__list">
          {projects.map((project) => (
            <article
              className={`work-card work-card--${project.theme}`}
              key={project.number}
            >
              <div className="work-card__visual">
                <div className="work-card__visual-top">
                  <span>{project.category}</span>
                  <span>{project.number}</span>
                </div>

                <div className="work-card__mockup">
                  <div className="work-card__mockup-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="work-card__mockup-content">
                    <span className="work-card__mockup-label">
                      DCEETECHBRO
                    </span>

                    <strong>{project.title}</strong>

                    <div className="work-card__mockup-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="work-card__content">
                <div className="work-card__meta">
                  <span>{project.number}</span>
                  <span>{project.type}</span>
                </div>

                <h3 className="work-card__title">
                  {project.title}
                </h3>

                <p className="work-card__description">
                  {project.description}
                </p>

                <div className="work-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                {project.url ? (
                  <a
                    className="work-card__link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} website`}
                  >
                    View project
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="work-card__link work-card__link--disabled">
                    {project.type === "Coming soon"
                      ? "Coming soon"
                      : "Website unavailable"}
                    <span aria-hidden="true">↗</span>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="work__footer">
          <p>
           <strong>More projects will be added as Dceetechbro continues to build.</strong>
          </p>

          <a href="#contact">
            Start a project
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Work;