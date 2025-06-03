import React from "react";

function RaceDetails({ raceDetails, selectedRaceProficiencies, onToggle }) {
  if (!raceDetails) return null;

  const proficiencyOptions = raceDetails.starting_proficiency_options;

  return (
    <div className="mt-4">
      <h5>
        <strong>Race Details</strong>
      </h5>
      <p>
        <strong>Speed:</strong> {`${raceDetails.speed} Feet`}
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {raceDetails.languages.map((lang) => lang.name).join(", ")}
      </p>
      <p>{raceDetails.language_desc}</p>
      <p>
        <strong>Ability Bonuses:</strong>
      </p>
      <ul>
        {raceDetails.ability_bonuses.map((bonus, i) => (
          <li key={i}>
            {bonus.ability_score.name}: +{bonus.bonus}
          </li>
        ))}
      </ul>
      <p>
        <strong>Alignment:</strong> {raceDetails.alignment}
      </p>
      <p>
        <strong>Age:</strong> {raceDetails.age}
      </p>
      <p>
        <strong>Size:</strong> {raceDetails.size_description}
      </p>
      <p>
        <strong>Race Proficiencies:</strong>
      </p>
      <ul>
        {raceDetails.starting_proficiencies?.map((prof, i) => (
          <li key={i}>{prof.name}</li>
        ))}
      </ul>
      {proficiencyOptions.from?.options?.length > 0 && (
        <div className="mb-3">
          <h6>
            <strong>
              Choose {proficiencyOptions.choose} Proficiency/Proficiencies:
            </strong>
          </h6>
          {proficiencyOptions.from.options.map((option, i) => {
            const index = option.item.index;
            const name = option.item.name;

            return (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={index}
                  id={`race-prof-${index}`}
                  checked={selectedRaceProficiencies.includes(index)}
                  onChange={() => onToggle(index)}
                  disabled={
                    !selectedRaceProficiencies.includes(index) &&
                    selectedRaceProficiencies.length >=
                      proficiencyOptions.choose
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`race-prof-${index}`}
                >
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      )}
      <p>
        <strong>Traits:</strong>{" "}
        {raceDetails.traits.map((trait) => trait.name).join(", ")}
      </p>
    </div>
  );
}

export default RaceDetails;
