import "./index.css";

function App() {
  const companies = [
    {
      company: "Trendyol",
      position: "Senior Backend Developer",
      salary: "95.000₺",
      meta: "İstanbul • Hibrit"
    },
    {
      company: "Getir",
      position: "Data Analyst",
      salary: "72.000₺",
      meta: "Remote"
    },
    {
      company: "Hepsiburada",
      position: "Product Designer",
      salary: "68.000₺",
      meta: "İstanbul • Ofis"
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fce4ec",
        color: "#2c0a1e",
        fontFamily: "DM Sans, sans-serif"
      }}
    >
      <nav
        style={{
          padding: "22px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#e8112d",
          borderBottom: "3px solid #6b0f2a"
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "white"
          }}
        >
          kuliss
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            color: "white",
            fontWeight: 600
          }}
        >
          <span>şirket ara</span>
          <span>maaş paylaş</span>
        </div>
      </nav>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "70px 24px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "70px"
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#1a1a5e",
              color: "white",
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "22px"
            }}
          >
            ✦ tamamen anonim
          </div>

          <h1
            style={{
              fontSize: "72px",
              lineHeight: 1,
              marginBottom: "20px",
              color: "#fff",
              textShadow: "4px 4px 0 #6b0f2a"
            }}
          >
            vitrini değil,<br />
            içini gösterir.
          </h1>

          <p
            style={{
              maxWidth: "620px",
              margin: "0 auto",
              color: "#fff",
              fontSize: "18px",
              lineHeight: 1.7
            }}
          >
            Türkiye'deki şirketlerin gerçek maaşları,
            çalışma kültürü ve perde arkası.
          </p>

          <div
            style={{
              marginTop: "34px",
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap"
            }}
          >
            <button style={primaryButton}>
              maaş paylaş
            </button>

            <button style={secondaryButton}>
              şirket ara
            </button>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "30px",
            border: "2px solid #6b0f2a",
            boxShadow: "8px 8px 0 #e8112d"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px"
            }}
          >
            <h2
              style={{
                fontSize: "30px",
                margin: 0
              }}
            >
              son paylaşılan maaşlar
            </h2>

            <div
              style={{
                color: "#8b3a5a",
                fontWeight: 600
              }}
            >
              canlı veriler
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}
          >
            {companies.map((item) => (
              <div
                key={item.company + item.position}
                style={{
                  background: "#fff0f5",
                  border: "2px solid #f48fb1",
                  borderRadius: "18px",
                  padding: "22px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "20px"
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      marginBottom: "6px"
                    }}
                  >
                    {item.position}
                  </div>

                  <div
                    style={{
                      color: "#6b0f2a",
                      fontWeight: 600,
                      marginBottom: "6px"
                    }}
                  >
                    {item.company}
                  </div>

                  <div
                    style={{
                      color: "#8b3a5a"
                    }}
                  >
                    {item.meta}
                  </div>
                </div>

                <div
                  style={{
                    background: "#1a1a5e",
                    color: "white",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "20px"
                  }}
                >
                  {item.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const primaryButton = {
  background: "#1a1a5e",
  color: "white",
  border: "none",
  padding: "14px 26px",
  borderRadius: "14px",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "15px"
};

const secondaryButton = {
  background: "white",
  color: "#6b0f2a",
  border: "none",
  padding: "14px 26px",
  borderRadius: "14px",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: "15px"
};

export default App;