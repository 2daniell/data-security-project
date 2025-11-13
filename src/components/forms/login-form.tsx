import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm() {
    return (
        <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="*****" required />
              </div>
            </div>
        </form>
    )
}