import React from "react";

// FeaturesAndTraits Component
// Responsible for rendering:
// - Racial Traits
// - Class Proficiencies (not full class features; only what's available from the API)
// - Background Feature (e.g., special passive perk)
// - Known Languages
function FeaturesAndTraits({ raceDetails, classDetails, backgroundDetails }) {
  // Extract racial traits array (e.g., "Darkvision", "Fey Ancestry")
  const traits = raceDetails?.traits || [];

  // Extract class proficiencies (this includes weapons, tools, and saving throws, NOT features like Rage or Spellcasting)
  const classProficiencies = classDetails?.proficiencies || [];

  // Extract known languages from the race (e.g., Common, Elvish)
  const languages = raceDetails?.languages?.map((lang) => lang.name) || [];

  // Extract the special feature from the background (e.g., "Criminal Contact" or "Ship's Passage")
  const backgroundFeature = backgroundDetails?.feature;

  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* === Section Title === */}
        <h5 className="mb-3">
          <strong>Features, Traits, & Languages</strong>
        </h5>

        {/* === Racial Traits Section === */}
        {traits.length > 0 && (
          <>
            <h6>Racial Traits:</h6>
            <ul>
              {/* Display each trait by name */}
              {traits.map((trait, i) => (
                <li key={`trait-${i}`}>{trait.name}</li>
              ))}
            </ul>
          </>
        )}

        {/* === Class Proficiencies Section === */}
        {classProficiencies.length > 0 && (
          <>
            <h6>Class Proficiencies:</h6>
            <ul>
              {/* Display each proficiency (could be armor, weapons, saving throws, etc.) */}
              {classProficiencies.map((prof, i) => (
                <li key={`classprof-${i}`}>{prof.name}</li>
              ))}
            </ul>
          </>
        )}

        {/* === Background Feature Section === */}
        {backgroundFeature && (
          <>
            <h6>Background Feature:</h6>
            {/* Feature name only; the full description is available but not shown here */}
            <p>{backgroundFeature.name}</p>
          </>
        )}

        {/* === Languages Section === */}
        {languages.length > 0 && (
          <>
            <h6>Languages:</h6>
            <ul>
              {/* Display each known language */}
              {languages.map((lang, i) => (
                <li key={`lang-${i}`}>{lang}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default FeaturesAndTraits;
