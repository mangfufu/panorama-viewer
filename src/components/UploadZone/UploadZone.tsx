import { useFileUpload } from '../../hooks/useFileUpload';
import { PanoramaConfig } from '../../types/panorama';
import './UploadZone.css';

interface UploadZoneProps {
  onUpload: (panorama: PanoramaConfig) => void;
}

export const UploadZone = ({ onUpload }: UploadZoneProps) => {
  const { isUploading, progress, handleFileChange, handleDrop, handleDragOver } =
    useFileUpload({
      onUpload,
      onError: (error) => {
        alert(error);
      },
    });

  return (
    <div
      className="upload-zone"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="file-upload"
        className="upload-zone__input"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label htmlFor="file-upload" className="upload-zone__label">
        {isUploading ? (
          <div className="upload-zone__progress">
            <div
              className="upload-zone__progress-bar"
              style={{ width: `${progress}%` }}
            />
            <span>处理中... {progress}%</span>
          </div>
        ) : (
          <>
            <svg
              className="upload-zone__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="upload-zone__text">
              拖拽全景图片到此处，或点击选择文件
            </span>
            <span className="upload-zone__hint">
              支持等距矩形投影图片（推荐 2:1 比例）
            </span>
          </>
        )}
      </label>
    </div>
  );
};
