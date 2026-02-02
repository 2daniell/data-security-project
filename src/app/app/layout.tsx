import { Header } from "@/components/header/header";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/UserProvider";
import { getUserById } from "@/helper/user.helper";
import { verify } from "@/lib/auth";
import { getToken } from "@/lib/cookie";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {

    const token = await getToken();
    if (!token) redirect("/unauthorized");

    const payload = await verify(token).catch(() => redirect("/unauthorized"));
    
    const { id, name, createAt, email, role } = await getUserById(payload.userId as number);

    const headersList = await headers();

    const pathname = headersList.get("x-pathname");

    if (pathname?.startsWith("/app/admin/") && role !== "admin") {
        redirect("/unauthorized");
    }

    return (
        <div className="flex h-screen">
            <Sidebar isAdmin={role === "admin"} />
            <div className="flex-1 flex flex-col">
                <UserProvider user={{ id, name, createAt, email, role }}>
                    <Header />
                    <main className="flex-1 flex bg-background overflow-hidden">
                        { children }
                    </main>
                    <Toaster/>
                </UserProvider>
            </div>
        </div>
    );
}
