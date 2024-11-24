import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GetStartedButton = ({ text, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrambledText, setScrambledText] = useState(text);

  const buttonVariants = {
    initial: {
      backgroundColor: "#000",
      color: "#fff",
      boxShadow: "rgba(255, 255, 255, 0.413) 0px 0px 0px",
    },
    hover: {
      backgroundColor: "#fff",
      color: "#000",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
      boxShadow: "rgba(255, 255, 255, 0.413) 0px 0px 50px",
    },
  };

  const textVariants = {
    initial: {
      x: 0,
      transition: {
        duration: 3,
      },
    },
    hover: {
      x: 300,
      display: "none",
      transition: {
        duration: 3,
      },
    },
  };

  const textVariants2 = {
    initial: {
      display: "none",
    },
    hover: {
      display: "block",
    },
  };

  const scrambleText = () => {
    const scrambleChars = "abcdefghijklmnopqrstuvwxyz-.，+*@&%/=";
    let i = 0;

    const performIteration = () => {
      if (i <= text.length) {
        const unscrambledText = text
          .split("")
          .map((char, index) => {
            if (index < i) {
              return text[index];
            }
            return scrambleChars[
              Math.floor(Math.random() * scrambleChars.length)
            ];
          })
          .join("");

        setScrambledText(unscrambledText);

        i++;

        if (i <= text.length) {
          setTimeout(performIteration, 30);
        }
      }
    };

    performIteration();
  };

  const handleHover = () => {
    setIsHovered(true);
    onHover(true);
    scrambleText();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(false);
  };

  useEffect(() => {
    if (!isHovered) {
      setScrambledText(text);
    }
  }, [isHovered, text]);

  return (
    <motion.button
      className="text-4xl lg:text-7xl border-2 rounded-full lg:h-44 p-4 flex justify-center items-center"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >      

      <motion.span
        variants={textVariants}
        className=" w-full text-left ml-5 lg:ml-10 overflow-hidden"
      >
        {text}
      </motion.span>

      <motion.span
        variants={textVariants2}
        className=" w-full text-left  overflow-hidden"
        style={{
          transform: "translateX(2px)",
        }}
      >
        {scrambledText}
      </motion.span>
    </motion.button>
  );
};

export default GetStartedButton;
