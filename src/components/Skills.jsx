import React from "react";
import "../CharacterSheet.css"; // Import shared styling for consistent UI design

// Skills Component
// Displays a list of all D&D 5E skills, showing the modifier for each skill
// and whether the character is proficient in it (with a filled circle and bonus)

// Props:
// - abilityScores: object with base scores like { STR: 14, DEX: 16, ... }
// - raceDetails: may include racial ability bonuses to apply
// - proficiencyBonus: number (usually 2 at level 1)
// - skillProficiencies: array of lowercase skill names the character is proficient in (e.g., ["stealth", "perception"])
function Skills({
  abilityScores,
  raceDetails,
  proficiencyBonus,
  skillProficiencies,
}) {
  // If ability scores haven't been provided yet, don't render anything
  if (!abilityScores) return null;

  // Helper function to convert a score to a modifier (D&D 5E rule)
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // Create a copy of the scores to modify with racial bonuses
  const totalScores = { ...abilityScores };

  // Apply racial bonuses to ability scores (e.g., +2 DEX from Elf)
  if (raceDetails?.ability_bonuses) {
    raceDetails.ability_bonuses.forEach((bonus) => {
      const ability = bonus.ability_score.name.toUpperCase().slice(0, 3); // "Strength" → "STR"
      if (totalScores[ability] != null) {
        totalScores[ability] += bonus.bonus;
      }
    });
  }

  // Static list of all 18 skills and their associated abilities
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
        <h5 className="mb-3">
          <strong>Skills</strong>
        </h5>

        {/* Render each skill and its calculated modifier */}
        <ul className="list-unstyled mb-0">
          {skills.map((skill) => {
            const mod = getModifier(totalScores[skill.ability]); // Base modifier
            const isProficient = skillProficiencies.includes(
              skill.name.toLowerCase()
            ); // Check if proficient in this skill
            const total = isProficient ? mod + proficiencyBonus : mod; // Add bonus if proficient

            return (
              <li key={skill.name} className="d-flex align-items-center mb-2">
                {/* Icon indicates whether the skill is proficient */}
                <span
                  className={`circle me-2 ${isProficient ? "filled" : ""}`}
                ></span>

                {/* Skill name (e.g., "Stealth") */}
                <span className="me-2">{skill.name}</span>

                {/* Final modifier, e.g. +5 or -1 */}
                <span>
                  {total >= 0 ? "+" : ""}
                  {total}

                  {/* If proficient, also show what part of the modifier came from proficiency */}
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
