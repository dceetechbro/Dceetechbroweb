import './Contact.css';

function Contact() {
  return (
    <section
      className="contact section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="contact__card">
          <div className="contact__content">
            <p className="contact__eyebrow">Start something</p>

            <h2 id="contact-title" className="contact__title">
              Have an idea?
              <span>Let's build it.</span>
            </h2>

            <p className="contact__description">
              Whether you need a digital product built or technology talent
              for your team, tell us what you're working on and we'll take it
              from there.
            </p>
          </div>

          <div className="contact__actions">
            <a
              className="contact__action contact__action--primary"
              href="#build"
            >
              <span>
                <small>01</small>
                Build a solution
              </span>

              <span className="contact__action-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact__action contact__action--secondary"
              href="#talent"
            >
              <span>
                <small>02</small>
                Hire talent
              </span>

              <span className="contact__action-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="contact__bottom">
            <span>Dceetechbro</span>
            <span>Technology. Talent. Solutions.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;