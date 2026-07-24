import {
    calculateSigma1,
    calculateSigma0,
    calculateCh,
    calculateMaj,
    calculateT1,
    calculateT2,
    calculateNextWorkingVariables,
    type WorkingVariables,
    type SigmaResult,
    type Sigma0Result,
    type ChResult,
    type MajResult,
    type T1Result,
    type T2Result
} from "./compressionFunctions";

import type { Word } from "./messageSchedule";
import { ROUND_CONSTANTS_BINARY } from "./constants";

export interface RoundResult {

    round: number;

    workingVariables: WorkingVariables;

    word: Word;

    constant: string;

    sigma: SigmaResult;

    ch: ChResult;

    t1: T1Result;

    sigma0: Sigma0Result;

    maj: MajResult;

    t2: T2Result;

    updatedVariables: WorkingVariables;

}

export interface CompressionResult {

    rounds: RoundResult[];

    finalWorkingVariables: WorkingVariables;

}

export function calculateCompressionRounds(
    initialWorkingVariables: WorkingVariables,
    words: Word[]
): CompressionResult {
    console.log(words.length);

    const rounds: RoundResult[] = [];

    let currentVariables = initialWorkingVariables;

    for (let round = 0; round < 64; round++) {

        const currentWord = words[round];

        const currentConstant = ROUND_CONSTANTS_BINARY[round];

        const sigma = calculateSigma1(
            currentVariables.e
        );

        const ch = calculateCh(
            currentVariables.e,
            currentVariables.f,
            currentVariables.g
        );

        const t1 = calculateT1(

            currentVariables.h,

            sigma.result,

            ch.result,

            currentConstant,

            currentWord.binary

        );

        const sigma0 = calculateSigma0(
            currentVariables.a
        );

        const maj = calculateMaj(

            currentVariables.a,

            currentVariables.b,

            currentVariables.c

        );

        const t2 = calculateT2(

            sigma0.result,

            maj.result

        );

        const updatedVariables =
            calculateNextWorkingVariables(

                currentVariables,

                t1.result,

                t2.result

            );

        rounds.push({

            round,

            workingVariables: currentVariables,

            word: currentWord,

            constant: currentConstant,

            sigma,

            ch,

            t1,

            sigma0,

            maj,

            t2,

            updatedVariables

        });

        currentVariables = updatedVariables;

    }

    return {

        rounds,

        finalWorkingVariables: currentVariables

    };

}