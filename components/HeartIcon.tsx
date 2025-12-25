"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function HeartIcon() {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="text-romantic-primary"
    >
      <Heart fill="currentColor" className="w-8 h-8" />
    </motion.div>
  );
}
