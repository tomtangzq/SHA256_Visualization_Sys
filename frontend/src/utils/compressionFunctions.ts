import { binaryToUint32, uint32ToBinary, rightRotate } from "./sha256Functions";
import { add32 } from "./sha256Functions";

export interface SigmaResult {
    rotate6: string;
    rotate11: string;
    rotate25: string;
    result: string;
}

export interface Sigma0Result {
    rotate2: string;
    rotate13: string;
    rotate22: string;
    result: string;
}

export interface T1Result {

    h: string;

    sigma1: string;

    ch: string;

    k: string;

    w: string;

    sum1: string;

    sum2: string;

    sum3: string;

    result: string;

}

export interface T2Result {

    sigma0: string;

    maj: string;

    result: string;

}

export interface ChResult {

    notX: string;

    xAndY: string;

    notXAndZ: string;

    result: string;

}

export interface MajResult {

    xAndY: string;

    xAndZ: string;

    yAndZ: string;

    result: string;

}


export interface UpdatedWorkingVariables {

    a: string;

    b: string;

    c: string;

    d: string;

    e: string;

    f: string;

    g: string;

    h: string;

}


/*
 * Σ0(x) = ROTR2(x) XOR ROTR13(x) XOR ROTR22(x)
 */
export function Sigma0(binary: string): string {

    const x = binaryToUint32(binary);

    const result =
        rightRotate(x, 2) ^
        rightRotate(x, 13) ^
        rightRotate(x, 22);

    return uint32ToBinary(result >>> 0);
}

/*
 * Σ1(x) = ROTR6(x) XOR ROTR11(x) XOR ROTR25(x)
 */
export function Sigma1(binary: string): string {

    const x = binaryToUint32(binary);

    const result =
        rightRotate(x, 6) ^
        rightRotate(x, 11) ^
        rightRotate(x, 25);

    return uint32ToBinary(result >>> 0);
}

/*
 * Ch(x,y,z)
 * = (x AND y) XOR ((NOT x) AND z)
 */
export function Ch(
    xBinary: string,
    yBinary: string,
    zBinary: string
): string {

    const x = binaryToUint32(xBinary);
    const y = binaryToUint32(yBinary);
    const z = binaryToUint32(zBinary);

    const result =
        (x & y) ^
        (~x & z);

    return uint32ToBinary(result >>> 0);
}

/*
 * Maj(x,y,z)
 * = (x AND y)
 * XOR (x AND z)
 * XOR (y AND z)
 */
export function Maj(
    xBinary: string,
    yBinary: string,
    zBinary: string
): string {

    const x = binaryToUint32(xBinary);
    const y = binaryToUint32(yBinary);
    const z = binaryToUint32(zBinary);

    const result =
        (x & y) ^
        (x & z) ^
        (y & z);

    return uint32ToBinary(result >>> 0);
}


export function calculateSigma1(binary: string): SigmaResult {

    const x = binaryToUint32(binary);

    const rotate6 =
        uint32ToBinary(rightRotate(x, 6));

    const rotate11 =
        uint32ToBinary(rightRotate(x, 11));

    const rotate25 =
        uint32ToBinary(rightRotate(x, 25));

    const result =
        uint32ToBinary(
            (
                rightRotate(x, 6)
                ^
                rightRotate(x, 11)
                ^
                rightRotate(x, 25)
            ) >>> 0
        );

    return {

        rotate6,

        rotate11,

        rotate25,

        result

    };

}


export function calculateCh(
    xBinary: string,
    yBinary: string,
    zBinary: string
): ChResult {

    const x = binaryToUint32(xBinary);
    const y = binaryToUint32(yBinary);
    const z = binaryToUint32(zBinary);

    const notX =
        uint32ToBinary((~x) >>> 0);

    const xAndY =
        uint32ToBinary((x & y) >>> 0);

    const notXAndZ =
        uint32ToBinary(((~x) & z) >>> 0);

    const result =
        uint32ToBinary(
            (
                (x & y)
                ^
                ((~x) & z)
            ) >>> 0
        );

    return {

        notX,

        xAndY,

        notXAndZ,

        result

    };

}


export function calculateMaj(
    xBinary: string,
    yBinary: string,
    zBinary: string
): MajResult {

    const x = binaryToUint32(xBinary);

    const y = binaryToUint32(yBinary);

    const z = binaryToUint32(zBinary);

    const xAndY =
        uint32ToBinary((x & y) >>> 0);

    const xAndZ =
        uint32ToBinary((x & z) >>> 0);

    const yAndZ =
        uint32ToBinary((y & z) >>> 0);

    const result =
        uint32ToBinary(

            (

                (x & y)

                ^

                (x & z)

                ^

                (y & z)

            ) >>> 0

        );

    return {

        xAndY,

        xAndZ,

        yAndZ,

        result

    };

}



export function calculateT1(
    hBinary: string,
    sigma1Binary: string,
    chBinary: string,
    kBinary: string,
    wBinary: string
): T1Result {

    const h = binaryToUint32(hBinary);

    const sigma1 = binaryToUint32(sigma1Binary);

    const ch = binaryToUint32(chBinary);

    const k = binaryToUint32(kBinary);

    const w = binaryToUint32(wBinary);

    const sum1 = add32(h, sigma1);

    const sum2 = add32(sum1, ch);

    const sum3 = add32(sum2, k);

    const result = add32(sum3, w);

    return {

        h: hBinary,

        sigma1: sigma1Binary,

        ch: chBinary,

        k: kBinary,

        w: wBinary,

        sum1: uint32ToBinary(sum1),

        sum2: uint32ToBinary(sum2),

        sum3: uint32ToBinary(sum3),

        result: uint32ToBinary(result)

    };

}


export function calculateT2(
    sigma0Binary: string,
    majBinary: string
): T2Result {

    const sigma0 = binaryToUint32(sigma0Binary);

    const maj = binaryToUint32(majBinary);

    const result = add32(
        sigma0,
        maj
    );

    return {

        sigma0: sigma0Binary,

        maj: majBinary,

        result: uint32ToBinary(result)

    };

}


export function calculateSigma0(binary: string): Sigma0Result {

    const x = binaryToUint32(binary);

    const rotate2 =
        uint32ToBinary(rightRotate(x, 2));

    const rotate13 =
        uint32ToBinary(rightRotate(x, 13));

    const rotate22 =
        uint32ToBinary(rightRotate(x, 22));

    const result =
        uint32ToBinary(
            (
                rightRotate(x, 2)
                ^
                rightRotate(x, 13)
                ^
                rightRotate(x, 22)
            ) >>> 0
        );

    return {

        rotate2,

        rotate13,

        rotate22,

        result

    };

}


export function calculateNextWorkingVariables(

    aBinary: string,

    bBinary: string,

    cBinary: string,

    dBinary: string,

    eBinary: string,

    fBinary: string,

    gBinary: string,

    hBinary: string,

    t1Binary: string,

    t2Binary: string

): UpdatedWorkingVariables {

    const a = binaryToUint32(aBinary);

    const b = binaryToUint32(bBinary);

    const c = binaryToUint32(cBinary);

    const d = binaryToUint32(dBinary);

    const e = binaryToUint32(eBinary);

    const f = binaryToUint32(fBinary);

    const g = binaryToUint32(gBinary);

    const h = binaryToUint32(hBinary);

    const t1 = binaryToUint32(t1Binary);

    const t2 = binaryToUint32(t2Binary);

    const newA = add32(t1, t2);

    const newB = a;

    const newC = b;

    const newD = c;

    const newE = add32(d, t1);

    const newF = e;

    const newG = f;

    const newH = g;

    return {

        a: uint32ToBinary(newA),

        b: uint32ToBinary(newB),

        c: uint32ToBinary(newC),

        d: uint32ToBinary(newD),

        e: uint32ToBinary(newE),

        f: uint32ToBinary(newF),

        g: uint32ToBinary(newG),

        h: uint32ToBinary(newH)

    };

}