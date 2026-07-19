export interface PaddingInfo {

    originalBinary: string;

    afterAppendOne: string;

    originalLength: number;

    lengthAfterAppendOne: number;

    zeroPaddingLength: number;

    afterZeroPadding: string;   // 448-bit 消息

    lengthBinary64: string;     // 64 位长度字段

    finalBlock512: string;      // 最终 512-bit Message Block

}

export function calculatePadding(binary: string): PaddingInfo {

    const originalLength = binary.length;

    const afterAppendOne = binary + "1";

    const lengthAfterAppendOne = afterAppendOne.length;

    const zeroPaddingLength = 448 - lengthAfterAppendOne;

    const afterZeroPadding =
        afterAppendOne + "0".repeat(zeroPaddingLength);


    const lengthBinary64 =
        originalLength
            .toString(2)
            .padStart(64, "0");

    const finalBlock512 =
        afterZeroPadding + lengthBinary64;

    return {

        originalBinary: binary,

        afterAppendOne,

        originalLength,

        lengthAfterAppendOne,

        zeroPaddingLength,

        afterZeroPadding,

        lengthBinary64,

        finalBlock512

    };
}