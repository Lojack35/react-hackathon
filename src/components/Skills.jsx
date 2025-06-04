import React from "react";
import "../CharacterSheet.css";

function Skills({
  abilityScores,
  raceDetails,
  proficiencyBonus,
  skillProficiencies,
}) {
  if (!abilityScores) return null;

  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Apply racial bonuses to get final ability scores
  const totalScores = { ...abilityScores };
  if (raceDetails?.ability_bonuses) {
    raceDetails.ability_bonuses.forEach((bonus) => {
      const ability = bonus.ability_score.name.toUpperCase().slice(0, 3);
      if (totalScores[ability] != null) {
        totalScores[ability] += bonus.bonus;
      }
    });
  }

  const skills = [
    { name: "Acrobatics", ability: "DEX" },
    { name: "Animal Handling", ability: "WIS" },
    { name: "Arcana", ability: "INT" },
    { name: "Athletics", ability: "STR" },
    { name: "Deception", ability: "CHA" },
    { name: "History", ability: "INT" },
    { name: "Insight", ability: "WIS" },
    { name: "Intimidation", ability: "CHA" },
    { name: "Investigation", ability: "INT" },
    { name: "Medicine", ability: "WIS" },
    { name: "Nature", ability: "INT" },
    { name: "Perception", ability: "WIS" },
    { name: "Performance", ability: "CHA" },
    { name: "Persuasion", ability: "CHA" },
    { name: "Religion", ability: "INT" },
    { name: "Sleight of Hand", ability: "DEX" },
    { name: "Stealth", ability: "DEX" },
    { name: "Survival", ability: "WIS" },
  ];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">Skills</h5>
        <ul className="list-unstyled mb-0">
          {skills.map((skill) => {
            const mod = getModifier(totalScores[skill.ability]);
            const isProficient = skillProficiencies.includes(
              skill.name.toLowerCase()
            );
            const total = isProficient ? mod + proficiencyBonus : mod;

            return (
              <li key={skill.name} className="d-flex align-items-center mb-2">
                <span
                  className={`circle me-2 ${isProficient ? "filled" : ""}`}
                ></span>
                <span className="me-2">{skill.name}</span>
                <span>
                  {total >= 0 ? "+" : ""}
                  {total}
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

export default Skills;
