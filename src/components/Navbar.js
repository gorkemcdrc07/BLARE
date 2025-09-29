import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Navbar.css";

/* ===== Basit ikonlar ===== */
const IcSearch = (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const IcUser = (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 20c1.5-3.3 5-5 8-5s6.5 1.7 8 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);
const IcBag = (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}>
        <path d="M6 7h12l-1 12H7L6 7z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);
const IcChevron = (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" {...p}>
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const IcChevronR = IcChevron;
const IcMenu = (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...p}>
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const IcClose = (p) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" {...p}>
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export default function Navbar({
    arama,
    setArama,
    toplamAdet,
    toplamTutar,
    formatTL,
    adetAzalt,
    sepeteEkle,
    urunSil,
    sepet,
    toUrunler,
}) {
    const [profilAcik, setProfilAcik] = useState(false);
    const [sepetAcik, setSepetAcik] = useState(false);
    const [shadow, setShadow] = useState(false);

    // MOBİL: drawer & arama sheet
    const [mOpen, setMOpen] = useState(false);
    const [mSearchOpen, setMSearchOpen] = useState(false);

    const profileRef = useRef(null);
    const cartRef = useRef(null);
    const navigate = useNavigate();

    // scroll gölgesi
    useEffect(() => {
        const onScroll = () => setShadow(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // dışarı tıklayınca menüleri kapat
    useEffect(() => {
        const onClick = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfilAcik(false);
            if (cartRef.current && !cartRef.current.contains(e.target)) setSepetAcik(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") {
                setProfilAcik(false);
                setSepetAcik(false);
                setMOpen(false);
                setMSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    // Drawer/arama açıkken body scroll kilidi
    useEffect(() => {
        const anyOpen = mOpen || mSearchOpen;
        const prev = document.body.style.overflow;
        if (anyOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = prev || "";
        return () => (document.body.style.overflow = prev || "");
    }, [mOpen, mSearchOpen]);

    const aramayiGonder = () => {
        const q = arama?.trim();
        toUrunler?.(q || undefined);
        setMSearchOpen(false);
        navigate("/urunler");
    };

    // “Sepeti Temizle” güvenli tanım (prop yoksa tek tek sil)
    const temizleSepet = () => {
        if (Array.isArray(sepet)) {
            for (const i of sepet) urunSil?.(i.id);
        }
    };

    // Drawer’dan git
    const go = (target) => {
        if (target === "home") navigate("/");
        else if (target === "about") navigate("/hakkimizda");
        else if (target === "urunler") navigate("/urunler");
        else toUrunler?.(target);
        setMOpen(false);
    };

    return (
        <>
            <nav className={`navbar glass ${shadow ? "scrolled" : ""}`}>
                {/* SOL (mobilde hamburger) */}
                <div className="nav-left">
                    <button className="m-trigger" onClick={() => setMOpen(true)} aria-label="Menüyü aç">
                        <IcMenu />
                    </button>
                    <NavLink to="/" className="brand">
                        <img src={logo} className="nav-logo" alt="logo" />
                        <span className="brand-text">BLARÉ</span>
                    </NavLink>
                </div>

                {/* ORTA – masaüstü linkler (mobilde gizlenir) */}
                <ul className="nav-center">
                    <li>
                        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                            Ana Sayfa
                        </NavLink>
                    </li>
                    <li className="dropdown">
                        <NavLink to="/urunler" className={({ isActive }) => (isActive ? "active" : "")}>
                            Ürünler
                        </NavLink>
                        <div className="dropdown-menu">
                            <button onClick={() => toUrunler?.("kadin")} className="drop-item">Kadın</button>
                            <button onClick={() => toUrunler?.("kadin-ust")} className="drop-item">Üst Giyim</button>
                            <button onClick={() => toUrunler?.("kadin-alt")} className="drop-item">Alt Giyim</button>
                            <button onClick={() => toUrunler?.("kadin-elbise")} className="drop-item">Elbise</button>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/hakkimizda" className={({ isActive }) => (isActive ? "active" : "")}>
                            Hakkımızda
                        </NavLink>
                    </li>
                </ul>

                {/* SAĞ */}
                <div className="nav-right">
                    {/* Masaüstü arama (mobilde gizli) */}
                    <div className="search">
                        <IcSearch />
                        <input
                            value={arama}
                            onChange={(e) => setArama(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && aramayiGonder()}
                            placeholder="Ürün ara…"
                            aria-label="Ürün ara"
                        />
                        <button className="btn" onClick={aramayiGonder}><span className="label">Ara</span></button>
                    </div>

                    {/* Mobil arama ikonu */}
                    <button className="m-icon" onClick={() => setMSearchOpen(true)} aria-label="Ara">
                        <IcSearch />
                    </button>

                    {/* Profil */}
                    <div className="profile" ref={profileRef}>
                        <button
                            className={`icon-btn ${profilAcik ? "on" : ""}`}
                            onClick={() => setProfilAcik((s) => !s)}
                            aria-expanded={profilAcik}
                            aria-haspopup="menu"
                            title="Profil"
                        >
                            <IcUser />
                            <IcChevron />
                        </button>
                        {profilAcik && (
                            <div className="menu" role="menu">
                                <button onClick={() => alert("Kayıt yakında")} className="menu-item">Kayıt Ol</button>
                                <button onClick={() => alert("Giriş yakında")} className="menu-item">Giriş Yap</button>
                                <button onClick={() => alert("Siparişler yakında")} className="menu-item">Siparişlerim</button>
                            </div>
                        )}
                    </div>

                    {/* Sepet */}
                    <div className="cart" ref={cartRef}>
                        <button
                            className={`icon-btn ${sepetAcik ? "on" : ""}`}
                            onClick={() => setSepetAcik((s) => !s)}
                            aria-expanded={sepetAcik}
                            aria-haspopup="menu"
                            title="Sepetim"
                        >
                            <IcBag />
                            {toplamAdet > 0 && <span className="cart-badge">{toplamAdet}</span>}
                        </button>

                        {sepetAcik && (
                            <div className="menu cart-menu" role="menu">
                                <div className="cart-head">
                                    <strong>Sepet</strong>
                                    <button className="link" onClick={temizleSepet}>Temizle</button>
                                </div>

                                {sepet.length === 0 ? (
                                    <p className="muted empty">Sepetiniz boş</p>
                                ) : (
                                    <ul className="cart-list">
                                        {sepet.map((i) => (
                                            <li key={i.id} className="cart-item">
                                                <div className="cart-left">
                                                    <div className="thumb" />
                                                    <div>
                                                        <div className="cart-title">{i.ad}</div>
                                                        <div className="muted">{formatTL(i.fiyat)} × {i.adet}</div>
                                                    </div>
                                                </div>
                                                <div className="cart-actions">
                                                    <button className="qty" onClick={() => adetAzalt(i.id)}>-</button>
                                                    <button className="qty" onClick={() => sepeteEkle(i)}>+</button>
                                                    <button className="remove" onClick={() => urunSil(i.id)}>Sil</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="cart-total">
                                    <span>Toplam:</span>
                                    <strong>{formatTL(toplamTutar)}</strong>
                                </div>
                                <button className="primary" disabled={sepet.length === 0}>Satın Al</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* ===== MOBİL FULL-SCREEN DRAWER ===== */}
            <div className={`m-drawer ${mOpen ? "open" : ""}`} role="dialog" aria-label="Mobil menü">
                <div className="m-head">
                    <button className="m-close" onClick={() => setMOpen(false)} aria-label="Kapat"><IcClose /></button>
                    <img src={logo} className="m-logo" alt="logo" />
                </div>

                <nav className="m-list">
                    <button className="m-row" onClick={() => go("urunler")}>
                        <span>Koleksiyonlar</span><IcChevronR />
                    </button>
                    <button className="m-row" onClick={() => go("kadin-ust")}>
                        <span>Üst Giyim</span><IcChevronR />
                    </button>
                    <button className="m-row" onClick={() => go("kadin-alt")}>
                        <span>Alt Giyim</span><IcChevronR />
                    </button>
                    <button className="m-row" onClick={() => go("kadin-ceket-mont")}>
                        <span>Dış Giyim</span><IcChevronR />
                    </button>
                    <button className="m-row" onClick={() => go("kadin-aksesuar")}>
                        <span>Aksesuarlar</span><IcChevronR />
                    </button>
                    <button className="m-row" onClick={() => go("about")}>
                        <span>Editorial</span><IcChevronR />
                    </button>
                </nav>

                <div className="m-auth" onClick={() => { setMOpen(false); setProfilAcik(true); }}>
                    <IcUser /><span>Kayıt Ol / Giriş Yap</span>
                </div>
            </div>
            <div className={`m-dim ${mOpen ? "show" : ""}`} onClick={() => setMOpen(false)} />

            {/* ===== MOBİL ARAMA SHEET ===== */}
            <div className={`m-search ${mSearchOpen ? "open" : ""}`} role="dialog" aria-label="Arama">
                <div className="ms-head">
                    <button className="m-close" onClick={() => setMSearchOpen(false)} aria-label="Kapat"><IcClose /></button>
                    <strong>Arama</strong>
                </div>
                <div className="ms-field">
                    <IcSearch />
                    <input
                        value={arama}
                        onChange={(e) => setArama(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && aramayiGonder()}
                        placeholder="Ürün ara…"
                    />
                    <button className="btn" onClick={aramayiGonder}>Ara</button>
                </div>
            </div>
            <div className={`m-dim ${mSearchOpen ? "show" : ""}`} onClick={() => setMSearchOpen(false)} />
        </>
    );
}
