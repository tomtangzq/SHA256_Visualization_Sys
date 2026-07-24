import { INITIAL_HASH } from "../../utils/initialHash";
import { hexToBinary } from "../../utils/binary";
import type { Word } from "../../utils/messageSchedule";
import RoundViewer from "../RoundViewer";
import { calculateCompressionRounds } from "../../utils/compressionRounds";

type Props = {
    words: Word[];
};

function CompressionStep({ words }: Props) {

    const a = INITIAL_HASH.find(item => item.name === "a");
    const b = INITIAL_HASH.find(item => item.name === "b");
    const c = INITIAL_HASH.find(item => item.name === "c");
    const d = INITIAL_HASH.find(item => item.name === "d");
    const e = INITIAL_HASH.find(item => item.name === "e");
    const f = INITIAL_HASH.find(item => item.name === "f");
    const g = INITIAL_HASH.find(item => item.name === "g");
    const h = INITIAL_HASH.find(item => item.name === "h");

    if (!a || !b || !c || !d || !e || !f || !g || !h) {
        return <p>Unable to find working variables.</p>;
    }

    const initialWorkingVariables = {

        a: hexToBinary(a.hex),
        b: hexToBinary(b.hex),
        c: hexToBinary(c.hex),
        d: hexToBinary(d.hex),
        e: hexToBinary(e.hex),
        f: hexToBinary(f.hex),
        g: hexToBinary(g.hex),
        h: hexToBinary(h.hex)

    };

    const compressionResult = calculateCompressionRounds(
        initialWorkingVariables,
        words
    );


    return (

        <>

            <h2>Step 7 - Compression Function</h2>

            <p>

                SHA-256 performs 64 compression rounds.
                Each round updates the eight working variables
                (a–h) using the current message word (Wt)
                and round constant (Kt).

            </p>

            <h3>Initial Working Variables</h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr>

                        <th>Variable</th>

                        <th>Hex</th>

                        <th>Decimal</th>

                    </tr>

                </thead>

                <tbody>

                    {INITIAL_HASH.map(item => (

                        <tr key={item.name}>

                            <td>{item.name}</td>

                            <td>{item.hex}</td>

                            <td>{item.decimal}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <br />

            {

                compressionResult.rounds.map((roundData) => (

                    <RoundViewer

                        key={roundData.round}

                        round={roundData.round}

                        data={roundData}

                    />

                ))

            }

        </>

    );

}

export default CompressionStep;