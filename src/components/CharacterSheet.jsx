import React from "react";
import ProficiencyBonus from "./ProficiencyBonus";
import AbilityScores from "./AbilityScores";
import SavingThrows from "./SavingThrows";
import Skills from "./Skills";
import CombatStats from "./CombatStats";
import Equipment from "./Equipment";
import FeaturesAndTraits from "./FeaturesAndTraits";
import getProficiencyBonus from "../utils/getProficiencyBonus";
import "../CharacterSheet.css";

function CharacterSheet({ formData }) {
  if (!formData) return null;

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

  const level = 1; // TODO: make dynamic later
  const proficiencyBonus = getProficiencyBonus(level);

  // Get background skill proficiencies
  const backgroundSkills =
    backgroundDetails?.starting_proficiencies?.map((p) =>
      p.name.toLowerCase().replace("skill: ", "").trim()
    ) || [];

  // Get class skill proficiencies from selected indexes
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

  // Final combined list of skill proficiencies
  const skillProficiencies = [...backgroundSkills, ...classSkills];

  function getModifier(score) {
    return Math.floor((score - 10) / 2);
  }

  return (
    <div className="character-sheet container-fluid p-4 bg-light-subtle rounded shadow">
      {/* TOP SECTION: Name + Class/Level/Race/Background */}
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
              <strong>Level:</strong> 1
            </span>{" "}
            {/* TODO: make dynamic later */}
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-md-4">
          <div className="mb-3 text-center">
            <div className="placeholder-box">[ Image Placeholder ]</div>
          </div>

          <div className="mb-3">
            <ProficiencyBonus
              level={level}
              proficiencyBonus={proficiencyBonus}
            />
          </div>

          <div className="mb-3">
            <SavingThrows
              abilityScores={abilityScores}
              raceDetails={raceDetails}
              proficiencyBonus={proficiencyBonus} // TODO: make dynamic later
              proficiencies={classDetails?.saving_throws.map((st) =>
                st.name.toUpperCase().slice(0, 3)
              )}
            />
          </div>

          <div className="mb-3">
            <Skills
              abilityScores={abilityScores}
              raceDetails={raceDetails}
              proficiencyBonus={proficiencyBonus}
              skillProficiencies={skillProficiencies}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-8">
          <div className="mb-3">
            <AbilityScores
              abilityScores={abilityScores}
              raceDetails={raceDetails}
            />
          </div>

          <div className="mb-3">
            <CombatStats
              abilityScores={abilityScores}
              raceDetails={raceDetails}
              classDetails={classDetails}
              proficiencyBonus={proficiencyBonus}
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <Equipment
                classDetails={classDetails}
                selectedEquipment={selectedEquipment}
                backgroundDetails={backgroundDetails}
              />
            </div>
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
