
// import UserUniversityCardImage from '@/components/admin-components/UserUniversityCardImage'
// import GoBack from '@/components/GoBack'
// import { db } from '@/database/drizzle'
// import { users } from '@/database/schema'
// import { eq } from 'drizzle-orm'
// import React from 'react'



// const UserCardId = async ( { params }: {params: Promise< {id: string}> }) => {
//   const id = (await params).id 
//   const user = await db.select().from(users).where(eq(users.id, id)).limit(1)
//   const userUniversityCard = user[0]?.universityCard 
  
  
//   return (
//     <>
//        <GoBack/>

//       <div className='relative w-full h-[500px] max-w-3xl m-auto'>
//         {userUniversityCard && (
//           <UserUniversityCardImage path={userUniversityCard} />
//         )}
//       </div>
    
//     </>
//   )
// }

// export default UserCardId