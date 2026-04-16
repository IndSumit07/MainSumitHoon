import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const greetings = [
  { text: "Hello" },
  { text: "नमस्ते" },
  { text: "Ciao" },
  { text: "Hola" },
  { text: "Bonjour" },
  { text: "こんにちは" },
];

const GREETING_DURATION_MS = 420;
const EXIT_DURATION_MS = 180;

const WelcomeIntro = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isClosing) return undefined;

    const timer = window.setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex((prev) => prev + 1);
        return;
      }

      setIsClosing(true);
      window.setTimeout(() => {
        onComplete?.();
      }, EXIT_DURATION_MS);
    }, GREETING_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [index, isClosing, onComplete]);

  const activeGreeting = greetings[index];

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION_MS / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center justify-center gap-3 px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeGreeting.text}-${index}`}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  y: 12,
                  scale: 0.98,
                }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", y: -10, scale: 1.01 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-white"
              >
                {activeGreeting.text}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeIntro;
