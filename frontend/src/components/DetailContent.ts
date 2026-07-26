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
        description: "",
        goal: "",
        keyInformation: [],
        tips: [],
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