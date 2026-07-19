type InputPanelProps = {
    input: string;
    onInputChange: (value: string) => void;
    onGenerate: () => void;
};

function InputPanel({
    input,
    onInputChange,
    onGenerate,
}: InputPanelProps) {
    return (
        <>
            <textarea
                rows={6}
                value={input}
                placeholder="Type something here..."
                onChange={(e) => onInputChange(e.target.value)}
            />

            <button onClick={onGenerate}>
                Generate
            </button>
        </>
    );
}

export default InputPanel;