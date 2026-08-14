type InputPanelProps = {
    input: string;
    onInputChange: (value: string) => void;
};

function InputPanel({
    input,
    onInputChange,
}: InputPanelProps) {
    return (
        <textarea
            className="message-input"
            value={input}
            placeholder="Type your message here..."
            onChange={(e) => onInputChange(e.target.value)}
        />
    );
}

export default InputPanel;


