import { useCallback } from 'react';
import { downloadBlob } from '../utils/file';

export const useScreenshot = () => {
  const captureScreenshot = useCallback(
    (
      viewer: any,
      filename: string = 'panorama-screenshot.png'
    ) => {
      if (!viewer) {
        console.error('Viewer not found');
        return;
      }

      try {
        const renderer = viewer.getRenderer();
        if (!renderer) {
          console.error('Renderer not found');
          return;
        }

        const dataUrl = renderer.render(
          viewer.getPitch() * Math.PI / 180,
          viewer.getYaw() * Math.PI / 180,
          viewer.getHfov() * Math.PI / 180,
          { returnImage: true }
        );

        if (dataUrl) {
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => downloadBlob(blob, filename));
        }
      } catch (error) {
        console.error('Screenshot failed:', error);
      }
    },
    []
  );

  const captureScreenshotAsDataURL = useCallback(
    (viewer: any): string | null => {
      if (!viewer) return null;

      try {
        const renderer = viewer.getRenderer();
        if (!renderer) return null;

        return renderer.render(
          viewer.getPitch() * Math.PI / 180,
          viewer.getYaw() * Math.PI / 180,
          viewer.getHfov() * Math.PI / 180,
          { returnImage: true }
        );
      } catch (error) {
        console.error('Screenshot failed:', error);
        return null;
      }
    },
    []
  );

  return { captureScreenshot, captureScreenshotAsDataURL };
};
