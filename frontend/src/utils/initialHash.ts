export interface WorkingVariable {
    name: string;
    hex: string;
    decimal: number;
}

export const INITIAL_HASH: WorkingVariable[] = [
    {
        name: "a",
        hex: "6a09e667",
        decimal: 0x6a09e667
    },
    {
        name: "b",
        hex: "bb67ae85",
        decimal: 0xbb67ae85
    },
    {
        name: "c",
        hex: "3c6ef372",
        decimal: 0x3c6ef372
    },
    {
        name: "d",
        hex: "a54ff53a",
        decimal: 0xa54ff53a
    },
    {
        name: "e",
        hex: "510e527f",
        decimal: 0x510e527f
    },
    {
        name: "f",
        hex: "9b05688c",
        decimal: 0x9b05688c
    },
    {
        name: "g",
        hex: "1f83d9ab",
        decimal: 0x1f83d9ab
    },
    {
        name: "h",
        hex: "5be0cd19",
        decimal: 0x5be0cd19
    }
];