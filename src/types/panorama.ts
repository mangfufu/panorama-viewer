export interface PanoramaConfig {
  id: string;
  title: string;
  type: 'equirectangular' | 'cubemap' | 'multires';
  panorama: string | string[];
  preview?: string;
  author?: string;
  hotSpots?: HotSpot[];
  vOffset?: number;
}

export interface HotSpot {
  id: string;
  pitch: number;
  yaw: number;
  type: 'info' | 'scene';
  text: string;
  URL?: string;
  sceneId?: string;
  createTooltipFunc?: (hotSpotDiv: HTMLElement, args: any) => void;
  createTooltipArgs?: any;
  clickHandlerFunc?: (event: MouseEvent) => void;
  clickHandlerArgs?: any;
}

export interface ViewerState {
  isLoading: boolean;
  currentScene: string | null;
  hfov: number;
  pitch: number;
  yaw: number;
  isFullscreen: boolean;
}

export interface PanoramaStore {
  panoramas: PanoramaConfig[];
  currentPanoramaId: string | null;
  viewerState: ViewerState;
  
  // Actions
  addPanorama: (panorama: PanoramaConfig) => void;
  removePanorama: (id: string) => void;
  setCurrentPanorama: (id: string) => void;
  updateViewerState: (state: Partial<ViewerState>) => void;
  addHotSpot: (panoramaId: string, hotSpot: HotSpot) => void;
  removeHotSpot: (panoramaId: string, hotSpotId: string) => void;
}
