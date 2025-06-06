// ------------------------------
// BackgroundDetails.jsx
// ------------------------------
// Displays details about the selected character background,
// including features, proficiencies, and starting equipment.
// ------------------------------

import React from "react";

// Functional component that receives backgroundDetails as props
function BackgroundDetails({ backgroundDetails }) {
  // If no background details are available, render nothing
  if (!backgroundDetails) return null;

  return (
    <div className="mt-4">
      {/* Section Title */}
      <h5>
        <strong>Background Details</strong>
      </h5>

      {/* Background Feature */}
      <p>
        <strong>Feature:</strong> {backgroundDetails.feature.name}
      </p>
      <p>
        <strong>Feature Description:</strong> {backgroundDetails.feature.desc}
      </p>

      {/* Starting Proficiencies List */}
      <p>
        <strong>Proficiencies:</strong>
      </p>
      <ul>
        {backgroundDetails.starting_proficiencies?.map((prof, i) => (
          <li key={i}>{prof.name}</li>
        ))}
      </ul>

      {/* Starting Equipment List */}
      <p>
        <strong>Starting Equipment:</strong>
      </p>
      <ul>
        {backgroundDetails.starting_equipment?.map((item, i) => (
          <li key={i}>
            {item.equipment.name} x{item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Export for use in CharacterForm or other components
export default BackgroundDetails;
