export const BottomCTA = () => {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-0 z-20 pointer-events-none">
      <div className="backdrop-blur-lg bg-black/50 rounded-t-2xl px-12 py-3 border-t border-x border-white/30 shadow-2xl pointer-events-auto">
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-white/90 text-md tracking-wide"
            style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
          >
            Yours could look this cool
          </p>
          <a
            href="mailto:hello@loscolmebrothers.com"
            className="bg-white/95 text-black/60 px-6 py-1 rounded-md text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-md"
            style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
          >
            Let's talk
          </a>
        </div>
      </div>
    </div>
  );
};
