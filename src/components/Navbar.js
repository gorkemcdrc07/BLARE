import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Navbar.css";

/* Basit ikonlar (dış bağımlılık yok) */
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

export default function Navbar({
    arama, setArama,
    toplamAdet, toplamTutar, formatTL,
    adetAzalt, sepeteEkle, urunSil, sepetiTemizle, sepet,
    toUrunler
}) {
    const [profilAcik, setProfilAcik] = useState(false);
    const [sepetAcik, setSepetAcik] = useState(false);
    const [shadow, setShadow] = useState(false);
    const navRef = useRef(null);
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
        const onKey = (e) => e.key === "Escape" && (setProfilAcik(false), setSepetAcik(false));
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, []);

    const aramayiGonder = () => {
        toUrunler?.(arama?.trim() || undefined);
        navigate("/urunler");
    };

    return (
        <nav ref={navRef} className={`navbar glass ${shadow ? "scrolled" : ""}`}>
            {/* Sol */}
            <div className="nav-left">
                <NavLink to="/" className="brand">
                    <img src={logo} className="nav-logo" alt="logo" />
                    <span className="brand-text">BLARÉ</span>
                </NavLink>
            </div>

            {/* Orta – desktop */}
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

            {/* Sağ */}
            <div className="nav-right">
                {/* Arama */}
                <div className="search">
                    <IcSearch />
                    <input
                        value={arama}
                        onChange={(e) => setArama(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && aramayiGonder()}
                        placeholder="Ürün ara…"
                        aria-label="Ürün ara"
                    />
                    <button className="btn" onClick={aramayiGonder}>Ara</button>
                </div>

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
                                <button className="link" onClick={sepetiTemizle}>Temizle</button>
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
    );
}
