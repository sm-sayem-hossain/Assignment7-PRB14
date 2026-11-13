const bnDigits = "০১২৩৪৫৬৭৮৯";

export function toBn(num: number): string {
  return num.toString().replace(/\d/g, (d) => bnDigits[Number(d)]);
}

const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function unitBn(unit: string): string {
  return unitMap[unit] ?? unit;
}