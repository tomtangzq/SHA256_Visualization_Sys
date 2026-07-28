export interface StepContent {
    title: string;
    description: string;
    goal: string;
    tips: string[];
}

export const detailContent: StepContent[] = [
    {
        title: "Input",

        description:
            "Enter a message that will be processed by the SHA-256 algorithm.",

        goal:
            "Understand how a plain-text message enters the hashing process.",

        tips: [
            "Input can contain letters, numbers and symbols.",
            "Changing even one character produces a completely different hash.",
        ],
    },

    {
        title: "ASCII Encoding",

        description:
            "Each character is converted into its ASCII representation.",

        goal:
            "Understand how text becomes numerical data before binary conversion.",

        tips: [
            "Different characters always have different ASCII values.",
        ],
    },

    {
        title: "Binary Conversion",
        description:
            "The selected ASCII value is converted into an 8-bit binary representation.",

        goal:
            "Understand how numerical data is represented using binary digits.",

        tips: [
            "Each ASCII value occupies one byte (8 bits).",
            "Leading zeros are preserved to maintain 8-bit length."
        ]
    },

    {
        title: "Padding",
        description: "",
        goal: "",

        tips: [],
    },

    {
        title: "Message Schedule",
        description:
            `The padded 512-bit message block is divided into
            sixteen consecutive 32-bit words, forming the
            initial message schedule entries W0~W15.

            Words W16~W63 are generated from previously
            computed words. Each word is calculated from W[i~2],
            W[i~7], W[i~15], and W[i~16], extending the
            original message into a total of 64 words.`,

        goal: "",

        tips: [],
    },

    {
        title: "Compression",
        description: "",
        goal: "",

        tips: [],
    },

    {
        title: "Hash Accumulation",
        description: "",
        goal: "",

        tips: [],
    },

    {
        title: "Digest",
        description: "",
        goal: "",

        tips: [],
    },
];