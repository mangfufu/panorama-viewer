import { create } from 'zustand';
import { PanoramaConfig, PanoramaStore, ViewerState } from '../types/panorama';

const defaultViewerState: ViewerState = {
  isLoading: false,
  currentScene: null,
  hfov: 100,
  pitch: 0,
  yaw: 0,
  isFullscreen: false,
};

export const usePanoramaStore = create<PanoramaStore>((set) => ({
  panoramas: [],
  currentPanoramaId: null,
  viewerState: defaultViewerState,

  addPanorama: (panorama: PanoramaConfig) =>
    set((state) => ({
      panoramas: [...state.panoramas, panorama],
    })),

  removePanorama: (id: string) =>
    set((state) => ({
      panoramas: state.panoramas.filter((p) => p.id !== id),
      currentPanoramaId:
        state.currentPanoramaId === id ? null : state.currentPanoramaId,
    })),

  setCurrentPanorama: (id: string) =>
    set({ currentPanoramaId: id }),

  updateViewerState: (newState: Partial<ViewerState>) =>
    set((state) => ({
      viewerState: { ...state.viewerState, ...newState },
    })),

  addHotSpot: (panoramaId: string, hotSpot: any) =>
    set((state) => ({
      panoramas: state.panoramas.map((p) =>
        p.id === panoramaId
          ? { ...p, hotSpots: [...(p.hotSpots || []), hotSpot] }
          : p
      ),
    })),

  removeHotSpot: (panoramaId: string, hotSpotId: string) =>
    set((state) => ({
      panoramas: state.panoramas.map((p) =>
        p.id === panoramaId
          ? {
              ...p,
              hotSpots: (p.hotSpots || []).filter((h) => h.id !== hotSpotId),
            }
          : p
      ),
    })),
}));
