import BitCell from "./BitCell";
import { useEffect, useState } from "react";

import {

    binaryToUint32,

    uint32ToBinary,

    rightRotate,

} from "../../utils/sha256Functions";


interface RotateAnimationProps {

    original: string;

    rotateBits: number;

    title: string;

}

export default function RotateAnimation({

    title,

    original,

    rotateBits,


}: RotateAnimationProps) {

    const [currentBit, setCurrentBit] = useState(0);

    const finalBinary = uint32ToBinary(

        rightRotate(

            binaryToUint32(original),

            rotateBits,

        )

    );

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentBit((previous) => {

                return (previous + 1) % 32;

            });

        }, 200);

        return () => clearInterval(timer);

    }, [original, rotateBits]);


    return (

        <div>

            <h3 style={h3Style}>{title}</h3>

            <div
                style={{
                    display: "flex",
                    gap: 2,
                    marginBottom: 6,
                }}
            >

                {original.split("").map((bit, index) => (

                    <BitCell
                        key={index}
                        value={bit}
                        active={index === currentBit}
                    />

                ))}

            </div>

            {/* <p>Rotated</p> */}

            <div
                style={{
                    display: "flex",
                    gap: 2,
                }}
            >

                {finalBinary.split("").map((bit, index) => (

                    <BitCell
                        key={index}
                        value={bit}
                        active={
                            index ===
                            (currentBit + rotateBits) % 32
                        }
                    />

                ))}

            </div>

        </div>

    );

}

const h3Style = {
    marginTop: "15px",
    marginBottom: "6px",

};

