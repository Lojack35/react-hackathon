import { useState } from "react";
import { useDnDList, useDnDDetail } from "../hooks/useDnDData";
import RaceDetails from "./RaceDetails";
import ClassDetails from "./ClassDetails";
import BackgroundDetails from "./BackgroundDetails";

function CharacterForm({ onGenerate }) {
  const [name, setName] = useState("");
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedClassProficiencies, setSelectedClassProficiencies] = useState(
    []
  );
  const [selectedRaceProficiencies, setSelectedRaceProficiencies] = useState(
    []
  );
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const { data: races } = useDnDList("races");
  const { data: classes } = useDnDList("classes");
  const { data: backgrounds } = useDnDList("backgrounds");

  const raceDetails = useDnDDetail("races", selectedRace);
  const classDetails = useDnDDetail("classes", selectedClass);
  const backgroundDetails = useDnDDetail("backgrounds", selectedBackground);

  const handleProficiencyToggle = (index, maxAllowed, setSelected) => {
    setSelected((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else if (prev.length < maxAllowed) {
        return [...prev, index];
      } else {
        return prev;
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
          onToggle={(index) =>
            handleProficiencyToggle(
              index,
              raceDetails.starting_proficiency_options?.choose,
              setSelectedRaceProficiencies
            )
          }
        />
      )}

      {/* Display Class Details */}
      {classDetails && (
        <ClassDetails
          classDetails={classDetails}
          selectedClassProficiencies={selectedClassProficiencies}
          onToggle={(index) =>
            handleProficiencyToggle(
              index,
              classDetails.proficiency_choices[0].choose,
              setSelectedClassProficiencies
            )
          }
          selectedEquipment={selectedEquipment}
          setSelectedEquipment={setSelectedEquipment}
        />
      )}

      {/* Display Background Details */}
      {backgroundDetails && (
        <BackgroundDetails backgroundDetails={backgroundDetails} />
      )}

      <div className="d-grid mt-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            const formData = {
              name,
              selectedRace,
              selectedClass,
              selectedBackground,
              selectedClassProficiencies,
              selectedRaceProficiencies,
              selectedEquipment,
              raceDetails,
              classDetails,
              backgroundDetails,
            };
            onGenerate(formData);
          }}
          disabled={
            !name || !selectedRace || !selectedClass || !selectedBackground
          }
        >
          Generate Character
        </button>
      </div>
    </div>
  );
}

export default CharacterForm;
