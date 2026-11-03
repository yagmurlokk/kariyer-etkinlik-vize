import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: LoginErrors = {};

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }

    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }

    setErrors(found);
    const isValid = Object.keys(found).length === 0;
    setSent(isValid);
  }

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2 className="bolum-baslik">Giriş Yap</h2>

      {sent && (
        <div
          role="status"
          style={{
            backgroundColor: "#e8f5e9",
            color: "#1b5e20",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          Gerçek giriş Sprint 10'da
        </div>
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            E-posta
          </label>
          <input
            type="email"
            id="email"
            value={email}
            aria-invalid={errors.email ? true : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Şifre
          </label>
          <input
            type="password"
            id="password"
            value={password}
            aria-invalid={errors.password ? true : undefined}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
          Giriş yap
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", fontSize: "0.9rem" }}>
          <Link to="/forgot-password" style={{ color: "var(--renk-ana, #2e7d32)" }}>
            Şifremi unuttum
          </Link>
          <Link to="/register" style={{ color: "var(--renk-ana, #2e7d32)" }}>
            Hesabın yok mu? Kayıt ol
          </Link>
        </div>
      </form>
    </div>
  );
}
