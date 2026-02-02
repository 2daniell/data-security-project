import { getUserLoans } from "@/actions/loan/loan.action";
import Loans from "@/components/loan/loan";

export default async function LoansPage() {

    const data = (await getUserLoans()).data ?? [];

    return (
        <Loans loans={data} />
    )
}