'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqsData } from '../data/faqsData';

export default function FaqAccordion() {
  const [activeId, setActiveId] = useState('faq-1');

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
          <span style={{ color: 'var(--brand-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
            Common Questions
          </span>
          <h2 className="heading-lg" style={{ margin: '4px 0 10px' }}>Frequently Asked Questions</h2>
          <p className="subheading">Everything you need to know about booking hoardings and advertising campaigns with Nova Innovations.</p>
        </div>

        <div className="faq-accordion">
          {faqsData.map((item) => (
            <div key={item.id} className={`faq-item ${activeId === item.id ? 'active' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFaq(item.id)}
              >
                <span>{item.question}</span>
                <span className="faq-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: activeId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
