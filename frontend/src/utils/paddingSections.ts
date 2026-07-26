import type { PaddingInfo } from "./padding";

export interface PaddingSections {
    original: string;
    appendOne: string;
    zeroPadding: string;
    lengthField: string;
}

export function getPaddingSections(
    padding: PaddingInfo
): PaddingSections {

    return {

        original: padding.originalBinary,

        appendOne: "1",

        zeroPadding: "0".repeat(padding.zeroPaddingLength),

        lengthField: padding.lengthBinary64,

    };

}