import { useEffect, useState } from "react";
import BitCell from "./BitCell";

interface ShiftAnimationProps {

    original: string;

    shiftBits: number;

    title: string;

}

export default function ShiftAnimation({

    original,

    shiftBits,

    title,

}: ShiftAnimationProps) {

    const totalBits = 32;


    const shifted =
        " ".repeat(shiftBits) +
        original.substring(0, totalBits - shiftBits);

    const [phase, setPhase] =
        useState<"shift" | "inject">("shift");

    const [currentBit, setCurrentBit] =
        useState(0);

    const [injectedCount, setInjectedCount] =
        useState(0);

    useEffect(() => {

        if (phase !== "shift") return;

        if (currentBit >= totalBits - 1) {

            setPhase("inject");

            return;

        }

        const timer = setTimeout(() => {

            setCurrentBit((previous) => previous + 1);

        }, 120);

        return () => clearTimeout(timer);

    }, [phase, currentBit]);

    useEffect(() => {

        if (phase !== "inject") return;

        if (injectedCount >= shiftBits) {

            const pause = setTimeout(() => {

                setCurrentBit(0);

                setInjectedCount(0);

                setPhase("shift");

            }, 900);

            return () => clearTimeout(pause);

        }

        const timer = setTimeout(() => {

            setInjectedCount((previous) => previous + 1);

        }, 250);

        return () => clearTimeout(timer);

    }, [phase, injectedCount, shiftBits]);

    return (
        <div
            style={{
                marginTop: 20,
                marginBottom: 30,
            }}
        >
            <h3>{title}</h3>

            {/* Original */}
            <div
                style={{
                    display: "flex",
                    gap: 2,
                    marginBottom: 12,
                }}
            >
                {original.split("").map((bit, index) => (
                    <BitCell
                        key={index}
                        value={bit}
                        active={
                            phase === "shift" &&
                            index === currentBit
                        }
                    />
                ))}
            </div>

            {/* Shifted */}
            <div
                style={{
                    display: "flex",
                    gap: 2,
                }}
            >
                {shifted.split("").map((bit, index) => {

                    // 当前移动到的位置
                    const targetIndex = currentBit - shiftBits;

                    const active =
                        phase === "shift" &&
                        currentBit <= totalBits - shiftBits - 1 &&
                        index === currentBit + shiftBits;

                    // 新补进去的0
                    const injected =
                        phase === "inject" &&
                        index < injectedCount;

                    return (
                        <BitCell
                            key={index}
                            value={
                                injected
                                    ? "0"
                                    : bit === " "
                                        ? ""
                                        : bit
                            }
                            active={active}
                            injected={injected}
                        />
                    );
                })}
            </div>
        </div>
    );
}