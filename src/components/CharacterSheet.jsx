// ==============================
// Imports
// ==============================
import React from "react";

// Component Imports
import ProficiencyBonus from "./ProficiencyBonus";
import AbilityScores from "./AbilityScores";
import SavingThrows from "./SavingThrows";
import Skills from "./Skills";
import CombatStats from "./CombatStats";
import Equipment from "./Equipment";
import FeaturesAndTraits from "./FeaturesAndTraits";

// Utility Function
import getProficiencyBonus from "../utils/getProficiencyBonus";

// Styling
import "../CharacterSheet.css";

// ==============================
// CharacterSheet Component
// ==============================
function CharacterSheet({ formData, portraitUrl, isLoadingPortrait }) {
  // Return nothing if no character has been generated yet
  if (!formData) return null;

  // ========== Destructure character data ==========
  const {
    name,
    selectedRace,
    selectedClass,
    selectedBackground,
    raceDetails,
    classDetails,
    backgroundDetails,
    selectedRaceProficiencies,
    selectedClassProficiencies,
    selectedEquipment,
    abilityScores,
  } = formData;

  const level = 1; // Currently hardcoded — can be updated to allow level selection
  const proficiencyBonus = getProficiencyBonus(level); // Lookup from level

  // ========== Extract Skill Proficiencies ==========

  // From background
  const backgroundSkills =
    backgroundDetails?.starting_proficiencies?.map((p) =>
      p.name.toLowerCase().replace("skill: ", "").trim()
    ) || [];

  // From selected class options (based on selected indexes)
  const classSkills = selectedClassProficiencies
    .map((index) =>
      classDetails?.proficiency_choices
        ?.flatMap((choice) => choice.from.options)
        .find(
          (opt) =>
            opt.item.index === index && opt.item.index.startsWith("skill-")
        )
    )
    .filter(Boolean)
    .map((match) =>
      match.item.name.toLowerCase().replace("skill: ", "").trim()
    );

  // Combine all into a single array of skill proficiencies
  const skillProficiencies = [...backgroundSkills, ...classSkills];

  // ==============================
  // JSX Layout Return
  // ==============================
  return (
    <div className="character-sheet card p-3 shadow-lg bg-light-subtle">
      {/* ==============================
          TOP: Character Overview
      ============================== */}
      <div className="top-section mb-4">
        <div className="d-flex flex-column align-items-center">
          <h2 className="mb-2">{name || "Unnamed Hero"}</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <span>
              <strong>Class:</strong> {classDetails?.name || selectedClass}
            </span>
            <span>
              <strong>Race:</strong> {raceDetails?.name || selectedRace}
            </span>
            <span>
              <strong>Background:</strong>{" "}
              {backgroundDetails?.name || selectedBackground}
            </span>
            <span>
              <strong>Level:</strong> 1 {/* TODO: make dynamic later */}
            </span>
          </div>
        </div>
      </div>

      {/* ==============================
          MAIN GRID LAYOUT
      ============================== */}
      <div className="row">
        {/* ========== LEFT COLUMN ========== */}
        <div className="col-md-4">
          {/* Portrait Area */}
          <div className="mb-3 text-center">
            {isLoadingPortrait ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : portraitUrl ? (
              <img
                src={portraitUrl}
                alt="Character portrait"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            ) : (
              <div className="placeholder-box bg-light-subtle text-muted py-5 rounded">
                [ No Portrait Yet ]
              </div>
            )}
          </div>

          {/* Proficiency Bonus Display */}
          <div className="mb-3">
            <ProficiencyBonus
              level={level}
              proficiencyBonus={proficiencyBonus}
            />
          </div>

          {/* Saving Throws Table */}
          <div className="mb-3">
            <SavingThrows
              abilityScores={abilityScores}
              raceDetails={raceDetails}
              proficiencyBonus={proficiencyBonus}
              proficiencies={classDetails?.saving_throws.map((st) =>
                st.name.toUpperCase().slice(0, 3)
              )}
            />
          </div>

          {/* Skills Table */}
          <div className="mb-3">
            <Skills
              abilityScores={abilityScores}
              raceDetails={raceDetails}
              proficiencyBonus={proficiencyBonus}
              skillProficiencies={skillProficiencies}
            />
          </div>
        </div>

        {/* ========== RIGHT COLUMN ========== */}
        <div className="col-md-8">
          {/* Ability Scores Table */}
          <div className="mb-3">
            <AbilityScores
              abilityScores={abilityScores}
              raceDetails={raceDetails}
            />
          </div>

          {/* Combat Stats (HP, AC, Initiative) */}
          <div className="mb-3">
            <CombatStats
              abilityScores={abilityScores}
              raceDetails={raceDetails}
              classDetails={classDetails}
              proficiencyBonus={proficiencyBonus}
            />
          </div>

          {/* Equipment and Traits Side-by-Side */}
          <div className="row">
            {/* Equipment (from class + background) */}
            <div className="col-md-6">
              <Equipment
                classDetails={classDetails}
                selectedEquipment={selectedEquipment}
                backgroundDetails={backgroundDetails}
              />
            </div>

            {/* Racial/Class/Background Features */}
            <div className="col-md-6">
              <FeaturesAndTraits
                raceDetails={raceDetails}
                classDetails={classDetails}
                backgroundDetails={backgroundDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterSheet;
