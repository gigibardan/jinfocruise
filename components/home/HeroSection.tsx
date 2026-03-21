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
        /* ── Wrapper principal — același gradient ca SearchSection ── */
        .hero-wrap {
          position: relative;
          width: 100%;
          background: linear-gradient(135deg, #001f4d 0%, #003580 40%, #00509e 70%, #0069b4 100%);
        }

        /* ── Imagine ── */
        .hero-img-bg {
          width: 100%;
          height: 480px;
          position: relative;
          overflow: hidden;
        }

        /* ── CROAZIERE ── */
        .hero-main-text {
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 5em;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          text-align: center;
          white-space: nowrap;
          z-index: 5;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #ffe9a0 50%, #ffd54f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 3px 14px rgba(0,0,0,0.8)) drop-shadow(0 0 24px rgba(0,0,0,0.5));
          letter-spacing: 0.04em;
          -webkit-text-stroke: 0.5px rgba(255,220,80,0.4);
        }

        /* ── Mână ── */
        .hero-hand {
          position: absolute;
          bottom: 62%;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: auto;
          z-index: 6;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
        }

        /* ── Buton CTA ── */
        .hero-cta {
          position: absolute;
          bottom: 45%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          white-space: nowrap;
        }

        .hero-cta a {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: linear-gradient(135deg, #1a6fc4 0%, #0d9de8 100%);
          color: white;
          text-decoration: none;
          padding: 12px 32px 14px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 6px 24px rgba(13,157,232,0.5);
          transition: all 0.2s;
        }

        .hero-cta a:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(13,157,232,0.6);
        }

        .hero-cta-top {
          font-size: 1.1em;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #FFE082;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .hero-cta-bottom {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.9em;
          font-weight: 600;
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.02em;
        }

        /* ── Text explicativ ── */
        .hero-explain {
          position: absolute;
          bottom: 110%;
          left: 22%;
          transform: translateX(-50%);
          font-size: 1.2em;
          color: #ffffff;
          text-align: center;
          width: 100%;
          pointer-events: none;
          background: rgba(0,30,80,0.55); padding: 4px 16px; border-radius: 20px; backdrop-filter: blur(4px); text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }

        /* ── Cards container ── */
        .hero-cards {
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
          background: rgba(255,255,255,0.97);
          border-radius: 14px;
          padding: 18px 15px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          text-align: center;
          flex-shrink: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.25);
        }

        .hero-card img {
          display: block;
          margin: 0 auto;
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .hero-card h3 {
          margin: 10px 0 6px;
          font-size: 0.85em;
          color: #1a3a6b;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .hero-card p {
          font-size: 0.78em;
          margin: 0;
          color: #666;
          line-height: 1.4;
        }

        /* ── Spacer navy jos — continuitate cu SearchSection ── */
        .hero-bottom-spacer {
          height: 60px;
          background: linear-gradient(to left, #0256A4 0%, #02214F 100%);
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .hero-card { width: calc(25% - 20px); }
          .hero-explain { left: 32%; }
        }

        /* ── Mobile 768px ── */
        @media (max-width: 768px) {
          .hero-img-bg { height: 280px; }
          .hero-main-text { font-size: 2.5em; top: 4%; }
          .hero-hand { width: 42px; bottom: 62%; }
          .hero-price { font-size: 1.8em; bottom: 50%; }
          .hero-explain { font-size: 0.9em; left: 35%; }
          .hero-cards {
            gap: 8px;
            padding: 0 8px;
            bottom: 10px;
          }
          .hero-card {
            width: calc(25% - 8px);
            padding: 10px 6px;
            border-radius: 10px;
          }
          .hero-card img { width: 28px; height: 28px; }
          .hero-card h3 { font-size: 0.65em; margin: 5px 0 0; }
          .hero-card p { display: none; }
          .hero-bottom-spacer { height: 20px; }
        }

        /* ── Mobile 480px ── */
        @media (max-width: 480px) {
          .hero-img-bg { height: 220px; }
          .hero-main-text { font-size: 2em; top: 3%; }
          .hero-hand { width: 32px; bottom: 62%; }
          .hero-price { font-size: 1.4em; bottom: 50%; }
          .hero-explain { font-size: 0.7em; left: 45%; }
          .hero-cards {
            gap: 5px;
            padding: 0 5px;
            bottom: -20px;
            z-index: 999;
          }
          .hero-card { padding: 8px 4px; border-radius: 8px; }
          .hero-card img { width: 24px; height: 24px; }
          .hero-card h3 { font-size: 0.58em; margin: 4px 1px 0; }
          .hero-bottom-spacer { height: 35px; }
          .hero-cta { bottom: 39%; }
          .hero-cta a {
            padding: 2px 28px 2px;
            background: linear-gradient(135deg, rgba(26,111,196,0.82) 0%, rgba(13,157,232,0.82) 100%);
          }
          .hero-cta-top { font-size: 1em; }
          .hero-cta-bottom { font-size: 0.8em; }
        }

        /* ── Mobile 360px ── */
        @media (max-width: 360px) {
          .hero-card h3 { font-size: 0.5em; margin: 2px 1px 0; }
          .hero-cta-top { font-size: 0.85em; }
          .hero-cta-bottom { font-size: 0.7em; }
        }
      `}</style>

      <div className="hero-wrap">

        {/* Imagine full-bleed */}
        <div className="hero-img-bg">
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

        {/* Mână — arată spre butonul de mai jos */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mana-point.png" alt="Indicator" className="hero-hand" />

        {/* Buton combinat Preț minim + Caută Croaziere */}
        <div className="hero-cta">
          <a href="#cauta-croaziere">
            <span className="hero-cta-top">Preț minim garantat</span>
            <span className="hero-cta-bottom">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              Caută Croaziere
            </span>
          </a>
        </div>

        {/* Cards + explicație */}
        <div className="hero-cards">
          <div className="hero-explain">
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

        {/* Spacer — continuă gradientul navy spre SearchSection */}
        <div className="hero-bottom-spacer" />

      </div>
    </>
  );
}