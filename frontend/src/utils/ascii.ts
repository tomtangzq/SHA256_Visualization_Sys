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

export interface AsciiInfo {
    character: string;
    ascii: number;
    binary: string;
    hex: string;
}

export function getAsciiInfo(input: string): AsciiInfo[] {
    return input.split("").map((char) => {
        const ascii = char.charCodeAt(0);

        return {
            character: char,
            ascii,
            binary: ascii.toString(2).padStart(8, "0"),
            hex: ascii.toString(16).toUpperCase().padStart(2, "0"),
        };
    });
}