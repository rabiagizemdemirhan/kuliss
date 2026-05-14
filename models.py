from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone
from database import Base

class SalaryReport(Base):
    __tablename__ = "salary_reports"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True)
    sector = Column(String)
    city = Column(String)
    position = Column(String, index=True)
    experience_years = Column(Float)
    work_type = Column(String)
    salary_amount = Column(Float)
    salary_period = Column(String)
    salary_type = Column(String)
    currency = Column(String, default="TRY")
    benefits = Column(String, nullable=True)
    comment = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))