import { forwardRef } from "react";

export interface PortfolioItem {
  label: string;
  href: string;
  isHighlighted?: boolean
}

const portfolioItems: PortfolioItem[] = [
  { label: "FOREVER MESSAGE", href: "https://forever.loscolmebrothers.com", isHighlighted: true },
  { label: "PLANET PARTNERS", href: "https://dev.planetpartners.pl" },
  { label: "EUROPA BODAS", href: "https://europabodas.com" },
];

export const PortfolioList = forwardRef<HTMLUListElement>((_, ref) => {
  return (
    <ul
      ref={ref}
      className="flex flex-row items-center gap-x-13 gap-y-4 max-w-155 flex-wrap justify-center opacity-0"
      style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
    >
      {portfolioItems.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/70 hover:text-black text-xl uppercase tracking-[0.2em] transition-colors duration-300 flex items-center gap-1 text-center md:text-2xl"
          >
            <span className={`text-black text-2xl text no-underline ${!!item.isHighlighted && "text-gold"}`}>✵</span>
            <span className="border-b-2 border-transparent  hover:border-black">{item.label} </span>
          </a>
        </li>
      ))}
    </ul>
  );
});

PortfolioList.displayName = "PortfolioList";
