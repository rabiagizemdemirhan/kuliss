import { useState } from "react";
import axios from "axios";

type SalaryReport = {
  company_name: string;
  position: string;
  salary_amount: number;
  city: string;
};

function App() {
  const [page, setPage] = useState<"home" | "share" | "search">("home");

  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  const [reports, setReports] = useState<SalaryReport[]>([]);

  const API_URL = "https://kuliss-p7lr.onrender.com";

  const submitSalary = async () => {
    try {
      await axios.post(`${API_URL}/salary-reports`, {
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
        comment: "Kuliss kullanıcı paylaşımı"
      });

      setReports([
        {
          company_name: companyName,
          position,
          salary_amount: Number(salary),
          city
        },
        ...reports
      ]);

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

  const filteredReports = reports.filter((item) =>
    item.company_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <button style={styles.logo} onClick={() => setPage("home")}>
          kuliss
        </button>

        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => setPage("search")}>
            şirket ara
          </button>

          <button style={styles.navBtn} onClick={() => setPage("share")}>
            maaş paylaş
          </button>
        </div>
      </nav>

      <main style={styles.main}>
        {page === "home" && (
          <>
            <section style={styles.hero}>
              <div style={styles.badge}>✦ tamamen anonim</div>

              <h1 style={styles.title}>
                vitrini değil,
                <br />
                içini gösterir.
              </h1>

              <p style={styles.subtitle}>
                Türkiye'deki şirketlerin gerçek maaşları,
                çalışma kültürü ve perde arkası.
              </p>

              <div style={styles.buttonRow}>
                <button
                  style={styles.primaryBtn}
                  onClick={() => setPage("share")}
                >
                  maaş paylaş
                </button>

                <button
                  style={styles.secondaryBtn}
                  onClick={() => setPage("search")}
                >
                  şirket ara
                </button>
              </div>
            </section>

            <SalaryList reports={reports} />
          </>
        )}

        {page === "search" && (
          <section style={styles.card}>
            <h2>şirket ara</h2>

            <p style={styles.muted}>
              Bir yere girmeden önce gerçeği öğren.
            </p>

            <input
              style={styles.input}
              placeholder="Şirket adı yaz..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <SalaryList reports={filteredReports} />
          </section>
        )}

        {page === "share" && (
          <section style={styles.card}>
            <h2>maaş bilgisi ekle</h2>

            <p style={styles.muted}>
              Tüm veriler anonimdir.
            </p>

            <div style={styles.formGrid}>
              <input
                style={styles.input}
                placeholder="Şirket adı"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Pozisyon"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Şehir"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Maaş miktarı"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <button
              style={styles.primaryBtnFull}
              onClick={submitSalary}
            >
              anonim olarak gönder
            </button>

            {message && (
              <p style={styles.successText}>
                {message}
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function SalaryList({
  reports
}: {
  reports: SalaryReport[];
}) {
  return (
    <section style={styles.salaryBox}>
      <h2>son paylaşılan maaşlar</h2>

      {reports.length === 0 ? (
        <p style={styles.emptyText}>
          Henüz maaş paylaşımı yok.
        </p>
      ) : (
        reports.map((item, index) => (
          <div
            key={index}
            style={styles.salaryCard}
          >
            <div>
              <h3 style={styles.position}>
                {item.position}
              </h3>

              <p style={styles.company}>
                {item.company_name}
              </p>

              <p style={styles.muted}>
                {item.city}
              </p>
            </div>

            <div style={styles.salaryPill}>
              {item.salary_amount.toLocaleString("tr-TR")}₺
            </div>
          </div>
        ))
      )}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "repeating-linear-gradient(90deg, #ff0033 0px, #ff0033 44px, #ff8db2 44px, #ff8db2 88px)",
    fontFamily: "Arial, sans-serif",
    color: "#2c0a1e"
  },

  nav: {
    width: "100%",
    background: "#ff0033",
    borderBottom: "3px solid #5c0017",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "32px",
    fontWeight: 900,
    cursor: "pointer"
  },

  navLinks: {
    display: "flex",
    gap: "20px"
  },

  navBtn: {
    background: "white",
    border: "none",
    color: "#5c0017",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "15px",
    padding: "10px 16px",
    borderRadius: "12px"
  },

  main: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "60px 20px"
  },

  hero: {
    textAlign: "center",
    marginBottom: "50px"
  },

  badge: {
    display: "inline-block",
    background: "#1a1a5e",
    color: "white",
    padding: "8px 16px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    marginBottom: "20px"
  },

  title: {
    fontSize: "72px",
    lineHeight: 1,
    color: "white",
    margin: "0 0 20px",
    textShadow: "5px 5px 0 #5c0017"
  },

  subtitle: {
    maxWidth: "620px",
    margin: "0 auto",
    color: "white",
    fontSize: "18px",
    lineHeight: 1.7
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginTop: "30px",
    flexWrap: "wrap"
  },

  primaryBtn: {
    background: "#1a1a5e",
    color: "white",
    border: "none",
    padding: "14px 28px",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "15px"
  },

  secondaryBtn: {
    background: "white",
    color: "#5c0017",
    border: "none",
    padding: "14px 28px",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "15px"
  },

  card: {
    background: "#f6f0f2",
    border: "2px solid #5c0017",
    borderRadius: "28px",
    padding: "34px",
    boxShadow: "10px 10px 0 #ff0033"
  },

  salaryBox: {
    marginTop: "30px",
    background: "#f6f0f2",
    border: "2px solid #5c0017",
    borderRadius: "28px",
    padding: "30px",
    boxShadow: "10px 10px 0 #ff0033"
  },

  salaryCard: {
    background: "#ffe5ef",
    border: "2px solid #ff8db2",
    borderRadius: "18px",
    padding: "22px",
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  position: {
    margin: "0 0 6px",
    fontSize: "24px"
  },

  company: {
    margin: "0 0 6px",
    color: "#5c0017",
    fontWeight: 800
  },

  muted: {
    color: "#8b3a5a"
  },

  salaryPill: {
    background: "#1a1a5e",
    color: "white",
    padding: "12px 18px",
    borderRadius: "14px",
    fontWeight: 800,
    fontSize: "20px"
  },

  emptyText: {
    marginTop: "20px",
    color: "#8b3a5a"
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "14px",
    border: "2px solid #ff8db2",
    fontSize: "15px",
    boxSizing: "border-box"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginTop: "20px"
  },

  primaryBtnFull: {
    width: "100%",
    marginTop: "18px",
    background: "#1a1a5e",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "15px"
  },

  successText: {
    marginTop: "18px",
    color: "green",
    fontWeight: 700
  }
};

export default App;