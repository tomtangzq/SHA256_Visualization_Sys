import SigmaViewer from "./SigmaViewer";
import Sigma0Viewer from "./Sigma0Viewer";
import ChViewer from "./ChViewer";
import T1Viewer from "./T1Viewer";
import MajViewer from "./MajViewer";
import T2Viewer from "./T2Viewer";
import WorkingVariableUpdateViewer from "./WorkingVariableUpdateViewer";

import type { RoundResult } from "../utils/compressionRounds";

type Props = {
    round: number;
    data: RoundResult;
};

function RoundViewer({
    round,
    data
}: Props) {

    const {
        workingVariables,
        sigma,
        ch,
        t1,
        sigma0,
        maj,
        t2,
        updatedVariables
    } = data;

    const {
        a,
        b,
        c,
        e
    } = workingVariables;

    return (

        <div>

            <h2>Round {round}</h2>

            <SigmaViewer
                title="Σ1(e)"
                sigma={sigma}
            />

            <ChViewer
                ch={ch}
            />

            <T1Viewer
                t1={t1}
            />

            <Sigma0Viewer
                title="Σ0(a)"
                sigma0={sigma0}
            />

            <MajViewer
                originalA={a}
                originalB={b}
                originalC={c}
                maj={maj}
            />

            <T2Viewer
                t2={t2}
            />

            <WorkingVariableUpdateViewer
                oldVariables={workingVariables}
                updatedVariables={updatedVariables}
            />

        </div>

    );

}

export default RoundViewer;