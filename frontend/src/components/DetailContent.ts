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
        description:
            "Extends the message to a fixed 512-bit block by adding padding bits and the original message length.",
        goal:
            "Understand why SHA-256 pads messages before processing them.",

        tips: [
            "The padded message must end at a 512-bit boundary."
        ],
    },

    {
        title: "Message Schedule",
        description:
            `The padded 512-bit message block is divided into
            sixteen consecutive 32-bit words, forming the
            initial message schedule entries W0~W15.

            Words W16~W63 are generated from previously
            computed words.`,

        goal:
            "Understand how the initial 16 words are expanded into the full message schedule.",

        tips: [
            "W0–W15 come directly from the padded message",
            "W16–W63 words are derived from earlier words."
        ],
    },

    {
        title: "Compression",
        description:
            "Processes the message schedule through 64 rounds using logical functions, constants, and working variables.",
        goal:
            "Understand how SHA-256 transforms the current state during each compression round.",

        tips: [
            "Follow the highlighted values and formulas to see how each round contributes to the next state."
        ],
    },

    {
        title: "Hash Accumulation",
        description:
            "Combines the final working variables with the initial hash state to produce the final hash values.",
        goal:
            "Understand how the compression result is accumulated into the SHA-256 hash state.",

        tips: [
            "The eight final values are combined in order to form the 256-bit hash."
        ],
    },

    {
        title: "Digest",
        description:
            "Presents the final 256-bit SHA-256 digest generated from the input message.",
        goal:
            "Recognise the digest as the final fixed-length output of the hashing process.",

        tips: [
            "A small change to the input produces a completely different digest."
        ],
    },
];