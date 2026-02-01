"use client"
import { register } from "@/actions/auth/register.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { SubmitEvent, useEffect, useRef } from "react";

export default function SignUp() {

    const {execute, status, result} = useAction(register)
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (status !== "hasSucceeded") return;
        formRef.current?.reset();
    }, [status])

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) =>  {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string
        const name = formData.get("name") as string

        execute({ email, password, name, confirmPassword })
    }

    const fieldError = (field: "email" | "password" | "name") =>
        result.validationErrors?.[field]?._errors?.[0];

    return (
        <div className="flex min-h-screen bg-background">
            <div className="flex items-center justify-center flex-1">
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="flex flex-col items-center">
                            <CardTitle className="text-2xl font-bold">Cadastro</CardTitle>
                            <CardDescription>Preencha os dados abaixo para criar sua conta</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome completo</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Daniel Alves"
                                        required
                                    />

                                    {fieldError("name") && (
                                        <p className="text-sm text-red-500">
                                        {fieldError("name")}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="seu@email.com"
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
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                    />

                                    {fieldError("password") && (
                                        <p className="text-sm text-red-500">
                                        {fieldError("password")}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                {result.serverError && (
                                    <div className="rounded-md bg-red-50 border border-red-200 p-3">
                                        <p className="text-sm text-red-600">
                                        {result.serverError}
                                        </p>
                                    </div>
                                )}

                                {status === "hasSucceeded" && (
                                    <div className="rounded-md bg-green-50 border border-green-200 p-3">
                                        <p className="text-sm text-green-600">
                                            Conta criada com sucesso!
                                        </p>
                                    </div>
                                )}

                                <Button disabled={status === "executing"} type="submit" className="w-full">
                                    Criar Conta
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <span className="text-muted-foreground">Já tem uma conta?</span>
                                <Link href="/signin" className="text-primary font-medium hover:underline">
                                    Faça login
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}