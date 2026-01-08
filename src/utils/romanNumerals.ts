/**
 * Map century names to Roman numerals
 */
const CENTURY_MAP: Record<string, string> = {
  'XI': 'XI',
  'XII': 'XII',
  'XIII': 'XIII',
  'XIV': 'XIV',
  'XV': 'XV',
  'XVI': 'XVI',
  'XVII': 'XVII',
  'XVIII': 'XVIII',
  'XIX': 'XIX',
  'XX': 'XX',
  'XXI': 'XXI'
};

export function getRomanNumeral(century: string): string {
  return CENTURY_MAP[century] || century;
}

export function getCenturyDisplayName(century: string): string {
  return `${getRomanNumeral(century)} Century`;
}

/**
 * Map Roman numerals to numbers for odometer display
 */
const ROMAN_TO_NUMBER: Record<string, number> = {
  'I': 1,
  'II': 2,
  'III': 3,
  'IV': 4,
  'V': 5,
  'VI': 6,
  'VII': 7,
  'VIII': 8,
  'IX': 9,
  'X': 10,
  'XI': 11,
  'XII': 12,
  'XIII': 13,
  'XIV': 14,
  'XV': 15,
  'XVI': 16,
  'XVII': 17,
  'XVIII': 18,
  'XIX': 19,
  'XX': 20,
  'XXI': 21
};

/**
 * Convert Roman numeral to number for odometer display
 */
export function romanToNumber(roman: string): number {
  return ROMAN_TO_NUMBER[roman] || 0;
}
