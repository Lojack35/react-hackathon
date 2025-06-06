import React from "react";

// RaceDetails Component
// Displays detailed information about the selected race including stats, traits, and proficiency options
// Props:
// - raceDetails: data object for the selected race (from the API)
// - selectedRaceProficiencies: array of selected proficiencies by index
// - onToggle: handler to toggle selected proficiencies
function RaceDetails({ raceDetails, selectedRaceProficiencies, onToggle }) {
  // If no race is selected or race details aren't loaded, render nothing
  if (!raceDetails) return null;

  // Shortcut for optional starting proficiencies the user can choose from
  const proficiencyOptions = raceDetails.starting_proficiency_options;

  return (
    <div className="mt-4">
      <h5>
        <strong>Race Details</strong>
      </h5>

      {/* Movement speed */}
      <p>
        <strong>Speed:</strong> {`${raceDetails.speed} Feet`}
      </p>

      {/* Known languages */}
      <p>
        <strong>Languages:</strong>{" "}
        {raceDetails.languages.map((lang) => lang.name).join(", ")}
      </p>

      {/* Language description (e.g., common speech notes) */}
      <p>{raceDetails.language_desc}</p>

      {/* Ability score bonuses (e.g., +2 STR, +1 CON) */}
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

      {/* Alignment suggestion for the race (flavor text) */}
      <p>
        <strong>Alignment:</strong> {raceDetails.alignment}
      </p>

      {/* Age range or lifespan of the race */}
      <p>
        <strong>Age:</strong> {raceDetails.age}
      </p>

      {/* Size description (e.g., Medium, Small) */}
      <p>
        <strong>Size:</strong> {raceDetails.size_description}
      </p>

      {/* Fixed racial proficiencies (always granted) */}
      <p>
        <strong>Race Proficiencies:</strong>
      </p>
      <ul>
        {raceDetails.starting_proficiencies?.map((prof, i) => (
          <li key={i}>{prof.name}</li>
        ))}
      </ul>

      {/* Optional proficiencies the user can choose from */}
      {proficiencyOptions?.from?.options?.length > 0 && (
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
                  checked={selectedRaceProficiencies.includes(index)} // Checked if already selected
                  onChange={() => onToggle(index)} // Toggle handler
                  disabled={
                    // Disable if max number already selected and this isn't one of them
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

      {/* Trait names listed in a comma-separated string */}
      <p>
        <strong>Traits:</strong>{" "}
        {raceDetails.traits.map((trait) => trait.name).join(", ")}
      </p>
    </div>
  );
}

export default RaceDetails;
