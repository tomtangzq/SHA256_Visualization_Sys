import { getAsciiInfo } from "../../utils/ascii";

type Props = {
    input: string;
    selectedCharacterIndex: number | null;
};

function AsciiStep({
    input,
    selectedCharacterIndex,
}: Props) {

    const characters = getAsciiInfo(input);

    if (characters.length === 0) {
        return (
            <>
                {/* <h3>Step 2 - ASCII Encoding</h3> */}
                <p>Please generate a message first.</p>
            </>
        );
    }

    if (selectedCharacterIndex === null) {
        return (
            <>
                {/* <h3>Step 2 - ASCII Encoding</h3> */}
                <p>Please select a character from the Detail Panel.</p>
            </>
        );
    }

    const currentCharacter = characters[selectedCharacterIndex];

    return (
        <div className="learning-flow">

            <div className="flow-card">

                <h4>Character</h4>

                <div className="flow-value">
                    {currentCharacter.character}
                </div>

            </div>

            <div className="flow-arrow">
                ↓
            </div>

            <div className="flow-card">

                <h4>ASCII Value</h4>

                <div className="flow-value">
                    {currentCharacter.ascii}
                </div>

            </div>

        </div>
    );
}

export default AsciiStep;