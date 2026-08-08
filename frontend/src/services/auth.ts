import api from "./api";

export async function login(

    email: string,

    password: string,

) {

    return api.post(

        "/login",

        {

            email,

            password,

        }

    );

}

export async function register(

    username: string,

    email: string,

    password: string,

) {

    return api.post(

        "/register",

        {

            username,

            email,

            password,

        }

    );

}