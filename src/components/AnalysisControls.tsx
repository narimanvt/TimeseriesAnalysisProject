import { Button } from './ui/button';
import { Calculator } from 'lucide-react';

interface AnalysisControlsProps {
  onCalculate: () => void;
  isDarkMode: boolean;
  isCalculating: boolean;
}

export default function AnalysisControls({ onCalculate, isDarkMode, isCalculating }: AnalysisControlsProps) {
  return (
    <div className="flex justify-center">
      <Button
        onClick={onCalculate}
        disabled={isCalculating}
        className={`
          rounded-lg px-8 py-5 transition-all duration-200
          ${isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
      >
        <Calculator className="w-4 h-4 ml-2" />
        محاسبه
      </Button>
    </div>
  );
}
