import React, { useState, useMemo, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";

/*
──────────────────────────────────────────────
 📁  DATI & ASSET – schema
     img   → public/cards/<id>/card.png   (illustrazione della carta)
     photo → public/cards/<id>/photo.jpg  (foto originale)
     meta  → src/data/cards.json
──────────────────────────────────────────────
*/

import cards from "./data/cards.json";

/***********************  UTIL  ************************/
// Font "Cinzel" & grana overlay
const useGlobalDecor = () => {
  useEffect(() => {
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap";
    document.head.appendChild(font);

    const style = document.createElement("style");
    style.textContent = `body{font-family:'Cinzel',serif;}body::before{content:'';position:fixed;inset:0;background:url('https://www.transparenttextures.com/patterns/asfalt-dark.png');opacity:.15;pointer-events:none;mix-blend-mode:overlay;}`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(font);
      document.head.removeChild(style);
    };
  }, []);
};

// Tilt 3D
const Hover3DTilt = ({ children }) => (
  <motion.div
    whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300, damping: 18 }}
    style={{ perspective: 1000 }}
  >
    {children}
  </motion.div>
);

/***********************  HOME  ************************/
const Home = () => {
  useGlobalDecor();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return cards.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#1a1124] via-[#0b0915] to-black text-gray-200 relative overflow-hidden p-6">
      {/* bagliore */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-transparent via-[#61338322] to-transparent pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* header */}
      <header className="relative z-10 mb-10 text-center space-y-2">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(155,100,255,0.35)]">
          inscryclassmates
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto opacity-90">
          La collezione vivente di carte che incarna il potere arcano di
          professori e alunni.
        </p>
      </header>

      {/* search */}
      <div className="relative z-10 w-full max-w-md mb-14">
        <input
          type="text"
          placeholder="Cerca una carta…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-purple-600/40 backdrop-blur-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* gallery */}
      <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
        {filtered.map((card) => (
          <Hover3DTilt key={card.id}>
            <div
              onClick={() => navigate(`/card/${card.id}`)}
              className="cursor-pointer group rounded-xl overflow-hidden border border-purple-700/40 bg-gradient-to-br from-[#23152f]/60 to-[#120a1a]/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:shadow-amber-500/20"
            >
              {/* contenitore con rapporto 3:4 per mostrare l'intera carta senza tagli */}
              <div className="relative w-full aspect-[3/4] bg-black">
                <img
                  src={card.img}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <div className="p-4 bg-black/60 backdrop-blur-sm text-center">
                <h2 className="text-xl font-bold text-amber-200 tracking-wide drop-shadow-[0_0_6px_rgba(250,200,120,0.35)]">
                  {card.name.toUpperCase()}
                </h2>
              </div>
            </div>
          </Hover3DTilt>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="relative z-10 mt-10 text-gray-400">
          Nessuna carta trovata.
        </p>
      )}
    </div>
  );
};

/*********************  DETAIL PAGE  *******************/
const CardPage = () => {
  useGlobalDecor();
  const { id } = useParams();
  const card = cards.find((c) => c.id === id);
  const navigate = useNavigate();

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-200 p-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Carta non trovata 💔</h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 transition-colors"
          >
            Torna alla criptagalleria
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-b from-[#120a1a] via-black to-[#0b0915] text-gray-200 p-6 gap-10 relative overflow-hidden"
    >
      {/* orb glow */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* card illustration */}
      <motion.img
        src={card.img}
        alt={card.name}
        initial={{ scale: 0.9, rotateY: 10 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="w-80 h-auto rounded-3xl border border-purple-600/40 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
      />

      <div className="max-w-lg space-y-6">
        <h2 className="text-4xl font-extrabold text-amber-300 drop-shadow-[0_0_10px_rgba(250,200,120,0.35)]">
          {card.name}
        </h2>
        <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line">
          {card.meaning}
        </p>

        {card.photo && (
          <div>
            <h3 className="mb-2 text-xl font-semibold text-purple-300">
              Foto originale
            </h3>
            <img
              src={card.photo}
              alt={`${card.name} foto originale`}
              className="w-full rounded-xl border border-purple-700/40 shadow-lg"
            />
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 transition-colors"
        >
          ⬅︎ Torna alla criptagalleria
        </button>
      </div>
    </motion.div>
  );
};

/*********************** ROOT ***********************/
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </Router>
  );
}
