import React, { useState, useEffect } from 'react';
import { createRootRoute, createRoute, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { Coffee, Users, UserCheck, Sparkles, ArrowRight, Plus, X, MapPin } from 'lucide-react';
import { CAFE_MENU, MenuItem } from './data/menu';
import { explainDish, generateIcebreaker } from './lib/gemini';
import { getCart, saveCart, CartItem, getAttendees, getStoredProfile, saveProfile, UserProfile, IntentType } from './lib/store';

// ================= ROOT ROUTE =================
export const rootRoute = createRootRoute({
  component: function Root() {
    const [cartCount, setCartCount] = useState(0);
    const [attendeeCount, setAttendeeCount] = useState(6);

    useEffect(() => {
      const update = () => {
        const cart = getCart();
        setCartCount(cart.reduce((sum, i) => sum + i.quantity, 0));
        setAttendeeCount(getAttendees().length);
      };
      update();
      const interval = setInterval(update, 1500);
      return () => clearInterval(interval);
    }, []);

    return (
      <>
        <header className="masthead">
          <div className="masthead-inner">
            <Link to="/" className="brand-block">
              <div className="brand-monogram">☕</div>
              <div className="brand-text">
                <h1>Third Wave Cafe</h1>
                <p>Bengaluru Creative Lounge</p>
              </div>
            </Link>
            <nav className="nav-tabs">
              <Link to="/menu" className="btn-nav" activeProps={{ className: 'btn-nav active' }}>
                <Coffee size={15} />
                <span>Menu</span>
                {cartCount > 0 && <span style={{ background: 'var(--brand-green)', color: '#ffffff', borderRadius: '999px', padding: '1px 6px', fontSize: '0.7rem', fontWeight: 800 }}>{cartCount}</span>}
              </Link>
              <Link to="/lounge" className="btn-nav" activeProps={{ className: 'btn-nav active' }}>
                <Users size={15} />
                <span>Lounge ({attendeeCount})</span>
              </Link>
              <Link to="/checkin" className="btn-nav" activeProps={{ className: 'btn-nav active' }}>
                <UserCheck size={15} />
                <span>Check In</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="container" style={{ marginTop: '28px' }}>
          <Outlet />
        </main>
      </>
    );
  }
});

// ================= HOME ROUTE =================
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    const attendees = getAttendees();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-green)', fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            <Sparkles size={15} />
            <span>Third Wave Coffee · Bengaluru · Google Builder Pop-Up</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--ink-primary)', marginBottom: '12px' }}>
            See what you're ordering. Connect with who's in the room.
          </h1>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '1.02rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Explore visual tasting notes and ingredient breakdowns powered by <strong>Gemini 3.8 Flash</strong>, or check in to discover writers, filmmakers, designers, founders, and creators at the cafe.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <Link to="/menu" style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.15s ease'
          }}>
            <div>
              <div style={{ width: '42px', height: '42px', background: 'var(--brand-green-light)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-green)', marginBottom: '14px' }}>
                <Coffee size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>Visual Smart Menu</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                Browse all {CAFE_MENU.length} Third Wave Coffee specialties with flavor radar, ingredient details, and Gemini Sommelier tasting notes.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-green)', fontWeight: 700, fontSize: '0.86rem' }}>
              <span>Explore Menu</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          <Link to="/lounge" style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
            transition: 'all 0.15s ease'
          }}>
            <div>
              <div style={{ width: '42px', height: '42px', background: 'var(--brand-amber-light)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-amber)', marginBottom: '14px' }}>
                <Users size={22} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '6px' }}>Creative Cafe Lounge</h3>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
                {attendees.length} creatives, writers & builders in the room. See what people are creating and get 1-click AI icebreakers.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-amber)', fontWeight: 700, fontSize: '0.86rem' }}>
              <span>Enter Lounge</span>
              <ArrowRight size={15} />
            </div>
          </Link>
        </div>

        <div style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '6px',
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.8rem',
          color: 'var(--ink-secondary)'
        }}>
          <span>✨ Powered by <strong>Gemini 3.8 Flash</strong> + <strong>Nano Banana Pro</strong></span>
          <span>📍 Third Wave Coffee · Bengaluru</span>
        </div>
      </div>
    );
  }
});

// ================= MENU ROUTE =================
export const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/menu',
  component: function Menu() {
    const [selectedCat, setSelectedCat] = useState<string>('All');
    const [vegOnly, setVegOnly] = useState<boolean>(false);
    const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
    const [explaining, setExplaining] = useState<boolean>(false);
    const [aiExplanation, setAiExplanation] = useState<string>('');
    const [cart, setCart] = useState<CartItem[]>(getCart());

    const categories = ['All', 'Hot Brew', 'Cold Brew', 'Sandwich', 'Pancake', 'Shareable Bites'];

    const filteredItems = CAFE_MENU.filter(item => {
      const matchesCat = selectedCat === 'All' || item.category === selectedCat;
      const matchesVeg = !vegOnly || item.isVeg;
      return matchesCat && matchesVeg;
    });

    const handleExplain = async (item: MenuItem) => {
      setActiveItem(item);
      setExplaining(true);
      setAiExplanation('');
      try {
        const res = await explainDish(item);
        setAiExplanation(res);
      } catch {
        setAiExplanation(item.description);
      } finally {
        setExplaining(false);
      }
    };

    const addToCart = (item: MenuItem) => {
      const existing = cart.find(c => c.item.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = cart.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      } else {
        updated = [...cart, { item, quantity: 1 }];
      }
      setCart(updated);
      saveCart(updated);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--ink-primary)', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Third Wave Coffee Menu</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.84rem' }}>Visual guides, taste profiles & sommelier notes</p>
          </div>
          <button className="btn-secondary" onClick={() => setVegOnly(!vegOnly)} style={{ borderColor: vegOnly ? 'var(--brand-green)' : 'var(--border-strong)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: vegOnly ? 'var(--brand-green)' : 'var(--ink-muted)' }}></span>
            <span>Veg Only</span>
          </button>
        </div>

        <div className="category-strip">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-chip ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card" onClick={() => handleExplain(item)}>
              {item.imageUrl && (
                <div className="card-image-wrap">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
              )}
              <div className="card-body">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span className={`diet-tag ${item.isVeg ? 'diet-veg' : 'diet-nonveg'}`}>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--brand-green)', fontSize: '1.05rem' }}>₹{item.price}</span>
                  </div>
                  <h3 className="item-title">{item.name}</h3>
                  <p className="item-tagline">{item.tagline}</p>
                  
                  <div className="taste-radar-row">
                    {item.tasteProfile.spice > 0 && <span className="taste-chip">🌶️ Spice: {item.tasteProfile.spice}/5</span>}
                    {item.tasteProfile.sweetness > 0 && <span className="taste-chip">🍯 Sweet: {item.tasteProfile.sweetness}/5</span>}
                    {item.tasteProfile.bitterness > 0 && <span className="taste-chip">☕ Roast: {item.tasteProfile.bitterness}/5</span>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <button
                    className="btn-secondary"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '6px 10px' }}
                    onClick={(e) => { e.stopPropagation(); handleExplain(item); }}
                  >
                    <Sparkles size={13} color="var(--brand-forest)" />
                    <span>Explain Taste</span>
                  </button>
                  <button
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                    onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                  >
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeItem && (
          <div className="modal-overlay" onClick={() => setActiveItem(null)}>
            <div className="modal-editorial-card" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`diet-tag ${activeItem.isVeg ? 'diet-veg' : 'diet-nonveg'}`}>
                  {activeItem.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
                <button style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer' }} onClick={() => setActiveItem(null)}>
                  <X size={20} />
                </button>
              </div>

              {activeItem.imageUrl && (
                <div style={{ width: '100%', height: '220px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-subtle)' }}>
                  <img src={activeItem.imageUrl} alt={activeItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink-primary)' }}>{activeItem.name}</h2>
                <p style={{ color: 'var(--brand-green)', fontWeight: 700, fontSize: '1.1rem' }}>₹{activeItem.price}</p>
              </div>

              <div style={{ background: 'var(--bg-subtle)', padding: '14px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-muted)', letterSpacing: '0.06em', marginBottom: '4px' }}>
                  Key Ingredients
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--ink-primary)' }}>{activeItem.ingredients.join(' · ')}</p>
              </div>

              <div style={{ background: 'var(--brand-green-light)', border: '1px solid var(--brand-green-border)', padding: '16px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-green)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px' }}>
                  <Sparkles size={15} />
                  <span>Gemini Sommelier Explainer</span>
                </div>
                {explaining ? (
                  <div style={{ color: 'var(--ink-secondary)', fontSize: '0.85rem' }}>Brewing tasting notes...</div>
                ) : (
                  <p style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--ink-primary)', whiteSpace: 'pre-line' }}>{aiExplanation}</p>
                )}
              </div>

              {activeItem.funFact && (
                <div style={{ background: 'var(--brand-amber-light)', border: '1px solid #fde68a', padding: '12px 14px', borderRadius: '6px', fontSize: '0.8rem', color: '#92400e' }}>
                  💡 <strong>Origin / Fun Fact:</strong> {activeItem.funFact}
                </div>
              )}

              <button className="btn-primary" style={{ width: '100%', padding: '10px' }} onClick={() => { addToCart(activeItem); setActiveItem(null); }}>
                Add to Order (₹{activeItem.price})
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
});

// ================= CHECKIN ROUTE =================
export const checkinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkin',
  component: function Checkin() {
    const existing = getStoredProfile();
    const [name, setName] = useState(existing?.name || '');
    const [role, setRole] = useState(existing?.role || '');
    const [field, setField] = useState(existing?.field || 'Cinema & Writing');
    const [project, setProject] = useState(existing?.project || '');
    const [tags, setTags] = useState(existing?.tags?.join(', ') || 'Screenwriting, Storytelling, Creative');
    const [intent, setIntent] = useState<IntentType>(existing?.intent || 'chat');
    const [tableNo, setTableNo] = useState(existing?.tableNo || 'Table 4');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const profile: UserProfile = {
        id: existing?.id || String(Date.now()),
        name: name || 'Anonymous Creative',
        role: role || 'Writer / Creator',
        field: field || 'Arts & Creative',
        project: project || 'Writing & creating at Third Wave Coffee',
        tags: tags.split(',').map(s => s.trim()).filter(Boolean),
        intent,
        tableNo: tableNo || 'Main Seating',
        checkedInAt: 'Just now',
        avatarColor: '#10b981'
      };
      saveProfile(profile);
      setSubmitted(true);
      setTimeout(() => {
        navigate({ to: '/lounge' });
      }, 500);
    };

    return (
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '28px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <UserCheck size={24} color="var(--brand-green)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Cafe Presence Check-In</h2>
          </div>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '0.85rem', marginBottom: '20px', lineHeight: 1.5 }}>
            Open to all writers, filmmakers, artists, architects, designers, founders & creators. Let people around you know what you're working on.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Your Name</label>
              <input
                type="text"
                required
                className="search-input-editorial"
                style={{ width: '100%', marginTop: '4px' }}
                placeholder="e.g. Anirudh"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Role / Craft</label>
                <input
                  type="text"
                  className="search-input-editorial"
                  style={{ width: '100%', marginTop: '4px' }}
                  placeholder="e.g. Screenwriter / Director"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Table / Seat</label>
                <input
                  type="text"
                  className="search-input-editorial"
                  style={{ width: '100%', marginTop: '4px' }}
                  placeholder="e.g. Table 4 / Patio"
                  value={tableNo}
                  onChange={e => setTableNo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Field / Discipline</label>
              <input
                type="text"
                className="search-input-editorial"
                style={{ width: '100%', marginTop: '4px' }}
                placeholder="e.g. Cinema, Fiction Writing, Architecture, Design, Music"
                value={field}
                onChange={e => setField(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>What are you working on today?</label>
              <input
                type="text"
                required
                className="search-input-editorial"
                style={{ width: '100%', marginTop: '4px' }}
                placeholder="e.g. Drafting a mystery screenplay / Composing ambient score"
                value={project}
                onChange={e => setProject(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tags / Interests (comma separated)</label>
              <input
                type="text"
                className="search-input-editorial"
                style={{ width: '100%', marginTop: '4px' }}
                placeholder="Screenwriting, Documentary, Audio, Fiction"
                value={tags}
                onChange={e => setTags(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px', display: 'block' }}>
                Social / Work Intent
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIntent('chat')}
                  className={`btn-secondary ${intent === 'chat' ? 'diet-veg' : ''}`}
                  style={{ fontSize: '0.76rem', padding: '8px 6px' }}
                >
                  🟢 Open to Chat
                </button>
                <button
                  type="button"
                  onClick={() => setIntent('cowork')}
                  className={`btn-secondary ${intent === 'cowork' ? 'diet-veg' : ''}`}
                  style={{ fontSize: '0.76rem', padding: '8px 6px' }}
                >
                  🟡 Coworking
                </button>
                <button
                  type="button"
                  onClick={() => setIntent('focus')}
                  className={`btn-secondary ${intent === 'focus' ? 'diet-nonveg' : ''}`}
                  style={{ fontSize: '0.76rem', padding: '8px 6px' }}
                >
                  🔴 Deep Focus
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px', width: '100%', padding: '11px' }}>
              {submitted ? 'Saving...' : 'Save Presence & Enter Lounge'}
            </button>
          </form>
        </div>
      </div>
    );
  }
});

// ================= LOUNGE ROUTE =================
export const loungeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/lounge',
  component: function Lounge() {
    const [attendees] = useState<UserProfile[]>(getAttendees());
    const [filterIntent, setFilterIntent] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [icebreakerModal, setIcebreakerModal] = useState<{ target: UserProfile; text: string } | null>(null);
    const [generating, setGenerating] = useState<boolean>(false);
    const myProfile = getStoredProfile();

    const filtered = attendees.filter(a => {
      const matchesIntent = filterIntent === 'all' || a.intent === filterIntent;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (a.name && a.name.toLowerCase().includes(q)) ||
        (a.project && a.project.toLowerCase().includes(q)) ||
        (a.field && a.field.toLowerCase().includes(q)) ||
        (Array.isArray(a.tags) && a.tags.some(s => s && s.toLowerCase().includes(q)));
      return matchesIntent && matchesSearch;
    });

    const handleGetIcebreaker = async (target: UserProfile) => {
      setGenerating(true);
      setIcebreakerModal({ target, text: 'Thinking of a personalized creative conversation starter with Gemini...' });
      const userA = myProfile || { name: 'Fellow Creative', project: 'Third Wave Coffee session', field: 'Creative Work', tags: [] };
      const prompt = await generateIcebreaker(userA, target);
      setIcebreakerModal({ target, text: prompt });
      setGenerating(false);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--ink-primary)', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Creative Cafe Lounge</h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.84rem' }}>{attendees.length} writers, filmmakers, artists & creators in the room</p>
          </div>
          <Link to="/checkin" className="btn-primary" style={{ fontSize: '0.82rem', padding: '7px 14px' }}>
            + Update My Status
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '8px', margin: '14px 0', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className={`cat-chip ${filterIntent === 'all' ? 'active' : ''}`} onClick={() => setFilterIntent('all')}>
            All ({attendees.length})
          </button>
          <button className={`cat-chip ${filterIntent === 'chat' ? 'active' : ''}`} onClick={() => setFilterIntent('chat')}>
            🟢 Open to Chat
          </button>
          <button className={`cat-chip ${filterIntent === 'cowork' ? 'active' : ''}`} onClick={() => setFilterIntent('cowork')}>
            🟡 Coworking
          </button>
          <button className={`cat-chip ${filterIntent === 'focus' ? 'active' : ''}`} onClick={() => setFilterIntent('focus')}>
            🔴 Deep Focus
          </button>

          <input
            type="text"
            className="search-input-editorial"
            style={{ maxWidth: '240px', marginLeft: 'auto', padding: '6px 10px', fontSize: '0.82rem' }}
            placeholder="Search craft, writing, field..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="lounge-grid">
          {filtered.map(person => {
            const initial = (person.name && person.name.trim() ? person.name.trim()[0] : 'C').toUpperCase();
            const tags = Array.isArray(person.tags) ? person.tags : [];
            
            return (
              <div key={person.id} className="lounge-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="avatar-editorial">
                        {initial}
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink-primary)' }}>{person.name || 'Anonymous Creator'}</h3>
                        <p style={{ color: 'var(--ink-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>{person.role || 'Creator'} · <span style={{ color: 'var(--brand-forest)' }}>{person.field || 'Creative'}</span></p>
                      </div>
                    </div>
                    <span className={`intent-badge intent-${person.intent || 'chat'}`}>
                      {person.intent === 'chat' ? '🟢 Chat' : person.intent === 'cowork' ? '🟡 Cowork' : '🔴 Focus'}
                    </span>
                  </div>

                  <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: '6px', margin: '12px 0 10px 0', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Working On Today</div>
                    <p style={{ fontSize: '0.84rem', marginTop: '2px', fontWeight: 500, color: 'var(--ink-primary)', lineHeight: 1.4 }}>{person.project || 'Creative session'}</p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {tags.map((s, idx) => (
                      <span key={idx} className="craft-tag">{s}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', color: 'var(--ink-muted)', marginBottom: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="var(--brand-green)" />
                      {person.tableNo || 'Main Area'}
                    </span>
                    {person.currentOrder && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--brand-amber)', fontWeight: 600 }}>
                        <Coffee size={12} />
                        {person.currentOrder}
                      </span>
                    )}
                  </div>

                  <button
                    className="btn-secondary"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '7px 12px' }}
                    onClick={() => handleGetIcebreaker(person)}
                  >
                    <Sparkles size={13} color="var(--brand-forest)" />
                    <span>AI Icebreaker Opener</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {icebreakerModal && (
          <div className="modal-overlay" onClick={() => setIcebreakerModal(null)}>
            <div className="modal-editorial-card" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--brand-green)" />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink-primary)' }}>Icebreaker for {icebreakerModal.target.name}</h3>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer' }} onClick={() => setIcebreakerModal(null)}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ background: 'var(--brand-green-light)', border: '1px solid var(--brand-green-border)', padding: '16px', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.96rem', lineHeight: 1.5, color: 'var(--ink-primary)', fontStyle: 'italic' }}>
                  "{icebreakerModal.text}"
                </p>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                📍 Seated at: <strong>{icebreakerModal.target.tableNo}</strong> · Craft: {icebreakerModal.target.field}
              </div>

              <button className="btn-primary" onClick={() => setIcebreakerModal(null)}>
                Got it, go say hi! 👋
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
});
