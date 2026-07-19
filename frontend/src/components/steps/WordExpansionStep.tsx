type Props = {
    input: string;
};

function WordExpansionStep({ input }: Props) {

    return (

        <>

            <h2>Step 6 - Word Expansion</h2>

            <h3>Target Word</h3>

            <p>W16</p>

            <h3>Formula</h3>

            <pre>

                σ1(W14)
                +
                W9
                +
                σ0(W1)
                +
                W0

            </pre>

        </>

    );

}

export default WordExpansionStep;