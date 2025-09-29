import { useEffect, useMemo, useRef, useState } from "react";
import "../styles/AnaSayfa.css";

/* ===== Basit inline SVG ikonları (dış bağımlılık yok) ===== */
function IconSparkle(props) { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M12 2l1.8 4.6L18 8.4l-4.2 1.8L12 15l-1.8-4.8L6 8.4l4.2-1.8L12 2z" fill="currentColor" opacity=".9" /><circle cx="19" cy="5" r="1.5" fill="currentColor" /><circle cx="5" cy="5" r="1" fill="currentColor" /></svg>) }
function IconTruck(props) { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}><path d="M3 6h11v8H3zM14 9h4l3 3v2h-7V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="17" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" /></svg>) }
function IconReturn(props) { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M21 10a7 7 0 0 0-7-7H4v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>) }
function IconChat(props) { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 5h16v10H7l-3 3V5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="10" r="1" fill="currentColor" /><circle cx="13" cy="10" r="1" fill="currentColor" /><circle cx="17" cy="10" r="1" fill="currentColor" /></svg>) }
function IconSend(props) { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 12l16-7-7 16-2-7-7-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>) }
function IconChevronR(props) { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>) }
function IconBag(props) { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}><path d="M6 7h12l-1 12H7L6 7z" stroke="currentColor" strokeWidth="1.6" /><path d="M9 7a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" /></svg>) }

export default function AnaSayfa({ onAdd, toUrunler }) {
    /* ===== Veri – Kadın kategorileri + grup anahtarları ===== */
    const kategoriler = [
        { id: "kadin-ust", ad: "Üst Giyim", grup: "ust" },
        { id: "kadin-alt", ad: "Alt Giyim", grup: "alt" },
        { id: "kadin-elbise", ad: "Elbise", grup: "elbiseler" },
        { id: "kadin-etek", ad: "Etek", grup: "alt" },
        { id: "kadin-pantolon", ad: "Pantolon", grup: "alt" },
        { id: "kadin-jean", ad: "Jean", grup: "alt" },
        { id: "kadin-tshirt", ad: "T-Shirt", grup: "ust" },
        { id: "kadin-sweatshirt", ad: "Sweatshirt", grup: "ust" },
        { id: "kadin-gomlek", ad: "Gömlek", grup: "ust" },
        { id: "kadin-ceket-mont", ad: "Ceket & Mont", grup: "dis" },
        { id: "kadin-kazak-hirka", ad: "Kazak & Hırka", grup: "triko" },
        { id: "kadin-sort", ad: "Şort", grup: "alt" },
        { id: "kadin-esofman", ad: "Eşofman", grup: "alt" },
        { id: "kadin-ic-giyim", ad: "İç Giyim", grup: "ic" },
        { id: "kadin-pijama", ad: "Pijama", grup: "ic" },
        { id: "kadin-plaj", ad: "Plaj Giyim", grup: "plaj" },
        { id: "kadin-aksesuar", ad: "Aksesuar", grup: "aksesuar" },
    ];

    const filtreler = [
        { id: "tum", ad: "Tümü" },
        { id: "ust", ad: "Üst Giyim" },
        { id: "alt", ad: "Alt Giyim" },
        { id: "elbiseler", ad: "Elbise" },
        { id: "triko", ad: "Kazak & Hırka" },
        { id: "dis", ad: "Ceket & Mont" },
        { id: "ic", ad: "İç/Pijama" },
        { id: "plaj", ad: "Plaj" },
        { id: "aksesuar", ad: "Aksesuar" },
    ];

    const kampanyalar = [
        { id: 1, baslik: "%40’a varan Yaz İndirimi", alt: "Tişört & Şort", etiket: "YENİ" },
        { id: 2, baslik: "2 Al 1 Öde", alt: "Aksesuar Seçili Ürünler", etiket: "KAMPANYA" },
        { id: 3, baslik: "Kargo Bedava", alt: "300₺ ve üzeri", etiket: "FIRSAT" },
    ];

    const ust = [
        { id: "ust1", ad: "Beyaz Basic T-Shirt", fiyat: 249 },
        { id: "ust2", ad: "Siyah Oversize Sweat", fiyat: 699 },
        { id: "ust3", ad: "Keten Gömlek Bej", fiyat: 599 },
    ];
    const alt = [
        { id: "alt1", ad: "Slim Fit Jean", fiyat: 899 },
        { id: "alt2", ad: "Keten Pantolon Taş", fiyat: 749 },
        { id: "alt3", ad: "Şort Navy", fiyat: 329 },
    ];
    const ayakkabi = [
        { id: "ayk1", ad: "Beyaz Sneaker", fiyat: 1299 },
        { id: "ayk2", ad: "Loafer Kahve", fiyat: 1499 },
        { id: "ayk3", ad: "Koşu Ayakkabısı", fiyat: 1199 },
    ];

    /* ===== Kombin oluşturucu ===== */
    const konbinler = useMemo(() => {
        const out = [];
        const len = Math.max(ust.length, alt.length, ayakkabi.length);
        for (let i = 0; i < len; i++) {
            out.push({ ust: ust[i % ust.length], alt: alt[i % alt.length], ayakkabi: ayakkabi[i % ayakkabi.length] });
        }
        return out;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [konbinIndex, setKonbinIndex] = useState(0);
    const aktif = konbinler[konbinIndex];
    const toplam = aktif.ust.fiyat + aktif.alt.fiyat + aktif.ayakkabi.fiyat;

    useEffect(() => {
        const t = setInterval(() => setKonbinIndex((i) => (i + 1) % konbinler.length), 6000);
        return () => clearInterval(t);
    }, [konbinler.length]);

    const [gosterilenToplam, setGosterilenToplam] = useState(toplam);
    const oncekiToplamRef = useRef(toplam);
    useEffect(() => {
        const start = performance.now();
        const duration = 500;
        const from = oncekiToplamRef.current;
        const to = toplam;
        let raf;
        const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setGosterilenToplam(Math.round(from + (to - from) * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        oncekiToplamRef.current = to;
        return () => cancelAnimationFrame(raf);
    }, [toplam]);

    const konbinSepeteEkle = () => {
        onAdd?.({ id: aktif.ust.id, ad: aktif.ust.ad, fiyat: aktif.ust.fiyat });
        onAdd?.({ id: aktif.alt.id, ad: aktif.alt.ad, fiyat: aktif.alt.fiyat });
        onAdd?.({ id: aktif.ayakkabi.id, ad: aktif.ayakkabi.ad, fiyat: aktif.ayakkabi.fiyat });
    };

    const formatTL = (n) => n.toLocaleString("tr-TR") + "₺";

    /* ===== Chat ===== */
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([{ from: "bot", text: "Merhaba! Nasıl yardımcı olabilirim? 👋" }]);
    const [draft, setDraft] = useState("");
    const sendMsg = () => {
        const t = draft.trim(); if (!t) return;
        setMessages((p) => [...p, { from: "you", text: t }]); setDraft("");
        setTimeout(() => setMessages((p) => [...p, { from: "bot", text: "Not aldım, kısa sürede dönüş yapacağız. 🙌" }]), 600);
    };

    /* ===== Kategori: filtre + yatay otomatik kaydırma ===== */
    const [aktifFiltre, setAktifFiltre] = useState("tum");
    const trackRef = useRef(null);
    const itemRefs = useRef([]);
    itemRefs.current = [];

    const filteredCats = useMemo(
        () => (aktifFiltre === "tum" ? kategoriler : kategoriler.filter((k) => k.grup === aktifFiltre)),
        [aktifFiltre]
    );

    // otomatik kaydır: her 4sn sonraki karta git
    useEffect(() => {
        if (!trackRef.current) return;
        let i = 0;
        const id = setInterval(() => {
            if (itemRefs.current.length === 0) return;
            i = (i + 1) % itemRefs.current.length;
            itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }, 4000);
        return () => clearInterval(id);
    }, [filteredCats]);

    const kaydir = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        const card = el.querySelector(".cat-card.inline");
        const step = card ? card.getBoundingClientRect().width + 16 : 280;
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    const setItemRef = (el) => {
        if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el);
    };

    return (
        <div className="ana">
            <main className="page-wrap">
                {/* HERO */}
                <section className="hero">
                    <div className="hero__bg" aria-hidden />
                    <div className="hero__blob" aria-hidden />
                    <div className="hero__pattern" aria-hidden />
                    <div className="hero__inner">
                        {/* SOL */}
                        <div className="hero__text">
                            <span className="eyebrow"><IconSparkle style={{ marginRight: 6 }} />Yeni Sezon</span>
                            <h1>Sezon Trendleri Seninle</h1>
                            <p className="muted">Kategorilerde keşfet, kampanyaları yakala ve sana özel kombin önerilerini dene.</p>

                            <div className="hero-cta">
                                <button className="primary" onClick={toUrunler}>Ürünleri Keşfet <IconChevronR style={{ marginLeft: 6 }} /></button>
                                <a className="ghost" href="#kampanyalar">Kampanyalar</a>
                            </div>

                            <div className="hero__cards">
                                <div className="mini-card">
                                    <div className="mini-img" />
                                    <div><strong>Yeni Gelenler</strong><div className="small">Her gün güncellenir</div></div>
                                </div>
                                <div className="mini-card">
                                    <div className="mini-img" />
                                    <div><strong>Basic Koleksiyon</strong><div className="small">Minimal & rahat</div></div>
                                </div>
                            </div>

                            <ul className="hero__benefits">
                                <li><span className="b-ic"><IconTruck /></span><span>Kargo Bedava</span></li>
                                <li><span className="b-ic"><IconReturn /></span><span>Kolay İade</span></li>
                                <li><span className="b-ic"><IconChat /></span><span>7/24 Destek</span></li>
                            </ul>
                        </div>

                        {/* SAĞ */}
                        <aside className="hero__aside">
                            <div className="look-card">
                                <div className="look-img" />
                                <div className="look-info">
                                    <div className="look-title">BLARÉ Lookbook</div>
                                    <div className="look-sub">Yaz 2025 seçkisi</div>
                                </div>
                                <div className="look-tags">
                                    <span className="tag tag-new">Yeni</span>
                                    <span className="tag tag-sale">% İndirim</span>
                                </div>
                            </div>
                            <div className="look-row">
                                <div className="look-sm"><div className="look-sm-img" /><div className="look-sm-t">Basic</div></div>
                                <div className="look-sm"><div className="look-sm-img" /><div className="look-sm-t">Outdoor</div></div>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* KATEGORİLER – üstte filtre, altta yatay kaydırma */}
                <section className="block">
                    <div className="block-head">
                        <h2>Kadın Kategorileri</h2>
                        <button className="link" onClick={() => toUrunler?.("kadin")}>Tümü →</button>
                    </div>

                    {/* Filtre çipleri */}
                    <div className="filter-chips" role="tablist" aria-label="Kategori filtreleri">
                        {filtreler.map((f) => (
                            <button
                                key={f.id}
                                role="tab"
                                aria-selected={aktifFiltre === f.id}
                                className={`chip ${aktifFiltre === f.id ? "active" : ""}`}
                                onClick={() => setAktifFiltre(f.id)}
                            >
                                {f.ad}
                            </button>
                        ))}
                    </div>

                    {/* Yatay kaydırmalı kategori şeridi */}
                    <div className="cat-carousel">
                        <button className="car-nav left" aria-label="Geri" onClick={() => kaydir(-1)}>‹</button>
                        <div className="cat-track" ref={trackRef}>
                            {filteredCats.map((k) => (
                                <button
                                    key={k.id}
                                    ref={setItemRef}
                                    className="cat-card inline"
                                    onClick={() => toUrunler?.(k.id)}
                                >
                                    <div className="cat-img" aria-hidden />
                                    <span>{k.ad}</span>
                                </button>
                            ))}
                        </div>
                        <button className="car-nav right" aria-label="İleri" onClick={() => kaydir(1)}>›</button>
                        <div className="track-fade left" aria-hidden />
                        <div className="track-fade right" aria-hidden />
                    </div>
                </section>

                {/* KAMPANYALAR */}
                <section id="kampanyalar" className="block">
                    <div className="block-head">
                        <h2>İndirimler & Kampanyalar</h2>
                        <span className="muted">Kaçırma!</span>
                    </div>
                    <div className="promo-row">
                        {kampanyalar.map((c) => (
                            <article key={c.id} className="promo-card">
                                <span className="badge">{c.etiket}</span>
                                <h3>{c.baslik}</h3>
                                <p className="muted">{c.alt}</p>
                                <button className="ghost" onClick={toUrunler}>İncele <IconChevronR style={{ marginLeft: 6 }} /></button>
                            </article>
                        ))}
                    </div>
                </section>

                {/* KOMBİN ÖNERİLERİ */}
                <section className="block">
                    <div className="block-head">
                        <h2>Kombin Önerileri</h2>
                        <div className="combo-ctrl">
                            <button className="ghost" aria-label="Önceki" onClick={() => setKonbinIndex((i) => (i - 1 + konbinler.length) % konbinler.length)}>←</button>
                            <button className="ghost" aria-label="Sonraki" onClick={() => setKonbinIndex((i) => (i + 1) % konbinler.length)}>→</button>
                            <button className="link" onClick={() => setKonbinIndex(Math.floor(Math.random() * konbinler.length))}>Rastgele</button>
                        </div>
                    </div>

                    <div className="combo">
                        <div className="combo-items">
                            <div className="combo-card">
                                <div className="card-img" />
                                <div className="combo-text">
                                    <strong>{aktif.ust.ad}</strong>
                                    <span className="muted">{aktif.ust.fiyat.toLocaleString("tr-TR")}₺</span>
                                </div>
                            </div>
                            <div className="plus">+</div>
                            <div className="combo-card">
                                <div className="card-img" />
                                <div className="combo-text">
                                    <strong>{aktif.alt.ad}</strong>
                                    <span className="muted">{aktif.alt.fiyat.toLocaleString("tr-TR")}₺</span>
                                </div>
                            </div>
                            <div className="plus">+</div>
                            <div className="combo-card">
                                <div className="card-img" />
                                <div className="combo-text">
                                    <strong>{aktif.ayakkabi.ad}</strong>
                                    <span className="muted">{aktif.ayakkabi.fiyat.toLocaleString("tr-TR")}₺</span>
                                </div>
                            </div>
                        </div>

                        <div className="combo-buy">
                            <div className="combo-total">Toplam: <strong>{formatTL(gosterilenToplam)}</strong></div>
                            <button className="primary" onClick={konbinSepeteEkle}><IconBag style={{ marginRight: 6 }} /> Bu Kombini Sepete Ekle</button>
                        </div>

                        <div className="combo-dots" role="tablist" aria-label="Kombin slaytları">
                            {konbinler.map((_, i) => (
                                <button
                                    key={i}
                                    className={`dot ${i === konbinIndex ? "active" : ""}`}
                                    onClick={() => setKonbinIndex(i)}
                                    aria-selected={i === konbinIndex}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* ===== Floating Action Button (FAB) + Chat Panel ===== */}
            <button
                className="fab"
                onClick={() => setChatOpen(true)}
                aria-label="Bizimle iletişime geçin"
                title="Bizimle iletişime geçin"
            >
                <IconChat />
                <span className="fab-label">Bizimle iletişime geçin</span>
                <span className="fab-pulse" aria-hidden />
            </button>

            <div className={`chat-panel ${chatOpen ? "open" : ""}`} role="dialog" aria-label="Canlı destek sohbeti">
                <div className="chat-head">
                    <div className="chat-title">
                        <span className="dot-online" /> Canlı Destek
                    </div>
                    <button className="chat-close" onClick={() => setChatOpen(false)} aria-label="Kapat">✕</button>
                </div>
                <div className="chat-body" id="chat-scroll">
                    {messages.map((m, idx) => (
                        <div key={idx} className={`msg ${m.from === "you" ? "you" : "bot"}`}>
                            {m.text}
                        </div>
                    ))}
                    <div className="chips">
                        {["Kargo durumu", "İade talebi", "Beden önerisi"].map((t) => (
                            <button key={t} className="chip" onClick={() => setDraft(t)}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className="chat-input">
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Mesajınızı yazın…"
                        onKeyDown={(e) => { if (e.key === 'Enter') sendMsg(); }}
                    />
                    <button className="send" onClick={sendMsg} aria-label="Gönder">
                        <IconSend />
                    </button>
                </div>
            </div>
            {chatOpen && <div className="chat-backdrop" onClick={() => setChatOpen(false)} aria-hidden />}
        </div>
    );
}
