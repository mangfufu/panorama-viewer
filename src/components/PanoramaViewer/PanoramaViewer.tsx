import { useEffect, useState, useCallback } from 'react';
import { usePannellum } from '../../hooks/usePannellum';
import { useScreenshot } from '../../hooks/useScreenshot';
import { PanoramaConfig } from '../../types/panorama';
import { Toolbar } from '../Toolbar/Toolbar';
import './PanoramaViewer.css';

interface PanoramaViewerProps {
  panorama: PanoramaConfig;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

export const PanoramaViewer = ({ panorama, onLoad, onError }: PanoramaViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { captureScreenshot } = useScreenshot();

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('Panorama error:', error);
    onError?.(error);
  }, []);

  const {
    containerRef,
    getViewer,
    toggleFullscreen,
    startAutoRotate,
    stopAutoRotate,
    lookAt,
  } = usePannellum({
    panorama,
    onLoad: handleLoad,
    onError: handleError,
  });

  useEffect(() => {
    setIsLoading(true);
  }, [panorama.id]);

  const handleResetView = () => {
    lookAt(0, 0, 100, false);
  };

  const handleScreenshot = () => {
    const viewer = getViewer();
    const filename = `${panorama.title || 'panorama'}-screenshot.png`;
    captureScreenshot(viewer, filename);
  };

  const handleFullscreen = () => {
    toggleFullscreen();
  };

  const handleAutoRotate = () => {
    startAutoRotate(-2);
  };

  const handleStopAutoRotate = () => {
    stopAutoRotate();
  };

  return (
    <div className="panorama-viewer">
      {isLoading && (
        <div className="panorama-viewer__loading">
          <div className="panorama-viewer__spinner" />
          <span>加载全景中...</span>
        </div>
      )}
      <div ref={containerRef} className="panorama-viewer__canvas" />
      <Toolbar
        onScreenshot={handleScreenshot}
        onFullscreen={handleFullscreen}
        onAutoRotate={handleAutoRotate}
        onStopAutoRotate={handleStopAutoRotate}
        onResetView={handleResetView}
      />
    </div>
  );
};
