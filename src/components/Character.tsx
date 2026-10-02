import { useEffect, useState } from "react";

export default function Character({ character }: { character: string }) {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status !== "copied" && status !== "failed") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copyToClipboard() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(character);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <button
      type="button"
      className="character-key"
      aria-label={`Copy ${character}`}
      disabled={status === "copying"}
      data-copied={status === "copied"}
      onClick={copyToClipboard}
    >
      <span className="text-4xl font-medium sm:text-5xl" aria-hidden="true">{character}</span>
      <span className="key-status" role="status" aria-atomic="true">
        {status === "copied" ? "Copied" : status === "failed" ? "Try again" : ""}
        <span className="sr-only">{status === "copied" ? ` ${character}` : status === "failed" ? `: could not copy ${character}` : ""}</span>
      </span>
    </button>
  );
}
