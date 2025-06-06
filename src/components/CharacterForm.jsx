// ==============================
// Imports
// ==============================
import { useState } from "react";
import { useDnDList, useDnDDetail } from "../hooks/useDnDData"; // Custom hooks to fetch lists/details from DND 5E API
import RaceDetails from "./RaceDetails";
import ClassDetails from "./ClassDetails";
import BackgroundDetails from "./BackgroundDetails";

// ==============================
// CharacterForm Component
// ==============================

function CharacterForm({
  onGenerate, // Callback to generate full character data
  onPortraitGenerated, // Callback to set the portrait URL
  setIsLoadingPortrait, // Callback to toggle loading spinner
}) {
  // ========== State Setup ==========

  // Character identity and selection states
  const [name, setName] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");

  // Arrays of selected proficiencies and equipment
  const [selectedClassProficiencies, setSelectedClassProficiencies] = useState(
    []
  );
  const [selectedRaceProficiencies, setSelectedRaceProficiencies] = useState(
    []
  );
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  // Ability scores mapping: STR, DEX, etc.
  const [abilityScores, setAbilityScores] = useState({
    STR: null,
    DEX: null,
    CON: null,
    INT: null,
    WIS: null,
    CHA: null,
  });

  // ========== Fetch Lists via Custom Hook ==========
  const { data: races } = useDnDList("races");
  const { data: classes } = useDnDList("classes");
  const { data: backgrounds } = useDnDList("backgrounds");

  // ========== Fetch Detailed Info ==========
  const raceDetails = useDnDDetail("races", selectedRace);
  const classDetails = useDnDDetail("classes", selectedClass);
  const backgroundDetails = useDnDDetail("backgrounds", selectedBackground);

  // ========== Proficiency Toggle Handler ==========
  const handleProficiencyToggle = (index, maxAllowed, setSelected) => {
    setSelected((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index); // Remove if already selected
      } else if (prev.length < maxAllowed) {
        return [...prev, index]; // Add if under limit
      } else {
        return prev; // Ignore if at limit
      }
    });
  };

  // ========== Image Generation via API ==========
  const generatePortrait = async () => {
    // Dynamically constructed prompt for the DALL·E API
    const prompt = `A high fantasy portrait of a ${selectedRace} ${selectedClass}, shown close-up and centered in heroic pose under dramatic lighting. They wear intricate fantasy armor with rich details. Behind them: a blurred scenic backdrop—rolling hills, ancient ruins, or a misty forest—with hints of classic D&D themes like dragons or glowing runes. Vibrant colors, cinematic atmosphere, and magical adventure.`;

    setIsLoadingPortrait(true); // Start spinner

    try {
      const response = await fetch("/api/generate-portrait", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Failed to generate portrait");
      }

      onPortraitGenerated(data.imageUrl); // Set the generated image
    } catch (err) {
      console.error("Error generating portrait:", err);
      onPortraitGenerated(null); // Set null on error
    } finally {
      setIsLoadingPortrait(false); // Stop spinner
    }
  };

  // ==============================
  // Render Form UI
  // ==============================
  return (
    <div className="card p-3 shadow-lg bg-light-subtle">
      <h5 className="card-title mb-3">Character Builder</h5>

      {/* Name Input */}
      <div className="mb-3">
        <label className="form-label">Character Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Elrion the Bold"
        />
      </div>

      {/* Race Dropdown */}
      <div className="mb-3">
        <label className="form-label">Race</label>
        <select
          className="form-select"
          value={selectedRace}
          onChange={(e) => setSelectedRace(e.target.value)}
        >
          <option value="">Select a race</option>
          {races.map((race) => (
            <option key={race.index} value={race.index}>
              {race.name}
            </option>
          ))}
        </select>
      </div>

      {/* Class Dropdown */}
      <div className="mb-3">
        <label className="form-label">Class</label>
        <select
          className="form-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.index} value={cls.index}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Background Dropdown */}
      <div className="mb-3">
        <label className="form-label">Background</label>
        <select
          className="form-select"
          value={selectedBackground}
          onChange={(e) => setSelectedBackground(e.target.value)}
        >
          <option value="">Select a background</option>
          {backgrounds.map((bg) => (
            <option key={bg.index} value={bg.index}>
              {bg.name}
            </option>
          ))}
        </select>
      </div>

      {/* Race Proficiencies & Traits */}
      <div className="mb-3 border rounded p-3 bg-white shadow-sm">
        {raceDetails && (
          <RaceDetails
            raceDetails={raceDetails}
            selectedRaceProficiencies={selectedRaceProficiencies}
            onToggle={(index) =>
              handleProficiencyToggle(
                index,
                raceDetails.starting_proficiency_options?.choose,
                setSelectedRaceProficiencies
              )
            }
          />
        )}
      </div>

      {/* Class Proficiencies & Equipment */}
      <div className="mb-3 border rounded p-3 bg-white shadow-sm">
        {classDetails && (
          <ClassDetails
            classDetails={classDetails}
            selectedClassProficiencies={selectedClassProficiencies}
            onToggle={(index) =>
              handleProficiencyToggle(
                index,
                classDetails.proficiency_choices[0].choose,
                setSelectedClassProficiencies
              )
            }
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
          />
        )}
      </div>

      {/* Background Perks */}
      <div className="mb-3 border rounded p-3 bg-white shadow-sm">
        {backgroundDetails && (
          <BackgroundDetails backgroundDetails={backgroundDetails} />
        )}
      </div>

      {/* Ability Score Assignment */}
      <div className="mb-3 border rounded p-3 bg-white shadow-sm">
        <label className="form-label">
          <strong>Assign Ability Scores</strong>
        </label>

        {["STR", "DEX", "CON", "INT", "WIS", "CHA"].map((ability) => (
          <div key={ability} className="mb-2 d-flex align-items-center gap-2">
            <strong className="w-25">{ability}</strong>
            <select
              className="form-select"
              value={abilityScores[ability] ?? ""}
              onChange={(e) =>
                setAbilityScores((prev) => ({
                  ...prev,
                  [ability]: parseInt(e.target.value),
                }))
              }
            >
              <option value="">-- Select --</option>
              {[15, 14, 13, 12, 10, 8]
                .filter(
                  (score) =>
                    !Object.values(abilityScores).includes(score) ||
                    abilityScores[ability] === score
                )
                .map((score, i) => (
                  <option key={i} value={score}>
                    {score}
                  </option>
                ))}
            </select>
          </div>
        ))}
      </div>

      {/* Generate Buttons */}
      <div className="d-grid mt-4">
        {/* Character Data Submit */}
        <button
          className="btn btn-primary"
          onClick={() => {
            const formData = {
              name,
              selectedRace,
              selectedClass,
              selectedBackground,
              selectedClassProficiencies,
              selectedRaceProficiencies,
              selectedEquipment,
              raceDetails,
              classDetails,
              backgroundDetails,
              abilityScores,
            };
            onGenerate(formData);
          }}
          disabled={
            !name || !selectedRace || !selectedClass || !selectedBackground
          }
        >
          Generate Character
        </button>

        {/* DALL·E Portrait Button */}
        <button
          className="btn btn-secondary mt-2"
          onClick={generatePortrait}
          disabled={!selectedRace || !selectedClass}
        >
          Generate Portrait
        </button>
      </div>
    </div>
  );
}

export default CharacterForm;
