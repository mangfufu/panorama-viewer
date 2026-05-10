import { usePanoramaStore } from './store/panoramaStore';
import { PanoramaViewer } from './components/PanoramaViewer/PanoramaViewer';
import { UploadZone } from './components/UploadZone/UploadZone';
import { Gallery } from './components/Gallery/Gallery';
import './App.css';

function App() {
  const {
    panoramas,
    currentPanoramaId,
    addPanorama,
    removePanorama,
    setCurrentPanorama,
  } = usePanoramaStore();

  const currentPanorama = panoramas.find((p) => p.id === currentPanoramaId);

  const handleUpload = (panorama: any) => {
    addPanorama(panorama);
    setCurrentPanorama(panorama.id);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">全景查看器</h1>
        <p className="app__subtitle">
          上传并查看 360° 全景图片
        </p>
      </header>
      <main className="app__main">
        <aside className="app__sidebar">
          <UploadZone onUpload={handleUpload} />
          <Gallery
            panoramas={panoramas}
            currentId={currentPanoramaId}
            onSelect={setCurrentPanorama}
            onDelete={removePanorama}
          />
        </aside>
        <section className="app__viewer">
          {currentPanorama ? (
            <PanoramaViewer
              panorama={currentPanorama}
              onLoad={() => console.log('Panorama loaded')}
              onError={(error) => console.error('Panorama error:', error)}
            />
          ) : (
            <div className="app__empty">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <p>上传全景图片开始浏览</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
