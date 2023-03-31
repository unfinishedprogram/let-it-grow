function uuidDigit() {
    return ((Math.random() * 0xFFFF) | 0).toString(16).padStart(4, "0");
}

export default function genUUID(): string {
    return `${uuidDigit()}-${uuidDigit()}-${uuidDigit()}-${uuidDigit()}`;
}
