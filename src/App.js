import { useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnaSayfa from "./pages/AnaSayfa";
import Urunler from "./pages/Urunler";
import Hakkimizda from "./pages/Hakkimizda";

export default function App() {
    const [arama, setArama] = useState("");
    const [sepet, setSepet] = useState([]); // {id, ad, fiyat, adet}
    const navigate = useNavigate();

    // sepet helpers
    const toplamAdet = useMemo(() => sepet.reduce((a, i) => a + i.adet, 0), [sepet]);
    const toplamTutar = useMemo(
        () => sepet.reduce((a, i) => a + i.fiyat * i.adet, 0),
        [sepet]
    );
    const formatTL = (n) => n.toLocaleString("tr-TR", { style: "currency", currency: "TRY" });

    const sepeteEkle = (urun) => {
        setSepet((g) => {
            const ix = g.findIndex((x) => x.id === urun.id);
            if (ix > -1) {
                const k = [...g];
                k[ix] = { ...k[ix], adet: k[ix].adet + 1 };
                return k;
            }
            return [...g, { ...urun, adet: 1 }];
        });
    };
    const adetAzalt = (id) =>
        setSepet((g) =>
            g.map((x) => (x.id === id ? { ...x, adet: x.adet - 1 } : x)).filter((x) => x.adet > 0)
        );
    const urunSil = (id) => setSepet((g) => g.filter((x) => x.id !== id));
    const sepetiTemizle = () => setSepet([]);

    const toUrunler = () => navigate("/urunler");

    return (
        <>
            <Navbar
                arama={arama}
                setArama={setArama}
                toplamAdet={toplamAdet}
                toplamTutar={toplamTutar}
                formatTL={formatTL}
                adetAzalt={adetAzalt}
                sepeteEkle={sepeteEkle}
                urunSil={urunSil}
                sepetiTemizle={sepetiTemizle}
                sepet={sepet}
                toUrunler={toUrunler}
            />

            <main className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<AnaSayfa onAdd={sepeteEkle} toUrunler={toUrunler} />}
                    />
                    <Route
                        path="/urunler"
                        element={<Urunler arama={arama} onAdd={sepeteEkle} />}
                    />
                    <Route path="/hakkimizda" element={<Hakkimizda />} />
                </Routes>
            </main>
        </>
    );
}
