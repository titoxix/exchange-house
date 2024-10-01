import { NextResponse, NextRequest } from "next/server";
import { OrderType } from "@/interfaces/order";
import { getAllOrdersByCompanyId, createOrder } from "@/server/orders";
import { z } from "zod";
import { getBalanceById } from "@/server/balance";
import { getCustomerByGeneratedId } from "@/server/customers";
import { getUserById } from "@/server/users";
import { getCompanyById } from "@/server/company";
import { auth } from "../../../../auth";

const schema = z.object({
  customerId: z.string({
    required_error: "Cliente requerido",
  }),
  orderType: z.string({
    required_error: "Tipo de operación requerido",
  }),
  received: z.string({
    required_error: "Recibido requerido",
  }),
  price: z.string({
    required_error: "Tipo de cambio requerido",
  }),
  delivered: z.string({
    required_error: "Entregado requerido",
  }),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect("/login");

  try {
    const {
      error,
      status,
      data: orders,
    } = await getAllOrdersByCompanyId(session.user.companyId);
    if (status !== 200) {
      return NextResponse.json({ error: error }, { status: status });
    }
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect("/login");

  try {
    const { customerId, type, received, delivered, price, balanceId } =
      await request.json();

    const validatedData = schema.safeParse({
      customerId: customerId,
      orderType: type,
      received,
      price,
      delivered,
    });

    if (!validatedData.success) {
      return NextResponse.json({
        message: validatedData.error || "Invalid data",
        status: 400,
      });
    }

    const company = await getCompanyById(session.user.companyId);

    if (!company) {
      return NextResponse.json({
        message: "Compañía no encontrada",
        status: 404,
      });
    }
    const user = await getUserById(session.user.id);

    if (!user) {
      return NextResponse.json({
        message: "Usuario no encontrado",
        status: 404,
      });
    }

    const customer = await getCustomerByGeneratedId(customerId);

    if (!customer) {
      return NextResponse.json({
        message: "Cliente no encontrado",
        status: 404,
      });
    }

    const balance = await getBalanceById(balanceId);

    if (!balance) {
      return NextResponse.json({
        message: "Balance no encontrado",
        status: 404,
      });
    }

    if (balance.pesosAmount < parseFloat(delivered) && type === "BUY") {
      return NextResponse.json({
        message: "Pesos insuficientes para ejecutar la operación.",
        status: 400,
      });
    }

    if (balance.usdAmount < parseFloat(delivered) && type === "SELL") {
      return NextResponse.json({
        message: "Dólares insuficientes para ejecutar la operación.",
        status: 400,
      });
    }

    const result = await createOrder({
      customer,
      type: validatedData.data.orderType as OrderType,
      received: validatedData.data.received,
      delivered: validatedData.data.delivered,
      price: validatedData.data.price,
      balance,
      company,
      user,
    });

    if (!result) {
      return NextResponse.json({
        message: "Error creating order",
        status: 400,
      });
    }

    return NextResponse.json({
      message: "Order created successfully",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
