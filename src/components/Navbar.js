import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";

export default function Navbar({
    arama, setArama,
    toplamAdet, toplamTutar, formatTL,
    adetAzalt, sepeteEkle, urunSil, sepetiTemizle, sepet,
    toUrunler
}) {
    const [profilAcik, setProfilAcik] = useState(false);
    const [sepetAcik, setSepetAcik] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <img src={logo} className="nav-logo" alt="logo" />
            </div>

            <ul className="nav-center">
                <li>
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                        Ana Sayfa
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/urunler" className={({ isActive }) => (isActive ? "active" : "")}>
                        Ürünler
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/hakkimizda" className={({ isActive }) => (isActive ? "active" : "")}>
                        Hakkımızda
                    </NavLink>
                </li>
            </ul>

            <div className="nav-right">
                <div className="search">
                    <input
                        value={arama}
                        onChange={(e) => setArama(e.target.value)}
                        placeholder="Arama yap..."
                        aria-label="Ürün ara"
                    />
                    <button onClick={toUrunler}>Ara</button>
                </div>

                {/* Profil */}
                <div className="profile">
                    <button className="profile-btn" onClick={() => setProfilAcik((s) => !s)}>
                        Profil
                    </button>
                    {profilAcik && (
                        <div className="profile-menu" role="menu">
                            <button onClick={() => alert("Kayıt yakında")}>Kayıt Ol</button>
                            <button onClick={() => alert("Giriş yakında")}>Giriş Yap</button>
                        </div>
                    )}
                </div>

                {/* Sepet */}
                <div className="cart">
                    <button className="cart-btn" onClick={() => setSepetAcik((s) => !s)}>
                        Sepetim <span className="cart-badge">{toplamAdet}</span>
                    </button>

                    {sepetAcik && (
                        <div className="cart-menu" role="menu">
                            <div className="cart-head">
                                <strong>Sepet</strong>
                                <button className="link" onClick={sepetiTemizle}>Temizle</button>
                            </div>

                            {sepet.length === 0 ? (
                                <p className="muted">Sepetiniz boş</p>
                            ) : (
                                <ul className="cart-list">
                                    {sepet.map((i) => (
                                        <li key={i.id} className="cart-item">
                                            <div>
                                                <div className="cart-title">{i.ad}</div>
                                                <div className="muted">{formatTL(i.fiyat)} × {i.adet}</div>
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
