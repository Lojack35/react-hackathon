import React from "react";

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
  } = formData;

  return (
    <div className="card p-3 shadow-lg bg-light-subtle">
      <div className="card-body">
        <div className="container-fluid">
          {/* TOP ROW: Character Name + Class/Race/Background */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-8">
                  <h2 className="mb-1">{name || "Unnamed Hero"}</h2>
                </div>
                <div className="col-md-4">
                  <p className="mb-1">
                    <strong>Class:</strong>{" "}
                    {classDetails?.name || selectedClass}
                  </p>
                  <p className="mb-1">
                    <strong>Race:</strong> {raceDetails?.name || selectedRace}
                  </p>
                  <p className="mb-1">
                    <strong>Background:</strong>{" "}
                    {backgroundDetails?.name || selectedBackground}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ABILITY BONUSES */}
          <div className="card mb-3">
            <div className="card-body">
              {raceDetails?.ability_bonuses?.length > 0 && (
                <div className="row mb-4">
                  <div className="col">
                    <h5>Ability Bonuses</h5>
                    <div className="d-flex flex-wrap">
                      {raceDetails.ability_bonuses.map((ab, i) => (
                        <div key={i} className="me-4">
                          <strong>{ab.ability_score.name}:</strong> +{ab.bonus}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PROFICIENCIES */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5>Race Proficiencies</h5>
                  <ul className="mb-0">
                    {raceDetails?.starting_proficiencies?.map((prof, i) => (
                      <li key={i}>{prof.name}</li>
                    ))}
                    {selectedRaceProficiencies.map((index) => {
                      const match =
                        raceDetails?.starting_proficiency_options?.from.options.find(
                          (opt) => opt.item.index === index
                        );
                      return match ? (
                        <li key={index}>{match.item.name}</li>
                      ) : null;
                    })}
                  </ul>
                </div>

                <div className="col-md-6">
                  <h5>Class Proficiencies</h5>
                  <ul className="mb-0">
                    {classDetails?.proficiencies?.map((prof, i) => (
                      <li key={i}>{prof.name}</li>
                    ))}
                    {selectedClassProficiencies.map((index) => {
                      const match =
                        classDetails?.proficiency_choices?.[0]?.from.options.find(
                          (opt) => opt.item.index === index
                        );
                      return match ? (
                        <li key={index}>{match.item.name}</li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* EQUIPMENT + TRAITS */}
          <div className="row mb-4">
            <div className="col-md-6">
              <h5>Starting Equipment</h5>
              <ul>
                {classDetails?.starting_equipment?.map((item, i) => (
                  <li key={i}>
                    {item.equipment.name} x{item.quantity}
                  </li>
                ))}
                {selectedEquipment &&
                  classDetails?.starting_equipment_options?.map(
                    (group, groupIndex) => {
                      const selectedIndex = selectedEquipment[groupIndex];
                      const match = group.from.options.find((opt) => {
                        if (opt.option_type === "counted_reference") {
                          return opt.of.index === selectedIndex;
                        }
                        return false;
                      });
                      return match ? (
                        <li key={groupIndex}>
                          {match.of.name} x{match.count}
                        </li>
                      ) : null;
                    }
                  )}
              </ul>
            </div>

            <div className="col-md-6">
              <h5>Traits</h5>
              <ul>
                {raceDetails?.traits?.map((trait, i) => (
                  <li key={i}>{trait.name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* BACKGROUND FEATURE */}
          {backgroundDetails?.feature && (
            <div className="row mb-4">
              <div className="col">
                <h5>Background Feature: {backgroundDetails.feature.name}</h5>
                <p>{backgroundDetails.feature.desc}</p>
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="row">
            <div className="col text-center">
              <button className="btn btn-outline-secondary me-2">Edit</button>
              <button className="btn btn-outline-success me-2">
                Save as PDF
              </button>
              <button className="btn btn-outline-primary">Print</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterSheet;
