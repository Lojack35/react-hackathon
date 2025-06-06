import React from "react";
import "../CharacterSheet.css"; // Import custom CSS styles for consistent UI

// SavingThrows Component
// Displays a list of ability saving throws with modifiers and proficiency indicators
// Props:
// - abilityScores: base ability scores (e.g., { STR: 15, DEX: 13 })
// - raceDetails: includes racial ability bonuses (optional)
// - proficiencies: array of saving throw proficiencies for the class (e.g., ["STR", "CON"])
// - proficiencyBonus: numeric bonus applied to proficient saving throws (e.g., +2 at level 1)
function SavingThrows({
  abilityScores,
  raceDetails,
  proficiencies,
  proficiencyBonus,
}) {
  // If no ability scores are provided, render nothing
  if (!abilityScores) return null;

  // Clone abilityScores to avoid mutating props
  const totalScores = { ...abilityScores };

  // Apply racial bonuses to ability scores
  // Example: +2 STR from Half-Orc → STR = 15 becomes 17
  if (raceDetails?.ability_bonuses) {
    raceDetails.ability_bonuses.forEach((bonus) => {
      const ability = bonus.ability_score.name.toUpperCase().slice(0, 3); // "Strength" → "STR"
      if (totalScores[ability] != null) {
        totalScores[ability] += bonus.bonus;
      }
    });
  }

  // Calculate ability modifier using standard 5E formula: (score - 10) / 2, rounded down
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Ordered list of the six standard abilities
  const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">
          <strong>Saving Throws</strong>
        </h5>

        {/* Iterate over each ability to calculate and display its saving throw */}
        <ul className="list-unstyled mb-0">
          {abilities.map((ability) => {
            const baseMod = getModifier(totalScores[ability]); // Modifier from total score
            const isProficient = proficiencies.includes(ability); // Check if character is proficient in this saving throw
            const totalMod = isProficient
              ? baseMod + proficiencyBonus
              : baseMod; // Add proficiency bonus if applicable

            return (
              <li key={ability} className="d-flex align-items-center mb-2">
                {/* Filled circle indicates proficiency */}
                <span
                  className={`circle me-2 ${isProficient ? "filled" : ""}`}
                ></span>

                {/* Ability name (e.g., STR) */}
                <span className="me-2">{ability}</span>

                {/* Final modifier display (e.g., +4) */}
                <span>
                  {totalMod >= 0 ? "+" : ""}
                  {totalMod}

                  {/* Show the proficiency bonus separately for reference if applicable */}
                  {isProficient && (
                    <span className="text-muted ms-1">
                      [+{proficiencyBonus}]
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SavingThrows;
