import { useState } from "react";
import axios from "axios";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  const submitSalary = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/salary-reports", {
        company_name: companyName,
        sector: "Teknoloji",
        city: city,
        position: position,
        experience_years: 1,
        work_type: "Hibrit",
        salary_amount: Number(salary),
        salary_period: "Aylık",
        salary_type: "Net",
        currency: "TRY",
        benefits: "Yemek kartı",
        comment: "Frontend test verisi"
      });

      setMessage("Maaş başarıyla paylaşıldı.");

      setCompanyName("");
      setPosition("");
      setSalary("");
      setCity("");
    } catch (error) {
      console.error(error);
      setMessage("Bir hata oluştu.");
    }
  };

  return (
    <div
      style={{
        background: "#0f0f0f",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#1a1a1a",
          padding: "40px",
          borderRadius: "24px",
          border: "1px solid #2c2c2c"
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "6px"
          }}
        >
          Kuliss
        </h1>

        <p
          style={{
            color: "#999",
            marginBottom: "30px"
          }}
        >
          Vitrini değil, içini gösterir.
        </p>

        <input
          placeholder="Şirket adı"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Pozisyon"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Şehir"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Maaş"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={submitSalary}
          style={buttonStyle}
        >
          Anonim Paylaş
        </button>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: "#8aff8a"
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#141414",
            borderRadius: "16px"
          }}
        >
          <h3>Örnek Şirketler</h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "14px"
            }}
          >
            {[
              "Trendyol",
              "Getir",
              "Hepsiburada",
              "Yemeksepeti",
              "Inditex"
            ].map((company) => (
              <div
                key={company}
                style={{
                  background: "#252525",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  color: "#ddd"
                }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "1px solid #2f2f2f",
  background: "#242424",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box"
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px",
  marginTop: "18px",
  borderRadius: "12px",
  border: "none",
  background: "white",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px"
};

export default App;