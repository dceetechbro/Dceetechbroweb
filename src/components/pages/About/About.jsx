import './About.css';

function About() {
  return (
    <main className="about-page">
        <a href="/" className="about-back-home">
            <span>←</span>
            Back to home
        </a>
      <div className="about-page__visual">
        <div className="about-page__portrait">
          <img
            src="/images/Dcee.jpeg"
            alt="Daniel Chidiebere Ukpai"
          />
        </div>
      </div>

      <div className="about-page__content">
        <section className="about-section about-section--hero">
          <span className="about-section__eyebrow">
            About Dceetechbro
          </span>

          <h1>
            We don't just build technology.
            <span> We solve problems.</span>
          </h1>

          <p>
            Technology should make life easier, not introduce another layer
            of stress. That belief sits at the heart of everything I build.
          </p>
        </section>

        <section className="about-section">
          <span className="about-section__number">01</span>

          <div>
            <p className="about-section__label">The person behind it</p>

            <h2>
              Daniel Chidiebere Ukpai
            </h2>

            <p className="about-section__role">
              Product-focused Frontend Engineer
            </p>

            <p>
              I am a well-seasoned frontend engineer who enjoys tackling
              problems businesses have and working toward solutions as the
              end result.
            </p>

            <p>
              My approach is simple:
              <strong> if there's a problem, there's always a solution.</strong>
            </p>
          </div>
        </section>

        <section className="about-section">
          <span className="about-section__number">02</span>

          <div>
            <p className="about-section__label">The journey</p>

            <h2>
              From protecting systems to building experiences.
            </h2>

            <p>
              My journey into technology began with cybersecurity. I wanted
              to understand how to keep users protected from cyber threats
              because a solution without protected pages can eventually ruin
              the experience it was created to provide.
            </p>

            <p>
              After completing my cybersecurity training, I moved into
              frontend development and discovered another side of solving
              problems: creating digital experiences people can actually
              understand and use.
            </p>
          </div>
        </section>

        <section className="about-section about-section--stack">
  <span className="about-section__number">03</span>

  <div>
    <p className="about-section__label">Tech Stack</p>

    <h2>
      Technology is the tool.
      <span className="about-stack__accent"> The solution is the goal.</span>
    </h2>

    <p>
      I work with technologies that allow me to turn ideas into useful,
      responsive and scalable digital experiences. I am always learning,
      improving and expanding the tools I can use to solve real problems.
    </p>

    <div className="about-stack">
      <div className="about-stack__group">
        <span className="about-stack__title">Languages</span>

        <div className="about-stack__items">
          <span>HTML</span>
          <span>CSS3</span>
          <span>JavaScript (ES6+)</span>
        </div>
      </div>

      <div className="about-stack__group">
        <span className="about-stack__title">Frameworks / Libraries</span>

        <div className="about-stack__items">
          <span>React.js</span>
          <span>Vite</span>
        </div>
      </div>

      <div className="about-stack__group">
        <span className="about-stack__title">Backend / Services</span>

        <div className="about-stack__items">
            <span>Node.js</span>
            <span>Firebase</span>
            <span>Firestore</span>
        </div>
      </div>

      <div className="about-stack__group">
        <span className="about-stack__title">Workflow & Tools</span>

        <div className="about-stack__items">
          <span>Git</span>
          <span>GitHub</span>
          <span>VS Code</span>
          <span>npm</span>
          <span>Resend</span>
          <span>Vercel</span>
        </div>
      </div>
    </div>
  </div>
</section>

        <section className="about-section">
          <span className="about-section__number">04</span>

          <div>
            <p className="about-section__label">Why I build</p>

            <h2>
              Businesses deserve to be seen.
            </h2>

            <p>
              I became serious about frontend development because of the
              opportunity to help businesses and organizations gain
              visibility and relevance.
            </p>

            <p>
              A business should not be limited by geography simply because
              people don't know it exists. Technology gives growing
              organizations the ability to reach people far beyond their
              immediate environment.
            </p>
          </div>
        </section>

        <section className="about-section about-section--statement">
          <span className="about-section__number">05</span>

          <div>
            <p className="about-section__label">How I approach problems</p>

            <blockquote>
              “If solving the problem complicates the user's experience,
              then I never really solved the problem.”
            </blockquote>

            <p>
              Before I think about what to build, I want to understand the
              problem. I want clients to explain what their business is
              experiencing and why they believe technology is needed.
            </p>

            <p>
              Sometimes the client's first idea is exactly what they need.
              Sometimes it isn't. When I see a better approach, my job is
              not simply to build what was requested. It is to explain the
              concern and propose a better solution.
            </p>
          </div>
        </section>

        <section className="about-section">
          <span className="about-section__number">06</span>

          <div>
            <p className="about-section__label">The user comes first</p>

            <h2>
              Don't make an already stressful world more stressful.
            </h2>

            <p>
              My first thought when starting a project is always:
              how do we reach every user without making them stress their
              eyes or their brain?
            </p>

            <p>
              The world is already stressful. I am not about to add to that
              stress with a complicated user experience.
            </p>

            <p>
              To me, a great product is one that is accessible and
              understandable to different kinds of users.
            </p>
          </div>
        </section>

        <section className="about-section">
          <span className="about-section__number">07</span>

          <div>
            <p className="about-section__label">The Dceetechbro footprint</p>

            <h2>
              You should know when Dceetechbro was here.
            </h2>

            <p>
              I want to leave a footprint on every product I work on.
            </p>

            <p>
              Not because every project should look identical, but because
              every section should tell a story. Someone should be able to
              stumble across a project and feel that it has
              <strong> Dceetechbro all over it.</strong>
            </p>

            <p>
              The goal is to tell stories through products without needing
              to write a novel about them.
            </p>
          </div>
        </section>

        <section className="about-section">
          <span className="about-section__number">08</span>

          <div>
            <p className="about-section__label">The client experience</p>

            <h2>
              Your project should feel safe.
            </h2>

            <p>
              I want every client to feel relaxed, heard and understood.
              They should know that their project is in safe hands.
            </p>

            <p>
              I am also conscious of time. I never want a client to walk
              away feeling that Dceetechbro wasted their time or failed to
              carry them along.
            </p>

            <p>
              The goal is not to build what Dceetechbro wants.
              The goal is to build what the client actually needs.
            </p>
          </div>
        </section>

        <section className="about-section about-section--closing">
          <span className="about-section__number">09</span>

          <div>
            <p className="about-section__label">Still becoming</p>

            <h2>
              I'm becoming the kind of developer who has a solution even
              with a covered hoodie on before the client opens up their
              problem.
            </h2>

            <p>
              And the best part of building is still the same:
              seeing an idea come to life and hearing someone say,
              “This is seamless. This is straightforward.”
            </p>

            <div className="about-section__final">
              <span>Build what matters.</span>
              <span>Make it simple.</span>
              <span>Make it meaningful.</span>
            </div>

            <div className="about-page__cta">
                <a href="/" className="about-page__cta-button">
                    Explore Dceetechbro
                    <span>↗</span>
                </a>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default About;