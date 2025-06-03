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
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3 text-center">Character Sheet</h2>

      {/* Basic Info */}
      <section className="mb-3">
        <h4>Identity</h4>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Race:</strong> {raceDetails?.name || selectedRace}
        </p>
        <p>
          <strong>Class:</strong> {classDetails?.name || selectedClass}
        </p>
        <p>
          <strong>Background:</strong>{" "}
          {backgroundDetails?.name || selectedBackground}
        </p>
      </section>

      {/* Ability Scores */}
      {raceDetails?.ability_bonuses?.length > 0 && (
        <section className="mb-3">
          <h4>Ability Bonuses</h4>
          <ul>
            {raceDetails.ability_bonuses.map((ab, i) => (
              <li key={i}>
                {ab.ability_score.name}: +{ab.bonus}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Proficiencies */}
      <section className="mb-3">
        <h4>Proficiencies</h4>

        <p>
          <strong>Race Proficiencies:</strong>
        </p>
        <ul>
          {raceDetails?.starting_proficiencies?.map((prof, i) => (
            <li key={i}>{prof.name}</li>
          ))}
          {selectedRaceProficiencies.map((index) => {
            const match =
              raceDetails?.starting_proficiency_options?.from.options.find(
                (opt) => opt.item.index === index
              );
            return match ? <li key={index}>{match.item.name}</li> : null;
          })}
        </ul>

        <p>
          <strong>Class Proficiencies:</strong>
        </p>
        <ul>
          {classDetails?.proficiencies?.map((prof, i) => (
            <li key={i}>{prof.name}</li>
          ))}
          {selectedClassProficiencies.map((index) => {
            const match =
              classDetails?.proficiency_choices?.[0]?.from.options.find(
                (opt) => opt.item.index === index
              );
            return match ? <li key={index}>{match.item.name}</li> : null;
          })}
        </ul>
      </section>

      {/* Equipment */}
      <section className="mb-3">
        <h4>Starting Equipment</h4>
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
      </section>

      {/* Traits */}
      {raceDetails?.traits?.length > 0 && (
        <section className="mb-3">
          <h4>Traits</h4>
          <ul>
            {raceDetails.traits.map((trait, i) => (
              <li key={i}>{trait.name}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Background Feature */}
      {backgroundDetails?.feature && (
        <section className="mb-3">
          <h4>Background Feature</h4>
          <p>
            <strong>{backgroundDetails.feature.name}</strong>
          </p>
          <p>{backgroundDetails.feature.desc}</p>
        </section>
      )}

      {/* Actions */}
      <div className="mt-4 text-center">
        <button className="btn btn-outline-secondary me-2">Edit</button>
        <button className="btn btn-outline-success me-2">Save as PDF</button>
        <button className="btn btn-outline-primary">Print</button>
      </div>
    </div>
  );
}

export default CharacterSheet;
