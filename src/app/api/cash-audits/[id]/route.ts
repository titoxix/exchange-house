import { NextResponse, NextRequest } from "next/server";
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
    const cashAudit = await prisma.cashAudits.findFirst({
      where: {
        id,
      },
    });
    if (!cashAudit) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(cashAudit);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { pesosInitialAmount, usdInitialAmount, pesosAmount, usdAmount } = await request.json();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const editedCashAudit = await prisma.cashAudits.update({
      where: {
        id,
      },
      data: {
        pesosInitialAmount,
        usdInitialAmount,
        pesosAmount,
        usdAmount,
      },
    });
    return NextResponse.json(editedCashAudit);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
