import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  accept?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ImageUpload({
  onUpload,
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  accept = "image/*",
  className,
  children,
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => {
      return file.type.startsWith('image/') && file.size <= maxFileSize;
    });
    
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.slice(0, maxFiles - uploadedFiles.length);
    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    onUpload(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onUpload(newFiles);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragOver ? "border-brand-red bg-red-50" : "border-gray-300 hover:border-brand-red",
          uploadedFiles.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={uploadedFiles.length < maxFiles ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploadedFiles.length >= maxFiles}
        />
        
        {children || (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">
              Glissez vos images ici ou cliquez pour parcourir
            </p>
            <p className="text-sm text-gray-500">
              {maxFiles} fichiers maximum, {Math.round(maxFileSize / 1024 / 1024)}MB chacun
            </p>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Fichiers sélectionnés:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center">
                <Image className="h-5 w-5 text-brand-red mr-2" />
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({Math.round(file.size / 1024)}KB)
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
