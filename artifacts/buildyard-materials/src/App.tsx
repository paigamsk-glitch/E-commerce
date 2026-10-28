import { useMemo, useState, type FormEvent } from 'react';
import {
  ArrowDownRight, ArrowRight, BadgeCheck, Boxes, Check, Clock3, HardHat, MapPin,
  Menu, MessageCircle, PackageCheck, Phone, Search, ShieldCheck, Truck, X,
  Mail, Building2, Ruler, Warehouse, ClipboardCheck,
} from 'lucide-react';
import { business, whatsappUrl } from './data/business';
import { categories, products, type Category, type Product } from './data/products';

const reasons = [
  { number:'01', icon:PackageCheck, title:'Materials that make the grade', text:'Known brands and dependable grades, selected for real-world site performance.' },
  { number:'02', icon:Truck, title:'Delivery that keeps pace', text:'Practical dispatch coordination to help your crew keep the work moving.' },
  { number:'03', icon:MessageCircle, title:'Quotes without the runaround', text:'Tell us what you need on WhatsApp. Get a straightforward, human response.' },
  { number:'04', icon:BadgeCheck, title:'Clear, honest dealing', text:'Product details and quantities discussed upfront. No surprises hidden in the fine print.' },
  { number:'05', icon:Boxes, title:'One yard, more of the list', text:'Build essentials across ten material categories, from foundation to finishing.' },
  { number:'06', icon:HardHat, title:'People who know the site', text:'Our team understands the pace and practical questions of a working build.' },
];

function ProductCard({ product }: { product: Product }) {
  const message = `Hello BUILDYARD MATERIALS, please share a current quote for:\n\nMaterial: ${product.name}\nSpecification: ${product.specs}\nIndicative demo price: ${product.price} ${product.unit}\n\nPlease confirm availability, current price, and delivery options.`;
  return (
    <article className="product-card">
      <div className="product-image"><img src={product.art} alt={`${product.name} product illustration`} loading="lazy" /></div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3>{product.name}</h3>
        <div className="product-spec">{product.specs}</div>
        <div className="product-meta">
          <div><div className="product-price">{product.price}</div><span className="demo-label">Demo price · verify with us</span></div>
          <span className="product-unit">{product.unit}</span>
        </div>
        <a className="button button-green" href={whatsappUrl(message)} target="_blank" rel="noreferrer" aria-label={`Ask on WhatsApp about ${product.name}`}>
          <MessageCircle size={15} /> Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}

function YardIllustration() {
  return (
    <svg className="yard-art" viewBox="0 0 520 390" role="img" aria-label="Illustration of construction material pallets in a builders yard">
      <defs>
        <linearGradient id="stack" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f3a15e"/><stop offset="1" stopColor="#bc5724"/></linearGradient>
        <linearGradient id="slab" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d7e0df"/><stop offset="1" stopColor="#82939a"/></linearGradient>
      </defs>
      <path d="M59 312 263 201l196 109-197 73z" fill="#031221" opacity=".55"/>
      <path d="m100 238 127-72 115 63-126 72z" fill="url(#slab)"/>
      <path d="m100 238 116 63v32l-116-64z" fill="#73868c"/>
      <path d="m216 301 126-72v34l-126 70z" fill="#aab7b7"/>
      <path d="m128 225 94-53 90 49-93 54z" fill="#e7ece8"/>
      <path d="m128 225 91 50v24l-91-50z" fill="#9caeae"/>
      <path d="m219 275 93-54v24l-93 54z" fill="#c0c9c6"/>
      <path d="m214 167 87-50 95 52-88 51z" fill="url(#stack)"/>
      <path d="m214 167 94 53v28l-94-53z" fill="#a44720"/>
      <path d="m308 220 88-51v28l-88 51z" fill="#d66a2b"/>
      <path d="m229 158 70-40 77 42-70 41z" fill="#f7b679"/>
      <path d="m229 158 77 43v19l-77-43z" fill="#c55e27"/>
      <path d="m306 201 70-41v19l-70 41z" fill="#dc7738"/>
      <path d="m333 114 67-39 83 45-67 39z" fill="#b9c6c5"/>
      <path d="m333 114 83 45v23l-83-45z" fill="#7d9094"/>
      <path d="m416 159 67-39v23l-67 39z" fill="#9aabad"/>
      <path d="m347 108 53-31 66 36-53 31z" fill="#e1e6e1"/>
      <path d="m347 108 66 36v14l-66-36z" fill="#99a7a7"/>
      <path d="m413 144 53-31v14l-53 31z" fill="#b6c0bc"/>
      <path d="m77 306 139 76 208-119" fill="none" stroke="#f07824" strokeWidth="4" opacity=".85"/>
      <path d="M81 321v17m7-13v17m7-13v17m7-13v17m7-13v17m7-13v17m7-13v17m7-13v17" stroke="#f6a568" strokeWidth="3"/>
      <circle cx="142" cy="121" r="29" fill="#f07824"/>
      <path d="M135 121h14m-7-7v14" stroke="white" strokeWidth="3"/>
      <path d="M48 352h408" stroke="#71828d" strokeWidth="2" opacity=".5"/>
    </svg>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('All materials');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => products.filter(product => {
    const inCategory = activeCategory === 'All materials' || product.category === activeCategory;
    const term = search.trim().toLowerCase();
    const matches = !term || `${product.name} ${product.category} ${product.specs}`.toLowerCase().includes(term);
    return inCategory && matches;
  }), [activeCategory, search]);
  const quoteMaterials = products.map(product => product.name);

  function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      'Hello BUILDYARD MATERIALS, I would like a material quote.',
      '',
      `Name: ${form.get('name')}`,
      `Phone: ${form.get('phone')}`,
      `Material: ${form.get('material')}`,
      `Quantity: ${form.get('quantity')} ${form.get('unit')}`,
      `Delivery location: ${form.get('location')}`,
      `Additional requirements: ${String(form.get('requirements') || '').trim() || 'None'}`,
    ].join('\n');
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  const navItems = [['Materials','#materials'],['Why Buildyard','#why-us'],['Get a quote','#quote'],['Contact','#contact']];
  const generalMessage = 'Hello BUILDYARD MATERIALS, I would like to enquire about construction materials and delivery.';
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Buildyard Materials home">
            <span className="brand-mark"><Building2 size={23} strokeWidth={2.4} /></span>
            <span className="brand-copy"><span className="brand-name">BUILDYARD</span><span className="brand-sub">MATERIALS · BUILT TO LAST</span></span>
          </a>
          <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="button button-green header-quote" href={whatsappUrl(generalMessage)} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><MessageCircle size={15} /> WhatsApp us</a>
          </nav>
          <button className="mobile-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero grid-texture" id="home">
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Your local building supply partner</span>
              <h1>Good builds<br />start <span>here.</span></h1>
              <p>Construction essentials, straight answers, and a quick quote when you need one. Tell us what your site needs — we’ll take it from there.</p>
              <div className="hero-actions">
                <a className="button button-orange" href="#materials">Explore materials <ArrowDownRight size={16} /></a>
                <a className="button button-green" href={whatsappUrl(generalMessage)} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Get a WhatsApp quote</a>
              </div>
              <div className="hero-note"><Check size={15} /><span><b>Built for the site.</b> Helpful people, practical delivery.</span></div>
            </div>
            <div className="hero-visual"><YardIllustration /><div className="hero-stamp"><strong>Made for<br />the build.</strong><span>Materials you can count on</span></div></div>
          </div>
        </section>

        <div className="trust-strip">
          <div className="container trust-inner">
            <div className="trust-item"><ShieldCheck size={17} /> Dependable materials</div>
            <div className="trust-item"><Truck size={17} /> Local delivery support</div>
            <div className="trust-item"><MessageCircle size={17} /> Fast WhatsApp quotes</div>
            <div className="trust-item"><ClipboardCheck size={17} /> Clear product specs</div>
          </div>
        </div>

        <section className="section catalogue" id="materials">
          <div className="container">
            <div className="section-heading">
              <div><span className="eyebrow">The building list</span><h2>Materials for<br />every milestone.</h2></div>
              <p>From footing to final finish, find the essentials for your next job. Product availability and all sample prices should be confirmed with our team.</p>
            </div>
            <div className="demo-notice"><Ruler size={13} /> Demo catalogue & sample pricing — confirm current rates and stock on WhatsApp</div>
            <div className="catalogue-toolbar" style={{marginTop:16}}>
              <label className="search-box"><Search size={17} /><span className="sr-only">Search products</span><input type="search" placeholder="Search materials or specifications" value={search} onChange={event => setSearch(event.target.value)} /></label>
              <span className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'product' : 'products'} shown</span>
            </div>
            <div className="category-list" aria-label="Filter products by category">
              {categories.map(category => <button key={category} type="button" className={`category-chip${activeCategory === category ? ' active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <div className="product-grid">
              {filtered.length ? filtered.map(product => <ProductCard product={product} key={product.id} />) : (
                <div className="empty-results"><strong>No materials found</strong>Try a different search or choose another category.</div>
              )}
            </div>
          </div>
        </section>

        <section className="section why-section" id="why-us">
          <div className="container why-layout">
            <div className="why-intro"><span className="eyebrow">The Buildyard difference</span><h2>Good supply.<br />Less site stress.</h2><p>Building has enough moving parts. We make the materials part feel more straightforward, with the information and follow-through your project deserves.</p><a className="button button-outline" href="#quote">Tell us what you need <ArrowRight size={15} /></a></div>
            <div className="reason-list">
              {reasons.map(reason => {
                const Icon = reason.icon;
                return <article className="reason" key={reason.number}><span className="reason-number">{reason.number} / 06</span><div className="reason-icon"><Icon size={18} /></div><h3>{reason.title}</h3><p>{reason.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="quote-band">
          <div className="container quote-band-inner">
            <div><span className="eyebrow">A clear next step</span><h2>Have a material list?</h2><p>Send the details. We’ll help you price the order and plan delivery.</p></div>
            <a className="button button-green" href="#quote"><MessageCircle size={17} /> Request a quick quote <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="section" id="quote">
          <div className="container quote-layout">
            <aside className="quote-aside">
              <span className="eyebrow">Quick quote</span>
              <h3>Let’s get your list moving.</h3>
              <p>Share the essentials below. Your message opens in WhatsApp, ready for you to review and send to our team. No online order or backend submission.</p>
              <div className="aside-line"><Clock3 size={16} /> Usually replies during business hours</div>
              <div className="aside-line"><Phone size={16} /> {business.phoneDisplay} <span className="demo-label">demo number</span></div>
            </aside>
            <form className="quote-form" onSubmit={submitQuote}>
              <div className="field"><label htmlFor="quote-name">Your name <span>*</span></label><input id="quote-name" name="name" autoComplete="name" required placeholder="Name" /></div>
              <div className="field"><label htmlFor="quote-phone">Phone number <span>*</span></label><input id="quote-phone" name="phone" type="tel" autoComplete="tel" required pattern="[0-9+() .-]{7,20}" title="Enter a valid phone number" placeholder="+91 98765 43210" /></div>
              <div className="field"><label htmlFor="quote-material">Material <span>*</span></label><select id="quote-material" name="material" required defaultValue=""><option value="" disabled>Select material</option>{quoteMaterials.map(material => <option key={material}>{material}</option>)}<option>Multiple items / material list</option></select></div>
              <div className="field"><label htmlFor="quote-quantity">Quantity <span>*</span></label><input id="quote-quantity" name="quantity" type="number" min="0.01" step="any" required placeholder="e.g. 120" /></div>
              <div className="field"><label htmlFor="quote-unit">Unit <span>*</span></label><select id="quote-unit" name="unit" required defaultValue=""><option value="" disabled>Select unit</option><option>bags</option><option>pieces</option><option>kilograms</option><option>tonnes</option><option>cubic feet</option><option>square feet</option><option>metres</option><option>other</option></select></div>
              <div className="field"><label htmlFor="quote-location">Delivery location <span>*</span></label><input id="quote-location" name="location" autoComplete="street-address" required placeholder="Area, city or site address" /></div>
              <div className="field full"><label htmlFor="quote-requirements">Additional requirements <span>(optional)</span></label><textarea id="quote-requirements" name="requirements" placeholder="Preferred brand, grade, delivery timing, or anything else we should know" /></div>
              <div className="form-foot"><small>Required fields are marked *. Selecting “Send quote on WhatsApp” opens a prefilled message — review it and tap send in WhatsApp.</small><button type="submit" className="button button-green"><MessageCircle size={16} /> Send quote on WhatsApp</button></div>
            </form>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container">
            <div className="section-heading">
              <div><span className="eyebrow">Find your materials</span><h2>Local help.<br />Right on site.</h2></div>
              <div><div className="demo-notice"><MapPin size={13} /> Sample contact details — replace before publishing</div><p style={{marginTop:12}}>Questions about stock, specifications, or delivery? Talk to the yard team directly.</p></div>
            </div>
            <div className="contact-grid">
              <div className="contact-details">
                <div className="contact-item"><span className="contact-icon"><MapPin size={17} /></span><div><h3>Visit the yard</h3><p>{business.address}</p></div></div>
                <div className="contact-item"><span className="contact-icon"><Phone size={17} /></span><div><h3>Call the team</h3><a href={`tel:${business.phoneDigits}`}>{business.phoneDisplay}</a><p>Sample phone number</p></div></div>
                <div className="contact-item"><span className="contact-icon"><Mail size={17} /></span><div><h3>Email us</h3><a href={`mailto:${business.email}`}>{business.email}</a><p>Sample email address</p></div></div>
                <div className="contact-item"><span className="contact-icon"><Clock3 size={17} /></span><div><h3>Opening hours</h3><p>{business.hours}</p></div></div>
                <div className="contact-item"><span className="contact-icon"><MessageCircle size={17} /></span><div><h3>WhatsApp</h3><a href={whatsappUrl(generalMessage)} target="_blank" rel="noreferrer">Message Buildyard</a><p>Demo business number</p></div></div>
                <div className="contact-item"><span className="contact-icon"><Warehouse size={17} /></span><div><h3>Local delivery</h3><p>Ask us to confirm coverage and timing for your site.</p></div></div>
              </div>
              <div className="map-card">
                <div><span className="map-mark"><MapPin size={24} /></span><h3>Meet us at<br />the builders market.</h3><p>{business.address}</p></div>
                <a className="button" href={business.mapUrl} target="_blank" rel="noreferrer">Open Google Maps <ArrowRight size={15} /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="brand" href="#home"><span className="brand-mark"><Building2 size={22} /></span><span className="brand-copy"><span className="brand-name">BUILDYARD</span><span className="brand-sub">MATERIALS · BUILT TO LAST</span></span></a>
            <span className="footer-tagline">Practical materials. Straightforward service.</span>
            <nav className="footer-links" aria-label="Footer navigation">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} BUILDYARD MATERIALS. Demo storefront.</span><span>Prices and business details shown are samples. Confirm before ordering.</span></div>
        </div>
      </footer>
      <a className="floating-wa" href={whatsappUrl(generalMessage)} target="_blank" rel="noreferrer" aria-label="Chat with Buildyard on WhatsApp"><MessageCircle size={25} /></a>
    </>
  );
}

export default App;
