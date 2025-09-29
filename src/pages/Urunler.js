// src/pages/Urunler.js
import "../styles/Urunler.css";

export default function Urunler({ arama = "", onAdd = () => { } }) {
    // 1) Veri
    const urunler = [
        { id: 1, ad: "Basic T-Shirt", kategori: "Tişört", fiyat: 299 },
        { id: 2, ad: "Oversize Hoodie", kategori: "Sweatshirt", fiyat: 749 },
        { id: 3, ad: "Slim Fit Jean", kategori: "Pantolon", fiyat: 899 },
        { id: 4, ad: "Keten Gömlek", kategori: "Gömlek", fiyat: 649 },
    ];

    // 2) Filtre (KULLANIMDAN ÖNCE TANIMLI!)
    const q = String(arama).toLowerCase();
    const filtreli = urunler.filter((u) =>
        `${u.ad} ${u.kategori}`.toLowerCase().includes(q)
    );

    // 3) Görünüm
    return (
        <div className="urunler">
            <section className="block">
                <div className="block-head">
                    <h2>Ürünler</h2>
                    <span className="muted">{filtreli.length} sonuç</span>
                </div>

                <div className="grid">
                    {filtreli.length === 0 && <p>Sonuç bulunamadı.</p>}

                    {filtreli.map((u) => (
                        <article key={u.id} className="card">
                            <div className="card-img" aria-hidden />
                            <h3>{u.ad}</h3>
                            <p className="muted">{u.kategori}</p>
                            <div className="card-row">
                                <span className="price">
                                    {u.fiyat.toLocaleString("tr-TR")}₺
                                </span>
                                <button className="primary" onClick={() => onAdd(u)}>
                                    Sepete Ekle
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
