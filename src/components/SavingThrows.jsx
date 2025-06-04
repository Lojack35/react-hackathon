import React from "react";
import "../CharacterSheet.css";

function SavingThrows({
  abilityScores,
  raceDetails,
  proficiencies,
  proficiencyBonus,
}) {
  if (!abilityScores) return null;

  const totalScores = { ...abilityScores };

  if (raceDetails?.ability_bonuses) {
    raceDetails.ability_bonuses.forEach((bonus) => {
      const ability = bonus.ability_score.name.toUpperCase().slice(0, 3); // "Strength" → "STR"
      if (totalScores[ability] != null) {
        totalScores[ability] += bonus.bonus;
      }
    });
  }

  const getModifier = (score) => Math.floor((score - 10) / 2);

  const abilities = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">Saving Throws</h5>
        <ul className="list-unstyled mb-0">
          {abilities.map((ability) => {
            const baseMod = getModifier(totalScores[ability]);
            const isProficient = proficiencies.includes(ability);
            const totalMod = isProficient
              ? baseMod + proficiencyBonus
              : baseMod;

            return (
              <li key={ability} className="d-flex align-items-center mb-2">
                <span
                  className={`circle me-2 ${isProficient ? "filled" : ""}`}
                ></span>
                <span className="me-2">{ability}</span>
                <span>
                  {totalMod >= 0 ? "+" : ""}
                  {totalMod}
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
