"use client";

import Image from "next/image";

const INCLUDED_FEATURES = [
  {
    icon: "/images/meal.png",
    alt: "Imagine cu Pensiune completă pe croazieră",
    title: "PENSIUNE COMPLETĂ",
    description: "Mic dejun, prânz, cină în restaurantele principale și bufet",
  },
  {
    icon: "/images/entartaiment.png",
    alt: "Imagine cu Divertisment pe croazieră",
    title: "DIVERTISMENT DE TOP",
    description: "Teatre în stil Broadway și muzică live cu artiști internaționali",
  },
  {
    icon: "/images/family.png",
    alt: "Imagine cu Club pentru copii pe croazieră",
    title: "CLUB PENTRU COPII",
    description: "Divertisment zilnic și activități pentru familii",
  },
  {
    icon: "/images/swim.png",
    alt: "Imagine cu Facilități de fitness pe croazieră",
    title: "FACILITĂȚI DE FITNESS",
    description: "Sală de fitness, piscine și facilități sportive cu acces gratuit",
  },
];

export function HeroSection() {
  return (
    <>
      <style>{`
        /* ── Full-width hero ── */
        .hero-banner-container {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: visible;
        }

        /* Image is truly full-width, no max-width, no border-radius */
        .hero-banner-bg {
          width: 100%;
          height: 500px;
          position: relative;
          overflow: hidden;
        }

        .hero-main-text {
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 5em;
          color: white;
          text-shadow: 3px 3px 6px rgba(255,0,0,0.8),
            -2px -2px 0 #ff0000, 2px -2px 0 #ff0000,
            -2px 2px 0 #ff0000, 2px 2px 0 #ff0000,
            0 0 15px rgba(255,0,0,0.7);
          text-align: center;
          font-family: 'Playfair Display', Georgia, serif;
          margin: 0;
          white-space: nowrap;
          z-index: 5;
        }

        .hero-hand-pointer {
          position: absolute;
          bottom: 59%;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: auto;
          z-index: 6;
        }

        .hero-price-text {
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 3em;
          color: #ffffff;
          font-weight: bold;
          text-shadow: 2px 2px 0 #ff0000, -2px -2px 0 #ff0000,
            2px -2px 0 #ff0000, -2px 2px 0 #ff0000,
            0 0 10px rgba(255,0,0,0.8);
          letter-spacing: 2px;
          padding: 0.1em 0.3em;
          background-color: rgba(255,0,0,0.2);
          border-radius: 0.2em;
          box-shadow: 0 0 15px rgba(255,0,0,0.5);
          line-height: 1.2;
          display: inline-block;
          white-space: nowrap;
          z-index: 5;
        }

        .hero-explanation-text {
          position: absolute;
          bottom: 110%;
          left: 22%;
          transform: translateX(-50%);
          font-size: 1.2em;
          color: white;
          text-align: center;
          width: 100%;
          text-shadow: 2px 2px 4px rgba(255,0,0,0.7);
          pointer-events: none;
        }

        /* Cards container: constrained to max 1200px but image is full-bleed */
        .hero-card-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          padding: 0 20px;
          gap: 20px;
          box-sizing: border-box;
        }

        .hero-card {
          width: calc(22% - 20px);
          background-color: white;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: center;
          flex-shrink: 0;
        }

        .hero-card img {
          display: block;
          margin: 0 auto;
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .hero-card h3 {
          margin: 10px 0;
          font-size: 1em;
          color: #333;
          font-weight: bold;
        }

        .hero-card p {
          font-size: 0.8em;
          margin-bottom: 0;
          color: #666;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .hero-card { width: calc(25% - 50px); }
          .hero-explanation-text { left: 32%; font-weight: 600; }
        }

        /* Mobile 768px */
        @media (max-width: 768px) {
          .hero-banner-container { height: 350px; }
          .hero-banner-bg { height: 300px; }
          .hero-main-text { font-size: 2.5em; top: 5%; }
          .hero-hand-pointer { width: 40px; bottom: 61%; }
          .hero-price-text { font-size: 1.8em; bottom: 52%; }
          .hero-explanation-text { font-size: 0.9em; left: 35%; font-weight: 600; }
          .hero-card-container { gap: 10px; padding: 0 5px; }
          .hero-card { width: calc(25% - 10px); padding: 10px; flex-shrink: 1; }
          .hero-card img { width: 30px; height: 30px; margin-bottom: 0; }
          .hero-card h3 { font-size: 0.7em; margin: 5px 0; }
          .hero-card p { display: none; }
        }

        /* Mobile 646px */
        @media (max-width: 646px) {
          .hero-explanation-text { font-size: 0.7em; font-weight: 600; left: 45%; }
          .hero-card-container { gap: 5px; padding: 0; }
        }

        /* Hide CTA on very small screens */
        @media (max-width: 480px) {
          .hero-cta-btn { display: none; }
        }
        /* Mobile 480px */
        @media (max-width: 480px) {
          .hero-banner-container { height: 240px; }
          .hero-banner-bg { height: 200px; }
          .hero-main-text { font-size: 1.8em; top: 2%; }
          .hero-hand-pointer { width: 30px; bottom: 61%; }
          .hero-price-text { font-size: 1.3em; bottom: 51%; }
          .hero-explanation-text { font-size: 0.7em; font-weight: 600; left: 45%; }
          .hero-card-container { gap: 5px; padding: 0; }
          .hero-card { width: calc(25% - 10px); padding: 1px; }
          .hero-card img { width: 25px; height: 25px; }
          .hero-card h3 { font-size: 0.6em; margin: 3px 1px; }
        }

        /* Mobile 360px */
        @media (max-width: 360px) {
          .hero-card h3 { font-size: 0.5em; margin: 1px; }
        }
      `}</style>

      {/* Full-width wrapper — no max-width here */}
      <div className="hero-banner-container">

        {/* Full-bleed image */}
        <div className="hero-banner-bg">
          <Image
            src="/images/croaziere-pret-minim.webp"
            alt="Croaziere MSC - Preț minim"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
          />
        </div>

        {/* CROAZIERE */}
        <h1 className="hero-main-text">CROAZIERE</h1>

        {/* Hand pointer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mana-point.png"
          alt="Indicator Croaziere"
          className="hero-hand-pointer"
        />

        {/* Preț minim */}
        <div className="hero-price-text">Preț minim</div>

        {/* CTA — scroll to search section */}
        <div
          style={{
            position: "absolute",
            bottom: "115px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 15,
          }}
          className="hero-cta-btn"
        >
          <a
            href="#cauta-croaziere"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#185FA5",
              color: "white",
              fontWeight: "bold",
              padding: "12px 28px",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
              textDecoration: "none",
              fontSize: "1em",
              whiteSpace: "nowrap",
              transition: "background-color 0.2s",
            }}
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            Caută Croaziere
          </a>
        </div>

        {/* Cards + explanation — max-width 1200px, centered */}
        <div className="hero-card-container">
          <div className="hero-explanation-text">
            Permanent inclus în ofertele noastre de croazieră
          </div>

          {INCLUDED_FEATURES.map((feature) => (
            <div className="hero-card" key={feature.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={feature.icon} alt={feature.alt} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spacer for card overflow */}
      <div style={{ height: "100px" }} />
    </>
  );
}
