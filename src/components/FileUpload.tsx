import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paperclip, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile?: File;
  onClear: () => void;
}

export function FileUpload({ onFileSelect, selectedFile, onClear }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false
  });

  if (selectedFile) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F46F25]/5 rounded-xl border border-[#F46F25]/10">
        <span className="text-sm text-[#F46F25] truncate max-w-[120px]">
          {selectedFile.name}
        </span>
        <button
          onClick={onClear}
          className="p-1.5 hover:bg-[#F46F25]/10 rounded-lg transition-colors duration-300"
        >
          <X className="w-4 h-4 text-[#F46F25]" />
        </button>
      </div>
    );
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button
        type="button"
        className={`p-2 rounded-lg transition-colors duration-300 ${
          isDragActive 
            ? 'bg-[#F46F25]/10 text-[#F46F25]' 
            : 'text-[#7F7F7F] hover:text-[#F46F25] hover:bg-[#F46F25]/5'
        }`}
      >
        <Paperclip className="w-5 h-5" />
      </button>
    </div>
  );
}