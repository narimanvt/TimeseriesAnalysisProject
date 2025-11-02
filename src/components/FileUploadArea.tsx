import { Upload } from 'lucide-react';
import { useRef } from 'react';

interface FileUploadAreaProps {
  onFileUpload: (file: File) => void;
  isDarkMode: boolean;
}

export default function FileUploadArea({ onFileUpload, isDarkMode }: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl p-16 text-center cursor-pointer
        transition-all duration-200 hover:border-blue-400
        ${isDarkMode 
          ? 'border-gray-700 bg-gray-800/30 hover:bg-gray-800/50' 
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }
      `}
    >
      <div className="flex flex-col items-center gap-4">
        <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Upload className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
        <div>
          <p className={`mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            فایل سری زمانی خود را بارگذاری کنید (CSV یا Excel)
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            فقط فایل‌های سری زمانی پشتیبانی می‌شوند
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
