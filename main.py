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

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def base_html(content: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Kuliss</title>
      <style>
        body {{
          margin: 0;
          font-family: Arial, sans-serif;
          background:
            repeating-linear-gradient(
              90deg,
              #ff0033 0px,
              #ff0033 48px,
              #ff8db2 48px,
              #ff8db2 96px
            );
          min-height: 100vh;
        }}

        nav {{
          background: #ff0033;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #5c0017;
        }}

        nav a {{
          color: white;
          text-decoration: none;
          margin-left: 20px;
          font-weight: bold;
        }}

        .logo {{
          font-size: 28px;
          font-weight: 900;
        }}

        .container {{
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          box-sizing: border-box;
        }}

        .card {{
          background: #f6f0f2;
          border: 2px solid #5c0017;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 8px 8px 0 #ff0033;
        }}

        input,
        textarea,
        select {{
          width: 100%;
          padding: 14px;
          margin-top: 12px;
          border-radius: 14px;
          border: 2px solid #ff8db2;
          box-sizing: border-box;
        }}

        button {{
          width: 100%;
          padding: 16px;
          margin-top: 20px;
          background: #1a1a5e;
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: bold;
          cursor: pointer;
        }}

        .salary-card {{
          background: #ffe5ef;
          border: 2px solid #ff8db2;
          padding: 20px;
          border-radius: 18px;
          margin-top: 18px;
        }}

        .salary {{
          background: #1a1a5e;
          color: white;
          padding: 10px 16px;
          border-radius: 12px;
          display: inline-block;
          margin-top: 12px;
          font-weight: bold;
        }}
      </style>
    </head>
    <body>
      <nav>
        <div class="logo">kuliss</div>

        <div>
          <a href="/">anasayfa</a>
          <a href="/form">maaş paylaş</a>
          <a href="/search">şirket ara</a>
        </div>
      </nav>

      <div class="container">
        {content}
      </div>
    </body>
    </html>
    """


@app.get("/", response_class=HTMLResponse)
def home():
    content = """
    <div class="card">
      <h1>vitrini değil, içini gösterir.</h1>

      <p>
        Türkiye'deki şirketlerin gerçek maaşlarını anonim olarak paylaş.
      </p>

      <br>

      <a href="/form">
        <button>maaş paylaş</button>
      </a>
    </div>
    """

    return base_html(content)


@app.get("/form", response_class=HTMLResponse)
def form_page():
    content = """
    <div class="card">
      <h1>maaş paylaş</h1>

      <form action="/submit-salary" method="post">

        <input
          name="company_name"
          placeholder="Şirket adı"
          required
        />

        <input
          name="sector"
          placeholder="Sektör"
          required
        />

        <input
          name="city"
          placeholder="Şehir"
          required
        />

        <input
          name="position"
          placeholder="Pozisyon"
          required
        />

        <input
          type="number"
          name="experience_years"
          placeholder="Deneyim yılı"
          required
        />

        <select name="work_type">
          <option>Ofis</option>
          <option>Hibrit</option>
          <option>Remote</option>
        </select>

        <input
          type="number"
          name="salary_amount"
          placeholder="Maaş"
          required
        />

        <select name="salary_period">
          <option>Aylık</option>
          <option>Yıllık</option>
        </select>

        <select name="salary_type">
          <option>Net</option>
          <option>Brüt</option>
        </select>

        <select name="currency">
          <option>TRY</option>
          <option>USD</option>
          <option>EUR</option>
        </select>

        <textarea
          name="benefits"
          placeholder="Yan haklar"
        ></textarea>

        <textarea
          name="comment"
          placeholder="Yorum"
        ></textarea>

        <button type="submit">
          anonim olarak gönder
        </button>

      </form>
    </div>
    """

    return base_html(content)


@app.post("/submit-salary", response_class=HTMLResponse)
def submit_salary(
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

    content = f"""
    <div class="card">
      <h1>başarıyla paylaşıldı ♡</h1>

      <p>
        {html.escape(company_name)} verisi başarıyla eklendi.
      </p>

      <br>

      <a href="/search">
        <button>şirket ara</button>
      </a>
    </div>
    """

    return base_html(content)


@app.get("/search", response_class=HTMLResponse)
def search_page():
    content = """
    <div class="card">
      <h1>şirket ara</h1>

      <form action="/search-company" method="get">

        <input
          name="company_name"
          placeholder="Şirket adı yaz..."
          required
        />

        <button type="submit">
          ara
        </button>

      </form>
    </div>
    """

    return base_html(content)


@app.get("/search-company", response_class=HTMLResponse)
def search_company(
    company_name: str,
    db: Session = Depends(get_db)
):
    reports = (
        db.query(models.SalaryReport)
        .filter(
            models.SalaryReport.company_name.ilike(
                f"%{company_name}%"
            )
        )
        .order_by(models.SalaryReport.created_at.desc())
        .all()
    )

    if not reports:
        return base_html("""
        <div class="card">
          <h1>veri bulunamadı</h1>
        </div>
        """)

    cards = ""

    for report in reports:
        cards += f"""
        <div class="salary-card">

          <h2>{html.escape(report.position)}</h2>

          <p>
            {html.escape(report.company_name)}
          </p>

          <p>
            {html.escape(report.city)} •
            {html.escape(report.work_type)}
          </p>

          <div class="salary">
            {int(report.salary_amount):,} {report.currency}
          </div>

        </div>
        """

    return base_html(cards)


# API

@app.post(
    "/salary-reports",
    response_model=schemas.SalaryReportResponse
)
def create_salary_report(
    report: schemas.SalaryReportCreate,
    db: Session = Depends(get_db)
):
    new_report = models.SalaryReport(
        **report.model_dump()
    )

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


@app.get(
    "/salary-reports",
    response_model=list[schemas.SalaryReportResponse]
)
def get_salary_reports(
    db: Session = Depends(get_db)
):
    return (
        db.query(models.SalaryReport)
        .order_by(models.SalaryReport.created_at.desc())
        .all()
    )
