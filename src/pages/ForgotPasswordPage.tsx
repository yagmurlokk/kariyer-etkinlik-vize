import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <div className="form-container" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p style={{ color: "#666", marginBottom: "15px", fontSize: "0.95rem" }}>
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
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
            aria-invalid={error ? true : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            style={{ width: "100%", padding: "8px" }}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          Bağlantı gönder
        </button>

        <div style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "var(--renk-ana, #2e7d32)", textDecoration: "none" }}>
            ← Girişe dön
          </Link>
        </div>
      </form>
    </div>
  );
}
