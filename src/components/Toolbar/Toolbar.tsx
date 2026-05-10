import { useState } from 'react';
import './Toolbar.css';

interface ToolbarProps {
  onScreenshot: () => void;
  onFullscreen: () => void;
  onAutoRotate: () => void;
  onStopAutoRotate: () => void;
  onResetView: () => void;
}

export const Toolbar = ({
  onScreenshot,
  onFullscreen,
  onAutoRotate,
  onStopAutoRotate,
  onResetView,
}: ToolbarProps) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleToggleRotate = () => {
    if (isRotating) {
      onStopAutoRotate();
    } else {
      onAutoRotate();
    }
    setIsRotating(!isRotating);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__button"
        onClick={onResetView}
        title="重置视角"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button
        className="toolbar__button"
        onClick={onFullscreen}
        title="全屏切换"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
      <button
        className={`toolbar__button ${isRotating ? 'toolbar__button--active' : ''}`}
        onClick={handleToggleRotate}
        title={isRotating ? '停止旋转' : '自动旋转'}
      >
        {isRotating ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
        )}
      </button>
      <div className="toolbar__divider" />
      <button
        className="toolbar__button"
        onClick={onScreenshot}
        title="截图导出"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </button>
    </div>
  );
};
