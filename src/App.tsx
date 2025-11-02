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
    <main className="min-h-screen p-4 flex flex-col gap-6">
      <h1 className="text-center text-3xl font-bold">I can't type french</h1>
      <p className="text-center text-lg">
        Website created because I'm sick of trying to type french characters
        with my english keyboard
      </p>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
        {characters.map((character) => (
          <Character key={character} character={character} />
        ))}
      </div>
    </main>
  );
}

export default App;
