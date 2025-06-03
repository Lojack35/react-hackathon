import CharacterForm from "./components/CharacterForm";
import CharacterSheet from "./components/CharacterSheet";
import "./App.css";

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">D&D 5E Character Generator</h1>
      <p className="text-center text-muted">
        Build a custom 5E character by selecting race, class, and more. Watch
        the sheet fill in real-time.
      </p>

      <div className="row mt-4">
        {/* Left Panel - Form */}
        <div className="col-md-5">
          <CharacterForm />
        </div>

        {/* Right Panel - Character Sheet */}
        <div className="col-md-7">
          <CharacterSheet />
        </div>
      </div>
    </div>
  );
}

export default App;
