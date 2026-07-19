export interface AsciiItem {
    character: string;
    ascii: number;
}

export function textToAscii(text: string): AsciiItem[] {
    return text.split("").map((char) => ({
        character: char,
        ascii: char.charCodeAt(0),
    }));
}