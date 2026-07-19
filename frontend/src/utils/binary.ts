export interface BinaryItem {
    character: string;
    ascii: number;
    binary: string;
}

export function textToBinary(text: string): BinaryItem[] {
    return text.split("").map((char) => {
        const ascii = char.charCodeAt(0);

        return {
            character: char,
            ascii,
            binary: ascii.toString(2).padStart(8, "0"),
        };
    });
}