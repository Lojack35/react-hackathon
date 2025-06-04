import React from "react";
import "../CharacterSheet.css"; // keep using existing styles

function AbilityScores({ abilityScores, raceDetails }) {
  if (!abilityScores) return null;

  // Helper: calculate modifier
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Apply racial bonuses to create total scores
  const totalScores = { ...abilityScores };

  if (raceDetails?.ability_bonuses) {
    raceDetails.ability_bonuses.forEach((bonus) => {
      const ability = bonus.ability_score.name.toUpperCase().slice(0, 3); // "Strength" → "STR"
      if (totalScores[ability] != null) {
        totalScores[ability] += bonus.bonus;
      }
    });
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3 text-center">Ability Scores</h5>
        <div className="ability-score-container">
          {Object.entries(abilityScores).map(([ability, baseScore]) => {
            const total = totalScores[ability];
            const mod = getModifier(total);
            const bonus = total - baseScore;

            return (
              <div key={ability} className="ability-box">
                <div className="label">{ability}</div>
                <div className="modifier">{mod >= 0 ? `+${mod}` : mod}</div>
                <div className="total">({total})</div>
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

export default AbilityScores;
