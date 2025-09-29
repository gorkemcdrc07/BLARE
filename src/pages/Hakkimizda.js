// src/pages/Hakkimizda.jsx
import "./../styles/Hakkimizda.css";

export default function Hakkimizda() {
    return (
        <div className="hakkimizda">
            <section className="hero-mini">
                <h2>Hakk�m�zda</h2>
                <p>isproje, modern ve rahat k�yafetleri uygun fiyata sunmay� hedefleyen bir demo ma�azad�r.</p>
            </section>

            <section className="block">
                <div className="about-grid">
                    <div className="about-card">
                        <h3>Misyon</h3>
                        <p>Kaliteli �r�nleri adil fiyatla, h�zl� ve keyifli deneyimle sunmak.</p>
                    </div>
                    <div className="about-card">
                        <h3>Vizyon</h3>
                        <p>S�rd�r�lebilir moda ve kullan�c� odakl� yapay zek� �nerileri ile �ne ��kmak.</p>
                    </div>
                    <div className="about-card">
                        <h3>�leti�im</h3>
                        <p>hello@isproje.com</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
