"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, HeartPulse, BrainCircuit, BellRing, ChevronRight, Phone } from "lucide-react";
import styles from "./page.module.css";

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    // 2-second splash screen
    const timer = setTimeout(() => {
      setFadeSplash(true);
      setTimeout(() => setShowSplash(false), 300); // 300ms fade out
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: '#2563EB', color: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: fadeSplash ? 0 : 1, transition: 'opacity 0.3s ease-out'
      }}>
        <div className="animate-in" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <HeartPulse size={48} color="white" />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>MediPal AI</h1>
        </div>
        <p className="animate-in" style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.9, animationDelay: '200ms' }}>
          Your Health, Simplified
        </p>
      </div>
    );
  }

  return (
    <main className="animate-in">
      <header style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ fontWeight: 800, fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
          <HeartPulse size={28} color="var(--primary)" />
          MediPal AI
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/auth" className="btn btn-secondary">Login</Link>
        </div>
      </header>

      <section className={styles.hero}>
        <h1 className={styles.title}>
          Your Family's <span className="gradient-text">Health Assistant</span>
        </h1>
        <p className={styles.subtitle}>
          Store everything. Miss nothing. Understand your health.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/auth?mode=register" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "1.1rem" }}>
            Get Started Free <ChevronRight size={20} />
          </Link>
          <button className="btn btn-secondary" style={{ padding: "14px 32px", fontSize: "1.1rem" }}>
            See How It Works
          </button>
        </div>

        <div className={styles.mockupContainer}>
          <div style={{ background: "var(--background)", borderRadius: "24px", padding: "16px", aspectRatio: "9/19", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>Health Score</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--success)" }}>72/100</div>
            <div style={{ background: "var(--secondary)", borderRadius: "8px", height: "40px", marginTop: "auto" }}></div>
            <div style={{ background: "var(--secondary)", borderRadius: "8px", height: "40px" }}></div>
            <div style={{ background: "var(--secondary)", borderRadius: "8px", height: "40px" }}></div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={`${styles.featureCard} glass`}>
          <ShieldCheck className={styles.featureIcon} size={32} />
          <h3 className={styles.featureTitle}>Health Locker</h3>
          <p className={styles.featureDesc}>All your family's medical records in one place. Easily uploaded, automatically sorted.</p>
        </div>
        <div className={`${styles.featureCard} glass`}>
          <BellRing className={styles.featureIcon} size={32} />
          <h3 className={styles.featureTitle}>Smart Reminders</h3>
          <p className={styles.featureDesc}>Never miss a pill or a refill. Stay on top of blood tests, dentist visits, and eye checkups.</p>
        </div>
        <div className={`${styles.featureCard} glass`}>
          <BrainCircuit className={styles.featureIcon} size={32} />
          <h3 className={styles.featureTitle}>AI Assistant</h3>
          <p className={styles.featureDesc}>Ask questions about your health documents and get instant insights from your own records.</p>
        </div>
      </section>

      <section className={styles.trustSection}>
        <h2 className={styles.trustTitle}>Built for your family's privacy & safety</h2>
        <div className={styles.trustPoints}>
          <div className={styles.trustPoint}>
            <ShieldCheck size={24} color="var(--success)" />
            Your data is private and encrypted. Never shared.
          </div>
          <div className={styles.trustPoint}>
            <HeartPulse size={24} color="var(--success)" />
            Emergency guide works without internet.
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div style={{ fontWeight: 600 }}>MediPal AI &copy; 2026</div>
        <div className={styles.footerLinks}>
          <Link href="/emergency" style={{ color: "var(--danger)", fontWeight: 600, display: "flex", gap: "4px", alignItems: "center" }}>
            <Phone size={16} /> Emergency Help
          </Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
