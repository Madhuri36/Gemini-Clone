import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const dynamicWords = ["AI Chatbot", "Code Generator", "Image Creator", "Answer Assistant"];

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = dynamicWords[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 100);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 50);
    } else if (charIndex === currentWord.length && !isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (charIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 pt-24 sm:pt-28 md:pt-32"
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      <div className="max-w-3xl text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Meet Your All-in-One <br />
          <motion.span
            className="bg-gradient-to-r bg-clip-text text-transparent inline-block min-h-[1.2em]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--gradient-from), var(--gradient-via), var(--gradient-to))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </motion.span>
        </h1>
        <p
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Generate text, code, images, and answers — all in one place. Designed
          to assist, create, and adapt to your needs with real-time smart
          capabilities.
        </p>
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
          <motion.button
            className="px-5 py-2 rounded-md font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--accent-primary-bg)",
              color: "var(--text-primary)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Now
          </motion.button>
          <motion.button
            className="px-5 py-2 rounded-md font-semibold text-sm border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border-muted)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
