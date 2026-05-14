from fastapi.middleware.cors import CORSMiddleware
import html
from fastapi import FastAPI, Depends, Form
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from sqlalchemy import func

import models
import schemas
from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kuliss API",
    version="1.0.0",
    description="Anonim maaş ve şirket deneyimi platformu"
)


def base_html(content: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kuliss</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}

  :root {{
    --bg: #fce4ec;
    --stripe-red: #e8112d;
    --stripe-pink: #f48fb1;
    --surface: #fff0f5;
    --surface2: #ffd6e7;
    --surface3: #ffc2d8;
    --border: #f48fb1;
    --border-hover: #e8112d;
    --text: #2c0a1e;
    --text-secondary: #5c1a3a;
    --muted: #8b3a5a;
    --muted2: #b05070;
    --navy: #1a1a5e;
    --burgundy: #6b0f2a;
    --red: #e8112d;
    --pink: #f48fb1;
    --pink-deep: #e91e8c;
  }}

  body {{
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    background-image: repeating-linear-gradient(
      90deg,
      var(--stripe-red) 0px,
      var(--stripe-red) 48px,
      var(--stripe-pink) 48px,
      var(--stripe-pink) 96px
    );
    background-attachment: fixed;
    color: var(--text);
    min-height: 100vh;
  }}

  nav {{
    border-bottom: 3px solid var(--burgundy);
    padding: 18px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: rgba(232,17,45,0.96);
    backdrop-filter: blur(12px);
    z-index: 100;
  }}

  .logo {{
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.5px;
    text-shadow: 2px 2px 0px var(--burgundy);
  }}

  .logo em {{
    font-style: italic;
    color: var(--stripe-pink);
  }}

  nav a {{
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: color 0.2s;
    margin-left: 28px;
  }}

  nav a:hover {{ color: #fff; }}

  .page {{
    max-width: 780px;
    margin: 0 auto;
    padding: 60px 28px;
  }}

  .hero {{
    margin-bottom: 64px;
    text-align: center;
  }}

  .hero-tag {{
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #fff;
    background: var(--navy);
    padding: 6px 16px;
    border-radius: 20px;
    margin-bottom: 24px;
  }}

  .hero h1 {{
    font-family: 'Playfair Display', serif;
    font-size: 68px;
    font-weight: 700;
    letter-spacing: -3px;
    line-height: 1.0;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 3px 3px 0px var(--burgundy);
  }}

  .hero h1 em {{
    font-style: italic;
    color: var(--navy);
    text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
  }}

  .hero p {{
    color: #fff;
    font-size: 16px;
    max-width: 420px;
    margin: 0 auto 40px;
    line-height: 1.7;
    font-weight: 500;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  }}

  .btn-row {{
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }}

  .btn {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.3px;
  }}

  .btn-navy {{
    background: var(--navy);
    color: #fff;
    box-shadow: 3px 3px 0px var(--burgundy);
  }}

  .btn-navy:hover {{
    background: #0d0d3d;
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0px var(--burgundy);
  }}

  .btn-white {{
    background: #fff;
    color: var(--burgundy);
    box-shadow: 3px 3px 0px var(--navy);
  }}

  .btn-white:hover {{
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0px var(--navy);
  }}

  .card-wrap {{
    background: #fff;
    border: 2px solid var(--burgundy);
    border-radius: 20px;
    padding: 36px;
    box-shadow: 6px 6px 0px var(--red);
  }}

  .page-title {{
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -1px;
    margin-bottom: 6px;
    color: #fff;
    text-shadow: 2px 2px 0px var(--burgundy);
  }}

  .page-title em {{
    font-style: italic;
    color: var(--navy);
    text-shadow: 2px 2px 0px rgba(0,0,0,0.15);
  }}

  .page-sub {{
    color: rgba(255,255,255,0.85);
    font-size: 14px;
    margin-bottom: 32px;
    font-weight: 500;
  }}

  .section-label {{
    font-size: 11px;
    font-weight: 700;
    color: var(--burgundy);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }}

  .section-label::after {{
    content: '';
    flex: 1;
    height: 2px;
    background: var(--stripe-pink);
  }}

  .form-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 4px;
  }}

  .form-group {{
    display: flex;
    flex-direction: column;
    gap: 7px;
  }}

  .form-group.full {{ grid-column: 1 / -1; }}

  label {{
    font-size: 11px;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }}

  input, textarea, select {{
    background: var(--surface);
    border: 2px solid var(--border);
    color: var(--text);
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s;
    outline: none;
    width: 100%;
  }}

  input::placeholder, textarea::placeholder {{
    color: var(--muted2);
  }}

  input:focus, textarea:focus, select:focus {{
    border-color: var(--navy);
  }}

  select option {{ background: #fff0f5; }}

  textarea {{ resize: vertical; min-height: 95px; }}

  .divider {{
    border: none;
    border-top: 2px dashed var(--stripe-pink);
    margin: 28px 0;
  }}

  .submit-btn {{
    width: 100%;
    padding: 14px;
    background: var(--navy);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 28px;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.3px;
    box-shadow: 4px 4px 0px var(--burgundy);
  }}

  .submit-btn:hover {{
    background: #0d0d3d;
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px var(--burgundy);
  }}

  .anon-note {{
    text-align: center;
    font-size: 12px;
    color: var(--muted);
    margin-top: 12px;
    font-weight: 500;
  }}

  .search-wrap {{
    display: flex;
    gap: 10px;
    margin-bottom: 36px;
  }}

  .search-wrap input {{
    flex: 1;
    font-size: 15px;
    padding: 14px 18px;
    background: #fff;
    border: 2px solid var(--burgundy);
  }}

  .search-wrap button {{
    padding: 14px 26px;
    background: var(--navy);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    box-shadow: 3px 3px 0px var(--burgundy);
  }}

  .search-wrap button:hover {{
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0px var(--burgundy);
  }}

  .stat-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 28px;
  }}

  .stat-card {{
    background: #fff;
    border: 2px solid var(--burgundy);
    border-radius: 14px;
    padding: 20px;
    box-shadow: 4px 4px 0px var(--red);
  }}

  .stat-label {{
    font-size: 10px;
    font-weight: 700;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 10px;
  }}

  .stat-val {{
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--burgundy);
  }}

  .stat-val.accent {{ color: var(--navy); }}

  .entry-card {{
    background: #fff;
    border: 2px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 12px;
    transition: all 0.2s;
    box-shadow: 4px 4px 0px var(--stripe-pink);
  }}

  .entry-card:hover {{
    border-color: var(--burgundy);
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px var(--red);
  }}

  .entry-top {{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
  }}

  .position-title {{
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--burgundy);
  }}

  .entry-meta {{
    font-size: 13px;
    color: var(--muted);
    font-weight: 500;
  }}

  .salary-pill {{
    background: var(--navy);
    color: #fff;
    border-radius: 10px;
    padding: 7px 16px;
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
    font-family: 'Playfair Display', serif;
    box-shadow: 2px 2px 0px var(--burgundy);
  }}

  .tags {{
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 12px;
  }}

  .tag {{
    font-size: 12px;
    font-weight: 600;
    padding: 4px 11px;
    border-radius: 20px;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--burgundy);
  }}

  .tag.special {{
    background: var(--navy);
    color: #fff;
    border-color: var(--navy);
  }}

  .comment-box {{
    margin-top: 14px;
    padding: 12px 16px;
    border-left: 4px solid var(--red);
    background: var(--surface);
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.7;
    font-style: italic;
    border-radius: 0 8px 8px 0;
  }}

  .success-box {{
    background: #fff;
    border: 2px solid var(--burgundy);
    border-radius: 20px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: 6px 6px 0px var(--red);
  }}

  .success-icon {{
    font-size: 56px;
    margin-bottom: 16px;
  }}

  .success-box h2 {{
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--burgundy);
    letter-spacing: -0.5px;
  }}

  .success-box p {{
    color: var(--muted);
    font-size: 15px;
    margin-bottom: 32px;
    line-height: 1.6;
  }}

  .empty-state {{
    background: #fff;
    border: 2px solid var(--border);
    border-radius: 16px;
    padding: 60px 40px;
    text-align: center;
    box-shadow: 4px 4px 0px var(--stripe-pink);
  }}

  .company-header {{
    background: #fff;
    border: 2px solid var(--burgundy);
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 0px var(--red);
  }}

  .company-header h1 {{
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -1px;
    color: var(--burgundy);
    margin-bottom: 4px;
  }}

  .back-link {{
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 20px;
    transition: color 0.2s;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
  }}

  .back-link:hover {{ color: var(--navy); text-shadow: none; }}

  @media (max-width: 560px) {{
    .form-grid {{ grid-template-columns: 1fr; }}
    .stat-grid {{ grid-template-columns: 1fr; }}
    .hero h1 {{ font-size: 42px; }}
    nav {{ padding: 16px 20px; }}
    .page {{ padding: 40px 16px; }}
  }}
</style>
</head>
<body>
<nav>
  <a href="/" class="logo">kuli<em>ss</em></a>
  <div>
    <a href="/search">şirket ara</a>
    <a href="/form">maaş paylaş</a>
  </div>
</nav>
<div class="page">
  {content}
</div>
</body>
</html>"""


@app.get("/", response_class=HTMLResponse)
def home():
    content = """
    <div class="hero">
      <div class="hero-tag">✦ tamamen anonim</div>
      <h1>vitrini değil,<br><em>içini</em> gösterir.</h1>
      <p>Türkiye'deki şirketlerin gerçek maaşları ve çalışma koşulları. Kimse bilmez, herkes öğrenir.</p>
      <div class="btn-row">
        <a href="/form" class="btn btn-navy">↑ maaş paylaş</a>
        <a href="/search" class="btn btn-white">şirket ara →</a>
      </div>
    </div>
    """
    return base_html(content)


@app.get("/form", response_class=HTMLResponse)
def salary_form():
    content = """
    <div class="page-title">maaş bilgisi <em>ekle</em></div>
    <div class="page-sub">Tüm veriler anonimdir. Kişisel hiçbir bilgi saklanmaz.</div>

    <div class="card-wrap">
      <form action="/submit-salary" method="post">

        <div class="section-label">şirket bilgileri</div>
        <div class="form-grid">
          <div class="form-group">
            <label>Şirket Adı *</label>
            <input name="company_name" placeholder="ör. Trendyol" required>
          </div>
          <div class="form-group">
            <label>Sektör *</label>
            <input name="sector" placeholder="ör. E-ticaret" required>
          </div>
          <div class="form-group">
            <label>Şehir *</label>
            <input name="city" placeholder="ör. İstanbul" required>
          </div>
          <div class="form-group">
            <label>Çalışma Şekli *</label>
            <select name="work_type" required>
              <option value="Ofis">Ofis</option>
              <option value="Hibrit">Hibrit</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <hr class="divider">
        <div class="section-label">pozisyon</div>
        <div class="form-grid">
          <div class="form-group full">
            <label>Pozisyon *</label>
            <input name="position" placeholder="ör. Senior Backend Developer" required>
          </div>
          <div class="form-group">
            <label>Deneyim (yıl) *</label>
            <input name="experience_years" type="number" step="0.5" min="0" placeholder="ör. 3" required>
          </div>
        </div>

        <hr class="divider">
        <div class="section-label">maaş</div>
        <div class="form-grid">
          <div class="form-group">
            <label>Maaş Miktarı *</label>
            <input name="salary_amount" type="number" placeholder="ör. 85000" required>
          </div>
          <div class="form-group">
            <label>Para Birimi</label>
            <select name="currency">
              <option value="TRY">TRY ₺</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select>
          </div>
          <div class="form-group">
            <label>Periyot</label>
            <select name="salary_period">
              <option value="Aylık">Aylık</option>
              <option value="Yıllık">Yıllık</option>
              <option value="Saatlik">Saatlik</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tür</label>
            <select name="salary_type">
              <option value="Net">Net</option>
              <option value="Brüt">Brüt</option>
            </select>
          </div>
        </div>

        <hr class="divider">
        <div class="section-label">ekstralar</div>
        <div class="form-grid">
          <div class="form-group full">
            <label>Yan Haklar</label>
            <input name="benefits" placeholder="ör. Yemek kartı, özel sağlık sigortası, servis">
          </div>
          <div class="form-group full">
            <label>Şirket Hakkında Yorum</label>
            <textarea name="comment" placeholder="Çalışma ortamı, kültür, iş-yaşam dengesi hakkında ne düşünüyorsun?"></textarea>
          </div>
        </div>

        <button type="submit" class="submit-btn">anonim olarak gönder →</button>
        <p class="anon-note">🔒 ip adresi veya kişisel bilgi saklanmaz</p>
      </form>
    </div>
    """
    return base_html(content)


@app.post("/submit-salary", response_class=HTMLResponse)
def submit_salary_form(
    company_name: str = Form(...),
    sector: str = Form(...),
    city: str = Form(...),
    position: str = Form(...),
    experience_years: float = Form(...),
    work_type: str = Form(...),
    salary_amount: float = Form(...),
    salary_period: str = Form(...),
    salary_type: str = Form(...),
    currency: str = Form(...),
    benefits: str = Form(""),
    comment: str = Form(""),
    db: Session = Depends(get_db)
):
    new_report = models.SalaryReport(
        company_name=company_name,
        sector=sector,
        city=city,
        position=position,
        experience_years=experience_years,
        work_type=work_type,
        salary_amount=salary_amount,
        salary_period=salary_period,
        salary_type=salary_type,
        currency=currency,
        benefits=benefits or None,
        comment=comment or None
    )
    db.add(new_report)
    db.commit()

    safe_company = html.escape(company_name)
    content = f"""
    <div class="success-box">
      <div class="success-icon">♡</div>
      <h2>teşekkürler!</h2>
      <p><strong>{safe_company}</strong> için maaş verisi başarıyla eklendi.<br>Bu katkı birinin hayatını kolaylaştırabilir.</p>
      <div class="btn-row" style="justify-content:center;">
        <a href="/search" class="btn btn-navy">şirket ara →</a>
        <a href="/form" class="btn btn-white">yeni giriş</a>
      </div>
    </div>
    """
    return base_html(content)


@app.get("/search", response_class=HTMLResponse)
def search_page():
    content = """
    <div class="page-title">şirket <em>sorgula</em></div>
    <div class="page-sub">Bir yere girmeden önce gerçeği öğren.</div>

    <div class="card-wrap">
      <form action="/search-company" method="get">
        <div class="search-wrap">
          <input name="company_name" placeholder="Şirket adı yazın..." required autofocus>
          <button type="submit">sorgula</button>
        </div>
      </form>
    </div>
    """
    return base_html(content)


@app.get("/search-company", response_class=HTMLResponse)
def search_result(company_name: str, db: Session = Depends(get_db)):
    safe_name = html.escape(company_name)

    reports = db.query(models.SalaryReport).filter(
        models.SalaryReport.company_name.ilike(f"%{company_name}%")
    ).order_by(models.SalaryReport.created_at.desc()).all()

    if not reports:
        content = f"""
        <a href="/search" class="back-link">← geri dön</a>
        <div class="empty-state">
          <div style="font-size:44px;margin-bottom:16px;">🔍</div>
          <p style="font-size:16px;font-weight:700;color:#6b0f2a;margin-bottom:8px;">"{safe_name}" için henüz veri yok.</p>
          <p style="color:#8b3a5a;margin-bottom:28px;">İlk veriyi sen ekleyebilirsin.</p>
          <a href="/form" class="btn btn-navy">veri ekle →</a>
        </div>
        """
        return base_html(content)

    stats = db.query(
        func.count(models.SalaryReport.id),
        func.avg(models.SalaryReport.salary_amount),
        func.min(models.SalaryReport.salary_amount),
        func.max(models.SalaryReport.salary_amount)
    ).filter(
        models.SalaryReport.company_name.ilike(f"%{company_name}%")
    ).one()

    count, avg_sal, min_sal, max_sal = stats

    cards = ""
    for r in reports:
        safe_position = html.escape(r.position)
        safe_benefits = html.escape(r.benefits) if r.benefits else None
        safe_comment = html.escape(r.comment) if r.comment else None

        exp_text = f"{int(r.experience_years)} yıl" if r.experience_years == int(r.experience_years) else f"{r.experience_years} yıl"
        currency_symbol = {{"TRY": "₺", "USD": "$", "EUR": "€"}}.get(r.currency, r.currency)
        salary_formatted = f"{{int(r.salary_amount):,}}".replace(",", ".")

        benefits_html = f'<div class="tags"><span class="tag special">✦ {{safe_benefits}}</span></div>' if safe_benefits else ""
        comment_html = f'<div class="comment-box">"{{safe_comment}}"</div>' if safe_comment else ""

        cards += f"""
        <div class="entry-card">
          <div class="entry-top">
            <div>
              <div class="position-title">{{safe_position}}</div>
              <div class="entry-meta">{{html.escape(r.sector)}} · {{html.escape(r.city)}}</div>
            </div>
            <div class="salary-pill">{{currency_symbol}}{{salary_formatted}}</div>
          </div>
          <div class="tags">
            <span class="tag">{{html.escape(r.work_type)}}</span>
            <span class="tag">{{exp_text}} deneyim</span>
            <span class="tag">{{html.escape(r.salary_period)}}</span>
            <span class="tag">{{html.escape(r.salary_type)}}</span>
            <span class="tag">{{html.escape(r.city)}}</span>
          </div>
          {{benefits_html}}
          {{comment_html}}
        </div>
        """

    avg_fmt = f"₺{{int(avg_sal):,}}".replace(",", ".")
    range_fmt = f"₺{{int(min_sal):,}} – ₺{{int(max_sal):,}}".replace(",", ".")

    content = f"""
    <a href="/search" class="back-link">← yeni arama</a>
    <div class="company-header">
      <h1>{{safe_name}}</h1>
      <div style="color:var(--muted);font-size:14px;font-weight:500;">{{count}} anonim kayıt</div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">kayıt sayısı</div>
        <div class="stat-val">{{count}}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">ortalama maaş</div>
        <div class="stat-val accent">{{avg_fmt}}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">maaş aralığı</div>
        <div class="stat-val" style="font-size:17px;">{{range_fmt}}</div>
      </div>
    </div>

    {{cards}}
    """
    return base_html(content)


@app.get("/api/reports", response_model=list[schemas.SalaryReportResponse])
def get_all_reports(db: Session = Depends(get_db)):
    return db.query(models.SalaryReport).order_by(
        models.SalaryReport.created_at.desc()
    ).all()