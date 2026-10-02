import Character from "./components/Character";

function App() {
  const characters = [
    "é",
    "è",
    "ê",
    "ë",
    "ï",
    "î",
    "ô",
    "ö",
    "ù",
    "û",
    "ü",
    "œ",
    "æ",
    "ç",
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            I can't type French
          </h1>
          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Click a character to copy it.
          </p>
        </header>
        <div className="grid grid-cols-3 gap-3 min-[400px]:grid-cols-4 sm:grid-cols-7">
          {characters.map((character) => (
            <Character key={character} character={character} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
