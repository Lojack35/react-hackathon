// ------------------------------
// getProficiencyBonus.js
// ------------------------------
// Utility function that determines a character's proficiency bonus
// in DnD 5E based on their level (1–20).

// Exported as the default function from this module.
export default function getProficiencyBonus(level) {
  // Levels 1–4: Proficiency bonus is +2
  if (level >= 1 && level <= 4) return 2;

  // Levels 5–8: Proficiency bonus is +3
  if (level >= 5 && level <= 8) return 3;

  // Levels 9–12: Proficiency bonus is +4
  if (level >= 9 && level <= 12) return 4;

  // Levels 13–16: Proficiency bonus is +5
  if (level >= 13 && level <= 16) return 5;

  // Levels 17–20: Proficiency bonus is +6
  if (level >= 17 && level <= 20) return 6;

  // Fallback value: If level is invalid or missing, return +2 by default
  return 2;
}
