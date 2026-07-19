export interface PaddingStep {
    originalBinary: string;
    afterAppendOne: string;
}

export function appendOneBit(binary: string): PaddingStep {
    return {
        originalBinary: binary,
        afterAppendOne: binary + "1",
    };
}