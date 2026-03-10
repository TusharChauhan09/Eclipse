'use client';

import { useState } from 'react';

export default function ActionPanel() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <aside className="action-panel">
      <div className="data-block">
        <span className="meta-label">SYSTEM_STATUS</span>
        <div className="data-row"><span>CORE</span><span>ONLINE</span></div>
        <div className="data-row"><span>LATENCY</span><span>12ms</span></div>
        <div className="data-row"><span>PROTOCOL</span><span>BRUT-09</span></div>
        <div className="data-row"><span>SEC_CLR</span><span>PUBLIC</span></div>
      </div>

      <div className="form-container">
        <span className="meta-label">REQ_ACCESS</span>
        {!submitted ? (
          <form className="brutalist-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <input type="email" placeholder="ENTER TERMINAL ID (EMAIL)" required />
            <button type="submit">INITIALIZE CONNECTION</button>
          </form>
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.7, marginTop: '0.5rem' }}>
            ✓ CONNECTION INITIALIZED
          </div>
        )}
      </div>
    </aside>
  );
}
