import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Urunler.css";

/* ==== ikonlar ==== */
const IcFilter = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);
const IcGrid = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" stroke="currentColor" strokeWidth="1.6" /></svg>);
const IcList = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);
const IcHeart = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M12.1 20s-6.6-4.4-9-7.7C1 9.5 2.1 6.4 5.3 5.4c1.8-.6 3.8.1 4.8 1.7 1-1.6 3-2.3 4.8-1.7 3.2 1 4.3 4.1 2.2 6.9-2.4 3.3-9 7.4-9 7.4z" stroke="currentColor" strokeWidth="1.6" fill="currentColor" opacity=".1" /></svg>);
const IcPlus = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);
const IcCheck = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M4 12l6 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IcSearch = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>);
const IcClose = (p) => (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...p}><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);
const Star = ({ f = 0 }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <defs><linearGradient id="g"><stop offset={`${f * 20}%`} stopColor="currentColor" /><stop offset={`${f * 20}%`} stopColor="transparent" /></linearGradient></defs>
        <path d="M12 3l2.9 5.9L21 10l-4.5 4.4L17.8 21 12 17.8 6.2 21l1.3-6.6L3 10l6.1-1.1L12 3z" fill="url(#g)" stroke="currentColor" opacity=".8" />
    </svg>
);

/* ==== yardımcı ==== */
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

export default function Urunler({ arama = "", onAdd = () => { } }) {
    /* ==== veri ==== */
    const urunler = useMemo(() => [
        { id: 1, ad: "Basic T-Shirt", kategori: "Tişört", fiyat: 299, indirim: .15, stok: true, yeni: true, rating: 4.6, renkler: ["#e9e9e9", "#111"], bedenler: ["XS", "S", "M", "L", "XL"], kargo: true },
        { id: 2, ad: "Oversize Hoodie", kategori: "Sweatshirt", fiyat: 749, indirim: 0, stok: true, yeni: false, rating: 4.2, renkler: ["#1f2937", "#b45309"], bedenler: ["S", "M", "L"], kargo: false },
        { id: 3, ad: "Slim Fit Jean", kategori: "Pantolon", fiyat: 899, indirim: .10, stok: true, yeni: false, rating: 4.8, renkler: ["#1f2937", "#3b82f6"], bedenler: ["28", "30", "32", "34"], kargo: true },
        { id: 4, ad: "Keten Gömlek", kategori: "Gömlek", fiyat: 649, indirim: .05, stok: false, yeni: false, rating: 3.9, renkler: ["#f3e8d9", "#64748b"], bedenler: ["S", "M", "L"], kargo: false },
        { id: 5, ad: "Basic Sweater", kategori: "Kazak", fiyat: 579, indirim: 0, stok: true, yeni: false, rating: 4.0, renkler: ["#9ca3af", "#1f2937"], bedenler: ["S", "M", "L", "XL"], kargo: false },
        { id: 6, ad: "Relaxed Chino", kategori: "Pantolon", fiyat: 799, indirim: .12, stok: true, yeni: false, rating: 4.3, renkler: ["#bfa98a", "#111827"], bedenler: ["30", "32", "34"], kargo: true },
        { id: 7, ad: "Oversize T-Shirt", kategori: "Tişört", fiyat: 349, indirim: .08, stok: true, yeni: false, rating: 4.1, renkler: ["#111", "#f9fafb"], bedenler: ["S", "M", "L"], kargo: false },
        { id: 8, ad: "Crop Cardigan", kategori: "Hırka", fiyat: 689, indirim: .18, stok: true, yeni: true, rating: 4.7, renkler: ["#eab308", "#fca5a5"], bedenler: ["XS", "S", "M"], kargo: true },
        { id: 9, ad: "Linen Short", kategori: "Şort", fiyat: 459, indirim: 0, stok: true, yeni: false, rating: 3.8, renkler: ["#e4e4e7", "#0ea5e9"], bedenler: ["S", "M", "L"], kargo: false },
        { id: 10, ad: "Denim Jacket", kategori: "Ceket", fiyat: 1199, indirim: .22, stok: true, yeni: false, rating: 4.5, renkler: ["#1e3a8a", "#64748b"], bedenler: ["S", "M", "L", "XL"], kargo: true },
        { id: 11, ad: "Poplin Shirt", kategori: "Gömlek", fiyat: 629, indirim: .05, stok: true, yeni: false, rating: 4.0, renkler: ["#ffffff", "#a3a3a3"], bedenler: ["S", "M", "L"], kargo: false },
        { id: 12, ad: "Summer Dress", kategori: "Elbise", fiyat: 999, indirim: .25, stok: true, yeni: false, rating: 4.9, renkler: ["#fca5a5", "#22c55e"], bedenler: ["XS", "S", "M", "L"], kargo: true },
    ], []);

    const tumKategoriler = useMemo(() => Array.from(new Set(urunler.map(u => u.kategori))), [urunler]);

    const [seciliKategoriler, setSeciliKategoriler] = useState(new Set());
    const fiyatMin = useMemo(() => Math.min(...urunler.map(u => u.fiyat)), [urunler]);
    const fiyatMax = useMemo(() => Math.max(...urunler.map(u => u.fiyat)), [urunler]);
    const [fiyatAralik, setFiyatAralik] = useState([fiyatMin, fiyatMax]);
    const [sadeceStok, setSadeceStok] = useState(false);
    const [sirala, setSirala] = useState("new");
    const [gorunum, setGorunum] = useState("grid");
    const [fav, setFav] = useState(new Set());
    const [show, setShow] = useState(8);
    const [loading, setLoading] = useState(false);

    const [qv, setQV] = useState(null);
    const [seciliRenk, setSeciliRenk] = useState(null);
    const [seciliBeden, setSeciliBeden] = useState(null);

    const moreRef = useRef(null);

    useEffect(() => { try { const raw = localStorage.getItem("fav"); if (raw) setFav(new Set(JSON.parse(raw))); } catch { } }, []);
    useEffect(() => { try { localStorage.setItem("fav", JSON.stringify([...fav])); } catch { } }, [fav]);

    const q = String(arama || "").toLowerCase();

    const temizleFiltre = () => {
        setSeciliKategoriler(new Set());
        setFiyatAralik([fiyatMin, fiyatMax]);
        setSadeceStok(false);
        setSirala("new");
    };
    const toggleKategori = (k) => {
        const n = new Set(seciliKategoriler);
        n.has(k) ? n.delete(k) : n.add(k);
        setSeciliKategoriler(n);
    };
    const toggleFav = (id) => {
        const n = new Set(fav);
        n.has(id) ? n.delete(id) : n.add(id);
        setFav(n);
    };

    const filtreli = useMemo(() => {
        let list = urunler.filter(u => {
            const bySearch = `${u.ad} ${u.kategori}`.toLowerCase().includes(q);
            const byCat = seciliKategoriler.size === 0 || seciliKategoriler.has(u.kategori);
            const byPrice = u.fiyat >= fiyatAralik[0] && u.fiyat <= fiyatAralik[1];
            const byStock = !sadeceStok || u.stok;
            return bySearch && byCat && byPrice && byStock;
        });
        switch (sirala) {
            case "p_asc": list = [...list].sort((a, b) => a.fiyat - b.fiyat); break;
            case "p_desc": list = [...list].sort((a, b) => b.fiyat - a.fiyat); break;
            case "name": list = [...list].sort((a, b) => a.ad.localeCompare(b.ad, "tr")); break;
            case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
            default: list = [...list].sort((a, b) => (b.yeni === true) - (a.yeni === true));
        }
        return list;
    }, [urunler, q, seciliKategoriler, fiyatAralik, sadeceStok, sirala]);

    useEffect(() => { setShow(8); setLoading(true); const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t); },
        [q, seciliKategoriler, fiyatAralik, sadeceStok, sirala]);

    const gorunen = filtreli.slice(0, show);
    const dahaVar = filtreli.length > show;

    useEffect(() => {
        if (!dahaVar) return;
        const el = moreRef.current; if (!el) return;
        const ob = new IntersectionObserver((ents) => { if (ents.some(e => e.isIntersecting)) setShow(n => n + 8); }, { rootMargin: "400px 0px" });
        ob.observe(el); return () => ob.disconnect();
    }, [dahaVar, filtreli.length]);

    const formatTL = (n) => n.toLocaleString("tr-TR") + "₺";
    const indirimli = (u) => Math.round(u.fiyat * (1 - (u.indirim || 0)));

    useEffect(() => { if (qv) { setSeciliRenk(qv.renkler?.[0] || null); setSeciliBeden(qv.bedenler?.[0] || null); } }, [qv]);

    return (
        <div className={`urunler ${gorunum === "list" ? "view-list" : ""}`}>
            <section className="block">
                {/* toolbar */}
                <div className="toolbar">
                    <div className="t-left">
                        <h2>Ürünler</h2>
                        <span className="muted">{filtreli.length} sonuç</span>
                    </div>
                    <div className="t-right">
                        <div className="select">
                            <IcFilter />
                            <select value={sirala} onChange={(e) => setSirala(e.target.value)} aria-label="Sırala">
                                <option value="new">Öne çıkanlar</option>
                                <option value="rating">Puan (yüksek →)</option>
                                <option value="p_asc">Fiyat: Artan</option>
                                <option value="p_desc">Fiyat: Azalan</option>
                                <option value="name">Ada göre</option>
                            </select>
                        </div>
                        <div className="view-toggle" role="tablist" aria-label="Görünüm">
                            <button className={gorunum === "grid" ? "active" : ""} onClick={() => setGorunum("grid")} aria-selected={gorunum === "grid"} title="Izgara"><IcGrid /></button>
                            <button className={gorunum === "list" ? "active" : ""} onClick={() => setGorunum("list")} aria-selected={gorunum === "list"} title="Liste"><IcList /></button>
                        </div>
                    </div>
                </div>

                {/* filtreler */}
                <div className="filters sticky">
                    <div className="chip-row" role="tablist" aria-label="Kategoriler">
                        <button className={`chip ${seciliKategoriler.size === 0 ? "active" : ""}`} onClick={() => setSeciliKategoriler(new Set())}>Tümü</button>
                        {tumKategoriler.map(k => (
                            <button key={k} className={`chip ${seciliKategoriler.has(k) ? "active" : ""}`} onClick={() => toggleKategori(k)}>{k}</button>
                        ))}
                    </div>

                    <div className="filter-controls">
                        <label className="price">
                            <span>Fiyat</span>
                            <div className="range">
                                <input type="range" min={fiyatMin} max={fiyatMax} value={fiyatAralik[0]}
                                    onChange={(e) => setFiyatAralik([clamp(+e.target.value, fiyatMin, fiyatAralik[1]), fiyatAralik[1]])} />
                                <input type="range" min={fiyatMin} max={fiyatMax} value={fiyatAralik[1]}
                                    onChange={(e) => setFiyatAralik([fiyatAralik[0], clamp(+e.target.value, fiyatAralik[0], fiyatMax)])} />
                            </div>
                            <div className="price-read">{formatTL(fiyatAralik[0])} – {formatTL(fiyatAralik[1])}</div>
                        </label>

                        <label className="switch">
                            <input type="checkbox" checked={sadeceStok} onChange={(e) => setSadeceStok(e.target.checked)} />
                            <span className="slider" /><span className="sw-label">Stoktakiler</span>
                        </label>

                        <button className="link clear" onClick={temizleFiltre}>Filtreleri Temizle</button>
                    </div>
                </div>

                <div className="inline-search">
                    <IcSearch /><input value={arama} readOnly placeholder="Ürün ara…" />
                </div>

                {/* içerik */}
                {loading ? (
                    <div className="grid">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div className="card skeleton" key={i}>
                                <div className="card-img" />
                                <div className="s-line w-70" /><div className="s-line w-40" />
                                <div className="s-row"><div className="s-line w-30" /><div className="s-btn" /></div>
                            </div>
                        ))}
                    </div>
                ) : filtreli.length === 0 ? (
                    <div className="empty-state"><IcSearch /><p>Aramanızla eşleşen ürün bulunamadı.</p><button className="ghost" onClick={temizleFiltre}>Filtreleri sıfırla</button></div>
                ) : (
                    <>
                        <div className="grid">
                            {gorunen.map((u) => (
                                <article key={u.id} className={`card ${!u.stok ? "disabled" : ""}`}>
                                    {/* --- MEDYA + overlayler sadece burada --- */}
                                    <div className="media">
                                        <button className={`fav ${fav.has(u.id) ? "on" : ""}`} aria-label="Favori" onClick={() => toggleFav(u.id)}><IcHeart /></button>
                                        {u.indirim > 0 && <span className="badge sale">-%{Math.round(u.indirim * 100)}</span>}
                                        {u.yeni && <span className="badge new">Yeni</span>}
                                        <button className="quick" onClick={() => setQV(u)} aria-label="Hızlı Görünüm">Hızlı</button>

                                        <div className="card-img" aria-hidden onClick={() => setQV(u)} />
                                    </div>

                                    {/* --- GÖVDE --- */}
                                    <div className="card-body">
                                        <h3>{u.ad}</h3>
                                        <p className="muted">{u.kategori}</p>

                                        <div className="meta">
                                            <div className="rating" aria-label={`Puan ${u.rating}`}>
                                                {Array.from({ length: 5 }).map((_, i) => <Star key={i} f={Math.max(0, Math.min(1, u.rating - i))} />)}
                                                <span className="r-n">{u.rating.toFixed(1)}</span>
                                            </div>
                                            {u.kargo && <span className="chip ship">Kargo Bedava</span>}
                                        </div>

                                        <div className="swatch-row" aria-label="Renkler">
                                            {u.renkler.slice(0, 4).map((c, i) => <span key={i} className="swatch" style={{ background: c }} />)}
                                            {u.renkler.length > 4 && <span className="swatch more">+{u.renkler.length - 4}</span>}
                                        </div>

                                        {!u.stok && <div className="stock-tag">Tükendi</div>}

                                        <div className="card-row">
                                            <span className="price">
                                                {u.indirim > 0 && <span className="old">{formatTL(u.fiyat)}</span>}
                                                {formatTL(indirimli(u))}
                                            </span>
                                            <button className="primary add" disabled={!u.stok}
                                                onClick={(e) => { onAdd({ ...u, fiyat: indirimli(u) }); e.currentTarget.classList.add("ok"); setTimeout(() => e.currentTarget.classList.remove("ok"), 700); }}>
                                                <span className="ic"><IcPlus /></span><span className="txt">Sepete Ekle</span><span className="ok-ic"><IcCheck /></span>
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {dahaVar && (
                            <div className="more">
                                <div ref={moreRef} className="io-sentinel" aria-hidden />
                                <button className="ghost" onClick={() => setShow(n => n + 8)}>Daha Fazla Yükle</button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Quick View */}
            {qv && (
                <>
                    <div className="sheet-backdrop" onClick={() => setQV(null)} />
                    <div className="sheet" role="dialog" aria-modal="true" aria-label="Hızlı görünüm">
                        <div className="sheet-head">
                            <strong>{qv.ad}</strong>
                            <button className="icon" onClick={() => setQV(null)} aria-label="Kapat"><IcClose /></button>
                        </div>
                        <div className="sheet-body">
                            <div className="sheet-img" />
                            <div className="sheet-info">
                                <div className="price big">
                                    {qv.indirim > 0 && <span className="old">{formatTL(qv.fiyat)}</span>}
                                    {formatTL(indirimli(qv))}
                                </div>
                                <div className="rating big">
                                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} f={Math.max(0, Math.min(1, qv.rating - i))} />)}
                                    <span className="r-n">{qv.rating.toFixed(1)}</span>
                                </div>

                                <div className="opt">
                                    <div className="lbl">Renk</div>
                                    <div className="swatch-row pick">
                                        {qv.renkler.map((c) => <button key={c} className={`swatch ${seciliRenk === c ? "picked" : ""}`} style={{ background: c }} onClick={() => setSeciliRenk(c)} aria-label={`Renk ${c}`} />)}
                                    </div>
                                </div>
                                <div className="opt">
                                    <div className="lbl">Beden</div>
                                    <div className="size-row">
                                        {qv.bedenler.map((s) => <button key={s} className={`size ${seciliBeden === s ? "picked" : ""}`} onClick={() => setSeciliBeden(s)}>{s}</button>)}
                                    </div>
                                </div>

                                <button className="primary big" disabled={!qv.stok}
                                    onClick={() => { onAdd({ ...qv, seciliRenk, seciliBeden, fiyat: indirimli(qv) }); setQV(null); }}>
                                    Sepete Ekle
                                </button>
                                {!qv.stok && <div className="muted">Bu ürün şu an stokta değil.</div>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
