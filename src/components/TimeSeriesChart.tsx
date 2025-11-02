import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './ui/card';
import type { TimeSeriesData, AnalysisResults } from '../utils/types';

interface TimeSeriesChartProps {
  data: TimeSeriesData;
  results: AnalysisResults | null;
  isDarkMode: boolean;
}

export default function TimeSeriesChart({ data, results, isDarkMode }: TimeSeriesChartProps) {
  const timeSeriesData = data.values.map((value, index) => ({
    index: index + 1,
    value: value,
    label: data.labels[index] || `${index + 1}`,
  }));

  const autocorrelationData = results?.autocorrelations.map((ac) => ({
    lag: `تأخیر ${ac.lag}`,
    value: ac.value,
  })) || [];

  const chartColors = {
    line: isDarkMode ? '#60a5fa' : '#3b82f6',
    bar: isDarkMode ? '#60a5fa' : '#3b82f6',
    grid: isDarkMode ? '#374151' : '#e5e7eb',
    text: isDarkMode ? '#9ca3af' : '#6b7280',
  };

  return (
    <div className="space-y-6">
      {/* Time Series Chart */}
      <Card className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className={`mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          نمودار سری زمانی
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis 
              dataKey="index" 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={chartColors.text}
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDarkMode ? '#f3f4f6' : '#111827',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartColors.line} 
              strokeWidth={2}
              dot={{ fill: chartColors.line, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Autocorrelation Chart */}
      {results && (
        <Card className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`mb-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            نمودار خودهمبستگی
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={autocorrelationData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="lag" 
                stroke={chartColors.text}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={chartColors.text}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: isDarkMode ? '#f3f4f6' : '#111827',
                }}
              />
              <Bar 
                dataKey="value" 
                fill={chartColors.bar}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
