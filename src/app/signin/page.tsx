"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignIn() {

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
                            <form className="space-y-4">

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Criar Conta
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <span className="text-muted-foreground">Já tem uma conta?</span>
                                <Link href="/login" className="text-primary font-medium hover:underline">
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