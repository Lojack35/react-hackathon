import { useState } from "react";
import { useDnDList, useDnDDetail } from "../hooks/useDnDData";
import RaceDetails from "./RaceDetails";
import ClassDetails from "./ClassDetails";
import BackgroundDetails from "./BackgroundDetails";

function CharacterForm() {
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

  // // Handle Class Proficiencies selection
  // const handleClassProficiencyToggle = (index) => {
  //   setSelectedClassProficiencies((prev) => {
  //     if (prev.includes(index)) {
  //       // Deselect if already selected
  //       return prev.filter((i) => i !== index);
  //     } else if (prev.length < classDetails.proficiency_choices[0].choose) {
  //       // Add new selection if under limit
  //       return [...prev, index];
  //     } else {
  //       // Ignore if limit reached
  //       return prev;
  //     }
  //   });
  // };

  // // Handle Race Proficiencies selection
  // const handleRaceProficiencyToggle = (index) => {
  //   setSelectedRaceProficiencies((prev) => {
  //     if (prev.includes(index)) {
  //       // Deselect if already selected
  //       return prev.filter((i) => i !== index);
  //     } else if (
  //       prev.length < raceDetails.starting_proficiency_options.choose
  //     ) {
  //       // Add new selection if under limit
  //       return [...prev, index];
  //     } else {
  //       // Ignore if limit reached
  //       return prev;
  //     }
  //   });
  // };

  const handleProficiencyToggle = (
    index,
    maxAllowed,
    selected,
    setSelected
  ) => {
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
              selectedRaceProficiencies,
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
              selectedClassProficiencies,
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
        <button className="btn btn-primary" disabled>
          Generate Character
        </button>
      </div>
    </div>
  );
}

export default CharacterForm;
