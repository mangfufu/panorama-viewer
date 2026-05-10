import { PanoramaConfig } from '../../types/panorama';
import './Gallery.css';

interface GalleryProps {
  panoramas: PanoramaConfig[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const Gallery = ({ panoramas, currentId, onSelect, onDelete }: GalleryProps) => {
  if (panoramas.length === 0) {
    return null;
  }

  return (
    <div className="gallery">
      <h3 className="gallery__title">我的全景图</h3>
      <div className="gallery__list">
        {panoramas.map((panorama) => (
          <div
            key={panorama.id}
            className={`gallery__item ${
              panorama.id === currentId ? 'gallery__item--active' : ''
            }`}
            onClick={() => onSelect(panorama.id)}
          >
            <div className="gallery__item-preview">
              {panorama.preview ? (
                <img src={panorama.preview} alt={panorama.title} />
              ) : (
                <div className="gallery__item-placeholder">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
              )}
            </div>
            <div className="gallery__item-info">
              <span className="gallery__item-name">{panorama.title}</span>
              <span className="gallery__item-type">{panorama.type}</span>
            </div>
            <button
              className="gallery__item-delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(panorama.id);
              }}
              title="删除"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
