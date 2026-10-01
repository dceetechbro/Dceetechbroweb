import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import {
  auth,
  db,
} from '../../../services/firebase/firebase';

import './AdminDashboard.css';

const STATUS_OPTIONS = [
  'new',
  'contacted',
  'in progress',
  'completed',
  'closed',
];

function formatDate(timestamp) {
  if (!timestamp?.toDate) {
    return 'Date unavailable';
  }

  return timestamp.toDate().toLocaleString('en-NG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [projectEnquiries, setProjectEnquiries] = useState([]);
  const [talentRequests, setTalentRequests] = useState([]);

  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingTalent, setIsLoadingTalent] = useState(true);

  const [projectError, setProjectError] = useState('');
  const [talentError, setTalentError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedType, setSelectedType] = useState('');

  const [actionError, setActionError] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    const projectQuery = query(
      collection(db, 'projectEnquiries'),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribeProjects = onSnapshot(
      projectQuery,
      (snapshot) => {
        const enquiries = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setProjectEnquiries(enquiries);
        setIsLoadingProjects(false);
      },
      (error) => {
        console.error(
          'Project enquiries could not be loaded:',
          error,
        );

        setProjectError(
          'Project enquiries could not be loaded.',
        );

        setIsLoadingProjects(false);
      },
    );

    const talentQuery = query(
      collection(db, 'talentRequests'),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribeTalent = onSnapshot(
      talentQuery,
      (snapshot) => {
        const requests = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setTalentRequests(requests);
        setIsLoadingTalent(false);
      },
      (error) => {
        console.error(
          'Talent requests could not be loaded:',
          error,
        );

        setTalentError(
          'Talent requests could not be loaded.',
        );

        setIsLoadingTalent(false);
      },
    );

    return () => {
      unsubscribeProjects();
      unsubscribeTalent();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/admin/login', { replace: true });
  };

  const handleStatusChange = async (
    collectionName,
    id,
    newStatus,
  ) => {
    setUpdatingId(id);
    setActionError('');

    try {
      await updateDoc(
        doc(db, collectionName, id),
        {
          status: newStatus,
        },
      );

      setSelectedSubmission((current) => {
        if (!current || current.id !== id) {
          return current;
        }

        return {
          ...current,
          status: newStatus,
        };
      });
    } catch (error) {
      console.error(
        'Status could not be updated:',
        error,
      );

      setActionError(
        'The status could not be updated. Please try again.',
      );
    } finally {
      setUpdatingId('');
    }
  };

  const handleDelete = async (
    collectionName,
    id,
  ) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this submission? This action cannot be undone.',
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setActionError('');

    try {
      await deleteDoc(
        doc(db, collectionName, id),
      );

      setSelectedSubmission((current) => {
        if (!current || current.id !== id) {
          return current;
        }

        return null;
      });
    } catch (error) {
      console.error(
        'Submission could not be deleted:',
        error,
      );

      setActionError(
        'The submission could not be deleted. Please try again.',
      );
    } finally {
      setDeletingId('');
    }
  };

  const openSubmission = (
    submission,
    type,
  ) => {
    setActionError('');
    setSelectedSubmission(submission);
    setSelectedType(type);
  };

  const closeSubmission = () => {
    setSelectedSubmission(null);
    setSelectedType('');
    setActionError('');
  };

  const normalizedSearch = searchTerm
    .trim()
    .toLowerCase();

  const matchesFilters = (submission) => {
    const searchableText = [
      submission.name,
      submission.email,
      submission.company,
      submission.projectType,
      submission.role,
      submission.engagement,
      submission.description,
      submission.details,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      searchableText.includes(normalizedSearch);

    const matchesStatus =
      statusFilter === 'all' ||
      submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  };

  const filteredProjects = useMemo(
    () =>
      projectEnquiries.filter(matchesFilters),
    [
      projectEnquiries,
      normalizedSearch,
      statusFilter,
    ],
  );

  const filteredTalent = useMemo(
    () =>
      talentRequests.filter(matchesFilters),
    [
      talentRequests,
      normalizedSearch,
      statusFilter,
    ],
  );

  const newProjectCount =
    projectEnquiries.filter(
      (enquiry) => enquiry.status === 'new',
    ).length;

  const newTalentCount =
    talentRequests.filter(
      (request) => request.status === 'new',
    ).length;

  const totalSubmissions =
    projectEnquiries.length +
    talentRequests.length;

  const totalFiltered =
    filteredProjects.length +
    filteredTalent.length;

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="admin-dashboard__brand">
          <img
            className="navbar__logo"
            src="/images/dceelogo.png"
            alt="Dceetechbro"
          />
        </div>

        <div className="admin-dashboard__header-actions">
          <span className="admin-dashboard__user">
            {auth.currentUser?.email}
          </span>

          <button
            className="admin-dashboard__logout"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="container admin-dashboard__container">
        <section className="admin-dashboard__intro">
          <div>
            <p className="admin-dashboard__eyebrow">
              Overview
            </p>

            <h1>Good to have you back.</h1>

            <p>
              Manage project enquiries and technology
              talent requests from one place.
            </p>
          </div>
        </section>

        <section
          className="admin-dashboard__stats"
          aria-label="Dashboard statistics"
        >
          <article className="admin-stat">
            <span>Total submissions</span>
            <strong>{totalSubmissions}</strong>
          </article>

          <article className="admin-stat">
            <span>Project enquiries</span>
            <strong>
              {projectEnquiries.length}
            </strong>
          </article>

          <article className="admin-stat">
            <span>Talent requests</span>
            <strong>
              {talentRequests.length}
            </strong>
          </article>

          <article className="admin-stat">
            <span>New submissions</span>
            <strong>
              {newProjectCount +
                newTalentCount}
            </strong>
          </article>
        </section>

        <section className="admin-toolbar">
          <div className="admin-toolbar__search">
            <label htmlFor="admin-search">
              Search submissions
            </label>

            <input
              id="admin-search"
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value,
                )
              }
              placeholder="Search by name, email, company..."
            />
          </div>

          <div className="admin-toolbar__filter">
            <label htmlFor="admin-status-filter">
              Status
            </label>

            <select
              id="admin-status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
            >
              <option value="all">
                All statuses
              </option>

              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="admin-toolbar__result">
            {totalFiltered} result
            {totalFiltered === 1
              ? ''
              : 's'}
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section__header">
            <div>
              <p>01</p>
              <h2>Project enquiries</h2>
            </div>

            <span>
              {newProjectCount} new
            </span>
          </div>

          {isLoadingProjects && (
            <div className="admin-state">
              Loading project enquiries...
            </div>
          )}

          {projectError && (
            <div className="admin-state admin-state--error">
              {projectError}
            </div>
          )}

          {!isLoadingProjects &&
            !projectError &&
            filteredProjects.length === 0 && (
              <div className="admin-state">
                {projectEnquiries.length ===
                0
                  ? 'No project enquiries yet.'
                  : 'No project enquiries match your filters.'}
              </div>
            )}

          {!isLoadingProjects &&
            !projectError &&
            filteredProjects.length > 0 && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Project</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProjects.map(
                      (enquiry) => (
                        <tr key={enquiry.id}>
                          <td>
                            <strong>
                              {enquiry.name}
                            </strong>

                            <small>
                              {enquiry.email}
                            </small>
                          </td>

                          <td>
                            {enquiry.company ||
                              '—'}
                          </td>

                          <td>
                            {enquiry.projectType}
                          </td>

                          <td>
                            {enquiry.budget}
                          </td>

                          <td>
                            <select
                              className="admin-status-select"
                              value={
                                enquiry.status
                              }
                              disabled={
                                updatingId ===
                                enquiry.id
                              }
                              onChange={(
                                event,
                              ) =>
                                handleStatusChange(
                                  'projectEnquiries',
                                  enquiry.id,
                                  event.target
                                    .value,
                                )
                              }
                            >
                              {STATUS_OPTIONS.map(
                                (status) => (
                                  <option
                                    key={
                                      status
                                    }
                                    value={
                                      status
                                    }
                                  >
                                    {status}
                                  </option>
                                ),
                              )}
                            </select>
                          </td>

                          <td>
                            <button
                              className="admin-view-button"
                              type="button"
                              onClick={() =>
                                openSubmission(
                                  enquiry,
                                  'Project enquiry',
                                )
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </section>

        <section className="admin-section">
          <div className="admin-section__header">
            <div>
              <p>02</p>
              <h2>Talent requests</h2>
            </div>

            <span>
              {newTalentCount} new
            </span>
          </div>

          {isLoadingTalent && (
            <div className="admin-state">
              Loading talent requests...
            </div>
          )}

          {talentError && (
            <div className="admin-state admin-state--error">
              {talentError}
            </div>
          )}

          {!isLoadingTalent &&
            !talentError &&
            filteredTalent.length === 0 && (
              <div className="admin-state">
                {talentRequests.length === 0
                  ? 'No talent requests yet.'
                  : 'No talent requests match your filters.'}
              </div>
            )}

          {!isLoadingTalent &&
            !talentError &&
            filteredTalent.length > 0 && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Engagement</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredTalent.map(
                      (request) => (
                        <tr key={request.id}>
                          <td>
                            <strong>
                              {request.name}
                            </strong>

                            <small>
                              {request.email}
                            </small>
                          </td>

                          <td>
                            {request.company ||
                              '—'}
                          </td>

                          <td>
                            {request.role}
                          </td>

                          <td>
                            {request.engagement}
                          </td>

                          <td>
                            <select
                              className="admin-status-select"
                              value={
                                request.status
                              }
                              disabled={
                                updatingId ===
                                request.id
                              }
                              onChange={(
                                event,
                              ) =>
                                handleStatusChange(
                                  'talentRequests',
                                  request.id,
                                  event.target
                                    .value,
                                )
                              }
                            >
                              {STATUS_OPTIONS.map(
                                (status) => (
                                  <option
                                    key={
                                      status
                                    }
                                    value={
                                      status
                                    }
                                  >
                                    {status}
                                  </option>
                                ),
                              )}
                            </select>
                          </td>

                          <td>
                            <button
                              className="admin-view-button"
                              type="button"
                              onClick={() =>
                                openSubmission(
                                  request,
                                  'Talent request',
                                )
                              }
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </section>
      </div>

      {selectedSubmission && (
        <div
          className="admin-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-modal-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeSubmission();
            }
          }}
        >
          <div className="admin-modal__card">
            <div className="admin-modal__header">
              <div>
                <p className="admin-modal__eyebrow">
                  {selectedType}
                </p>

                <h2 id="admin-modal-title">
                  {selectedSubmission.name}
                </h2>
              </div>

              <button
                className="admin-modal__close"
                type="button"
                onClick={closeSubmission}
                aria-label="Close submission"
              >
                ×
              </button>
            </div>

            <div className="admin-modal__details">
              <div>
                <span>Email</span>
                <strong>
                  {selectedSubmission.email}
                </strong>
              </div>

              <div>
                <span>Company</span>
                <strong>
                  {selectedSubmission.company ||
                    'Not provided'}
                </strong>
              </div>

              <div>
                <span>Submitted</span>
                <strong>
                  {formatDate(
                    selectedSubmission.createdAt,
                  )}
                </strong>
              </div>

              {selectedType ===
                'Project enquiry' && (
                <>
                  <div>
                    <span>Project type</span>
                    <strong>
                      {
                        selectedSubmission.projectType
                      }
                    </strong>
                  </div>

                  <div>
                    <span>Budget</span>
                    <strong>
                      {
                        selectedSubmission.budget
                      }
                    </strong>
                  </div>

                  <div>
                    <span>Timeline</span>
                    <strong>
                      {
                        selectedSubmission.timeline
                      }
                    </strong>
                  </div>

                  <div className="admin-modal__full">
                    <span>
                      Project description
                    </span>

                    <p>
                      {
                        selectedSubmission.description
                      }
                    </p>
                  </div>
                </>
              )}

              {selectedType ===
                'Talent request' && (
                <>
                  <div>
                    <span>Role</span>
                    <strong>
                      {selectedSubmission.role}
                    </strong>
                  </div>

                  <div>
                    <span>Engagement</span>
                    <strong>
                      {
                        selectedSubmission.engagement
                      }
                    </strong>
                  </div>

                  <div className="admin-modal__full">
                    <span>
                      Request details
                    </span>

                    <p>
                      {
                        selectedSubmission.details
                      }
                    </p>
                  </div>
                </>
              )}

              <div className="admin-modal__full">
                <span>Status</span>

                <select
                  className="admin-status-select admin-status-select--large"
                  value={
                    selectedSubmission.status
                  }
                  disabled={
                    updatingId ===
                    selectedSubmission.id
                  }
                  onChange={(event) =>
                    handleStatusChange(
                      selectedType ===
                        'Project enquiry'
                        ? 'projectEnquiries'
                        : 'talentRequests',
                      selectedSubmission.id,
                      event.target.value,
                    )
                  }
                >
                  {STATUS_OPTIONS.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            {actionError && (
              <p
                className="admin-modal__error"
                role="alert"
              >
                {actionError}
              </p>
            )}

            <div className="admin-modal__actions">
              <button
                className="admin-modal__delete"
                type="button"
                disabled={
                  deletingId ===
                  selectedSubmission.id
                }
                onClick={() =>
                  handleDelete(
                    selectedType ===
                      'Project enquiry'
                      ? 'projectEnquiries'
                      : 'talentRequests',
                    selectedSubmission.id,
                  )
                }
              >
                {deletingId ===
                selectedSubmission.id
                  ? 'Deleting...'
                  : 'Delete submission'}
              </button>

              <button
                className="admin-modal__done"
                type="button"
                onClick={closeSubmission}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;