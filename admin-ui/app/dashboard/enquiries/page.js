'use client';

import { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Toast from '../../../components/Toast';
import { apiRequest } from '../../../lib/api';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [adminNotesText, setAdminNotesText] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchEnquiries = async (targetPage = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      let endpoint = `/admin/enquiries?page=${targetPage}&limit=10&status=${statusFilter}`;
      if (searchQuery) {
        endpoint += `&query=${encodeURIComponent(searchQuery)}`;
      }

      const res = await apiRequest(endpoint);
      if (res.success) {
        if (isLoadMore) {
          setEnquiries((prev) => [...prev, ...res.data]);
        } else {
          setEnquiries(res.data);
        }
        setPage(targetPage);
        setHasMore(res.pagination ? res.pagination.hasMore : false);
        setTotalCount(res.pagination ? res.pagination.total : (res.data ? res.data.length : 0));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(1, false);
  }, [statusFilter, searchQuery]);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchEnquiries(page + 1, true);
    }
  };

  const handleOpenDetail = (item) => {
    setSelectedEnquiry(item);
    setAdminNotesText(item.adminNotes || '');
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await apiRequest(`/admin/enquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, adminNotes: adminNotesText }),
      });
      setToastMsg('Enquiry updated successfully');
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status, adminNotes: adminNotesText });
      }
      fetchEnquiries(1, false);
    } catch (err) {
      setToastMsg('Failed to update enquiry');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await apiRequest(`/admin/enquiries/${id}`, { method: 'DELETE' });
      setToastMsg('Enquiry deleted');
      setSelectedEnquiry(null);
      fetchEnquiries(1, false);
    } catch (err) {
      setToastMsg('Failed to delete enquiry');
    }
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Lead Enquiries</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage client brief requests, contact details, and follow-up status
          </p>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="card filter-bar">
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'NEW', 'CONTACTED', 'CLOSED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`btn-secondary ${statusFilter === st ? 'active' : ''}`}
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                borderColor: statusFilter === st ? 'var(--brand-red)' : 'var(--border-color)',
                color: statusFilter === st ? 'var(--brand-red)' : 'var(--text-main)',
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="form-input"
          placeholder="Search by client name, company or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: '320px', padding: '8px 14px' }}
        />
      </div>

      {/* ENQUIRIES TABLE */}
      <div className="card">
        {loading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No enquiries found matching filter criteria.
          </div>
        ) : (
          <>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Company</th>
                    <th>Contact Info</th>
                    <th>Service Requested</th>
                    <th>Received Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 700 }}>{item.name}</td>
                      <td>{item.company || '—'}</td>
                      <td>
                        <div>{item.phone}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.email || '—'}</div>
                      </td>
                      <td>{item.serviceType || 'Outdoor Hoardings'}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <select
                          className={`badge badge-${item.status.toLowerCase()}`}
                          value={item.status}
                          onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                          <option value="NEW" style={{ background: '#ffffff', color: '#18202B' }}>NEW</option>
                          <option value="CONTACTED" style={{ background: '#ffffff', color: '#18202B' }}>CONTACTED</option>
                          <option value="CLOSED" style={{ background: '#ffffff', color: '#18202B' }}>CLOSED</option>
                        </select>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleOpenDetail(item)} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                            Details
                          </button>
                          <button onClick={() => handleDeleteEnquiry(item.id)} className="btn-danger">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* LOAD MORE CONTROL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
              <div style={{ color: 'var(--text-muted)' }}>
                Showing {enquiries.length} of {totalCount} enquiries
              </div>

              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="btn-primary"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  {loadingMore ? 'Loading More...' : `Load More Enquiries (${totalCount - enquiries.length} remaining)`}
                </button>
              ) : (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  All {totalCount} enquiries loaded
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* DETAIL MODAL */}
      <Modal isOpen={!!selectedEnquiry} onClose={() => setSelectedEnquiry(null)} title="Enquiry Brief Details">
        {selectedEnquiry && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label className="form-label">Client Name</label>
                <div style={{ fontWeight: 700 }}>{selectedEnquiry.name}</div>
              </div>
              <div>
                <label className="form-label">Company / Brand</label>
                <div>{selectedEnquiry.company || 'Not specified'}</div>
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <div><a href={`tel:${selectedEnquiry.phone}`} style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{selectedEnquiry.phone}</a></div>
              </div>
              <div>
                <label className="form-label">Email Address</label>
                <div>{selectedEnquiry.email || 'Not specified'}</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Requested Advertising Service</label>
              <div style={{ background: 'var(--color-page-background)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                {selectedEnquiry.serviceType || 'Outdoor Hoardings'}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Target Districts & Campaign Message</label>
              <div style={{ background: 'var(--color-page-background)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9rem', color: 'var(--color-text-primary)', minHeight: '60px' }}>
                {selectedEnquiry.notes || 'No extra notes provided by client.'}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Internal Admin Notes / Quotation Remarks</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Add private staff comments, location availability notes or price quote details..."
                value={adminNotesText}
                onChange={(e) => setAdminNotesText(e.target.value)}
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button onClick={() => handleDeleteEnquiry(selectedEnquiry.id)} className="btn-danger">
                Delete Enquiry
              </button>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setSelectedEnquiry(null)} className="btn-secondary">
                  Close
                </button>
                <button onClick={() => handleUpdateStatus(selectedEnquiry.id, selectedEnquiry.status)} className="btn-primary">
                  Save Admin Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
