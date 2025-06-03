import { useState } from "react";
import CharacterForm from "./components/CharacterForm";
import CharacterSheet from "./components/CharacterSheet";
import "./App.css";

function App() {
  const [generatedCharacter, setGeneratedCharacter] = useState(null);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">D&D 5E Character Generator</h1>
      <p className="text-center text-muted">
        Build a custom 5E character by selecting race, class, and more.
      </p>

      <div className="row mt-4">
        {/* Left Panel - Form */}
        <div className="col-md-5">
          <CharacterForm onGenerate={setGeneratedCharacter} />
        </div>

        {/* Right Panel - Character Sheet */}
        <div className="col-md-7">
          {generatedCharacter ? (
            <CharacterSheet formData={generatedCharacter} />
          ) : (
            <div className="text-muted text-center mt-5">
              Your character sheet will appear here after generating.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
