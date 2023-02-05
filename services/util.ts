export function isLocalDateValid(value: string) {
   return Number(value) && value.length === 8;
}
export function isLocalDateTime(value: string) {
   return Number(value) && value.length === 4;
}
