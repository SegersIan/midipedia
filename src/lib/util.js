export function toByteCode(value) {
    return Number(value)
        .toString(2)
        .padStart(8, '0');
}

export function toNumberCode(value) {
    return parseInt(value, 2);
}
