export interface BinarySegment {
    text: string;
    color: string;
}

export function formatBinary(binary: string): string {
    return binary.replace(/(.{4})/g, "$1 ").trim();
}

export function formatBinarySegments(
    segments: BinarySegment[]
): BinarySegment[] {

    const result: BinarySegment[] = [];

    let buffer = "";
    let count = 0;

    for (const segment of segments) {

        for (const bit of segment.text) {

            buffer += bit;
            count++;

            if (count === 4) {

                result.push({
                    text: buffer + " ",
                    color: segment.color,
                });

                buffer = "";
                count = 0;
            }
        }
    }

    if (buffer.length > 0) {

        result.push({
            text: buffer,
            color: segments[segments.length - 1].color,
        });

    }

    return result;
}