import { useState } from "react";

type SalaryReport = {
  company: string;
  position: string;
  salary: string;
  city: string;
  workType: string;
  experience: string;
  benefits: string;
};

function App() {
  const [page, setPage] = useState<"home" | "share" | "search">("home");
  const [search, setSearch] = useState("");

  const reports: SalaryReport[] = [
    {
      company: "Trendyol",
      position: "Senior Backend Developer",
      salary: "95.000₺",
      city: "İstanbul",
      workType: "Hibrit",
      experience: "4 yıl",
      benefits: "Yemek kartı, özel sağlık"
    },
    {
      company: "Getir",
      position: "Data Analyst",
      salary: "72.000₺",
      city: "İstanbul",
      workType: "Remote",
      experience: "2 yıl",
      benefits: "Bonus, esnek çalışma"
    },
    {
      company: "Inditex",
      position: "Sales Assistant",
      salary: "32.000₺",
      city: "İstanbul",
      workType: "Ofis",
      experience: "1 yıl",
      benefits: "Yemek, prim"
    }
  ];

  const filteredReports = reports.filter((item) =>
    item.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <button style={styles.logo} onClick={() => setPage("home")}>
          kuli<em>ss</em>
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
                <em>içini</em> gösterir.
              </h1>

              <p style={styles.subtitle}>
                Türkiye'deki şirketlerin gerçek maaşları, çalışma kültürü ve
                perde arkası.
              </p>

              <div style={styles.buttonRow}>
                <button style={styles.primaryBtn} onClick={() => setPage("share")}>
                  maaş paylaş
                </button>
                <button style={styles.secondaryBtn} onClick={() => setPage("search")}>
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
              placeholder="Şirket adı yaz: Trendyol, Getir, Inditex..."
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
              <input style={styles.input} placeholder="Şirket adı" />
              <input style={styles.input} placeholder="Sektör" />
              <input style={styles.input} placeholder="Şehir" />
              <input style={styles.input} placeholder="Pozisyon" />
              <input style={styles.input} placeholder="Deneyim yılı" />
              <input style={styles.input} placeholder="Maaş miktarı" />

              <select style={styles.input}>
                <option>Aylık</option>
                <option>Yıllık</option>
                <option>Saatlik</option>
              </select>

              <select style={styles.input}>
                <option>Net</option>
                <option>Brüt</option>
              </select>
            </div>

            <textarea style={styles.textarea} placeholder="Yan haklar / yorum" />

            <button
              style={styles.primaryBtnFull}
              onClick={() => alert("Frontend form hazır. Sırada backend bağlantısı var.")}
            >
              anonim olarak gönder
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

function SalaryList({ reports }: { reports: SalaryReport[] }) {
  if (reports.length === 0) {
    return <p style={styles.muted}>Sonuç bulunamadı.</p>;
  }

  return (
    <section style={styles.salaryBox}>
      <h2>son paylaşılan maaşlar</h2>

      {reports.map((item) => (
        <div key={item.company + item.position} style={styles.salaryCard}>
          <div>
            <h3 style={styles.position}>{item.position}</h3>
            <p style={styles.company}>{item.company}</p>
            <p style={styles.muted}>
              {item.city} • {item.workType} • {item.experience}
            </p>
            <p style={styles.benefits}>{item.benefits}</p>
          </div>

          <div style={styles.salaryPill}>{item.salary}</div>
        </div>
      ))}
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "repeating-linear-gradient(90deg, #e8112d 0px, #e8112d 48px, #f48fb1 48px, #f48fb1 96px)",
    color: "#2c0a1e",
    fontFamily: "Arial, sans-serif"
  },
  nav: {
    background: "#e8112d",
    borderBottom: "3px solid #6b0f2a",
    padding: "18px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "28px",
    fontWeight: 800,
    cursor: "pointer"
  },
  navLinks: {
    display: "flex",
    gap: "18px"
  },
  navBtn: {
    background: "transparent",
    border: "none",
    color: "white",
    fontWeight: 700,
    cursor: "pointer"
  },
  main: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "60px 24px"
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px"
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
    fontSize: "68px",
    lineHeight: 1,
    margin: "0 0 20px",
    color: "white",
    textShadow: "4px 4px 0 #6b0f2a"
  },
  subtitle: {
    color: "white",
    maxWidth: "560px",
    margin: "0 auto",
    fontSize: "18px",
    lineHeight: 1.6
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    marginTop: "30px"
  },
  primaryBtn: {
    background: "#1a1a5e",
    color: "white",
    border: "none",
    padding: "14px 26px",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "4px 4px 0 #6b0f2a"
  },
  secondaryBtn: {
    background: "white",
    color: "#6b0f2a",
    border: "none",
    padding: "14px 26px",
    borderRadius: "14px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "4px 4px 0 #1a1a5e"
  },
  card: {
    background: "white",
    border: "2px solid #6b0f2a",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "8px 8px 0 #e8112d"
  },
  salaryBox: {
    background: "white",
    border: "2px solid #6b0f2a",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "8px 8px 0 #e8112d"
  },
  salaryCard: {
    background: "#fff0f5",
    border: "2px solid #f48fb1",
    borderRadius: "18px",
    padding: "22px",
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItems: "center",
    flexWrap: "wrap"
  },
  position: {
    margin: "0 0 6px",
    fontSize: "22px"
  },
  company: {
    margin: "0 0 6px",
    color: "#6b0f2a",
    fontWeight: 800
  },
  muted: {
    color: "#8b3a5a"
  },
  benefits: {
    marginTop: "8px",
    color: "#6b0f2a"
  },
  salaryPill: {
    background: "#1a1a5e",
    color: "white",
    padding: "12px 18px",
    borderRadius: "14px",
    fontWeight: 800,
    fontSize: "20px"
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #f48fb1",
    fontSize: "15px",
    width: "100%",
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
    minHeight: "100px",
    marginTop: "14px",
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #f48fb1",
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
    cursor: "pointer"
  }
};

export default App;