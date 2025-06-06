import React from "react";
import "../CharacterSheet.css"; // Imports custom styles for character sheet components

// ProficiencyBonus Component
// Displays the proficiency bonus for the character, which is based on their level
// Props:
// - level: the character's level (used for context in the label)
// - proficiencyBonus: the numeric bonus (e.g., +2 at level 1–4, +3 at level 5–8, etc.)
function ProficiencyBonus({ level, proficiencyBonus }) {
  return (
    <div className="card text-center mb-3">
      {/* Card container with center-aligned text and margin below */}
      <div className="card-body">
        {/* Card heading */}
        <h5 className="card-title mb-2">
          <strong>Proficiency Bonus</strong>
        </h5>

        {/* Large display of the actual bonus value */}
        <div className="fs-3 fw-bold">
          {/* Add "+" sign for positive numbers (standard D&D format) */}
          {proficiencyBonus >= 0 ? "+" : ""}
          {proficiencyBonus}
        </div>

        {/* Small muted note indicating this bonus is tied to the character's level */}
        <div className="text-muted small">Based on level {level}</div>
      </div>
    </div>
  );
}

export default ProficiencyBonus;
