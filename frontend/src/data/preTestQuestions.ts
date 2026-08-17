export type PreTestQuestion = {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
};

export const preTestQuestions: PreTestQuestion[] = [

    {
        id: 1,

        question:
            "Which statement is correct?",

        options: [
            "Hashing and encryption are the same process.",
            "Hashing is a type of encryption.",
            "Hashing and encryption are different cryptographic techniques designed for different purposes.",
            "Encryption is a type of hashing.",
        ],

        correctAnswer: 2,
    },

    {
        id: 2,

        question:
            "Can the original message be recovered from a SHA-256 hash value?",

        options: [
            "Yes, if enough computing power is available.",
            "Yes, if the SHA-256 algorithm is known.",
            "No, SHA-256 is designed as a one-way function.",
            "Only when the original message is shorter than the hash.",
        ],

        correctAnswer: 2,
    },

    {
        id: 3,

        question:
            "If the same input is hashed twice using SHA-256, what will happen?",

        options: [
            "Two different hash values will be produced.",
            "The same hash value will be produced.",
            "The result depends on the computer being used.",
            "The result is randomly generated each time.",
        ],

        correctAnswer: 1,
    },

    {
        id: 4,

        question:
            "What will usually happen when a single character in the input is changed before hashing?",

        options: [
            "Only a small part of the hash will change.",
            "The hash will remain unchanged.",
            "The resulting hash will be substantially different.",
            "The hash will become twice as long.",
        ],

        correctAnswer: 2,
    },

    {
        id: 5,

        question:
            "Why are cryptographic hash functions useful when storing passwords?",

        options: [
            "Because the original password can be recovered from the hash when needed.",
            "Because hashing allows the password to be decrypted with a key.",
            "Because the original password is not directly stored and the hash is designed to be one-way.",
            "Because hashing makes passwords shorter.",
        ],

        correctAnswer: 2,
    },

    {
        id: 6,

        question:
            "A website wants to verify that a downloaded file has not been modified. Which technique is most appropriate?",

        options: [
            "Encryption",
            "Cryptographic hashing",
            "Decryption",
            "Compression",
        ],

        correctAnswer: 1,
    },

];