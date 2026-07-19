type Props = {
    input: string;
};

function InputStep({ input }: Props) {
    return (
        <>
            <h3>Step 1 - Input</h3>

            <pre>{input}</pre>
        </>
    );
}

export default InputStep;