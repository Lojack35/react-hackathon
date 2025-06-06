# D&D 5E Character Generator

This is a full-featured **DnD 5th Edition Character Generator** built with **React + Vite** as part of my apprenticeship with Creating Coding Careers. The project allowed me creative freedom under the requirement to integrate at least **two external APIs**—a challenge I expanded into a rich, extensible app for tabletop gamers and character creators alike.

---

## What This App Does

This application enables users to **build a D&D 5E character from scratch** by selecting a **race**, **class**, and **background**, and then automatically fills out the **character sheet** using live data from open D&D 5E resources.

Key features:

- **Race/Class/Background Selection**  
  Users choose core components of their character, which drive stats like speed, ability bonuses, proficiencies, languages, and starting equipment.

- **Dynamic Stat Calculation**  
  Calculates ability score modifiers and applies racial bonuses in real-time.

- **Class-Based Proficiency and Equipment Options**  
  Presents conditional dropdowns and checkboxes depending on class selections (e.g., choose two skills, one weapon, etc.).

- **Live Character Sheet Preview**  
  The right-hand side of the screen updates upon generation click, giving a polished D&D-style display of:
  - Ability scores and modifiers
  - Combat stats (speed, initiative, hit dice, HP)
  - Saving throws and skill proficiencies
  - Languages and traits
  - Equipment list
  - Background and racial details

- **Character Portrait Generation (API)**  
  Integrates an image generation API to create a unique portrait based on the user’s selected class, race.

---

## Technologies Used

- **React** with functional components and hooks
- **Vite** for modern, lightning-fast frontend tooling
- **Bootstrap** for responsive styling
- **Open5e API + DnD 5e API (5e-bits)** for race/class/background/equipment data
- **OpenAI Image Generation API** (development mode only) for character portrait rendering

---

## APIs Integrated

1. **[5E SRD API (https://www.dnd5eapi.co)]**  
   Powers the race, class, background, proficiencies, and equipment data.

2. **[OpenAI Image API]**  
   Takes user selected class and race input and returns a fantasy-style character portrait.

---

## Future Plans / Improvements

This project is still actively evolving! Upcoming features include:

- **Print and Export Buttons**  
  Allow users to print or download their character sheet as a PDF.

- **Custom Image Prompt Input**  
  Let users write their own image prompt for portrait generation.

- **Improved Prompt Logic**  
  Refine the hardcoded portrait prompt to generate more consistent images based on the selected race/class.

- **Spellcaster Support**  
  Add spells, spell slots, and known spell lists for classes like Wizard, Sorcerer, or any other class with access to spellcasting.

- **Armor Class Calculation**  
  Automatically compute AC based on equipped armor and other modifiers.

- **Class-Specific Features**  
  Add more logic for class-based abilities like Divine Sense, Rage, Sneak Attack, etc.

- **Language Expansion**  
  Allow users to select bonus languages or dialects based on race/background.

- **Interactive Sheet Elements**  
  - Click-to-fill death save circles  
  - Editable HP/Temp HP fields  
  - Level control  
  - Toggle-able proficiencies

- **Codebase Optimization Goals**  
  - Refactor inline object generation (e.g., `formData`) into helper functions (`buildFormData()`) for cleaner JSX.
  - Extract reusable styling (e.g., shared card classNames) into a component (`<SectionCard />`) or CSS variables.
  - Modularize long logic chunks like skill proficiency mapping into utility functions.

---

## Author

**Austin Loucks**  
[LinkedIn](https://www.linkedin.com/in/austin-loucks/)  
U.S. Navy Veteran | Software Developer

---

## License

This project is open source and free to use under the [MIT License](LICENSE).
