"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalTimeValid = exports.isLocalDateValid = void 0;
function isLocalDateValid(value) {
    return Number(value) && value.length === 8;
}
exports.isLocalDateValid = isLocalDateValid;
function isLocalTimeValid(value) {
    return Number(value) && value.length === 4;
}
exports.isLocalTimeValid = isLocalTimeValid;
