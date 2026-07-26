export interface StepContent {
    title: string;
    description: string;
    goal: string;
    keyInformation: string[];
    tips: string[];
}

export const detailContent: StepContent[] = [
    {
        title: "Input",

        description:
            "Enter a message that will be processed by the SHA-256 algorithm.",

        goal:
            "Understand how a plain-text message enters the hashing process.",

        keyInformation: [
            "Input can contain letters, numbers and symbols.",
            "The message will be encoded before hashing.",
        ],

        tips: [
            "Changing even one character produces a completely different hash.",
        ],
    },

    {
        title: "ASCII Encoding",

        description:
            "Each character is converted into its ASCII representation.",

        goal:
            "Understand how text becomes numerical data before binary conversion.",

        keyInformation: [
            "Each character corresponds to one ASCII value.",
            "ASCII values are represented using 8 bits.",
        ],

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

        keyInformation: [
            "Each ASCII value occupies one byte (8 bits).",
            "Binary numbers consist only of 0 and 1.",
            "Leading zeros are preserved to maintain 8-bit length."
        ],

        tips: [
            "Every character uses exactly 8 bits in this stage.",
            "Observe how decimal values map to binary."
        ]
    },

    {
        title: "Padding",
        description: "",
        goal: "",
        keyInformation: [],
        tips: [],
    },

    {
        title: "Message Schedule",
        description: "",
        goal: "",
        keyInformation: [],
        tips: [],
    },

    {
        title: "Compression",
        description: "",
        goal: "",
        keyInformation: [],
        tips: [],
    },

    {
        title: "Hash Accumulation",
        description: "",
        goal: "",
        keyInformation: [],
        tips: [],
    },

    {
        title: "Digest",
        description: "",
        goal: "",
        keyInformation: [],
        tips: [],
    },
];