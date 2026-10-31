// Set in Outfit bold, which is close to the logo's geometric letterforms.
// `onSky` swaps the colors for use on the sky-blue menu.
export default function Wordmark({ className = "", onSky = false }: { className?: string; onSky?: boolean }) {
  return (
    <span className={`font-bold lowercase tracking-[-0.04em] ${className}`}>
      <span className={`transition-colors duration-500 ${onSky ? "text-navy" : "text-ink"}`}>cili</span>
      <span className={`transition-colors duration-500 ${onSky ? "text-ink" : "text-sky"}`}>com</span>
    </span>
  );
}
