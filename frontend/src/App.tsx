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

  // Şimdilik boş veri
  const reports: SalaryReport[] = [];

  const filteredReports = reports.filter((item) =>
    item.company.toLowerCase().includes(search.toLowerCase())
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

            <textarea
              style={styles.textarea}
              placeholder="Yan haklar / yorum"
            />

            <button style={styles.primaryBtnFull}>
              anonim olarak gönder
            </button>
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
        <p style={styles.emptyText}>
          Henüz maaş paylaşımı yok.
        </p>
      ) : (
        reports.map((item) => (
          <div
            key={item.company + item.position}
            style={styles.salaryCard}
          >
            <div>
              <h3 style={styles.position}>
                {item.position}
              </h3>

              <p style={styles.company}>
                {item.company}
              </p>

              <p style={styles.muted}>
                {item.city} • {item.workType} • {item.experience}
              </p>

              <p style={styles.benefits}>
                {item.benefits}
              </p>
            </div>

            <div style={styles.salaryPill}>
              {item.salary}
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
    minHeight: "120px",
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
  }
};

export default App;