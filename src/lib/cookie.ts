import { cookies } from "next/headers";

const name = "session";

export async function getToken(): Promise<string | undefined> {
    return (await cookies()).get(name)?.value;
}

export async function deleteToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(name);
}

export async function setToken(token: string): Promise<void> {
    (await cookies()).set(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60  * 2,
        path: "/"
    });
}