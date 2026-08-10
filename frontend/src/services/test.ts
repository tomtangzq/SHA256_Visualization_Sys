import api from "./api";


export async function submitTest(

    testType: "pre" | "post",

    score: number,

    total: number

) {

    const token =
        localStorage.getItem("token");


    return api.post(

        "/test/submit",

        {

            test_type: testType,

            score: score,

            total: total,

        },

        {

            headers: {

                Authorization:
                    `Bearer ${token}`,

            },

        }

    );

}