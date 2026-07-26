interface Props {
    input: string;

    selectedCharacterIndex: number | null;

    onCharacterSelect: (index: number) => void;
}

export default function AsciiDetail({
    input,
    selectedCharacterIndex,
    onCharacterSelect,
}: Props) {

    const characters = input.split("");

    if (characters.length === 0) {
        return (
            <p>Please generate a message first.</p>
        );
    }

    return (

        <div className="ascii-detail">

            <h4>Characters</h4>

            <div className="character-list">

                {characters.map((char, index) => (

                    <button
                        key={index}
                        className={
                            selectedCharacterIndex === index
                                ? "character-button selected"
                                : "character-button"
                        }
                        onClick={() => onCharacterSelect(index)}
                    >
                        {char}
                    </button>

                ))}

            </div>

        </div>

    );

}