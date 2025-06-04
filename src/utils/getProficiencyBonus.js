// D&D 5E proficiency bonus chart (levels 1–20)
export default function getProficiencyBonus(level) {
  if (level >= 1 && level <= 4) return 2;
  if (level >= 5 && level <= 8) return 3;
  if (level >= 9 && level <= 12) return 4;
  if (level >= 13 && level <= 16) return 5;
  if (level >= 17 && level <= 20) return 6;
  return 2; // fallback/default
}
