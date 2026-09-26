import React, { useState, useEffect } from 'react';
import { createRootRoute, createRoute, createRouter, Link, Outlet, useNavigate } from '@tanstack/react-router';
import { Coffee, Users, UserCheck, Sparkles, ArrowRight, Plus, X, MapPin } from 'lucide-react';
import { CAFE_MENU, MenuItem } from './data/menu';
import { explainDish, generateIcebreaker } from './lib/gemini';
import { getCart, saveCart, CartItem, getAttendees, getStoredProfile, saveProfile, UserProfile, IntentType } from './lib/store';

// ================= ROOT ROUTE =================
export const rootRoute = createRootRoute({
  component: function Root() {
    const [cartCount, setCartCount] = useState(0);
    const [attendeeCount, setAttendeeCount] = useState(5);

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
        <header className="app-header">
          <div className="header-row">
            <Link to="/" className="brand-badge">
              <span>☕ BrewLens</span>
              <span className="google-pill">Google Pop-Up</span>
            </Link>
            <nav className="nav-tabs">
              <Link to="/menu" className="nav-btn" activeProps={{ className: 'nav-btn active' }}>
                <Coffee size={15} />
                <span>Menu</span>
                {cartCount > 0 && <span style={{ background: '#10b981', color: '#0c0f17', borderRadius: '999px', padding: '1px 6px', fontSize: '0.7rem', fontWeight: 800 }}>{cartCount}</span>}
              </Link>
              <Link to="/lounge" className="nav-btn" activeProps={{ className: 'nav-btn active' }}>
                <Users size={15} />
                <span>Lounge ({attendeeCount})</span>
              </Link>
              <Link to="/checkin" className="nav-btn" activeProps={{ className: 'nav-btn active' }}>
                <UserCheck size={15} />
                <span>Check In</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="container" style={{ marginTop: '20px' }}>
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #141b29, #1c2638)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Sparkles size={16} />
            <span>Google Cloud Builder Pop-Up · Bengaluru</span>
          </div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, lineHeight: 1.2 }}>
            Never wonder what you're ordering again.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px' }}>
            Explore visual dish breakdowns powered by <strong>Gemini 3.8 Flash</strong>, see ingredients & flavor profiles, and connect in real-time with builders in the room.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          <Link to="/menu" style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            <div>
              <div style={{ width: '38px', height: '38px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '10px' }}>
                <Coffee size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>Visual Smart Menu</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                Browse all {CAFE_MENU.length} cafe items with flavor radar, ingredient breakdowns, and Gemini Sommelier explainers.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem' }}>
              <span>Explore Menu</span>
              <ArrowRight size={15} />
            </div>
          </Link>

          <Link to="/lounge" style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}>
            <div>
              <div style={{ width: '38px', height: '38px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', marginBottom: '10px' }}>
                <Users size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>Builder Lounge</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                {attendees.length} builders currently checked in. See who's open to chat and get 1-click AI icebreakers.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
              <span>Enter Lounge</span>
              <ArrowRight size={15} />
            </div>
          </Link>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <span>🚀 Powered by: <strong>Gemini 3.8 Flash</strong> + <strong>Nano Banana Pro</strong></span>
          <span>⚡ Built with: <strong>TanStack Router</strong> + <strong>Park UI</strong></span>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Visual Smart Menu</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Understand every brew & bite before you order</p>
          </div>
          <button className="btn-outline" onClick={() => setVegOnly(!vegOnly)} style={{ borderColor: vegOnly ? '#10b981' : 'var(--border)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: vegOnly ? '#10b981' : '#64748b' }}></span>
            <span>Veg Only</span>
          </button>
        </div>

        <div className="category-strip">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-card" onClick={() => handleExplain(item)}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <span className={`diet-tag ${item.isVeg ? 'diet-veg' : 'diet-nonveg'}`}>
                    {item.isVeg ? 'Veg' : 'Non-Veg'}
                  </span>
                  <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.05rem' }}>₹{item.price}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '8px' }}>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>{item.tagline}</p>
                
                <div className="taste-meters">
                  {item.tasteProfile.spice > 0 && <span className="meter-tag">🌶️ Spice: {item.tasteProfile.spice}/5</span>}
                  {item.tasteProfile.sweetness > 0 && <span className="meter-tag">🍯 Sweet: {item.tasteProfile.sweetness}/5</span>}
                  {item.tasteProfile.bitterness > 0 && <span className="meter-tag">☕ Roast: {item.tasteProfile.bitterness}/5</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  className="btn-outline"
                  style={{ flex: 1, fontSize: '0.78rem' }}
                  onClick={(e) => { e.stopPropagation(); handleExplain(item); }}
                >
                  <Sparkles size={13} color="#38bdf8" />
                  <span>Explain Dish</span>
                </button>
                <button
                  className="btn-solid"
                  style={{ padding: '8px 12px', fontSize: '0.78rem' }}
                  onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {activeItem && (
          <div className="modal-overlay" onClick={() => setActiveItem(null)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`diet-tag ${activeItem.isVeg ? 'diet-veg' : 'diet-nonveg'}`}>
                  {activeItem.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setActiveItem(null)}>
                  <X size={20} />
                </button>
              </div>

              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeItem.name}</h2>
                <p style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.05rem' }}>₹{activeItem.price}</p>
              </div>

              <div style={{ background: 'var(--surface-card)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Key Ingredients
                </div>
                <p style={{ fontSize: '0.85rem' }}>{activeItem.ingredients.join(' · ')}</p>
              </div>

              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px' }}>
                  <Sparkles size={15} />
                  <span>Gemini Sommelier Explainer</span>
                </div>
                {explaining ? (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Analyzing flavor notes...</div>
                ) : (
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{aiExplanation}</p>
                )}
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <strong>🖼️ Nano Banana Pro Visual Prompt:</strong>
                <div style={{ fontStyle: 'italic', marginTop: '2px' }}>"{activeItem.imagePrompt}"</div>
              </div>

              <button className="btn-solid" style={{ width: '100%' }} onClick={() => { addToCart(activeItem); setActiveItem(null); }}>
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
    const [company, setCompany] = useState(existing?.company || '');
    const [project, setProject] = useState(existing?.project || '');
    const [skills, setSkills] = useState(existing?.skills?.join(', ') || 'React, TypeScript, Gemini');
    const [intent, setIntent] = useState<IntentType>(existing?.intent || 'chat');
    const [tableNo, setTableNo] = useState(existing?.tableNo || 'Table 4');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const profile: UserProfile = {
        id: existing?.id || String(Date.now()),
        name: name || 'Anonymous Builder',
        role: role || 'Builder',
        company: company || 'Self / Startup',
        project: project || 'Building at Google Pop-Up',
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        intent,
        tableNo: tableNo || 'Main Area',
        checkedInAt: 'Just now',
        avatarColor: '#10b981'
      };
      saveProfile(profile);
      setSubmitted(true);
      setTimeout(() => {
        navigate({ to: '/lounge' });
      }, 600);
    };

    return (
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <UserCheck size={22} color="#10b981" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Cafe Presence Check-In</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '18px' }}>
            Let other builders in the room know what you're working on and if you're open to chat.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>YOUR NAME</label>
              <input
                type="text"
                required
                className="search-input"
                style={{ marginTop: '3px' }}
                placeholder="e.g. Anirudh"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ROLE</label>
                <input
                  type="text"
                  className="search-input"
                  style={{ marginTop: '3px' }}
                  placeholder="e.g. Engineer / PM"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TABLE / SEAT</label>
                <input
                  type="text"
                  className="search-input"
                  style={{ marginTop: '3px' }}
                  placeholder="e.g. Table 4"
                  value={tableNo}
                  onChange={e => setTableNo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>WHAT ARE YOU BUILDING TODAY?</label>
              <input
                type="text"
                required
                className="search-input"
                style={{ marginTop: '3px' }}
                placeholder="e.g. Real-time Agent with Gemini 3.8 Flash"
                value={project}
                onChange={e => setProject(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>SKILLS / TECH STACK</label>
              <input
                type="text"
                className="search-input"
                style={{ marginTop: '3px' }}
                placeholder="React, Python, GCP, Vertex AI"
                value={skills}
                onChange={e => setSkills(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>
                NETWORKING INTENT
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setIntent('chat')}
                  className={`btn-outline ${intent === 'chat' ? 'diet-veg' : ''}`}
                  style={{ fontSize: '0.74rem', justifyContent: 'center' }}
                >
                  🟢 Open to Chat
                </button>
                <button
                  type="button"
                  onClick={() => setIntent('cowork')}
                  className={`btn-outline ${intent === 'cowork' ? 'diet-veg' : ''}`}
                  style={{ fontSize: '0.74rem', justifyContent: 'center' }}
                >
                  🟡 Coworking
                </button>
                <button
                  type="button"
                  onClick={() => setIntent('focus')}
                  className={`btn-outline ${intent === 'focus' ? 'diet-nonveg' : ''}`}
                  style={{ fontSize: '0.74rem', justifyContent: 'center' }}
                >
                  🔴 Deep Focus
                </button>
              </div>
            </div>

            <button type="submit" className="btn-solid" style={{ marginTop: '6px', width: '100%' }}>
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
      const matchesSearch = !searchQuery ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesIntent && matchesSearch;
    });

    const handleGetIcebreaker = async (target: UserProfile) => {
      setGenerating(true);
      setIcebreakerModal({ target, text: 'Generating conversation starter with Gemini 3.8 Flash...' });
      const userA = myProfile || { name: 'Fellow Builder', project: 'Google Builder Pop-Up', skills: ['Tech'] };
      const prompt = await generateIcebreaker(userA, target);
      setIcebreakerModal({ target, text: prompt });
      setGenerating(false);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Builder Lounge</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{attendees.length} builders currently checked into the cafe</p>
          </div>
          <Link to="/checkin" className="btn-solid" style={{ fontSize: '0.8rem' }}>
            + Update Status
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '6px', margin: '14px 0', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className={`cat-pill ${filterIntent === 'all' ? 'active' : ''}`} onClick={() => setFilterIntent('all')}>
            All ({attendees.length})
          </button>
          <button className={`cat-pill ${filterIntent === 'chat' ? 'active' : ''}`} onClick={() => setFilterIntent('chat')}>
            🟢 Open to Chat
          </button>
          <button className={`cat-pill ${filterIntent === 'cowork' ? 'active' : ''}`} onClick={() => setFilterIntent('cowork')}>
            🟡 Coworking
          </button>
          <button className={`cat-pill ${filterIntent === 'focus' ? 'active' : ''}`} onClick={() => setFilterIntent('focus')}>
            🔴 Deep Focus
          </button>

          <input
            type="text"
            className="search-input"
            style={{ maxWidth: '200px', marginLeft: 'auto', padding: '6px 10px', fontSize: '0.8rem' }}
            placeholder="Search skill / project..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="lounge-grid">
          {filtered.map(person => (
            <div key={person.id} className="lounge-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: person.avatarColor || '#38bdf8', color: '#0c0f17', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem' }}>
                      {person.name[0]}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{person.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{person.role} · {person.company}</p>
                    </div>
                  </div>
                  <span className={`intent-badge intent-${person.intent}`}>
                    {person.intent === 'chat' ? '🟢 Chat' : person.intent === 'cowork' ? '🟡 Cowork' : '🔴 Focus'}
                  </span>
                </div>

                <div style={{ background: 'var(--surface-card)', padding: '8px 10px', borderRadius: '6px', margin: '10px 0 8px 0' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Building Today</div>
                  <p style={{ fontSize: '0.82rem', marginTop: '2px', fontWeight: 500 }}>{person.project}</p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                  {person.skills.map((s, idx) => (
                    <span key={idx} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', borderTop: '1px solid var(--border)', paddingTop: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={11} color="#38bdf8" />
                    {person.tableNo}
                  </span>
                  {person.currentOrder && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Coffee size={11} color="#f59e0b" />
                      {person.currentOrder}
                    </span>
                  )}
                </div>

                <button
                  className="btn-outline"
                  style={{ width: '100%', fontSize: '0.75rem', padding: '6px 10px' }}
                  onClick={() => handleGetIcebreaker(person)}
                >
                  <Sparkles size={12} color="#38bdf8" />
                  <span>AI Icebreaker Opener</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {icebreakerModal && (
          <div className="modal-overlay" onClick={() => setIcebreakerModal(null)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="#38bdf8" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Icebreaker for {icebreakerModal.target.name}</h3>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setIcebreakerModal(null)}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '14px', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#f8fafc', fontStyle: 'italic' }}>
                  "{icebreakerModal.text}"
                </p>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                📍 Located at: <strong>{icebreakerModal.target.tableNo}</strong> · Building: {icebreakerModal.target.project}
              </div>

              <button className="btn-solid" onClick={() => setIcebreakerModal(null)}>
                Got it, go say hi! 👋
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
});
