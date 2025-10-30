import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function RegisterForm() {
    return (
        <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" type="text" placeholder="Steve da Silva" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="*****" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Senhar</Label>
                <Input id="confirm-password" type="password" placeholder="*****" required />
              </div>
            </div>
        </form>
    )
}