import { Card } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { AnalysisResults } from '../utils/types';

interface ResultsDisplayProps {
  results: AnalysisResults;
  isDarkMode: boolean;
}

export default function ResultsDisplay({ results, isDarkMode }: ResultsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Autocorrelation Card */}
      <Card className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          ضرایب خودهمبستگی
        </h3>
        <div className="space-y-3">
          {results.autocorrelations.map((ac) => (
            <div key={ac.lag} className="flex justify-between items-center">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                تأخیر {ac.lag}
              </span>
              <span className={`font-mono ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {ac.value.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Trend Card */}
      <Card className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          تحلیل روند
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ضریب روند (â)
            </span>
            <span className={`font-mono ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
              {results.trendCoefficient.toFixed(4)}
            </span>
          </div>
          <div className={`
            flex items-center gap-3 p-4 rounded-lg
            ${results.hasTrend
              ? (isDarkMode ? 'bg-blue-900/30 border border-blue-700' : 'bg-blue-50 border border-blue-200')
              : (isDarkMode ? 'bg-gray-700/30 border border-gray-600' : 'bg-gray-100 border border-gray-300')
            }
          `}>
            {results.hasTrend ? (
              results.trendCoefficient > 0 ? (
                <TrendingUp className="w-5 h-5 text-blue-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-blue-500" />
              )
            ) : (
              <div className={`w-5 h-5 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`} />
            )}
            <span className={results.hasTrend 
              ? 'text-blue-600 dark:text-blue-400' 
              : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
            }>
              {results.hasTrend ? 'روند شناسایی شد' : 'روند شناسایی نشد'}
            </span>
          </div>
          
          {/* AI Feedback Section */}
          {results.aiFeedback && (
            <div className={`
              mt-4 p-4 rounded-lg border
              ${isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}
            `}>
              <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                تحلیل هوشمند
              </h4>
              <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {results.aiFeedback}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
