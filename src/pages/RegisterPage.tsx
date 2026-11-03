import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) {
      found.name = "Ad soyad en az 3 karakter olmalı.";
    }

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }

    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }

    if (password2 !== password) {
      found.password2 = "Şifreler aynı değil.";
    }

    setErrors(found);
    const isValid = Object.keys(found).length === 0;
    setSent(isValid);
  }

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2 className="bolum-baslik">Kayıt Ol</h2>

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
          Kayıt başarılı! Gerçek kayıt Sprint 10'da.
        </div>
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        {/* Ad Soyad */}
        <div className="form-group">
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Ad Soyad
          </label>
          <input
            type="text"
            id="name"
            value={name}
            aria-invalid={errors.name ? true : undefined}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.name && <span className="hata-metni">{errors.name}</span>}
        </div>

        {/* E-posta */}
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

        {/* Şifre */}
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

        {/* Şifre (tekrar) */}
        <div className="form-group">
          <label htmlFor="password2" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Şifre (tekrar)
          </label>
          <input
            type="password"
            id="password2"
            value={password2}
            aria-invalid={errors.password2 ? true : undefined}
            onChange={(e) => {
              setPassword2(e.target.value);
              if (errors.password2) setErrors({ ...errors, password2: undefined });
            }}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
        </div>

        <button type="submit" className="btn-primary" style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
          Kayıt ol
        </button>

        <div style={{ marginTop: "15px", fontSize: "0.9rem", textAlign: "center" }}>
          <Link to="/login" style={{ color: "var(--renk-ana, #2e7d32)" }}>
            Zaten hesabın var mı? Giriş yap
          </Link>
        </div>
      </form>
    </div>
  );
}
