"use client";
import { motion, AnimatePresence } from "framer-motion";
import { TimelineEvent } from "@/lib/data";
import Image from "next/image";
import { X, MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

interface EventModalProps {
  selectedEvent: TimelineEvent | null;
  onClose: () => void;
}

export default function EventModal({ selectedEvent, onClose }: EventModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setPreviewImage(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent]);

  return (
    <AnimatePresence>
      {selectedEvent && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative max-h-[90vh] flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white transition-colors text-stone-700 shadow-sm"
              >
                <X size={24} />
              </button>

              <div className="relative w-full h-64 md:h-96 shrink-0 bg-stone-100 cursor-zoom-in" onClick={() => setPreviewImage(selectedEvent.coverImage)}>
                <motion.div layoutId={`media-${selectedEvent.id}`} className="w-full h-full relative">
                    <Image
                    src={selectedEvent.coverImage}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                    />
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 md:p-8 overflow-y-auto"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
                   <div>
                      <h2 className="text-3xl font-bold text-romantic-text mb-2">{selectedEvent.title}</h2>
                      <div className="flex items-center gap-4 text-stone-500">
                         <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{selectedEvent.date}</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{selectedEvent.location}</span>
                         </div>
                      </div>
                   </div>
                </div>

                <p className="text-lg text-stone-700 leading-relaxed whitespace-pre-line">
                  {selectedEvent.description}
                </p>
                
                {/* Gallery Section */}
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                   <div className="mt-8 space-y-4">
                      <h4 className="font-semibold text-romantic-primary">爱情图片库</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedEvent.gallery.map((img, idx) => (
                             <div 
                               key={idx} 
                               className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-zoom-in"
                               onClick={() => setPreviewImage(img)}
                             >
                                <Image src={img} alt="Gallery" fill className="object-cover hover:scale-110 transition-transform duration-500" />
                             </div>
                          ))}
                      </div>
                   </div>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Full Screen Image Preview */}
          <AnimatePresence>
            {previewImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
                onClick={() => setPreviewImage(null)}
              >
                <button
                  className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-50"
                  onClick={() => setPreviewImage(null)}
                >
                  <X size={32} />
                </button>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full h-full max-w-7xl max-h-[90vh] cursor-zoom-out"
                >
                  <Image
                    src={previewImage}
                    alt="Full screen preview"
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
