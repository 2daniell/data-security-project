import { verify } from "@/lib/auth";
import { getToken } from "@/lib/cookie";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
    const token = await getToken();

    if (!token) redirect("/");

    try  {

        await verify(token);

    } catch {
        redirect("/")
    }

    return (
        <div className="min-h-screen">
            { children }
        </div>
    );
}
