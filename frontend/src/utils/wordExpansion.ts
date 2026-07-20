import type { Word } from "./messageSchedule";

import {
    sigma0,
    sigma1,
    binaryToUint32,
    uint32ToBinary,
} from "./sha256Functions";

/**
 * 用于保存一次 Word Expansion 的完整计算过程
 */
export interface ExpansionResult {
    targetIndex: number;

    sigma1: Word;

    wordMinus7: Word;

    sigma0: Word;

    wordMinus16: Word;

    result: Word;
}

/**
 * Binary -> Hex
 */
function binaryToHex(binary: string): string {
    return parseInt(binary, 2)
        .toString(16)
        .padStart(8, "0");
}


/**
 * Calculate Wi (i >= 16)
 */
export function calculateWord(
    words: Word[],
    index: number
): ExpansionResult {

    if (index < 16) {
        throw new Error("Word expansion only starts from W16.");
    }

    // if (index >= words.length) {
    //     throw new Error("Required previous words do not exist.");
    // }

    if (words.length < 16) {
        throw new Error("Need W0-W15 before expansion.");
    }

    // Wi-2
    const wordMinus2 = words[index - 2];

    // Wi-7
    const wordMinus7 = words[index - 7];

    // Wi-15
    const wordMinus15 = words[index - 15];

    // Wi-16
    const wordMinus16 = words[index - 16];

    //------------------------
    // σ1(Wi-2)
    //------------------------

    const sigma1Binary = sigma1(wordMinus2.binary);

    const sigma1Word: Word = {
        index: -1,
        binary: sigma1Binary,
        hex: binaryToHex(sigma1Binary),
    };

    //------------------------
    // σ0(Wi-15)
    //------------------------

    const sigma0Binary = sigma0(wordMinus15.binary);

    const sigma0Word: Word = {
        index: -1,
        binary: sigma0Binary,
        hex: binaryToHex(sigma0Binary),
    };

    //------------------------
    // 32-bit modular addition
    //------------------------

    const resultValue =
        (
            binaryToUint32(sigma1Binary)
            + binaryToUint32(wordMinus7.binary)
            + binaryToUint32(sigma0Binary)
            + binaryToUint32(wordMinus16.binary)
        ) >>> 0;

    const resultBinary = uint32ToBinary(resultValue);

    const resultWord: Word = {
        index,
        binary: resultBinary,
        hex: resultValue
            .toString(16)
            .padStart(8, "0"),
    };

    return {
        targetIndex: index,

        sigma1: sigma1Word,

        wordMinus7,

        sigma0: sigma0Word,

        wordMinus16,

        result: resultWord,
    };
}


export function expandWords(initialWords: Word[]): Word[] {

    const words = [...initialWords];

    for (let i = 16; i < 64; i++) {

        const expansion = calculateWord(words, i);

        words.push(expansion.result);

    }

    return words;

}