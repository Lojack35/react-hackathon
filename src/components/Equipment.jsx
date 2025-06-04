import React from "react";

function Equipment({ classDetails, selectedEquipment, backgroundDetails }) {
  if (!classDetails) return null;

  const fixedEquipment = classDetails.starting_equipment || [];
  const equipmentOptions = classDetails.starting_equipment_options || [];
  const backgroundEquipment = backgroundDetails?.starting_equipment || [];

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="mb-3">Equipment</h5>
        <ul className="mb-0">
          {/* Fixed Equipment */}
          {fixedEquipment.map((item, i) => (
            <li key={`fixed-${i}`}>
              {item.equipment.name} x{item.quantity}
            </li>
          ))}

          {/* Background Equipment */}
          {backgroundEquipment.map((item, i) => (
            <li key={`fixed-${i}`}>
              {item.equipment.name} x{item.quantity}
            </li>
          ))}

          {/* Chosen Equipment Options */}
          {selectedEquipment &&
            equipmentOptions.map((group, groupIndex) => {
              const selectedIndex = selectedEquipment[groupIndex];

              const match = group.from.options.find((opt) => {
                if (opt.option_type === "counted_reference") {
                  return opt.of.index === selectedIndex;
                }
                return false;
              });

              return match ? (
                <li key={`opt-${groupIndex}`}>
                  {match.of.name} x{match.count}
                </li>
              ) : (
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
