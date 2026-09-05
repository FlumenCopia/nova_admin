'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsCard from '../../components/StatsCard';
import Toast from '../../components/Toast';
import { apiRequest } from '../../lib/api';

export default function DashboardOverviewPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [counts, setCounts] = useState({ total: 0, newCount: 0, contactedCount: 0, closedCount: 0 });
  const [portfolioStats, setPortfolioStats] = useState({ total: 0, vacantCount: 0 });
  const [clientCount, setClientCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [enqRes, portRes, cliRes] = await Promise.all([
        apiRequest('/admin/enquiries'),
        apiRequest('/admin/portfolio'),
        apiRequest('/admin/clients'),
      ]);

      if (enqRes.success) {
        setEnquiries(enqRes.data.slice(0, 5)); // Show recent 5
        setCounts(enqRes.counts);
      }
      if (portRes.success) {
        setPortfolioStats(portRes.stats);
      }
      if (cliRes.success) {
        setClientCount(cliRes.data.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiRequest(`/admin/enquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      setToastMsg(`Status updated to ${newStatus}`);
      loadDashboardData();
    } catch (err) {
      setToastMsg('Failed to update status');
    }
  };

  return (
    <>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Real-time status of enquiries, vacant hoardings, and site operations
          </p>
        </div>

        <div className="page-header-actions">
          <Link href="/dashboard/gallery" className="btn-primary">
            + Add Campaign Media
          </Link>
          <Link href="/dashboard/clients" className="btn-secondary">
            + Add Client Logo
          </Link>
        </div>
      </div>

      {/* KPI STATS */}
      <div className="stats-grid">
        <StatsCard
          title="New Lead Enquiries"
          value={counts.newCount}
          subtitle={`${counts.total} total received`}
          highlightColor="var(--brand-amber)"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          }
        />

        <StatsCard
          title="Vacant Sites Available"
          value={portfolioStats.vacantCount}
          subtitle="Ready for instant client reservation"
          highlightColor="var(--brand-green)"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          }
        />

        <StatsCard
          title="Total Gallery Campaigns"
          value={portfolioStats.total}
          subtitle="Billboards & Transit wraps"
          highlightColor="var(--brand-red)"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          }
        />

        <StatsCard
          title="Client Logos"
          value={clientCount}
          subtitle="Displayed in Marquee"
          highlightColor="#60a5fa"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
          }
        />
      </div>

      {/* RECENT ENQUIRIES */}
      <div className="card">
        <div className="card-header-flex">
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Recent Lead Submissions</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Latest campaign briefs submitted via the public portal
            </p>
          </div>

          <Link href="/dashboard/enquiries" style={{ color: 'var(--brand-red)', fontWeight: 700, fontSize: '0.9rem' }}>
            View All Enquiries →
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Recent Leads...</div>
        ) : enquiries.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No enquiries received yet. Lead submissions from website forms will appear here.
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client / Contact</th>
                  <th>Company</th>
                  <th>Phone / Email</th>
                  <th>Service Requested</th>
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
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.email || '—'}</div>
                    </td>
                    <td>{item.serviceType || 'Outdoor Advertising'}</td>
                    <td>
                      <select
                        className={`badge badge-${item.status.toLowerCase()}`}
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                      >
                        <option value="NEW" style={{ background: '#ffffff', color: '#18202B' }}>
                          NEW
                        </option>
                        <option value="CONTACTED" style={{ background: '#ffffff', color: '#18202B' }}>
                          CONTACTED
                        </option>
                        <option value="CLOSED" style={{ background: '#ffffff', color: '#18202B' }}>
                          CLOSED
                        </option>
                      </select>
                    </td>
                    <td>
                      <Link href="/dashboard/enquiries" style={{ color: 'var(--brand-red)', fontWeight: 600, fontSize: '0.85rem' }}>
                        View Notes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
