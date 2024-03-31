import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/libs/prisma";
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const cashAudits = await prisma.cashAudits.findMany();
        return NextResponse.json(cashAudits)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { pesosInitialAmount, usdInitialAmount, pesosAmount, usdAmount } = await request.json();
        const newCustomer = await prisma.cashAudits.create({
            data: {
                id: uuidv4(),
                pesosInitialAmount,
                usdInitialAmount,
                pesosAmount,
                usdAmount,
            }
        })
        return NextResponse.json(newCustomer)
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}