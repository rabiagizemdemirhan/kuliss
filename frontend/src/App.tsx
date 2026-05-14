import { useEffect, useState } from "react";
import axios from "axios";

type SalaryReport = {
  id: number;
  company_name: string;
  sector: string;
  city: string;
  position: string;
  experience_years: number;
  work_type: string;
  salary_amount: number;
  salary_period: string;
  salary_type: string;
  currency: string;
  benefits?: string | null;
  comment?: string | null;
  created_at?: string;
};

type Page = "home" | "share" | "search";

const API_URL = "https://kuliss-p7lr.onrender.com";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [reports, setReports] = useState<SalaryReport[]>([]);
  const [search, setSearch] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [city, setCity] = useState("");
  const [position, setPosition] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [workType, setWorkType] = useState("Hibrit");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("Aylık");
  const [salaryType, setSalaryType] = useState("Net");
  const [currency, setCurrency] = useState("TRY");
  const [benefits, setBenefits] = useState("");
  const [comment, setComment] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await axios.get<SalaryReport[]>(
        `${API_URL}/salary-reports`
      );
      setReports(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Veriler alınamadı.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const submitSalary = async () => {
    if (!companyName || !sector || !city || !position || !salaryAmount) {
      setMessage("Lütfen zorunlu alanları doldur.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/salary-reports`, {
        company_name: companyName,
        sector,
        city,
        position,
        experience_years: Number(experienceYears || 0),
        work_type: workType,
        salary_amount: Number(salaryAmount),
        salary_period: salaryPeriod,
        salary_type: salaryType,
        currency,
        benefits,
        comment
      });

      setMessage("Maaş başarıyla paylaşıldı.");

      setCompanyName("");
      setSector("");
      setCity("");
      setPosition("");
      setExperienceYears("");
      setWorkType("Hibrit");
      setSalaryAmount("");
      setSalaryPeriod("Aylık");
      setSalaryType("Net");
      setCurrency("TRY");
      setBenefits("");
      setComment("");

      await fetchReports();
      setPage("home");
    } catch (error) {
      console.error(error);
      setMessage("Bir hata oluştu. Backend veya CORS ayarını kontrol et.");
    } finally {
      setLoading(false);
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
                Türkiye'deki şirketlerin gerçek maaşları, çalışma kültürü ve
                perde arkası.
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

            <p style={styles.muted}>Bir yere girmeden önce gerçeği öğren.</p>

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

            <p style={styles.muted}>Tüm veriler anonimdir.</p>

            <div style={styles.formGrid}>
              <input
                style={styles.input}
                placeholder="Şirket adı *"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Sektör *"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Şehir *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Pozisyon *"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Deneyim yılı"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Maaş miktarı *"
                value={salaryAmount}
                onChange={(e) => setSalaryAmount(e.target.value)}
              />

              <select
                style={styles.input}
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
              >
                <option value="Ofis">Ofis</option>
                <option value="Hibrit">Hibrit</option>
                <option value="Remote">Remote</option>
              </select>

              <select
                style={styles.input}
                value={salaryPeriod}
                onChange={(e) => setSalaryPeriod(e.target.value)}
              >
                <option value="Aylık">Aylık</option>
                <option value="Yıllık">Yıllık</option>
                <option value="Saatlik">Saatlik</option>
              </select>

              <select
                style={styles.input}
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="Net">Net</option>
                <option value="Brüt">Brüt</option>
              </select>

              <select
                style={styles.input}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <textarea
              style={styles.textarea}
              placeholder="Yan haklar"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
            />

            <textarea
              style={styles.textarea}
              placeholder="Yorum"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              style={styles.primaryBtnFull}
              onClick={submitSalary}
              disabled={loading}
            >
              {loading ? "gönderiliyor..." : "anonim olarak gönder"}
            </button>

            {message && <p style={styles.successText}>{message}</p>}
          </section>
        )}
      </main>
    </div>
  );
}

function SalaryList({ reports }: { reports: SalaryReport[] }) {
  return (
    <section style={styles.salaryBox}>
      <h2>son paylaşılan maaşlar</h2>

      {reports.length === 0 ? (
        <p style={styles.emptyText}>Henüz maaş paylaşımı yok.</p>
      ) : (
        reports.map((item) => (
          <div key={item.id} style={styles.salaryCard}>
            <div>
              <h3 style={styles.position}>{item.position}</h3>

              <p style={styles.company}>{item.company_name}</p>

              <p style={styles.muted}>
                {item.city} • {item.work_type} • {item.experience_years} yıl
              </p>

              <p style={styles.benefits}>
                {item.salary_period} / {item.salary_type} / {item.currency}
              </p>

              {item.benefits && (
                <p style={styles.benefits}>Yan haklar: {item.benefits}</p>
              )}

              {item.comment && (
                <p style={styles.comment}>“{item.comment}”</p>
              )}
            </div>

            <div style={styles.salaryPill}>
              {item.salary_amount.toLocaleString("tr-TR")} {item.currency}
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

  benefits: {
    marginTop: "8px",
    color: "#5c0017"
  },

  comment: {
    marginTop: "10px",
    color: "#8b3a5a",
    fontStyle: "italic"
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

  textarea: {
    width: "100%",
    minHeight: "90px",
    marginTop: "14px",
    padding: "14px",
    borderRadius: "14px",
    border: "2px solid #ff8db2",
    boxSizing: "border-box"
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
    color: "#0a7a2f",
    fontWeight: 700
  }
};

export default App;