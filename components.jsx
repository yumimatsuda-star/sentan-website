/* Shared components — loaded by every page */
const { useState, useEffect, useRef } = React;

/* Brand mark SVG (inline) */
const LOGO_MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="ring" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#5CE1FF"></stop>
      <stop offset="100%" stop-color="#7C6BFF"></stop>
    </linearGradient>
  </defs>
  <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#ring)" stroke-width="1.5" transform="rotate(-28 32 32)"></ellipse>
  <ellipse cx="32" cy="32" rx="14" ry="5.5" stroke="#5CE1FF" stroke-width="1" transform="rotate(-28 32 32)" opacity="0.55"></ellipse>
  <circle cx="32" cy="32" r="3.2" fill="#E6EEFF"></circle>
  <circle cx="32" cy="32" r="6.5" stroke="#5CE1FF" stroke-width="1" opacity="0.6"></circle>
  <circle cx="54.5" cy="22" r="1.6" fill="#5CE1FF"></circle>
</svg>`;

/* Icon (Lucide-style stroke) */
const Icon = ({ path, size = 20, sw = 1.5 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
       fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <g dangerouslySetInnerHTML={{__html: path}} />
  </svg>
);

const ICONS = {
  gov:       `<rect x="3" y="10" width="18" height="11" rx="1"></rect><path d="M3 10l9-7 9 7"></path><path d="M8 21V13"></path><path d="M16 21V13"></path><path d="M12 21V13"></path>`,
  code:      `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line>`,
  cube:      `<path d="M12 3l9 5-9 5-9-5 9-5z"></path><path d="M3 8v8l9 5 9-5V8"></path><path d="M12 13v8"></path>`,
  academy:   `<path d="M22 10L12 5 2 10l10 5 10-5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>`,
  compass:   `<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>`,
  signal:    `<path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20V10"></path><path d="M17 20V4"></path><path d="M22 20h-.01"></path>`,
  arrow:     `<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>`,
  check:     `<polyline points="20 6 9 17 4 12"></polyline>`,
  x:         `<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>`,
  shield:    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>`,
  cloud:     `<path d="M17.5 19H9a5 5 0 1 1 1.4-9.8A7 7 0 0 1 24 13a5 5 0 0 1-6.5 6z"></path>`,
  cpu:       `<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><path d="M9 2v2"></path><path d="M15 2v2"></path><path d="M9 20v2"></path><path d="M15 20v2"></path><path d="M2 9h2"></path><path d="M2 15h2"></path><path d="M20 9h2"></path><path d="M20 15h2"></path>`,
  book:      `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>`,
  users:     `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>`,
  map:       `<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>`,
  mail:      `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>`,
  pin:       `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>`,
  phone:     `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>`,
};

/* ===== Nav ===== */
const Nav = ({ active }) => {
  const links = [
    { id: 'index.html', label: 'ホーム' },
    { id: 'services.html', label: '事業内容' },
    { id: 'cases.html', label: '導入事例' },
    { id: 'technology.html', label: '技術' },
    { id: 'company.html', label: '会社情報' },
    { id: 'contact.html', label: 'お問い合わせ' },
  ];
  return (
    <nav className="site-nav">
      <div className="nav-bg" />
      <div className="nav-inner">
        <a className="nav-brand" href="index.html">
          <span dangerouslySetInnerHTML={{__html: LOGO_MARK}} />
          <div>
            <div className="b-name">先端AIロボテック</div>
            <div className="b-en">SENTAN · AI · ROBOTECH</div>
          </div>
        </a>
        <div className="nav-links">
          {links.slice(1).map(l => (
            <a key={l.id} href={l.id}
               className={`nav-link ${active === l.id ? 'active' : ''}`}>{l.label}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="nav-lang">EN</button>
          <a className="btn btn-primary btn-sm" href="contact.html">
            お問い合わせ <Icon path={ICONS.arrow} size={14} />
          </a>
        </div>
      </div>
    </nav>
  );
};

/* ===== Footer ===== */
const Footer = () => {
  const groups = [
    { title: '事業内容', items: [
      ['行政DXシステム', 'services.html#gov'],
      ['業務システム', 'services.html#enterprise'],
      ['メタバース', 'services.html#metaverse'],
      ['DX教育・研修', 'services.html#edu'],
    ]},
    { title: '会社', items: [
      ['ミッション', 'company.html#mission'],
      ['チーム', 'company.html#team'],
      ['会社概要', 'company.html#info'],
      ['沿革', 'company.html#history'],
    ]},
    { title: 'リソース', items: [
      ['導入事例', 'cases.html'],
      ['技術基盤', 'technology.html'],
      ['セキュリティ', 'technology.html#security'],
    ]},
    { title: '法務', items: [
      ['プライバシーポリシー', '#'],
      ['利用規約', '#'],
      ['特定商取引法', '#'],
    ]},
  ];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span dangerouslySetInnerHTML={{__html: LOGO_MARK}} />
            <div>
              <div className="footer-name">先端AIロボテック株式会社</div>
              <div className="footer-en">SENTAN · AI · ROBOTECH INC.</div>
              <div className="footer-addr">
                〒541-0048<br/>
                大阪府大阪市中央区瓦町3-4-10<br/>
                日宝御堂ビル4F
              </div>
            </div>
          </div>
          <div className="footer-grid">
            {groups.map(g => (
              <div key={g.title}>
                <div className="footer-h">{g.title}</div>
                <ul>{g.items.map(([label, href]) =>
                  <li key={label}><a href={href}>{label}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SENTAN AI ROBOTECH INC.</span>
          <span>代表取締役: 山下大貴 · 設立: 2025.03.13</span>
        </div>
      </div>
    </footer>
  );
};

/* ===== CTA (shared end-of-page) ===== */
const CTASection = () => (
  <section className="section section-cta">
    <div className="cta-ring" />
    <div className="container cta-inner">
      <div className="eyebrow">CONTACT — 06</div>
      <h2 className="cta-title">現場に、<br/>次の設計を。</h2>
      <p className="cta-en">The next design, for the field.</p>
      <p className="cta-sub">行政・企業のDX推進から、仮想空間の構築まで。<br/>30分のヒアリングから、最適な設計をご提案します。</p>
      <div className="cta-actions">
        <a className="btn btn-primary btn-lg" href="contact.html">
          お問い合わせフォームへ <Icon path={ICONS.arrow} size={14} />
        </a>
        <a className="btn btn-secondary btn-lg" href="cases.html">導入事例を見る</a>
      </div>
    </div>
  </section>
);

/* ===== Tweaks panel (and host registration) ===== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "cyan",
  "heroVariant": "telemetry",
  "density": "standard",
  "tone": "bilingual"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  document.body.setAttribute('data-theme', t.theme);
  document.body.setAttribute('data-accent', t.accent);
  document.body.setAttribute('data-density', t.density);
  document.body.setAttribute('data-tone', t.tone);
  document.body.setAttribute('data-hero', t.heroVariant);
}

const TweaksPanel = () => {
  const [open, setOpen] = useState(false);
  const [t, setT] = useState(TWEAK_DEFAULTS);

  useEffect(() => { applyTweaks(t); }, [t]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({type: '__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const set = (k, v) => {
    const next = { ...t, [k]: v };
    setT(next);
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: {[k]: v}}, '*');
  };

  const seg = (key, opts) => (
    <div className="tweak-seg">
      {opts.map(([v, lbl]) => (
        <button key={v} className={t[key] === v ? 'on' : ''} onClick={() => set(key, v)}>{lbl}</button>
      ))}
    </div>
  );

  return (
    <div className={`tweaks-panel ${open ? 'on' : ''}`}>
      <div className="tweaks-head">
        <span className="tweaks-title">TWEAKS</span>
        <button className="tweaks-close" onClick={() => setOpen(false)}>
          <Icon path={ICONS.x} size={14} />
        </button>
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Theme</div>
        {seg('theme', [['dark','ダーク'], ['light','ライト']])}
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Accent</div>
        {seg('accent', [['cyan','シアン'], ['quasar','クエーサー']])}
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Hero variant</div>
        {seg('heroVariant', [['telemetry','Telemetry'], ['minimal','Minimal'], ['rings','Rings']])}
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Density</div>
        {seg('density', [['standard','標準'], ['comfortable','ゆったり'], ['compact','詰め']])}
      </div>
      <div className="tweak-group">
        <div className="tweak-label">Copy tone</div>
        {seg('tone', [['bilingual','和英並置'], ['jp','和文のみ']])}
      </div>
    </div>
  );
};

// Apply tweaks BEFORE react mounts to avoid flicker
applyTweaks(TWEAK_DEFAULTS);

Object.assign(window, { Nav, Footer, CTASection, TweaksPanel, Icon, ICONS, LOGO_MARK });
