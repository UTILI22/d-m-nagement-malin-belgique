import { useState } from "react";
import { Eye, Download, ExternalLink, X, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface PhotoViewerProps {
  photoUrls: string[];
  photosCount: number;
}

const PhotoViewer = ({ photoUrls, photosCount }: PhotoViewerProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasPhotos = photoUrls && photoUrls.length > 0;

  if (!hasPhotos) {
    return (
      <div className="flex items-start gap-2">
        <Image className="w-4 h-4 text-muted-foreground mt-0.5" />
        <div>
          <p className="text-xs text-muted-foreground">Photos</p>
          <p className="text-foreground font-medium">
            {photosCount > 0
              ? `${photosCount} photo(s) — URLs non disponibles`
              : "Aucune photo"}
          </p>
        </div>
      </div>
    );
  }

  const goTo = (index: number) => {
    setCurrentIndex((index + photoUrls.length) % photoUrls.length);
  };

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `photo-${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div className="flex items-start gap-2">
        <Image className="w-4 h-4 text-primary mt-0.5" />
        <div className="w-full">
          <p className="text-xs text-muted-foreground mb-2">
            Photos ({photoUrls.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {photoUrls.map((url, i) => (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                onClick={() => {
                  setCurrentIndex(i);
                  setLightboxOpen(true);
                }}
              >
                <img
                  src={url}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Aperçu"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(i);
                      setLightboxOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Ouvrir dans un nouvel onglet"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                  <button
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                    title="Télécharger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(url, i);
                    }}
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden">
          <div className="relative flex flex-col items-center">
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Image */}
            <div className="relative w-full flex items-center justify-center min-h-[50vh] max-h-[80vh]">
              <img
                src={photoUrls[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Nav arrows */}
              {photoUrls.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(currentIndex - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => goTo(currentIndex + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom bar */}
            <div className="w-full flex items-center justify-between px-4 py-3 border-t border-white/10">
              <span className="text-sm text-white/70">
                {currentIndex + 1} / {photoUrls.length}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={photoUrls[currentIndex]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Nouvel onglet
                </a>
                <button
                  onClick={() => handleDownload(photoUrls[currentIndex], currentIndex)}
                  className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Télécharger
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoViewer;
