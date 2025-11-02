# Python API Setup

This project uses Python for time series analysis instead of TypeScript.

## Setup Instructions

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the Python API server:**
   ```bash
   python api_server.py
   ```
   The server will run on `http://localhost:5000`

3. **Start the React development server:**
   ```bash
   npm run dev
   ```

## File Structure

- `src/utils/timeSeriesAnalysis.py` - Python implementation of time series analysis functions
- `src/utils/types.ts` - TypeScript type definitions (for frontend use)
- `api_server.py` - Flask API server that exposes the Python functions
- `requirements.txt` - Python dependencies

## API Endpoints

- `POST /api/parse-csv` - Parse CSV content
  - Request body: `{ "content": "..." }`
  - Response: `{ "values": [...], "labels": [...] }`

- `POST /api/analyze` - Analyze time series data
  - Request body: `{ "values": [...] }`
  - Response: `{ "autocorrelations": [...], "trendCoefficient": ..., "hasTrend": ... }`

- `GET /api/health` - Health check endpoint

