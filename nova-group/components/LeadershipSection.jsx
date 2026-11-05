'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Users, Phone, ArrowRight } from 'lucide-react';
import { fetchApi, getMediaUrl } from '../lib/api';

export default function LeadershipSection() {
  const [data, setData] = useState({
    leaderName: 'GIREESH KUMAR S',
    leaderRole: 'Founder, Director & CEO — Nova Innovations',
    leaderTag: 'Leadership Spotlight',
    leaderYears: '27+',
    leaderYearsLabel: 'Years Leadership',
    leaderImage: '/heroman.jpeg',
    leaderBio: "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions.",
    leaderPhone: '+91 9539000640',
    leaderFeature1Title: 'Visionary Direction',
    leaderFeature1Desc: "Building Kerala's most reliable 24/7 overnight advertising engine.",
    leaderFeature2Title: 'Enterprise Relationships',
    leaderFeature2Desc: 'Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.',
  });

  useEffect(() => {
    async function loadLeadershipData() {
      try {
        const res = await fetchApi('/public/settings');
        if (res && res.success && res.data) {
          setData((prev) => ({
            leaderName: res.data.leaderName || prev.leaderName,
            leaderRole: res.data.leaderRole || prev.leaderRole,
            leaderTag: res.data.leaderTag || prev.leaderTag,
            leaderYears: res.data.leaderYears || prev.leaderYears,
            leaderYearsLabel: res.data.leaderYearsLabel || prev.leaderYearsLabel,
            leaderImage: res.data.leaderImage || prev.leaderImage,
            leaderBio: res.data.leaderBio || prev.leaderBio,
            leaderPhone: res.data.leaderPhone || prev.leaderPhone,
            leaderFeature1Title: res.data.leaderFeature1Title || prev.leaderFeature1Title,
            leaderFeature1Desc: res.data.leaderFeature1Desc || prev.leaderFeature1Desc,
            leaderFeature2Title: res.data.leaderFeature2Title || prev.leaderFeature2Title,
            leaderFeature2Desc: res.data.leaderFeature2Desc || prev.leaderFeature2Desc,
          }));
        }
      } catch (err) {
        console.error('Failed to load leadership settings:', err);
      }
    }
    loadLeadershipData();
  }, []);

  const cleanPhone = (data.leaderPhone || '+91 9539000640').replace(/\s+/g, '');

  return (
    <section className="leadership-spotlight-section">
      <div className="container">
        <div className="leadership-spotlight-card">
          {/* Left Column Image & Badge */}
          <div className="leadership-img-col">
            <img
              src={getMediaUrl(data.leaderImage, '/heroman.jpeg')}
              alt={`${data.leaderName} - ${data.leaderRole}`}
              className="leadership-portrait-img"
              onError={(e) => {
                e.target.src = '/heroman.jpeg';
              }}
            />
            <div className="leadership-badge-overlay">
              <span className="leadership-badge-number">{data.leaderYears}</span>
              <span className="leadership-badge-label">{data.leaderYearsLabel}</span>
            </div>
          </div>

          {/* Right Column Content */}
          <div className="leadership-content-col">
            <div className="leadership-spotlight-tag">
              <div className="leadership-spotlight-dots">
                <span></span>
                <span></span>
              </div>
              {data.leaderTag}
            </div>
            <h2 className="leadership-name">{data.leaderName}</h2>
            <div className="leadership-role">{data.leaderRole}</div>

            <p className="leadership-bio">{data.leaderBio}</p>

            <div className="leadership-features-list">
              <div className="leadership-feature-box">
                <div className="leadership-feature-icon">
                  <Trophy size={20} strokeWidth={2} />
                </div>
                <div className="leadership-feature-text">
                  <h4>{data.leaderFeature1Title}</h4>
                  <p>{data.leaderFeature1Desc}</p>
                </div>
              </div>

              <div className="leadership-feature-box">
                <div className="leadership-feature-icon">
                  <Users size={20} strokeWidth={2} />
                </div>
                <div className="leadership-feature-text">
                  <h4>{data.leaderFeature2Title}</h4>
                  <p>{data.leaderFeature2Desc}</p>
                </div>
              </div>
            </div>

            <div className="leadership-actions">
              <a href={`tel:${cleanPhone}`} className="btn-leadership-phone">
                <Phone size={15} strokeWidth={2.2} />
                Call Founder: {data.leaderPhone}
              </a>
              <Link href="/contact" className="btn-leadership-contact">
                Connect with Director <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
