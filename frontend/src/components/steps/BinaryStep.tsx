import { getAsciiInfo } from "../../utils/ascii";

type Props = {
    input: string;
    selectedCharacterIndex: number | null;
};

function BinaryStep({
    input,
    selectedCharacterIndex,
}: Props) {

    const characters = getAsciiInfo(input);


    if (characters.length === 0) {
        return (
            <>
                <h3>Step 3 - Binary Conversion</h3>
                <p>Please generate a message first.</p>
            </>
        );
    }

    if (selectedCharacterIndex === null) {
        return (
            <>
                <h3>Step 3 - Binary Conversion</h3>
                <p>Please select a character from the Detail Panel.</p>
            </>
        );
    }

    const currentCharacter = characters[selectedCharacterIndex];

    return (

        <div className="learning-flow">

            <div className="flow-card">

                <h4>ASCII Value</h4>

                <div className="flow-value">
                    {currentCharacter.ascii}
                </div>

            </div>

            <div className="flow-arrow">
                ↓
            </div>

            <div className="flow-card">

                <h4>Binary</h4>

                <div className="flow-value binary-value">
                    {currentCharacter.binary}
                </div>

            </div>

        </div>
    );
}
export default BinaryStep;