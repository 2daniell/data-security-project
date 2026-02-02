import { Library } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {

	return (
    	<div className="flex flex-col min-h-screen">
			<div className="p-4">
				<div className="flex items-center gap-2 mb-8">
					<div className="relative">
						<Library className="h-8 w-8 text-primary" />
					</div>
					<span className="text-2xl font-bold text-primary">
						BiblioTech
					</span>
				</div>

			</div>

			<div className="flex-1 flex flex-col justify-center items-center">

				<h1 className="text-7xl font-extrabold text-primary">401</h1>

				<h2 className="mt-4 text-2xl font-semibold text-black">
          			Acesso não autorizado
        		</h2>

        		<p className="mt-3 text-muted-foreground">
          			Você não tem permissão para acessar esta página.
        		</p>

        		<Link
          			href={"/"}
          			className="mt-6 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground"
				>
          			Voltar para o início
        		</Link>
			</div>
    	</div>
  	);
}