import prisma from '@/prisma/client'

export async function POST(request: Request) {
    const {name,} = await request.json()

    await prisma.wish.create({
        data: {
            name: name,
        },
    })

    const wishes = await prisma.wish.findMany()

    return Response.json({wishes: wishes,})
}
