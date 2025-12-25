"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { TimelineEvent } from "@/lib/data";
import { MapPin } from "lucide-react";

interface TimelineItemProps {
  item: TimelineEvent;
  onClick: (item: TimelineEvent) => void;
  index: number;
}

export default function TimelineItem({ item, onClick, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-6 items-start cursor-pointer group relative z-10"
      onClick={() => onClick(item)}
    >
      {/* Date & Line Marker */}
      <div className="hidden md:flex flex-col items-center w-24 shrink-0 pt-2">
        <div className="text-sm font-bold text-romantic-primary">{item.date}</div>
        <div className="w-3 h-3 bg-romantic-primary rounded-full mt-2 ring-4 ring-romantic-bg" />
      </div>

      <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-romantic-bg w-full">
         <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-4 bg-stone-100">
            <motion.div layoutId={`media-${item.id}`} className="w-full h-full relative">
               <Image
                 src={item.coverImage}
                 alt={item.title}
                 fill
                 className="object-cover group-hover:scale-105 transition-transform duration-500"
               />
            </motion.div>
         </div>
         
         <div className="space-y-2">
            <div className="flex justify-between items-start">
               <h3 className="text-xl font-bold text-romantic-text">{item.title}</h3>
               <span className="md:hidden text-xs text-romantic-primary font-medium px-2 py-1 bg-romantic-bg rounded-full">
                  {item.date}
               </span>
            </div>
            
            <div className="flex items-center text-sm text-stone-500 gap-4">
               <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{item.location}</span>
               </div>
            </div>
            
            <p className="text-stone-600 line-clamp-2 text-sm">
               {item.description}
            </p>
         </div>
      </div>
    </motion.div>
  );
}
