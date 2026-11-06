'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Phone, ArrowRight } from 'lucide-react';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function LeadershipSection({ initialData = null }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    async function loadLeadershipData() {
      try {
        const res = await fetchApi('/public/settings');
        if (res && res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load leadership settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLeadershipData();
  }, []);

  if (loading || !data || !data.leaderName) {
    return null;
  }

  const cleanPhone = (data.leaderPhone || '').replace(/\s+/g, '');

  return (
    <section className="leadership-spotlight-section">
      <div className="container">
        <div className="leadership-spotlight-card">
          {/* Left Column Image & Badge */}
          <div className="leadership-img-col">
            <img
              src={getMediaUrl(data.leaderImage || '/heroman.jpeg')}
              alt={`${data.leaderName} - ${data.leaderRole || ''}`}
              className="leadership-portrait-img"
              onError={(e) => {
                e.target.src = '/heroman.jpeg';
              }}
            />
            {data.leaderYears && (
              <div className="leadership-badge-overlay">
                <span className="leadership-badge-number">{data.leaderYears}</span>
                {data.leaderYearsLabel && (
                  <span className="leadership-badge-label">{data.leaderYearsLabel}</span>
                )}
              </div>
            )}
          </div>

          {/* Right Column Content */}
          <div className="leadership-content-col">
            {data.leaderTag && (
              <div className="leadership-spotlight-tag">
                <div className="leadership-spotlight-dots">
                  <span></span>
                  <span></span>
                </div>
                {data.leaderTag}
              </div>
            )}
            <h2 className="leadership-name">{data.leaderName}</h2>
            {data.leaderRole && <div className="leadership-role">{data.leaderRole}</div>}

            {data.leaderBio && <p className="leadership-bio">{data.leaderBio}</p>}

            <div className="leadership-features-list">
              {data.leaderFeature1Title && (
                <div className="leadership-feature-box">
                  <div className="leadership-feature-icon">
                    <Trophy size={20} strokeWidth={2} />
                  </div>
                  <div className="leadership-feature-text">
                    <h4>{data.leaderFeature1Title}</h4>
                    {data.leaderFeature1Desc && <p>{data.leaderFeature1Desc}</p>}
                  </div>
                </div>
              )}

              {data.leaderFeature2Title && (
                <div className="leadership-feature-box">
                  <div className="leadership-feature-icon">
                    <Users size={20} strokeWidth={2} />
                  </div>
                  <div className="leadership-feature-text">
                    <h4>{data.leaderFeature2Title}</h4>
                    {data.leaderFeature2Desc && <p>{data.leaderFeature2Desc}</p>}
                  </div>
                </div>
              )}
            </div>

            <div className="leadership-actions">
              {data.leaderPhone && (
                <a href={`tel:${cleanPhone}`} className="btn-leadership-phone">
                  <Phone size={15} strokeWidth={2.2} />
                  Call Founder: {data.leaderPhone}
                </a>
              )}
              <a
                href="/founder-of-nova.html"
                className="btn-leadership-contact"
              >
                Connect with Director <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
