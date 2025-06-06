import React from "react";

function Equipment({ classDetails, selectedEquipment, backgroundDetails }) {
  // If no class details are available, don't render anything
  if (!classDetails) return null;

  // Fixed class equipment (e.g., all Fighters get chain mail)
  const fixedEquipment = classDetails.starting_equipment || [];

  // Equipment the user can choose from (e.g., martial weapon or two simple weapons)
  const equipmentOptions = classDetails.starting_equipment_options || [];

  // Equipment granted by background (e.g., Thieves' tools for Criminal)
  const backgroundEquipment = backgroundDetails?.starting_equipment || [];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">
          <strong>Equipment</strong>
        </h5>
        <ul className="mb-0">
          {/* --- Fixed Class Equipment --- */}
          {fixedEquipment.map((item, i) => (
            <li key={`fixed-${i}`}>
              {item.equipment.name} x{item.quantity}
            </li>
          ))}

          {/* --- Background Equipment --- */}
          {backgroundEquipment.map((item, i) => (
            <li key={`fixed-${i}`}>
              {item.equipment.name} x{item.quantity}
            </li>
          ))}

          {/* --- User-Selected Starting Options (e.g., longsword vs shortsword) --- */}
          {selectedEquipment &&
            equipmentOptions.map((group, groupIndex) => {
              // Get the selected index for this group
              const selectedIndex = selectedEquipment[groupIndex];

              // Match it to the option list to get item info
              const match = group.from.options?.find((opt) => {
                // Only support counted_reference types for now
                if (opt.option_type === "counted_reference") {
                  return opt.of.index === selectedIndex;
                }
                return false;
              });

              // If there's a match, display the chosen item
              return match ? (
                <li key={`opt-${groupIndex}`}>
                  {match.of.name} x{match.count}
                </li>
              ) : (
                // If user hasn't selected an option yet
                <li key={`opt-${groupIndex}`} className="text-muted fst-italic">
                  (No selection made)
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Equipment;
