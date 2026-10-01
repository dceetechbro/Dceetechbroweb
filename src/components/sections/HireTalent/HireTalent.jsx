import { useState } from 'react';

import { submitTalentRequest } from '../../../services/firebase/firestore';

import './HireTalent.css';

function HireTalent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const talentCategories = [
    {
      number: '01',
      title: 'Frontend Engineers',
      description:
        'Developers who turn designs and product requirements into responsive, production-ready web experiences.',
      skills: ['React', 'JavaScript', 'HTML / CSS'],
    },
    {
      number: '02',
      title: 'UI / UX Designers',
      description:
        'Designers who create clear, usable interfaces and thoughtful experiences around real user needs.',
      skills: ['UI Design', 'UX', 'Prototyping'],
    },
    {
      number: '03',
      title: 'Full-Stack Developers',
      description:
        'Engineers who can work across the frontend, backend, databases, APIs, and the systems connecting them.',
      skills: ['React', 'Node.js', 'APIs'],
    },
    {
      number: '04',
      title: 'Technology Specialists',
      description:
        'Technical professionals who bring specialised skills to projects, systems, security, and technology operations.',
      skills: ['Cloud', 'Security', 'Systems'],
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const talentRequest = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      company: formData.get('company').trim(),
      role: formData.get('role'),
      engagement: formData.get('engagement'),
      details: formData.get('details').trim(),
    };

try {
  await submitTalentRequest(talentRequest);

  try {
    const emailResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'talent',
        ...talentRequest,
      }),
    });

    if (!emailResponse.ok) {
      console.error(
        'Talent request was saved, but email notification failed.'
      );
    }
  } catch (emailError) {
    console.error(
      'Talent request was saved, but email notification failed:',
      emailError
    );
  }

  setSubmitStatus('success');
  form.reset();
} catch (error) {
  console.error('Talent request submission failed:', error);

  setSubmitStatus('error');
} finally {
  setIsSubmitting(false);
}
};

  return (
    <section
      className="hire-talent section"
      id="talent"
      aria-labelledby="hire-talent-title"
    >
      <div className="container">
        <div className="hire-talent__header">
          <div>
            <p className="hire-talent__eyebrow">Hire talent</p>

            <h2 id="hire-talent-title" className="hire-talent__title">
              Find the people
              <span>behind the technology.</span>
            </h2>
          </div>

          <p className="hire-talent__intro">
            Tell us what your team needs and we'll help you identify the
            technology talent that fits the work.
          </p>
        </div>

        <div className="hire-talent__categories">
          {talentCategories.map((category) => (
            <article
              className="talent-category"
              key={category.number}
            >
              <div className="talent-category__top">
                <span>{category.number}</span>

                <span
                  className="talent-category__arrow"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <div className="talent-category__content">
                <h3>{category.title}</h3>

                <p>{category.description}</p>
              </div>

              <div className="talent-category__skills">
                {category.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="hire-talent__request">
          <div className="hire-talent__request-content">
            <p className="hire-talent__request-eyebrow">
              Talent request
            </p>

            <h3>
              Tell us who
              <span>you need.</span>
            </h3>

            <p>
              Give us some context about your team, the role, and the work
              you need help with.
            </p>
          </div>

          <form
            className="hire-talent__form"
            onSubmit={handleSubmit}
          >
            <div className="talent-form-field">
              <label htmlFor="talent-name">Your name</label>

              <input
                id="talent-name"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                required
              />
            </div>

            <div className="talent-form-field">
              <label htmlFor="talent-email">Work email</label>

              <input
                id="talent-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="talent-form-field">
              <label htmlFor="talent-company">Company</label>

              <input
                id="talent-company"
                name="company"
                type="text"
                placeholder="Company name"
                autoComplete="organization"
                required
              />
            </div>

            <div className="talent-form-field">
              <label htmlFor="talent-role">Talent you need</label>

              <select
                id="talent-role"
                name="role"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a talent category
                </option>

                <option value="frontend">
                  Frontend Engineer
                </option>

                <option value="full-stack">
                  Full-Stack Developer
                </option>

                <option value="ui-ux">
                  UI / UX Designer
                </option>

                <option value="technology-specialist">
                  Technology Specialist
                </option>

                <option value="multiple">
                  Multiple roles
                </option>
              </select>
            </div>

            <div className="talent-form-field">
              <label htmlFor="talent-engagement">
                Engagement type
              </label>

              <select
                id="talent-engagement"
                name="engagement"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select engagement type
                </option>

                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="project">Project-based</option>
              </select>
            </div>

            <div className="talent-form-field">
              <label htmlFor="talent-details">
                Tell us about the role
              </label>

              <textarea
                id="talent-details"
                name="details"
                rows="6"
                placeholder="What will this person be working on?"
                required
              ></textarea>
            </div>

            <button
              className="hire-talent__submit"
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? 'Sending request...'
                  : 'Submit talent request'}
              </span>

              <span aria-hidden="true">
                {isSubmitting ? '…' : '↗'}
              </span>
            </button>

            {submitStatus === 'success' && (
              <p className="hire-talent__form-message hire-talent__form-message--success">
                Your talent request has been sent successfully. We'll review
                it and get back to you soon.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="hire-talent__form-message hire-talent__form-message--error">
                We couldn't send your request right now. Please try again.
              </p>
            )}

            <p className="hire-talent__form-note">
              We'll review your request and follow up with the appropriate
              next steps.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HireTalent;