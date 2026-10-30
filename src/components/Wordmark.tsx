// Set in Outfit bold, which is close to the logo's geometric letterforms.
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-bold lowercase tracking-[-0.04em] ${className}`}>
      <span className="text-ink">cili</span>
      <span className="text-sky">com</span>
    </span>
  );
}
