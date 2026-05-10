import { useEffect, useRef, useCallback } from 'react';
import { PanoramaConfig } from '../types/panorama';

declare const pannellum: {
  viewer(container: HTMLElement, config: any): any;
};

interface UsePannellumOptions {
  panorama: PanoramaConfig;
  onLoad?: () => void;
  onError?: (error: string) => void;
  onSceneChange?: (sceneId: string) => void;
}

export const usePannellum = ({
  panorama,
  onLoad,
  onError,
  onSceneChange,
}: UsePannellumOptions) => {
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const initViewer = useCallback(() => {
    if (!containerRef.current) return;

    const origCreate = document.createElement.bind(document);

    try {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }

      const patchedCreate = function (tag: string, options?: any) {
        const el = origCreate(tag, options);
        if (tag === 'canvas') {
          const canvas = el as HTMLCanvasElement;
          const origGetContext = canvas.getContext.bind(canvas);
          canvas.getContext = function (type: string, attrs?: any) {
            if (
              type === 'webgl' ||
              type === 'webgl2' ||
              type === 'experimental-webgl'
            ) {
              attrs = { ...attrs, preserveDrawingBuffer: true };
            }
            return origGetContext(type, attrs);
          } as any;
        }
        return el;
      };
      document.createElement = patchedCreate as any;

      const config: any = {
        type: panorama.type,
        panorama: panorama.panorama,
        autoLoad: true,
        showControls: true,
        showFullscreenCtrl: true,
        showZoomCtrl: true,
        mouseZoom: true,
        draggable: true,
        keyboardZoom: true,
        compass: false,
        hotSpotDebug: false,
      };

      if (panorama.hotSpots && panorama.hotSpots.length > 0) {
        config.hotSpots = panorama.hotSpots;
      }

      viewerRef.current = pannellum.viewer(containerRef.current, config);

      viewerRef.current.on('load', () => {
        document.createElement = origCreate;
        onLoad?.();
      });

      viewerRef.current.on('error', (errorMsg: string) => {
        document.createElement = origCreate;
        onError?.(errorMsg);
      });

      viewerRef.current.on('scenechange', (sceneId: string) => {
        onSceneChange?.(sceneId);
      });
    } catch (error) {
      document.createElement = origCreate;
      console.error('Failed to initialize Pannellum:', error);
      onError?.(String(error));
    }
  }, [panorama, onLoad, onError, onSceneChange]);

  useEffect(() => {
    initViewer();

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
        viewerRef.current = null;
      }
    };
  }, [initViewer]);

  const getViewer = useCallback(() => viewerRef.current, []);

  const setYaw = useCallback((yaw: number) => {
    if (viewerRef.current) {
      viewerRef.current.setYaw(yaw);
    }
  }, []);

  const setPitch = useCallback((pitch: number) => {
    if (viewerRef.current) {
      viewerRef.current.setPitch(pitch);
    }
  }, []);

  const setHfov = useCallback((hfov: number) => {
    if (viewerRef.current) {
      viewerRef.current.setHfov(hfov);
    }
  }, []);

  const lookAt = useCallback(
    (pitch?: number, yaw?: number, hfov?: number, animated: boolean = true) => {
      if (viewerRef.current) {
        viewerRef.current.lookAt(pitch, yaw, hfov, animated);
      }
    },
    []
  );

  const toggleFullscreen = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.toggleFullscreen();
    }
  }, []);

  const startAutoRotate = useCallback((speed: number = -2) => {
    if (viewerRef.current) {
      viewerRef.current.startAutoRotate(speed);
    }
  }, []);

  const stopAutoRotate = useCallback(() => {
    if (viewerRef.current) {
      viewerRef.current.stopAutoRotate();
    }
  }, []);

  const addHotSpot = useCallback((hotSpot: any) => {
    if (viewerRef.current) {
      viewerRef.current.addHotSpot(hotSpot);
    }
  }, []);

  const removeHotSpot = useCallback((hotSpotId: string) => {
    if (viewerRef.current) {
      viewerRef.current.removeHotSpot(hotSpotId);
    }
  }, []);

  return {
    containerRef,
    getViewer,
    setYaw,
    setPitch,
    setHfov,
    lookAt,
    toggleFullscreen,
    startAutoRotate,
    stopAutoRotate,
    addHotSpot,
    removeHotSpot,
  };
};
