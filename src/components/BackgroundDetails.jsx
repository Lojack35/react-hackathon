import React from "react";

function BackgroundDetails({ backgroundDetails }) {
  if (!backgroundDetails) return null;

  return (
    <div className="mt-4">
      <h5>
        <strong>Background Details</strong>
      </h5>
      <p>
        <strong>Feature:</strong> {backgroundDetails.feature.name}
      </p>
      <p>
        <strong>Feature Description:</strong> {backgroundDetails.feature.desc}
      </p>
      <p>
        <strong>Proficiencies:</strong>
      </p>
      <ul>
        {backgroundDetails.starting_proficiencies?.map((prof, i) => (
          <li key={i}>{prof.name}</li>
        ))}
      </ul>
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

export default BackgroundDetails;
