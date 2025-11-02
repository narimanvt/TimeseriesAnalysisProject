from groq import Groq
from typing import Dict, List
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root (2 levels up from src/utils/)
env_path = Path(__file__).parent.parent.parent / '.env'
load_dotenv(env_path)

# API key from .env file or environment variable
GROQ_API_KEY = os.getenv('GROQ_API_KEY', '')


def get_ai_feedback(autocorrelations: List[Dict[str, float]], trend_coefficient: float) -> str:
    """
    Get AI feedback based on autocorrelation values (lag 1-5) and trend coefficient
    
    Args:
        autocorrelations: List of dicts with 'lag' and 'value' keys for lags 1-5
        trend_coefficient: The trend coefficient (â)
    
    Returns:
        AI-generated feedback in Persian/Farsi
    """
    if not GROQ_API_KEY:
        return "لطفاً API key را تنظیم کنید."
    
    try:
        # Extract lag values for prompt
        lag_dict = {}
        for ac in autocorrelations:
            # Handle both dict-like and TypedDict formats
            lag = ac['lag'] if 'lag' in ac else (ac.get('lag') if isinstance(ac, dict) else None)
            value = ac['value'] if 'value' in ac else (ac.get('value') if isinstance(ac, dict) else None)
            if lag and lag <= 5:
                lag_dict[f"lag{lag}"] = value
        
        # Create prompt in Persian
        prompt = f"""شما یک تحلیل‌گر متخصص در تحلیل سری‌های زمانی هستید. بر اساس داده‌های زیر، تحلیل جامعی ارائه دهید:

ضرایب خودهمبستگی:
- lag1: {lag_dict.get('lag1', 0):.4f}
- lag2: {lag_dict.get('lag2', 0):.4f}
- lag3: {lag_dict.get('lag3', 0):.4f}
- lag4: {lag_dict.get('lag4', 0):.4f}
- lag5: {lag_dict.get('lag5', 0):.4f}

ضریب روند (â): {trend_coefficient:.4f}

لطفاً تحلیل کوتاه و مختصر در مورد این سری زمانی ارائه دهید که شامل:
1. تفسیر ضرایب خودهمبستگی و الگوی آن‌ها
2. تفسیر ضریب روند و جهت آن
3. نتیجه‌گیری کوتاه و مختصر در مورد رفتار سری زمانی

پاسخ خود را به فارسی و به صورت حرفه‌ای ارائه دهید. فقط پاسخ خود را برای من بنویسید و هیچگونه توضیحی بیشتر ننویسید."""
        
        client = Groq(api_key=GROQ_API_KEY)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_completion_tokens=1024,
            top_p=1,
            stream=False
        )
        
        feedback = completion.choices[0].message.content
        return feedback if feedback else "خطا در تولید بازخورد."
        
    except Exception as e:
        return f"خطا در اتصال به API: {str(e)}"

