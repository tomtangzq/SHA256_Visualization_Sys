import { binaryToHex } from "./binary";
import {
    binaryToUint32,
    uint32ToBinary,
    rightRotate,
    add32
} from "./sha256Functions";

export interface Word {

    index: number;

    binary: string;

    hex: string;

    //decimal: number;

}

export function generateInitialWords(block: string): Word[] {

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

function smallSigma0(binary: string): number {

    const x = binaryToUint32(binary);

    return (
        rightRotate(x, 7)
        ^
        rightRotate(x, 18)
        ^
        (x >>> 3)
    ) >>> 0;

}

function smallSigma1(binary: string): number {

    const x = binaryToUint32(binary);

    return (
        rightRotate(x, 17)
        ^
        rightRotate(x, 19)
        ^
        (x >>> 10)
    ) >>> 0;

}

export function generateMessageSchedule(block: string): Word[] {

    const words = generateInitialWords(block);

    for (let i = 16; i < 64; i++) {

        const s0 = smallSigma0(words[i - 15].binary);

        const s1 = smallSigma1(words[i - 2].binary);

        const w16 = binaryToUint32(words[i - 16].binary);

        const w7 = binaryToUint32(words[i - 7].binary);

        const sum1 = add32(w16, s0);

        const sum2 = add32(sum1, w7);

        const result = add32(sum2, s1);

        const binary = uint32ToBinary(result);

        words.push({

            index: i,

            binary,

            hex: binaryToHex(binary)

        });

    }

    return words;

}