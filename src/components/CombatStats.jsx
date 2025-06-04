import React from "react";
import "../CharacterSheet.css";

function CombatStats({
  abilityScores,
  raceDetails,
  classDetails,
  proficiencyBonus,
}) {
  const getModifier = (score) => Math.floor((score - 10) / 2);

  const dexMod = getModifier(abilityScores.DEX);
  const speed = raceDetails?.speed || 30;
  const initiative = dexMod >= 0 ? `+${dexMod}` : dexMod;

  const hitDie = classDetails?.hit_die || "d8";
  const maxHP = 10 + getModifier(abilityScores.CON); // Simple level 1 calc

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3 text-center">Combat Stats</h5>
        <div className="row text-center mb-4">
          <div className="col">
            <strong>Armor Class</strong>
            <div className="fs-4 border rounded p-2 bg-white">--</div>
          </div>
          <div className="col">
            <strong>Initiative</strong>
            <div className="fs-4 border rounded p-2 bg-white">{initiative}</div>
          </div>
          <div className="col">
            <strong>Speed</strong>
            <div className="fs-4 border rounded p-2 bg-white">{speed} ft</div>
          </div>
        </div>

        <div className="row text-center mb-4">
          <div className="col">
            <strong>Hit Dice</strong>
            <div className="fs-5">{hitDie}</div>
          </div>
          <div className="col">
            <strong>Max HP</strong>
            <div className="fs-5">{maxHP}</div>
          </div>
          <div className="col">
            <strong>Current HP</strong>
            <div className="fs-5">--</div>
          </div>
          <div className="col">
            <strong>Temp HP</strong>
            <div className="fs-5">--</div>
          </div>
        </div>

        <div className="text-center">
          <strong>Death Saves</strong>
          <div className="d-flex justify-content-center gap-4 mt-2">
            <div>
              <div>Success</div>
              <div className="d-flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="death-save-circle" />
                ))}
              </div>
            </div>
            <div>
              <div>Failure</div>
              <div className="d-flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="death-save-circle" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombatStats;
