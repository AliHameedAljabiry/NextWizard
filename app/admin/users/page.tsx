import Users from "@/components/admin/Users";
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';

const AllUsers = async () => {
  const allUsers = await 
    db.select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      role: users.role,
      createdAt: users.createdAt,
      lastActivityDate: users.lastActivityDate,
      image: users.image
    })
    .from(users)
    .orderBy(desc(users.createdAt))

   return (
    <div>
      <Users initialData={allUsers} />
    </div>
   )
  
}

export default AllUsers