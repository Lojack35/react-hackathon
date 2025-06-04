import React from "react";
import "../CharacterSheet.css";

function ProficiencyBonus({ level, proficiencyBonus }) {
  return (
    <div className="card text-center mb-3">
      <div className="card-body">
        <h5 className="card-title mb-2">Proficiency Bonus</h5>
        <div className="fs-3 fw-bold">
          {proficiencyBonus >= 0 ? "+" : ""}
          {proficiencyBonus}
        </div>
        <div className="text-muted small">Based on level {level}</div>
      </div>
    </div>
  );
}

export default ProficiencyBonus;
