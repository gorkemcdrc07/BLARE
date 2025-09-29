// src/pages/Hakkimizda.jsx
import "./../styles/Hakkimizda.css";

export default function Hakkimizda() {
    return (
        <div className="hakkimizda">
            <section className="hero-mini">
                <h2>Hakkýmýzda</h2>
                <p>isproje, modern ve rahat kýyafetleri uygun fiyata sunmayý hedefleyen bir demo maðazadýr.</p>
            </section>

            <section className="block">
                <div className="about-grid">
                    <div className="about-card">
                        <h3>Misyon</h3>
                        <p>Kaliteli ürünleri adil fiyatla, hýzlý ve keyifli deneyimle sunmak.</p>
                    </div>
                    <div className="about-card">
                        <h3>Vizyon</h3>
                        <p>Sürdürülebilir moda ve kullanýcý odaklý yapay zekâ önerileri ile öne çýkmak.</p>
                    </div>
                    <div className="about-card">
                        <h3>Ýletiþim</h3>
                        <p>hello@isproje.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
