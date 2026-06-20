import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import PillarSection from "./components/PillarSection";
import { pillars } from "./data/pillars";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { darkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-500
      ${darkMode
          ? "bg-[#050816]"
          : "bg-[#f8fafc]"
        }
    `}
    >
      <ThemeToggle />

      {/* Mouse Glow */}
      <div
        className={`fixed pointer-events-none z-0 w-[350px] h-[350px] rounded-full blur-[120px] ${darkMode
          ? "bg-purple-500/10"
          : "bg-purple-400/8"
          }`}
        style={{
          left: mousePosition.x - 175,
          top: mousePosition.y - 175,
        }}
      />

      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {darkMode ? (
          <>
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/20 blur-[180px] animate-pulse" />

            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] animate-pulse" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-purple-300/15 blur-[220px]" />

            <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-300/15 blur-[220px]" />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-200/10 blur-[180px]" />
          </>
        )}

      </div>

      {/* Floating Stars */}
      <div className="stars"></div>

      {/* Hero */}
      <Hero />

      {/* Intro */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${darkMode
              ? "border-purple-500/20 bg-purple-500/10 text-purple-300"
              : "border-purple-300 bg-purple-50 text-purple-700"
              }`}
          >
            The PRISM Ecosystem
          </div>

          {/* Heading */}
          <h2
            className={`text-5xl md:text-7xl font-bold mb-8 ${darkMode
              ? "text-white"
              : "text-slate-900"
              }`}
          >
            Four Pillars of

            <span className="block bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Transformative Learning
            </span>
          </h2>

          {/* Description */}
          <p
            className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto ${darkMode
              ? "text-gray-400"
              : "text-slate-600"
              }`}
          >
            Learn smarter, explore deeper, practice better and grow beyond
            academics through an immersive learning ecosystem.
          </p>

        </div>
      </section>

      {/* Pillars */}
      {pillars.map((pillar, index) => (
        <PillarSection
          key={pillar.id}
          pillar={pillar}
          reverse={index % 2 !== 0}
        />
      ))}

      {/* CTA */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          <div
            className={`relative overflow-hidden rounded-[40px] backdrop-blur-xl p-12 md:p-20 text-center border ${darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white/80 border-slate-200 shadow-2xl"
              }`}
          >

            {/* Background Glows */}
            <div
              className={`absolute top-0 left-0 w-72 h-72 blur-[120px] ${darkMode
                ? "bg-purple-600/20"
                : "bg-purple-300/20"
                }`}
            />

            <div
              className={`absolute bottom-0 right-0 w-72 h-72 blur-[120px] ${darkMode
                ? "bg-blue-600/20"
                : "bg-blue-300/20"
                }`}
            />

            <div className="relative z-10">

              {/* Heading */}
              <h2
                className={`text-5xl md:text-7xl font-bold mb-8 ${darkMode
                  ? "text-white"
                  : "text-slate-900"
                  }`}
              >
                Ready to Unlock
                <br />
                Your Potential?
              </h2>

              {/* Description */}
              <p
                className={`max-w-2xl mx-auto text-lg mb-10 ${darkMode
                  ? "text-gray-400"
                  : "text-slate-600"
                  }`}
              >
                Join thousands of learners using PRISM to build knowledge,
                confidence, creativity and future-ready skills.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">

                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg">
                  Start Learning
                </button>

                <button
                  className={`px-8 py-4 rounded-xl transition duration-300 ${darkMode
                    ? "border border-white/10 text-white hover:bg-white/5"
                    : "border border-slate-300 text-slate-800 hover:bg-slate-100"
                    }`}
                >
                  Explore Features
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}