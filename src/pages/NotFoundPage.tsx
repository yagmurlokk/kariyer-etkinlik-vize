import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <h2>404 - Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "16px" }}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}