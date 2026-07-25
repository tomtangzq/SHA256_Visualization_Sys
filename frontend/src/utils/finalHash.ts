import { add32, binaryToUint32, uint32ToBinary } from "./sha256Functions";
import type { WorkingVariables } from "./compressionFunctions";
import { binaryToHex } from "./binary";

export interface FinalHashResult {

    a: string;

    b: string;

    c: string;

    d: string;

    e: string;

    f: string;

    g: string;

    h: string;

    binary: string;

    hex: string;

}

export function calculateFinalHash(

    initial: WorkingVariables,

    finalWorkingVariables: WorkingVariables

): FinalHashResult {

    const a = uint32ToBinary(

        add32(

            binaryToUint32(initial.a),

            binaryToUint32(finalWorkingVariables.a)

        )

    );

    const b = uint32ToBinary(

        add32(

            binaryToUint32(initial.b),

            binaryToUint32(finalWorkingVariables.b)

        )

    );

    const c = uint32ToBinary(

        add32(

            binaryToUint32(initial.c),

            binaryToUint32(finalWorkingVariables.c)

        )

    );

    const d = uint32ToBinary(

        add32(

            binaryToUint32(initial.d),

            binaryToUint32(finalWorkingVariables.d)

        )

    );

    const e = uint32ToBinary(

        add32(

            binaryToUint32(initial.e),

            binaryToUint32(finalWorkingVariables.e)

        )

    );

    const f = uint32ToBinary(

        add32(

            binaryToUint32(initial.f),

            binaryToUint32(finalWorkingVariables.f)

        )

    );

    const g = uint32ToBinary(

        add32(

            binaryToUint32(initial.g),

            binaryToUint32(finalWorkingVariables.g)

        )

    );

    const h = uint32ToBinary(

        add32(

            binaryToUint32(initial.h),

            binaryToUint32(finalWorkingVariables.h)

        )

    );

    const binary =
        a + b + c + d +
        e + f + g + h;

    const hex =
        binaryToHex(a) +
        binaryToHex(b) +
        binaryToHex(c) +
        binaryToHex(d) +
        binaryToHex(e) +
        binaryToHex(f) +
        binaryToHex(g) +
        binaryToHex(h);

    return {

        a,

        b,

        c,

        d,

        e,

        f,

        g,

        h,

        binary,

        hex

    };

}