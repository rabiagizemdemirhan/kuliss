from pydantic import BaseModel, ConfigDict, field_validator
from datetime import datetime
from typing import Optional

class SalaryReportCreate(BaseModel):
    company_name: str
    sector: str
    city: str
    position: str
    experience_years: float
    work_type: str
    salary_amount: float
    salary_period: str = "Aylık"
    salary_type: str = "Net"
    currency: str = "TRY"
    benefits: Optional[str] = None
    comment: Optional[str] = None

    @field_validator("benefits", "comment", mode="before")
    @classmethod
    def empty_str_to_none(cls, v):
        if v == "":
            return None
        return v

class SalaryReportResponse(SalaryReportCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)