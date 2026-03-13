'use client';

import { useState } from 'react';
import type { SectionId } from './IndexNav';

/* ── CmdRow ─────────────────────────────────────────────────────────────── */
function CmdRow({ cmd }: { cmd: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = cmd;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="cmd-row" onClick={handleCopy}>
      <span className="cmd-text">{cmd}</span>
      <span className={`copy-btn${copied ? ' copied' : ''}`}>
        {copied ? '✓ COPIED' : '⎘ COPY'}
      </span>
    </div>
  );
}

/* ── Install ─────────────────────────────────────────────────────────────── */
function InstallContent() {
  return (
    <>
      <h2 className="weight-black">GET ECLIPSE CLI RUNNING IN SECONDS.</h2>
      <p>Choose your preferred installation method. All paths lead to the same powerful CLI — pick the one that fits your workflow.</p>
      <span className="meta-label" style={{ marginTop: '1.2rem', display: 'block' }}>NPM</span>
      <CmdRow cmd="npm install -g eclipse-cli" />
      <span className="meta-label" style={{ marginTop: '0.8rem', display: 'block' }}>CURL / SHELL</span>
      <CmdRow cmd="curl -fsSL https://eclipse-cli.dev/install.sh | sh" />
      <span className="meta-label" style={{ marginTop: '0.8rem', display: 'block' }}>HOMEBREW</span>
      <CmdRow cmd="brew install eclipse-cli" />
      <p style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'none' }}>
        After install, run <strong>eclipse --version</strong> to verify.
      </p>
    </>
  );
}

/* ── Commands ────────────────────────────────────────────────────────────── */
function CommandsContent() {
  return (
    <>
      <h2 className="weight-black">EVERY COMMAND YOU NEED.</h2>
      <p>Eclipse CLI exposes a clean, composable command surface. Authenticate, wake up the AI, and observe — all from your terminal.</p>
      <span className="meta-label" style={{ marginTop: '1.2rem', display: 'block' }}>AUTH</span>
      <CmdRow cmd="eclipse login" />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'none', opacity: 0.7, margin: '0.2rem 0 0.6rem' }}>Logs you into the CLI Authenticator using an OAuth flow.</p>
      <CmdRow cmd="eclipse logout" />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'none', opacity: 0.7, margin: '0.2rem 0 0.6rem' }}>Logs you out by clearing your saved authentication token.</p>
      <CmdRow cmd="eclipse whoami" />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'none', opacity: 0.7, margin: '0.2rem 0 0.6rem' }}>Displays information about the currently logged-in user (Name, Email, ID).</p>
      <span className="meta-label" style={{ marginTop: '0.8rem', display: 'block' }}>AI</span>
      <CmdRow cmd="eclipse wakeup" />
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'none', opacity: 0.7, margin: '0.2rem 0 0.6rem' }}>Wakes up the AI and prompts you to start either a simple chat, tool calling, or agentic mode.</p>
    </>
  );
}

/* ── Pricing ─────────────────────────────────────────────────────────────── */
function PricingContent() {
  return (
    <>
      <h2 className="weight-black">PLANS FOR EVERY SCALE.</h2>
      <p>From solo developers to enterprise teams. Start free, upgrade when you need more power.</p>
      <div className="pricing-grid">
        <div className="plan-card">
          <span className="plan-name">FREE</span>
          <span className="plan-price">$0<span className="plan-period">/mo</span></span>
          <ul className="plan-features">
            <li>Gemini API access</li>
            <li>5 scripts / day</li>
            <li>Community plugins</li>
            <li>Basic logs</li>
            <li>1 environment</li>
          </ul>
          <button className="plan-btn">GET STARTED</button>
        </div>
        <div className="plan-card plan-card--featured">
          <span className="plan-badge">MOST POPULAR</span>
          <span className="plan-name">PRO</span>
          <span className="plan-price">$2<span className="plan-period">/mo</span></span>
          <ul className="plan-features">
            <li>Gemini + OpenAI API access</li>
            <li>Unlimited scripts</li>
            <li>All plugins</li>
            <li>Advanced logs + traces</li>
            <li>5 environments</li>
            <li>Priority support</li>
          </ul>
          <button className="plan-btn plan-btn--dark">SUBSCRIBE</button>
        </div>
        <div className="plan-card">
          <span className="plan-name">ENTERPRISE</span>
          <span className="plan-price">CUSTOM</span>
          <ul className="plan-features">
            <li>Unlimited everything</li>
            <li>SSO + SAML</li>
            <li>Audit logs</li>
            <li>Dedicated nodes</li>
            <li>SLA guarantee</li>
          </ul>
          <button className="plan-btn">CONTACT US</button>
        </div>
      </div>
    </>
  );
}

/* ── Support ─────────────────────────────────────────────────────────────── */
function SupportContent() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <h2 className="weight-black">WE&apos;RE HERE WHEN YOU NEED US.</h2>
      <p>Got a bug, a feature request, or just stuck? Send us a message and our team will respond within 24 hours.</p>
      <div style={{ marginTop: '1.2rem' }}>
        {!submitted ? (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <input type="email" className="support-input" placeholder="YOUR EMAIL" required />
            <textarea className="support-input support-textarea" placeholder="DESCRIBE YOUR ISSUE OR FEEDBACK..." required />
            <button type="submit" className="support-submit">SEND MESSAGE</button>
          </form>
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.8rem', opacity: 0.7 }}>
            ✓ MESSAGE SENT — WE&apos;LL GET BACK TO YOU SHORTLY.
          </div>
        )}
      </div>
    </>
  );
}

/* ── Statement (default) ─────────────────────────────────────────────────── */
function StatementContent() {
  return (
    <>
      <h2 className="weight-black">THE DISINTEGRATION OF FORM IN DIGITAL SPACES.</h2>
      <p>This interface serves as the primary entry point for Eclipse CLI. By exposing the underlying grid and forcing typographical elements to dissolve into pure data points, we confront the illusion of permanence in digital archives.</p>
      <p>The visual language is stripped of aesthetic pretense, relying entirely on the mechanical reproduction of forms through algorithmic halftoning. Structure is supreme; decoration is obsolete.</p>
    </>
  );
}

/* ── ContentPanel ────────────────────────────────────────────────────────── */
const sectionLabels: Record<SectionId, string> = {
  install: '01 // INSTALL',
  commands: '02 // COMMANDS',
  pricing: '03 // PRICING',
  support: '04 // HELP & SUPPORT',
};

interface Props {
  activeSection: SectionId | null;
}

export default function ContentPanel({ activeSection }: Props) {
  const label = activeSection ? sectionLabels[activeSection] : 'STATEMENT';

  return (
    <article className="main-article">
      <span className="meta-label">{label}</span>
      <div className="content-panel-inner">
        {activeSection === 'install' && <InstallContent />}
        {activeSection === 'commands' && <CommandsContent />}
        {activeSection === 'pricing' && <PricingContent />}
        {activeSection === 'support' && <SupportContent />}
        {activeSection === null && <StatementContent />}
      </div>
    </article>
  );
}
