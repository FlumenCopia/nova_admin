'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FounderLeadershipSpotlight({ onOpenModal }) {
  const [data, setData] = useState({
    name: 'GIREESH KUMAR S',
    role: 'Founder, Director & CEO — Nova Innovations',
    tag: 'LEADERSHIP SPOTLIGHT',
    years: '27+',
    yearsLabel: 'Years Leadership',
    image: '/assets/hero_man.jpeg',
    bio: "Pioneering outdoor advertising, highway hoardings, and transit fleet branding across Kerala for over 27 years. Under Gireesh Kumar S's leadership, Nova Innovations manages 500+ prime hoarding corridors and nationwide campaign executions.",
    phone: '+91 9539000640',
    feat1Title: 'Visionary Direction',
    feat1Desc: "Building Kerala's most reliable 24/7 overnight advertising engine.",
    feat2Title: 'Enterprise Relationships',
    feat2Desc: 'Trusted partner to myG, Bhima, Pothys, KSRTC & Bank of Baroda.',
  });

  useEffect(() => {
    fetch(`${API_BASE}/public/settings`)
      .then((res) => (res.ok ? res.json() : null))
      .then((resData) => {
        if (resData && resData.success && resData.data) {
          const s = resData.data;
          setData((prev) => ({
            ...prev,
            name: s.leaderName || prev.name,
            role: s.leaderRole || prev.role,
            tag: s.leaderTag || prev.tag,
            years: s.leaderYears || prev.years,
            yearsLabel: s.leaderYearsLabel || prev.yearsLabel,
            image: s.leaderImage || prev.image,
            bio: s.leaderBio || prev.bio,
            phone: s.leaderPhone || prev.phone,
            feat1Title: s.leaderFeature1Title || prev.feat1Title,
            feat1Desc: s.leaderFeature1Desc || prev.feat1Desc,
            feat2Title: s.leaderFeature2Title || prev.feat2Title,
            feat2Desc: s.leaderFeature2Desc || prev.feat2Desc,
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="founder-spotlight-card" id="founder" style={{ marginTop: '32px' }}>
      <div className="founder-card-grid">
        <div className="founder-img-col">
          <div className="founder-portrait-frame">
            <img
              src={data.image || '/assets/hero_man.jpeg'}
              alt={data.name}
              className="founder-portrait-img"
              id="spotlight-portrait-img"
            />
            <div className="founder-experience-badge">
              <span className="exp-number" id="spotlight-years-number">{data.years}</span>
              <span className="exp-text" id="spotlight-years-label">{data.yearsLabel}</span>
            </div>
          </div>
        </div>

        <div className="founder-info-col">
          <div className="dual-dots-badge">
            <span className="dot dot-red"></span>
            <span className="dot dot-red"></span>
          </div>
          <span className="about-subhead" id="spotlight-tag">{data.tag}</span>
          <h2 className="founder-name-heading" id="spotlight-name">{data.name}</h2>
          <h3 className="founder-designation" id="spotlight-designation">{data.role}</h3>
          <p className="founder-bio-text" id="spotlight-bio">{data.bio}</p>

          <div className="founder-key-pillars">
            <div className="pillar-item">
              <div className="pillar-icon"><i className="fa-solid fa-trophy"></i></div>
              <div>
                <strong id="spotlight-feat1-title">{data.feat1Title}</strong>
                <p id="spotlight-feat1-desc">{data.feat1Desc}</p>
              </div>
            </div>
            <div className="pillar-item">
              <div className="pillar-icon"><i className="fa-solid fa-handshake"></i></div>
              <div>
                <strong id="spotlight-feat2-title">{data.feat2Title}</strong>
                <p id="spotlight-feat2-desc">{data.feat2Desc}</p>
              </div>
            </div>
          </div>

          <div className="founder-actions">
            <a href={`tel:${data.phone.replace(/\s+/g, '')}`} className="btn btn-primary" id="spotlight-phone-btn">
              <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>
              <span id="spotlight-phone-text">Call Founder: {data.phone}</span>
            </a>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onOpenModal && onOpenModal('Founder Meeting')}
            >
              <span>Connect with Director</span> <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
