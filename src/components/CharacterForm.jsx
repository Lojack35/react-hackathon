import { useState, useEffect } from "react";

function CharacterForm() {
  const [name, setName] = useState("");

  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedRace, setSelectedRace] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const [raceDetails, setRaceDetails] = useState(null);
  const [classDetails, setClassDetails] = useState(null);

  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState("");
  const [backgroundDetails, setBackgroundDetails] = useState(null);

  const [selectedClassProficiencies, setSelectedClassProficiencies] = useState(
    []
  );
  const [selectedRaceProficiencies, setSelectedRaceProficiencies] = useState(
    []
  );

  const [selectedEquipment, setSelectedEquipment] = useState([]);

  // Fetch race and class options on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const raceRes = await fetch("https://www.dnd5eapi.co/api/2014/races");
        const classRes = await fetch(
          "https://www.dnd5eapi.co/api/2014/classes"
        );
        const backgroundRes = await fetch(
          "https://www.dnd5eapi.co/api/2014/backgrounds"
        );

        const raceData = await raceRes.json();
        const classData = await classRes.json();
        const backgroundData = await backgroundRes.json();

        setBackgrounds(backgroundData.results);
        setRaces(raceData.results);
        setClasses(classData.results);
      } catch (err) {
        console.error("Error fetching base lists:", err);
      }
    };

    fetchData();
  }, []);

  // Fetch details about selected race
  useEffect(() => {
    if (!selectedRace) return;

    fetch(`https://www.dnd5eapi.co/api/2014/races/${selectedRace}`)
      .then((res) => res.json())
      .then((data) => setRaceDetails(data))
      .catch((err) => console.error("Failed to fetch race details:", err));
  }, [selectedRace]);

  // Fetch details about selected class
  useEffect(() => {
    if (!selectedClass) return;

    fetch(`https://www.dnd5eapi.co/api/2014/classes/${selectedClass}`)
      .then((res) => res.json())
      .then((data) => setClassDetails(data))
      .catch((err) => console.error("Failed to fetch class details:", err));
  }, [selectedClass]);

  // Fetch details about selected background
  useEffect(() => {
    if (!selectedBackground) return;

    fetch(`https://www.dnd5eapi.co/api/2014/backgrounds/${selectedBackground}`)
      .then((res) => res.json())
      .then((data) => setBackgroundDetails(data))
      .catch((err) =>
        console.error("Failed to fetch background details:", err)
      );
  }, [selectedBackground]);

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
        <div className="mt-4">
          <h5>
            <strong>Race Details</strong>
          </h5>
          <p>
            <strong>Speed:</strong> {`${raceDetails.speed} Feet`}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {raceDetails.languages.map((lang) => lang.name).join(", ")}
          </p>
          <p>{raceDetails.language_desc}</p>
          <p>
            <strong>Ability Bonuses:</strong>
          </p>
          <ul>
            {raceDetails.ability_bonuses.map((bonus, i) => (
              <li key={i}>
                {bonus.ability_score.name}: +{bonus.bonus}
              </li>
            ))}
          </ul>
          <p>
            <strong>Alignment:</strong> {raceDetails.alignment}
          </p>
          <p>
            <strong>Age:</strong> {raceDetails.age}
          </p>
          <p>
            <strong>Size:</strong> {raceDetails.size_description}
          </p>
          <p>
            <strong>Race Proficiencies:</strong>
          </p>
          <ul>
            {raceDetails.starting_proficiencies?.map((prof, i) => (
              <li key={i}>{prof.name}</li>
            ))}
          </ul>
          {raceDetails.starting_proficiency_options?.from?.options?.length >
            0 && (
            <div className="mb-3">
              <h6>
                <strong>
                  Choose {raceDetails.starting_proficiency_options.choose}{" "}
                  Proficiency/Proficiencies:
                </strong>
              </h6>
              {raceDetails.starting_proficiency_options.from.options.map(
                (option, i) => {
                  const index = option.item.index;
                  const name = option.item.name;

                  return (
                    <div key={index} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={index}
                        id={`race-prof-${index}`}
                        checked={selectedRaceProficiencies.includes(index)}
                        onChange={() => handleRaceProficiencyToggle(index)}
                        disabled={
                          !selectedRaceProficiencies.includes(index) &&
                          selectedRaceProficiencies.length >=
                            raceDetails.starting_proficiency_options.choose
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`race-prof-${index}`}
                      >
                        {name}
                      </label>
                    </div>
                  );
                }
              )}
            </div>
          )}
          <p>
            <strong>Traits:</strong>{" "}
            {raceDetails.traits.map((trait) => trait.name).join(", ")}
          </p>
        </div>
      )}

      {/* Display Class Details */}
      {classDetails && (
        <div className="mt-4">
          <h5>
            <strong>Class Details</strong>
          </h5>
          <p>
            <strong>Hit Die:</strong> 1d{classDetails.hit_die} / Lvl
          </p>
          {classDetails.proficiency_choices?.length > 0 && (
            <div className="mb-3">
              <h6>
                <strong>
                  Choose {classDetails.proficiency_choices[0].choose} Skill
                  Proficiencies:
                </strong>
              </h6>
              {classDetails.proficiency_choices[0].from.options.map(
                (option, i) => {
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
                        onChange={() => handleClassProficiencyToggle(index)}
                        disabled={
                          !selectedClassProficiencies.includes(index) &&
                          selectedClassProficiencies.length >=
                            classDetails.proficiency_choices[0].choose
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`prof-${index}`}
                      >
                        {name}
                      </label>
                    </div>
                  );
                }
              )}
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
          {classDetails?.starting_equipment_options?.length > 0 && (
            <div className="mb-3">
              <h6>
                <strong>Choose Starting Class Equipment</strong>
              </h6>
              {classDetails.starting_equipment_options.map(
                (group, groupIndex) => (
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
                )
              )}
            </div>
          )}
        </div>
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
