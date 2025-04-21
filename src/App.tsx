import Character from "./components/Character";

function App() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">I can't type french</h1>
      <p className="text-center text-lg">
        Website created because I'm sick of trying to type french characters
        with my english keyboard
      </p>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
        <Character character="é" />
        <Character character="è" />
        <Character character="ê" />
        <Character character="ë" />
        <Character character="ï" />
        <Character character="î" />
        <Character character="ô" />
        <Character character="ö" />
        <Character character="ù" />
        <Character character="û" />
        <Character character="ü" />
        <Character character="œ" />
        <Character character="æ" />
        <Character character="ç" />
      </div>
    </div>
  );
}

export default App;
