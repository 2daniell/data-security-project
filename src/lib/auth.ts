import { readFileSync } from "fs";
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from "jose";

const alg = "RS256";

const privatePem = readFileSync("private.pem", "utf-8");
const publicPem = readFileSync("public.pem", "utf-8");

const privateKey = await importPKCS8(privatePem, alg);
const publicKey = await importSPKI(publicPem, alg); 

export async function sign(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(privateKey);
}

export async function verify(token: string) {
    const { payload } = await jwtVerify(token, publicKey, { algorithms: [alg] });
    return payload;
}