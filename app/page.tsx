"use client";
import { useState } from "react";
import { TIMELINE_DATA, TimelineEvent } from "@/lib/data";
import TimelineItem from "@/components/TimelineItem";
import EventModal from "@/components/EventModal";
import HeartIcon from "@/components/HeartIcon";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  // Calculate days together (Mock start date: 2023-12-31)
  const startDate = new Date("2023-12-31");
  const today = new Date();
  const daysTogether = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <main className="min-h-screen bg-romantic-bg py-12 px-4 sm:px-6 lg:px-8 font-sans text-stone-700 selection:bg-romantic-primary/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center mb-4"
          >
             <HeartIcon />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-romantic-text tracking-tight mb-2">
              我们的爱情时间线
            </h1>
            <div className="h-1 w-20 bg-romantic-primary mx-auto rounded-full opacity-50" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-stone-500 font-medium"
          >
            在一起的第 <span className="text-romantic-primary font-bold text-2xl mx-1">{daysTogether}</span> 天
          </motion.p>

          {/* Scroll Hint */}
          <motion.div 
            style={{ opacity: scrollHintOpacity }}
            className="pt-12 flex flex-col items-center gap-3 text-romantic-primary/60"
          >
            <span className="text-sm font-medium tracking-[0.2em] animate-pulse">下滑开启时间线</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </header>

        {/* Timeline List */}
        <div className="relative pl-4 md:pl-0">
           {/* Vertical Line for Desktop */}
           <div className="absolute left-[27px] md:left-28 top-4 bottom-0 w-px bg-gradient-to-b from-romantic-primary/5 via-romantic-primary/30 to-romantic-primary/5 hidden md:block" />
           
           <div className="space-y-12">
             {TIMELINE_DATA.map((item, index) => (
               <TimelineItem 
                 key={item.id} 
                 item={item} 
                 index={index}
                 onClick={setSelectedEvent} 
               />
             ))}
           </div>
           
           {/* End of timeline decoration */}
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center mt-20 text-romantic-primary/60 text-sm"
           >
             <p>未完待续...</p>
           </motion.div>
        </div>
      </div>

      <EventModal 
        selectedEvent={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </main>
  );
}
