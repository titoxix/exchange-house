import { NextResponse, NextRequest } from 'next/server'
import prisma from "@/libs/prisma";

interface Params {
    params: { id: string };
  }
  
  export async function GET(request: NextRequest, { params }: Params) {
    const { id } = params;
  
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
  
    try {
      const order = await prisma.orders.findFirst({
        where: {
          id,
        },
        include: {
            customer: true
        }
      });
      if (!order) {
        return NextResponse.json(
          { error: "Order not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(order);
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }