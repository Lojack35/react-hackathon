import React from "react";

function ClassDetails({
  classDetails,
  selectedClassProficiencies,
  selectedEquipment,
  setSelectedEquipment,
  onToggle,
}) {
  if (!classDetails) return null;

  const proficiencyChoice = classDetails.proficiency_choices?.[0];
  const equipmentOptions = classDetails.starting_equipment_options || [];

  return (
    <div className="mt-4">
      <h5>
        <strong>Class Details</strong>
      </h5>
      <p>
        <strong>Hit Die:</strong> 1d{classDetails.hit_die} / Lvl
      </p>
      {proficiencyChoice && (
        <div className="mb-3">
          <h6>
            <strong>
              Choose {proficiencyChoice.choose} Skill Proficiencies:
            </strong>
          </h6>
          {proficiencyChoice.from.options.map((option) => {
            const index = option.item.index;
            const name = option.item.name;

            return (
              <div key={index} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={index}
                  id={`prof-${index}`}
                  checked={selectedClassProficiencies.includes(index)}
                  onChange={() => onToggle(index)}
                  disabled={
                    !selectedClassProficiencies.includes(index) &&
                    selectedClassProficiencies.length >=
                      proficiencyChoice.choose
                  }
                />
                <label className="form-check-label" htmlFor={`prof-${index}`}>
                  {name}
                </label>
              </div>
            );
          })}
        </div>
      )}
      <p>
        <strong>Class Proficiencies:</strong>
      </p>
      <ul>
        {classDetails.proficiencies.map((prof, i) => (
          <li key={i}>{prof.name}</li>
        ))}
      </ul>
      {classDetails.starting_equipment?.length > 0 && (
        <>
          <p>
            <strong>Starting Class Equipment:</strong>
          </p>
          <ul>
            {classDetails.starting_equipment.map((item, i) => (
              <li key={i}>
                {item.equipment.name} x{item.quantity}
              </li>
            ))}
          </ul>
        </>
      )}
      {equipmentOptions.length > 0 && (
        <div className="mb-3">
          <h6>
            <strong>Choose Starting Class Equipment</strong>
          </h6>
          {equipmentOptions.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-2">
              <p>{group.desc}</p>
              <select
                className="form-select"
                value={selectedEquipment[groupIndex] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedEquipment((prev) => ({
                    ...prev,
                    [groupIndex]: value,
                  }));
                }}
              >
                <option value="">Select an option</option>
                {group.from.options.map((option, i) => {
                  // Handle counted_reference type
                  if (option.option_type === "counted_reference") {
                    const item = option.of;
                    return (
                      <option key={i} value={item.index}>
                        {item.name} x{option.count}
                      </option>
                    );
                  }

                  // Skip unsupported "choice" objects for now
                  if (option.option_type === "choice") {
                    return (
                      <option key={i} disabled>
                        ({option.choice.desc} - not yet supported)
                      </option>
                    );
                  }

                  return null;
                })}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClassDetails;
