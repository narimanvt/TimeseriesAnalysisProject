"""
Flask API server for time series analysis
"""
import sys
from pathlib import Path

# Add src/utils directory to path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir / 'src' / 'utils'))

from flask import Flask, request, jsonify
from flask_cors import CORS
from timeSeriesAnalysis import (
    analyze_time_series,
    parse_csv,
    TimeSeriesData,
    AnalysisResults
)
from AI_engine import get_ai_feedback

app = Flask(__name__)
CORS(app)  # Enable CORS for React app


@app.route('/api/parse-csv', methods=['POST'])
def parse_csv_endpoint():
    """Parse CSV content"""
    try:
        data = request.get_json()
        content = data.get('content', '')
        
        if not content:
            return jsonify({'error': 'No content provided'}), 400
        
        result = parse_csv(content)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/analyze', methods=['POST'])
def analyze_endpoint():
    """Analyze time series data"""
    try:
        data = request.get_json()
        values = data.get('values', [])
        
        if not values:
            return jsonify({'error': 'No values provided'}), 400
        
        result = analyze_time_series(values)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/ai-feedback', methods=['POST'])
def ai_feedback_endpoint():
    """Get AI feedback for analysis results"""
    try:
        data = request.get_json()
        autocorrelations = data.get('autocorrelations', [])
        trend_coefficient = data.get('trendCoefficient', 0)
        
        if not autocorrelations:
            return jsonify({'error': 'No autocorrelations provided'}), 400
        
        feedback = get_ai_feedback(autocorrelations, trend_coefficient)
        return jsonify({'feedback': feedback})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(debug=True, port=5000)

