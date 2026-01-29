import { useEffect, useState } from "react";

export const CrypticText = ({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) => {
    const [display, setDisplay] = useState("");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        let timeout: any;

        const startScramble = () => {
            const interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((char, index) => {
                            if (index < iteration) return text[index];
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, speed);
        };

        timeout = setTimeout(startScramble, delay);
        return () => {
            clearTimeout(timeout);
            iteration = text.length; // Stop the interval
        };
    }, [text, delay, speed]);

    return <span>{display}</span>;
};
