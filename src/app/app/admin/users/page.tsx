import { getUsers } from "@/actions/users/users.action"
import Users from "@/components/users/users"

export default async function UsersPage() {

    const data = (await getUsers()).data ?? []
    
    return (
        <Users users={data} />
    )
}