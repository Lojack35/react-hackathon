// ------------------------------
// AbilityScores.jsx
// ------------------------------
// This component displays the character's ability scores,
// including racial bonuses and calculated modifiers.
// ------------------------------

import React from "react";
import "../CharacterSheet.css"; // Custom styling for ability boxes

// Main functional component
function AbilityScores({ abilityScores, raceDetails }) {
  // If ability scores are not yet available, render nothing
  if (!abilityScores) return null;

  // -----------------------------------
  // Helper Function: Get ability modifier
  // DnD rule: Modifier = floor((score - 10) / 2)
  // -----------------------------------
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // -----------------------------------
  // Calculate total scores, including racial bonuses
  // -----------------------------------
  const totalScores = { ...abilityScores }; // Copy base scores

  if (raceDetails?.ability_bonuses) {
    raceDetails.ability_bonuses.forEach((bonus) => {
      const ability = bonus.ability_score.name.toUpperCase().slice(0, 3); // e.g., "Strength" → "STR"
      if (totalScores[ability] != null) {
        totalScores[ability] += bonus.bonus;
      }
    });
  }

  // -----------------------------------
  // Render the Ability Score UI
  // -----------------------------------
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3 text-center">
          <strong>Ability Scores</strong>
        </h5>

        {/* Container for all ability boxes */}
        <div className="ability-score-container">
          {Object.entries(abilityScores).map(([ability, baseScore]) => {
            const total = totalScores[ability]; // Base + racial bonus
            const mod = getModifier(total); // Derived modifier
            const bonus = total - baseScore; // Racial bonus only

            return (
              <div key={ability} className="ability-box">
                {/* Ability abbreviation (STR, DEX, etc.) */}
                <div className="label">{ability}</div>

                {/* Modifier display */}
                <div className="modifier">{mod >= 0 ? `+${mod}` : mod}</div>

                {/* Total score shown in parentheses */}
                <div className="total">({total})</div>

                {/* Tooltip: shows breakdown of base and bonus */}
                <div className="tooltip">
                  Base: {baseScore}
                  {bonus !== 0 && <> | Racial Bonus: +{bonus}</>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Export the component for use elsewhere
export default AbilityScores;
