"use client"
import { login } from "@/actions/auth/login.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { SubmitEvent } from "react";

export default function SignIn() {

    const { execute, status, result } = useAction(login);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) =>  {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string
        const password = formData.get("password") as string

        execute({ email, password })
    }
    const fieldError = (field: "email" | "password") =>
        result.validationErrors?.[field]?._errors?.[0];

    return (
        <div className="flex min-h-screen bg-background">
            <div className="flex items-center justify-center flex-1">
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="flex flex-col items-center">
                            <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
                            <CardDescription>Digite suas credenciais para acessar sua conta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="seu@email.com"
                                        className={fieldError("email") ? "border-red-500" : ""}
                                        required
                                    />

                                    {fieldError("email") && (
                                        <p className="text-sm text-red-500">
                                        {fieldError("email")}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className={fieldError("password") ? "border-red-500" : ""}
                                        required
                                    />

                                    {fieldError("password") && (
                                        <p className="text-sm text-red-500">
                                        {fieldError("password")}
                                        </p>
                                    )}
                                </div>

                                {result.serverError && (
                                    <div className="rounded-md bg-red-50 border border-red-200 p-3">
                                        <p className="text-sm text-red-600">
                                        {result.serverError}
                                        </p>
                                    </div>
                                )}

                                <Button disabled={status === "executing" }type="submit" className="w-full">
                                    Entrar
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <span className="text-muted-foreground">Não tem uma  conta?</span>
                                <Link href="/signup" className="text-primary font-medium hover:underline">
                                    Crie uma
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}