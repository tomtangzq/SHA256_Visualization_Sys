// Rotate Right（循环右移）
export function rightRotate(value: number, bits: number): number {
    return (value >>> bits) | (value << (32 - bits));
}

// Logical Right Shift（逻辑右移）
export function rightShift(value: number, bits: number): number {
    return value >>> bits;
}

// Binary → Uint32
export function binaryToUint32(binary: string): number {
    return parseInt(binary, 2) >>> 0;
}

// Uint32 → Binary
export function uint32ToBinary(value: number): string {
    return (value >>> 0).toString(2).padStart(32, "0");
}


// σ0 function
export function sigma0(binary: string): string {

    const x = binaryToUint32(binary);

    const result =
        rightRotate(x, 7)
        ^
        rightRotate(x, 18)
        ^
        rightShift(x, 3);

    return uint32ToBinary(result);

}


// σ1 function
export function sigma1(binary: string): string {

    const x = binaryToUint32(binary);

    const result =
        rightRotate(x, 17)
        ^
        rightRotate(x, 19)
        ^
        rightShift(x, 10);

    return uint32ToBinary(result);

}

export function add32(...values: number[]): number {

    let result = 0;

    for (const value of values) {

        result = (result + value) >>> 0;

    }

    return result;

}

export function binaryToHex(binary: string): string {

    return binaryToUint32(binary)
        .toString(16)
        .padStart(8, "0");

}