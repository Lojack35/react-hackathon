import React from "react";

function FeaturesAndTraits({ raceDetails, classDetails, backgroundDetails }) {
  const traits = raceDetails?.traits || [];
  const classFeatures = classDetails?.proficiencies || []; // classDetails.features may not be available from this endpoint
  const languages = raceDetails?.languages?.map((lang) => lang.name) || [];

  const backgroundFeature = backgroundDetails?.feature;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">Features, Traits, & Languages</h5>

        {/* Race Traits */}
        {traits.length > 0 && (
          <>
            <h6>Racial Traits</h6>
            <ul>
              {traits.map((trait, i) => (
                <li key={`trait-${i}`}>{trait.name}</li>
              ))}
            </ul>
          </>
        )}

        {/* Class Features (usually proficiency-based here) */}
        {classFeatures.length > 0 && (
          <>
            <h6>Class Proficiencies</h6>
            <ul>
              {classFeatures.map((prof, i) => (
                <li key={`classprof-${i}`}>{prof.name}</li>
              ))}
            </ul>
          </>
        )}

        {/* Background Feature */}
        {backgroundFeature && (
          <>
            <h6>Background Feature: {backgroundFeature.name}</h6>
            <p>{backgroundFeature.desc}</p>
          </>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <>
            <h6>Languages</h6>
            <ul>
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
