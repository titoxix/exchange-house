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
    const customer = await prisma.customers.findFirst({
      where: {
        id,
      },
    });
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { name, lastName, email, address, phone } = await request.json();
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const editedCustomer = await prisma.customers.update({
      where: {
        id,
      },
      data: {
        name,
        lastName,
        email,
        address,
        phone,
      },
    });
    return NextResponse.json(editedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const deletedCustomer = await prisma.customers.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
