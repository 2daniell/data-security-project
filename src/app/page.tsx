"use client"
import { LoginForm } from "@/components/forms/login-form"
import { RegisterForm } from "@/components/forms/register-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switcher } from "@/components/ui/switcher"
import React, { useState } from "react"

const FORM_OPTIONS = ["Logar", "Registrar"] as const;
type SelectedType = typeof FORM_OPTIONS[number];

interface FormConfig {
  title: string;
  description: string;
  content: React.ReactNode;
  buttonLabel: string;
}

export default function Home() {

  const [ selected, setSelected ] = useState<SelectedType>('Logar')

  const forms: Record<SelectedType, FormConfig> = {
    Logar: {
      title: "Login",
      description: "Preencha suas informações para efetuar o login",
      content: <LoginForm />,
      buttonLabel: "Login"
    },
    Registrar: {
      title: "Registro",
      description: "Preencha seus dados para efetuar o registro",
      content: <RegisterForm />,
      buttonLabel: "Registrar"
    }
  }

  const { buttonLabel, content, description, title } = forms[selected];

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="m-auto font-bold">{title}</CardTitle>
          <CardDescription className="m-auto">{description}</CardDescription>
          <Switcher className="bg-gray-200" options={FORM_OPTIONS} value={selected} onChange={(option) => setSelected(option)} />
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {buttonLabel}            
          </Button>
        </CardFooter>
      </Card>
    </div>
  )    
}
