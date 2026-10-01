import { useState } from 'react';

import { submitProjectEnquiry } from '../../../services/firebase/firestore';

import './BuildSolution.css';

function BuildSolution() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const enquiry = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      company: formData.get('company').trim(),
      projectType: formData.get('projectType'),
      description: formData.get('description').trim(),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
    };

    try {
      await submitProjectEnquiry(enquiry);

      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Project enquiry submission failed:', error);

      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="build-solution section"
      id="build"
      aria-labelledby="build-solution-title"
    >
      <div className="container">
        <div className="build-solution__header">
          <p className="build-solution__eyebrow">Build a solution</p>

          <h2
            id="build-solution-title"
            className="build-solution__title"
          >
            Tell us what
            <span>you're building.</span>
          </h2>

          <p className="build-solution__intro">
            Give us a little context about your idea, business, or project.
            We'll use it to understand what you need and determine the right
            way to move forward.
          </p>
        </div>

        <div className="build-solution__layout">
          <aside className="build-solution__aside">
            <div className="build-solution__aside-block">
              <span className="build-solution__aside-number">01</span>

              <h3>Tell us the idea.</h3>

              <p>
                Start with the problem you're trying to solve or the
                opportunity you're trying to create.
              </p>
            </div>

            <div className="build-solution__aside-block">
              <span className="build-solution__aside-number">02</span>

              <h3>Give us the context.</h3>

              <p>
                Your business, audience, timeline, and budget help us
                understand the project properly.
              </p>
            </div>

            <div className="build-solution__aside-block">
              <span className="build-solution__aside-number">03</span>

              <h3>We'll take it from there.</h3>

              <p>
                We'll review the information and determine the appropriate
                next step for the project.
              </p>
            </div>
          </aside>

          <form
            className="build-solution__form"
            onSubmit={handleSubmit}
          >
            <div className="form-field">
              <label htmlFor="project-name">Your name</label>

              <input
                id="project-name"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="project-email">Email address</label>

              <input
                id="project-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="project-company">
                Company <span>(optional)</span>
              </label>

              <input
                id="project-company"
                name="company"
                type="text"
                placeholder="Company name"
                autoComplete="organization"
              />
            </div>

            <div className="form-field">
              <label htmlFor="project-type">What do you need?</label>

              <select
                id="project-type"
                name="projectType"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a project type
                </option>

                <option value="website">Website</option>
                <option value="web-app">Web application</option>
                <option value="ecommerce">E-commerce</option>
                <option value="business-system">
                  Business system
                </option>
                <option value="mobile-app">
                  Mobile application
                </option>
                <option value="redesign">
                  Website / product redesign
                </option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="project-description">
                Tell us about the project
              </label>

              <textarea
                id="project-description"
                name="description"
                rows="6"
                placeholder="What are you trying to build, and what problem should it solve?"
                required
              ></textarea>
            </div>

            <div className="form-field">
              <label htmlFor="project-budget">
                Estimated budget
              </label>

              <select
                id="project-budget"
                name="budget"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a budget range
                </option>

                <option value="under-500k">
                  Under ₦500,000
                </option>

                <option value="500k-1m">
                  ₦500,000 – ₦1,000,000
                </option>

                <option value="1m-3m">
                  ₦1,000,000 – ₦3,000,000
                </option>

                <option value="3m-5m">
                  ₦3,000,000 – ₦5,000,000
                </option>

                <option value="5m-plus">
                  ₦5,000,000+
                </option>

                <option value="not-sure">
                  I'm not sure yet
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="project-timeline">
                When do you want to start?
              </label>

              <select
                id="project-timeline"
                name="timeline"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a timeline
                </option>

                <option value="immediately">
                  As soon as possible
                </option>

                <option value="one-month">
                  Within 1 month
                </option>

                <option value="one-three-months">
                  1–3 months
                </option>

                <option value="three-plus-months">
                  3+ months
                </option>

                <option value="exploring">
                  Just exploring
                </option>
              </select>
            </div>

            <button
              className="build-solution__submit"
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? 'Sending enquiry...'
                  : 'Send project enquiry'}
              </span>

              <span aria-hidden="true">
                {isSubmitting ? '…' : '↗'}
              </span>
            </button>

            {submitStatus === 'success' && (
              <p className="build-solution__form-message build-solution__form-message--success">
                Your project enquiry has been sent successfully. We'll be in
                touch with you soon.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="build-solution__form-message build-solution__form-message--error">
                We couldn't send your enquiry right now. Please try again.
              </p>
            )}

            <p className="build-solution__form-note">
              Your information will only be used to understand your project
              and respond to your enquiry.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BuildSolution;