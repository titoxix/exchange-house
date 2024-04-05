import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/libs/prisma";
import { v4 as uuidv4 } from 'uuid';
import { getAllOrders } from "@/server/orders";

export async function GET() {
    try {
        const { error, status, data: orders } = await getAllOrders();
        if (status !== 200) {
            return NextResponse.json({ error: error }, { status: status })
        }
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { pesoAmount, usdAmount, type, customerId } = await request.json();
        const newCustomer = await prisma.orders.create({
            data: {
                id: uuidv4(),
                price: 15.8,
                type,
                pesoAmount,
                usdAmount,
                customerId,
            }
        })
        return NextResponse.json(newCustomer)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}