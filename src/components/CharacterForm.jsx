import { useState } from "react";
import { useDnDList, useDnDDetail } from "../hooks/useDnDData";
import RaceDetails from "./RaceDetails";
import ClassDetails from "./ClassDetails";

function CharacterForm() {
  const [name, setName] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedClassProficiencies, setSelectedClassProficiencies] = useState([]);
  const [selectedRaceProficiencies, setSelectedRaceProficiencies] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const { data: races } = useDnDList("races");
  const { data: classes } = useDnDList("classes");
  const { data: backgrounds } = useDnDList("backgrounds");

  const raceDetails = useDnDDetail("races", selectedRace);
  const classDetails = useDnDDetail("classes", selectedClass);
  const backgroundDetails = useDnDDetail("backgrounds", selectedBackground);

  // Handle Class Proficiencies selection
  const handleClassProficiencyToggle = (index) => {
    setSelectedClassProficiencies((prev) => {
      if (prev.includes(index)) {
        // Deselect if already selected
        return prev.filter((i) => i !== index);
      } else if (prev.length < classDetails.proficiency_choices[0].choose) {
        // Add new selection if under limit
        return [...prev, index];
      } else {
        // Ignore if limit reached
        return prev;
      }
    });
  };

  // Handle Race Proficiencies selection
  const handleRaceProficiencyToggle = (index) => {
    setSelectedRaceProficiencies((prev) => {
      if (prev.includes(index)) {
        // Deselect if already selected
        return prev.filter((i) => i !== index);
      } else if (
        prev.length < raceDetails.starting_proficiency_options.choose
      ) {
        // Add new selection if under limit
        return [...prev, index];
      } else {
        // Ignore if limit reached
        return prev;
      }
    });
  };

  // Handle Class Equipment selection
  const handleEquipmentToggle = (index) => {
    setSelectedEquipment((prev) => {
      if (prev.includes(index)) {
        // Deselect if already selected
        return prev.filter((i) => i !== index);
      } else {
        // Add new selection
        return [...prev, index];
      }
    });
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="card-title mb-3">Character Builder</h5>

      <div className="mb-3">
        <label className="form-label">Character Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Elrion the Bold"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Race</label>
        <select
          className="form-select"
          value={selectedRace}
          onChange={(e) => setSelectedRace(e.target.value)}
        >
          <option value="">Select a race</option>
          {races.map((race) => (
            <option key={race.index} value={race.index}>
              {race.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Class</label>
        <select
          className="form-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.index} value={cls.index}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Background</label>
        <select
          className="form-select"
          value={selectedBackground}
          onChange={(e) => setSelectedBackground(e.target.value)}
        >
          <option value="">Select a background</option>
          {backgrounds.map((bg) => (
            <option key={bg.index} value={bg.index}>
              {bg.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Race Details */}
      {raceDetails && (
        <RaceDetails
          raceDetails={raceDetails}
          selectedRaceProficiencies={selectedRaceProficiencies}
          onToggle={handleRaceProficiencyToggle}
        />
      )}

      {/* Display Class Details */}
      {classDetails && (
        <ClassDetails
          classDetails={classDetails}
          selectedClassProficiencies={selectedClassProficiencies}
          onToggle={handleClassProficiencyToggle}
          selectedEquipment={selectedEquipment}
          setSelectedEquipment={setSelectedEquipment}
        />
      )}

      {/* Display Background Details */}
      {backgroundDetails && (
        <div className="mt-4">
          <h5>
            <strong>Background Details</strong>
          </h5>
          <p>
            <strong>Feature:</strong> {backgroundDetails.feature.name}
          </p>
          <p>
            <strong>Feature Description:</strong>{" "}
            {backgroundDetails.feature.desc}
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
      )}

      <div className="d-grid mt-4">
        <button className="btn btn-primary" disabled>
          Generate Character
        </button>
      </div>
    </div>
  );
}

export default CharacterForm;
