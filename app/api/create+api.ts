import {db} from '@/db/client'
import {wishTable} from '@/db/schema'

export async function POST(request: Request) {
    const {body,} = await request.json()
    console.log(body)

    await db.insert(wishTable).values([
        {
            name: body.name,
        },
    ])

    const wishes = await db.select().from(wishTable)

    return Response.json({wishes: wishes,})
}
