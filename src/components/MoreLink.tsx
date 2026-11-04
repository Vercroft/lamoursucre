export function MoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="more-link group">
      <span>{label}</span>
      <span className="line" />
      <span className="ring">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M5 12h13M12 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
