export function isLocalDateValid(value: string) {
   return Number(value) && value.length === 8;
}
export function isLocalTimeValid(value: string) {
   return Number(value) && value.length === 4;
}
