import { useState } from "react"; // React hook for managing component state
import CharacterForm from "./components/CharacterForm"; // Component to build the character
import CharacterSheet from "./components/CharacterSheet"; // Component to display the character sheet
import "./App.css"; // Global styling for the app

function App() {
  // Stores the full generated character data returned by CharacterForm
  const [generatedCharacter, setGeneratedCharacter] = useState(null);

  // Stores the image URL of the generated character portrait (from API)
  const [portraitUrl, setPortraitUrl] = useState(null);

  // Boolean flag to show loading spinner while portrait is being fetched
  const [isLoadingPortrait, setIsLoadingPortrait] = useState(false);

  return (
    <div className="container my-4">
      {/* App Title */}
      <h1 className="text-center mb-4">DND 5E Character Generator</h1>

      {/* App Subtitle */}
      <p className="text-center text-muted">
        Build a custom character by selecting race, class, and more.
      </p>

      <div className="row mt-4">
        {/* === LEFT PANEL === */}
        {/* Character creation form takes up ~5/12 of the width */}
        <div className="col-md-5">
          <CharacterForm
            // Pass setter so the form can update the generated character in state
            onGenerate={setGeneratedCharacter}
            // Pass setter so the form can provide the portrait image URL
            onPortraitGenerated={setPortraitUrl}
            // Pass setter to toggle loading state during image fetch
            setIsLoadingPortrait={setIsLoadingPortrait}
          />
        </div>

        {/* === RIGHT PANEL === */}
        {/* Character sheet display area takes up ~7/12 of the width */}
        <div className="col-md-7">
          {generatedCharacter ? (
            // If a character has been generated, show the sheet
            <CharacterSheet
              formData={generatedCharacter}
              portraitUrl={portraitUrl}
              isLoadingPortrait={isLoadingPortrait}
            />
          ) : (
            // Placeholder when no character has been created yet
            <div className="text-muted text-center mt-5">
              Your character sheet will appear here after generating.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; // Export the main App component so it can be rendered by React
