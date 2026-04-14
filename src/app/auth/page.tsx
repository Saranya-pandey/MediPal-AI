import styles from "./auth.module.css";
import Link from "next/link";
import { HeartPulse } from "lucide-react";

export default function AuthPage({ searchParams }: { searchParams: { mode?: string } }) {
  const isRegister = searchParams.mode === "register";

  return (
    <div className={styles.container}>
      <div className={`${styles.authCard} glass`}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <HeartPulse size={48} color="var(--primary)" />
        </div>
        <h1 className={styles.title}>{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className={styles.subtitle}>
          {isRegister ? "Start managing your family's health securely." : "Login to your family health dashboard."}
        </p>

        <form className={styles.form}>
          {isRegister && (
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" className="input" placeholder="e.g. John Doe" required />
            </div>
          )}
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" className="input" placeholder="you@example.com" required />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input type="password" className="input" placeholder="Min 8 characters" required minLength={8} />
          </div>
          
          {isRegister && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "0.9rem" }}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link href="#" style={{ color: "var(--primary)" }}>Privacy Policy</Link></label>
            </div>
          )}

          <Link href={isRegister ? "/onboarding" : "/dashboard"} className="btn btn-primary" style={{ width: "100%", padding: "12px", marginTop: "16px" }}>
            {isRegister ? "Sign Up" : "Login"}
          </Link>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button className="btn btn-secondary" style={{ width: "100%", padding: "12px" }}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
          Continue with Google
        </button>

        <p style={{ textAlign: "center", marginTop: "32px", fontSize: "0.95rem" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link href={isRegister ? "/auth" : "/auth?mode=register"} style={{ color: "var(--primary)", fontWeight: 600 }}>
            {isRegister ? "Login" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
