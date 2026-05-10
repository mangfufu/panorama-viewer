import { useState, useCallback } from 'react';
import { readFileAsDataURL, getImageDimensions, isImageFile } from '../utils/file';
import { generateId } from '../utils/file';
import { PanoramaConfig } from '../types/panorama';

interface UseFileUploadOptions {
  onUpload?: (panorama: PanoramaConfig) => void;
  onError?: (error: string) => void;
}

export const useFileUpload = ({ onUpload, onError }: UseFileUploadOptions = {}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const processFile = useCallback(
    async (file: File) => {
      if (!isImageFile(file)) {
        onError?.('请上传图片文件');
        return;
      }

      setIsUploading(true);
      setProgress(0);

      try {
        setProgress(10);
        const dataUrl = await readFileAsDataURL(file);
        
        setProgress(30);
        const dimensions = await getImageDimensions(file);
        
        setProgress(60);

        setProgress(90);

        const panorama: PanoramaConfig = {
          id: generateId(),
          title: file.name.replace(/\.[^/.]+$/, ''),
          type: 'equirectangular',
          panorama: dataUrl,
        };

        setProgress(100);
        onUpload?.(panorama);
      } catch (error) {
        console.error('File processing failed:', error);
        onError?.('图片处理失败');
      } finally {
        setIsUploading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    [onUpload, onError]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        processFile(file);
        event.target.value = '';
      }
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return {
    isUploading,
    progress,
    processFile,
    handleFileChange,
    handleDrop,
    handleDragOver,
  };
};
