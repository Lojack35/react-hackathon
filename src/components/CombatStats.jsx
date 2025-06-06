import React from "react";
import "../CharacterSheet.css";

function CombatStats({
  abilityScores, // Object with STR, DEX, etc.
  raceDetails, // Contains racial speed
  classDetails, // Contains hit_die info
}) {
  // Helper function to calculate ability modifier
  const getModifier = (score) => Math.floor((score - 10) / 2);

  // DEX modifier is used for Initiative
  const dexMod = getModifier(abilityScores.DEX);

  // Speed comes from race data or defaults to 30 ft
  const speed = raceDetails?.speed || 30;

  // Initiative uses DEX modifier
  const initiative = dexMod >= 0 ? `+${dexMod}` : dexMod;

  // Hit Die from class, fallback to d8 if undefined
  const hitDie = classDetails?.hit_die || "d8";

  // Max HP at level 1 = Hit Die max (assumed 10) + CON modifier
  const maxHP = 10 + getModifier(abilityScores.CON);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3 text-center">
          <strong>Combat Stats</strong>
        </h5>

        {/* --- Top Row: AC, Initiative, Speed --- */}
        <div className="row text-center mb-4">
          <div className="col">
            <strong>Armor Class</strong>
            {/* Placeholder – could calculate based on armor/equipment later */}
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

        {/* --- Second Row: HP and Hit Dice --- */}
        <div className="row text-center mb-4">
          <div className="col">
            <strong>Hit Dice</strong>
            <div className="fs-5">1d{hitDie}</div>
          </div>
          <div className="col">
            <strong>Max HP</strong>
            <div className="fs-5">{maxHP}</div>
          </div>
          <div className="col">
            <strong>Current HP</strong>
            {/* Static placeholder – could be editable or state-managed later */}
            <div className="fs-5">--</div>
          </div>
          <div className="col">
            <strong>Temp HP</strong>
            {/* Static placeholder – shows temporary bonus HP */}
            <div className="fs-5">--</div>
          </div>
        </div>

        {/* --- Death Saves (3 successes, 3 failures) --- */}
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
