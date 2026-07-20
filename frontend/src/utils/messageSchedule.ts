export interface Word {

    index: number;

    binary: string;

    hex: string;

    //decimal: number;

}

export function splitIntoWords(block: string): Word[] {

    const words: Word[] = [];

    for (let i = 0; i < 16; i++) {

        const binary = block.slice(i * 32, (i + 1) * 32);

        words.push({

            index: i,

            binary,

            hex: binaryToHex(binary)

        });

    }

    return words;

}

export function binaryToHex(binary: string): string {

    return parseInt(binary, 2)
        .toString(16)
        .padStart(8, "0");

}