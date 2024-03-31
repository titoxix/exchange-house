import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/libs/prisma";
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const customers = await prisma.customers.findMany();
        return NextResponse.json(customers)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, lastName, email, address, phone } = await request.json();
        const newCustomer = await prisma.customers.create({
            data: {
                id: uuidv4(),
                name,
                lastName,
                email,
                address,
                phone
            }
        })
        return NextResponse.json(newCustomer)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}