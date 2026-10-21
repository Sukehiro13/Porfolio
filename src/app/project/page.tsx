"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./project.module.css";

interface ScreenShot {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  caption: string;
  src: string;
}

const SCREENS: ScreenShot[] = [
  {
    id: "landing",
    tabLabel: "01. Portal & Auth",
    badge: "User Portal",
    title: "Public Landing & Farmer Portal Login",
    caption:
      "Public-facing entry portal featuring agricultural value proposition and secure authentication modal for registered farmers and agricultural researchers to access private calculation history.",
    src: "/images/projects/animo/animo-landing.png",
  },
  {
    id: "dashboard",
    tabLabel: "02. NPK Dashboard",
    badge: "Analytics Dashboard",
    title: "NPK Dashboard & Application Records",
    caption:
      "Centralized monitoring dashboard logging 85+ soil calculation runs. Tracks individual application IDs, seedling types (Batao, Ampalaya), soil baseline NPK, pH metrics, and calculated fertilizer dosages (kg/ha).",
    src: "/images/projects/animo/animo-dashboard.png",
  },
  {
    id: "calculator",
    tabLabel: "03. Soil Calculator",
    badge: "Calculation Engine",
    title: "Interactive NPK Soil & Seedling Calculator",
    caption:
      "Farmer input interface capturing plant type (Vegetables), target seedling (Batao, Ampalaya), soil volume (kg/ha), soil pH level, and current laboratory percentage values for Nitrogen (N), Phosphorus (P), and Potassium (K).",
    src: "/images/projects/animo/animo-calculator.png",
  },
  {
    id: "nutrients",
    tabLabel: "04. Nutrient Guide",
    badge: "Agronomy Logic",
    title: "Nutrient Level Matrix & Educational Reference",
    caption:
      "Dynamic threshold evaluation matrix categorizing Low (L), Medium (M), High (H), and Very High (VH) levels, accompanied by biological guides explaining the role of each macronutrient in plant vigor and yield.",
    src: "/images/projects/animo/animo-nutrients.png",
  },
  {
    id: "recommendations",
    tabLabel: "05. Fertilizer Results",
    badge: "ML Recommendation",
    title: "Fertilizer Recommendation & Deficiency Analysis",
    caption:
      "Automated nutrient deficiency detection comparing current soil composition against target crop needs. Recommends organic (Bone Meal, Chicken Manure) or inorganic (DAP, MAP, Complete 14-14-14) options with actionable field application instructions.",
    src: "/images/projects/animo/animo-recommendations.png",
  },
];

export default function ProjectPage() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  // Mini Interactive Simulator State
  const [simSeedling, setSimSeedling] = useState<string>("Batao");
  const [simPh, setSimPh] = useState<number>(7.0);
  const [simN, setSimN] = useState<number>(6);
  const [simP, setSimP] = useState<number>(6);
  const [simK, setSimK] = useState<number>(7);

  const getRecommendation = () => {
    if (simN < 10 && simK < 10) {
      return {
        fertilizer: "Bone Meal + Potassium Boost",
        type: "Organic",
        status: "Low Nitrogen & Potassium Detected",
        dosage: "66.13 kg/ha N · 395 kg/ha P · 120.02 kg/ha K",
      };
    }
    if (simP < 15) {
      return {
        fertilizer: "Complete Fertilizer (14-14-14)",
        type: "Balanced Inorganic",
        status: "Phosphorus Deficiency",
        dosage: "66.11 kg/ha N · 83 kg/ha P · 193.01 kg/ha K",
      };
    }
    return {
      fertilizer: "Processed Chicken Manure",
      type: "Organic Maintenance",
      status: "Adequate Baseline Health",
      dosage: "45.0 kg/ha N · 40.0 kg/ha P · 35.0 kg/ha K",
    };
  };

  const currentRec = getRecommendation();
  const currentScreen = SCREENS[activeTab];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.header}>
          <span className={styles.eyebrow}>SELECTED WORK // 03</span>
          <h1 className={styles.title}>Projects</h1>
        </header>

        <div className={styles.divider} />

        {/* Clickable Project Section */}
        <section className={styles.projectSection} aria-label="AniMo Project Section">
          {/* Main Card (Click to Show All Abouts) */}
          <div
            className={`${styles.projectCard} ${isExpanded ? styles.projectCardOpen : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }
            }}
            aria-expanded={isExpanded}
          >
            {/* Cover Banner */}
            <div className={styles.cardCover}>
              <Image
                src="/images/projects/animo/animo-landing.png"
                alt="AniMo: Soil Nutrient Prediction Preview"
                width={1200}
                height={600}
                className={styles.coverImg}
                priority
              />
              <div className={styles.coverOverlay} />
              <span className={styles.projectBadge}>Featured Research // Machine Learning</span>
            </div>

            {/* Summary Information */}
            <div className={styles.cardSummary}>
              <div className={styles.cardTitleRow}>
                <div className={styles.titleWithIcon}>
                  <div className={styles.projectIcon}>🌱</div>
                  <div>
                    <h2 className={styles.projectTitle}>AniMo: Soil Nutrient Prediction</h2>
                    <span className={styles.projectMeta}>
                      Palawan State University · Precision Agri-Tech
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.toggleBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  aria-label={isExpanded ? "Collapse project details" : "Show all project details"}
                >
                  <span>{isExpanded ? "Collapse Details" : "View All Abouts"}</span>
                  <svg
                    className={`${styles.toggleArrow} ${isExpanded ? styles.toggleArrowOpen : ""}`}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              <p className={styles.projectExcerpt}>
                An intelligent precision soil-analysis platform utilizing the Random Tree Algorithm to forecast future NPK (Nitrogen, Phosphorus, Potassium) nutrient levels, analyze soil conditions, and generate automated organic and inorganic fertilizer recommendations for local vegetable farmers.
              </p>

              <div className={styles.tagsRow}>
                <span className={styles.tagPill}>Machine Learning</span>
                <span className={styles.tagPill}>Random Tree Algorithm</span>
                <span className={styles.tagPill}>Precision Agriculture</span>
                <span className={styles.tagPill}>Soil NPK Forecasting</span>
                <span className={styles.tagPill}>Full-Stack Web App</span>
              </div>

              <div className={styles.hintText}>
                <span>
                  {isExpanded
                    ? "Showing all abouts of the project — click again to collapse"
                    : "Click anywhere on this section to reveal all abouts, screenshots, ML architecture & live simulator"}
                </span>
                <span className={styles.hintIcon}>{isExpanded ? "▲" : "▼"}</span>
              </div>
            </div>
          </div>

          {/* Expanded All Abouts Section */}
          {isExpanded && (
            <div className={styles.expandedDetails}>
              {/* Quick Specs Bar */}
              <div className={styles.specsBar}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Project Type</span>
                  <span className={styles.specValue}>Machine Learning & Web App</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Algorithm</span>
                  <span className={styles.specValue}>Random Tree (Decision Forest)</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Institution</span>
                  <span className={styles.specValue}>Palawan State University</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Target Crops</span>
                  <span className={styles.specValue}>Batao, Ampalaya & Vegetables</span>
                </div>
              </div>

              {/* Interactive Walkthrough Gallery */}
              <section className={styles.gallerySection} aria-label="Project Visual Showcase">
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Application Interface & Walkthrough</h3>
                  <p className={styles.sectionDesc}>
                    Click through the interface modules to examine the end-to-end user workflow from sample input to fertilizer prescription.
                  </p>
                </div>

                {/* Tab Selector Buttons */}
                <div className={styles.tabButtons}>
                  {SCREENS.map((screen, idx) => (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`${styles.tabBtn} ${activeTab === idx ? styles.tabBtnActive : ""}`}
                    >
                      {screen.tabLabel}
                    </button>
                  ))}
                </div>

                {/* Active Screen Presentation */}
                <div className={styles.activeScreenCard}>
                  <div className={styles.screenMeta}>
                    <div className={styles.screenTitleGroup}>
                      <h4 className={styles.screenTitle}>{currentScreen.title}</h4>
                      <p className={styles.screenCaption}>{currentScreen.caption}</p>
                    </div>
                    <span className={styles.screenBadge}>{currentScreen.badge}</span>
                  </div>

                  {/* High-res Image Preview */}
                  <div className={styles.imageFrame}>
                    <Image
                      src={currentScreen.src}
                      alt={currentScreen.title}
                      width={1200}
                      height={675}
                      className={styles.screenshotImg}
                      priority
                    />
                  </div>

                  {/* Thumbnail Navigation */}
                  <div className={styles.thumbnailGrid}>
                    {SCREENS.map((screen, idx) => (
                      <div
                        key={screen.id}
                        onClick={() => setActiveTab(idx)}
                        className={`${styles.thumbItem} ${activeTab === idx ? styles.thumbActive : ""}`}
                      >
                        <Image
                          src={screen.src}
                          alt={screen.title}
                          width={240}
                          height={135}
                          className={styles.thumbImg}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Architectural Pillars / Deep-Dive */}
              <section className={styles.gallerySection} aria-label="Engineering Highlights">
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>System Architecture & Innovations</h3>
                  <p className={styles.sectionDesc}>
                    Key technical contributions bridging laboratory soil science, machine learning models, and practical farmer field operations.
                  </p>
                </div>

                <div className={styles.pillarsGrid}>
                  <article className={styles.pillarCard}>
                    <span className={styles.pillarNumber}>PILLAR // 01</span>
                    <h4 className={styles.pillarTitle}>Random Tree ML Forecasting</h4>
                    <p className={styles.pillarDesc}>
                      Trained on laboratory soil test datasets to predict future Nitrogen (N), Phosphorus (P), and Potassium (K) depletion trajectories based on current crop uptake cycles and soil pH baselines.
                    </p>
                  </article>

                  <article className={styles.pillarCard}>
                    <span className={styles.pillarNumber}>PILLAR // 02</span>
                    <h4 className={styles.pillarTitle}>Multi-Variant Fertilizer Engine</h4>
                    <p className={styles.pillarDesc}>
                      Automates nutrient deficiency calculations by cross-referencing soil readings with specialized crop requirements (Batao, Ampalaya) against both organic (Bone Meal, Blood Meal) and inorganic (DAP, MAP, 14-14-14) fertilizers.
                    </p>
                  </article>

                  <article className={styles.pillarCard}>
                    <span className={styles.pillarNumber}>PILLAR // 03</span>
                    <h4 className={styles.pillarTitle}>Application History & Diagnostics</h4>
                    <p className={styles.pillarDesc}>
                      Maintains a longitudinal application records database (tracking Application IDs, soil volumes, pH levels, and calculated application rates), giving farmers historical visibility across harvest cycles.
                    </p>
                  </article>

                  <article className={styles.pillarCard}>
                    <span className={styles.pillarNumber}>PILLAR // 04</span>
                    <h4 className={styles.pillarTitle}>Field-Ready Responsive UI</h4>
                    <p className={styles.pillarDesc}>
                      Engineered for maximum accessibility across mobile devices and field tablets, with high-contrast color indicators, error-tolerant inputs, and rapid single-click calculation workflows.
                    </p>
                  </article>
                </div>
              </section>

              {/* Live Interactive AniMo Logic Simulator */}
              <section className={styles.simulatorBox} aria-label="Interactive Simulator">
                <div className={styles.simHeader}>
                  <h3 className={styles.simTitle}>Live AniMo Calculation Simulator</h3>
                  <p className={styles.simDesc}>
                    Test the core AniMo recommendation logic directly below. Adjust the seedling type and soil percentages to see how the system computes nutrient deficiencies and selects optimal fertilizer treatments.
                  </p>
                </div>

                <div className={styles.simControls}>
                  <div className={styles.controlGroup}>
                    <label htmlFor="sim-seedling" className={styles.controlLabel}>
                      Target Seedling
                    </label>
                    <select
                      id="sim-seedling"
                      className={styles.simSelect}
                      value={simSeedling}
                      onChange={(e) => setSimSeedling(e.target.value)}
                    >
                      <option value="Batao">Batao (Legume)</option>
                      <option value="Ampalaya">Ampalaya (Bitter Gourd)</option>
                      <option value="Tomato">Tomato (Solanaceae)</option>
                    </select>
                  </div>

                  <div className={styles.controlGroup}>
                    <label htmlFor="sim-ph" className={styles.controlLabel}>
                      Soil pH Level ({simPh})
                    </label>
                    <input
                      id="sim-ph"
                      type="range"
                      min="4.0"
                      max="8.5"
                      step="0.1"
                      className={styles.simInput}
                      value={simPh}
                      onChange={(e) => setSimPh(parseFloat(e.target.value))}
                    />
                  </div>

                  <div className={styles.controlGroup}>
                    <label htmlFor="sim-n" className={styles.controlLabel}>
                      Nitrogen (N%): {simN}%
                    </label>
                    <input
                      id="sim-n"
                      type="range"
                      min="1"
                      max="25"
                      className={styles.simInput}
                      value={simN}
                      onChange={(e) => setSimN(parseInt(e.target.value, 10))}
                    />
                  </div>

                  <div className={styles.controlGroup}>
                    <label htmlFor="sim-p" className={styles.controlLabel}>
                      Phosphorus (P%): {simP}%
                    </label>
                    <input
                      id="sim-p"
                      type="range"
                      min="1"
                      max="30"
                      className={styles.simInput}
                      value={simP}
                      onChange={(e) => setSimP(parseInt(e.target.value, 10))}
                    />
                  </div>
                </div>

                {/* Dynamic Simulator Output Card */}
                <div className={styles.simOutput}>
                  <div className={styles.outLeft}>
                    <span className={styles.outTitle}>
                      Recommended Treatment: {currentRec.fertilizer}
                    </span>
                    <span className={styles.outSub}>
                      Status: {currentRec.status} • Calculated Dosage: {currentRec.dosage}
                    </span>
                  </div>
                  <span className={styles.outBadge}>{currentRec.type}</span>
                </div>
              </section>

              {/* Collapse Button Bar */}
              <div className={styles.collapseRow}>
                <button
                  type="button"
                  className={styles.collapseBtn}
                  onClick={() => setIsExpanded(false)}
                >
                  Collapse Project Details ↑
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Bottom Navigation / Contact Box */}
        <div className={styles.bottomBox}>
          <div className={styles.bottomText}>
            <h3 className={styles.bottomHeading}>Interested in more technical case studies?</h3>
            <p className={styles.bottomSub}>
              Explore our full design and engineering capabilities or get in touch to discuss collaborative software and machine learning projects.
            </p>
          </div>
          <div className={styles.bottomActions}>
            <Link href="/services" className={styles.secondaryLink}>
              View Services →
            </Link>
            <Link href="/contact" className={styles.primaryLink}>
              Contact Cyrus →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
