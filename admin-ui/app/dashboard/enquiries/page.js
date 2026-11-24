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

  const handleExportCSV = async () => {
    try {
      const res = await apiRequest('/admin/enquiries?limit=2000');
      const data = res?.success && Array.isArray(res.data) ? res.data : enquiries;
      if (!data || data.length === 0) {
        setToastMsg('No enquiries available to export.');
        return;
      }

      const headers = ['Date', 'Client Name', 'Company', 'Phone', 'Email', 'Service Requested', 'Status', 'Client Notes', 'Admin Notes'];
      const rows = data.map((item) => [
        new Date(item.createdAt).toISOString().split('T')[0],
        `"${(item.name || '').replace(/"/g, '""')}"`,
        `"${(item.company || '').replace(/"/g, '""')}"`,
        `"${(item.phone || '').replace(/"/g, '""')}"`,
        `"${(item.email || '').replace(/"/g, '""')}"`,
        `"${(item.serviceType || '').replace(/"/g, '""')}"`,
        `"${item.status || 'NEW'}"`,
        `"${(item.notes || '').replace(/"/g, '""')}"`,
        `"${(item.adminNotes || '').replace(/"/g, '""')}"`,
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `nova_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToastMsg('Leads CSV exported successfully!');
    } catch (e) {
      console.error(e);
      setToastMsg('Failed to export CSV');
    }
  };

  const getCleanWhatsAppPhone = (rawPhone) => {
    if (!rawPhone) return '';
    let digits = rawPhone.replace(/[^0-9]/g, '');
    if (digits.length === 10) digits = `91${digits}`;
    return digits;
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Lead Enquiries & CRM Pipeline</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage client brief requests, direct WhatsApp responses, and quotation stages ({totalCount} total leads)
          </p>
        </div>

        <div>
          <button
            onClick={handleExportCSV}
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontWeight: 600 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Export Leads to CSV</span>
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="card filter-bar">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'NEW', 'CONTACTED', 'QUOTE_SENT', 'CLOSED'].map((st) => (
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
                  {enquiries.map((item) => {
                    const waPhone = getCleanWhatsAppPhone(item.phone);
                    const waMsg = encodeURIComponent(`Hi ${item.name}, thank you for contacting Nova Innovations regarding your outdoor advertising requirement for "${item.serviceType || 'Outdoor Hoardings'}". How can we assist you with site locations and rates today?`);

                    return (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 700 }}>{item.name}</td>
                        <td>{item.company || '—'}</td>
                        <td>
                          <div>{item.phone}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.email || '—'}</div>
                          {waPhone && (
                            <a
                              href={`https://wa.me/${waPhone}?text=${waMsg}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#16a34a',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                marginTop: '4px',
                                textDecoration: 'none',
                              }}
                              title="Direct WhatsApp Message"
                            >
                              <span>💬 Chat on WhatsApp</span>
                            </a>
                          )}
                        </td>
                        <td>{item.serviceType || 'Outdoor Hoardings'}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <select
                            className={`badge badge-${item.status.toLowerCase().replace('_', '-')}`}
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                            style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 700 }}
                          >
                            <option value="NEW" style={{ background: '#ffffff', color: '#18202B' }}>NEW</option>
                            <option value="CONTACTED" style={{ background: '#ffffff', color: '#18202B' }}>CONTACTED</option>
                            <option value="QUOTE_SENT" style={{ background: '#ffffff', color: '#18202B' }}>QUOTE_SENT</option>
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
                    );
                  })}
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
                <div>
                  <a href={`tel:${selectedEnquiry.phone}`} style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                    {selectedEnquiry.phone}
                  </a>
                  {getCleanWhatsAppPhone(selectedEnquiry.phone) && (
                    <div style={{ marginTop: '4px' }}>
                      <a
                        href={`https://wa.me/${getCleanWhatsAppPhone(selectedEnquiry.phone)}?text=${encodeURIComponent(`Hi ${selectedEnquiry.name}, thank you for contacting Nova Innovations regarding your outdoor advertising requirement for "${selectedEnquiry.serviceType || 'Outdoor Hoardings'}". How can we assist you with site locations and rates today?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none' }}
                      >
                        💬 Open WhatsApp Chat
                      </a>
                    </div>
                  )}
                </div>
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
