import { NextResponse, NextRequest } from "next/server";
import { OrderType } from "@/interfaces/order";
import { getAllOrders, createOrder } from "@/server/orders";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
  try {
    const { error, status, data: orders } = await getAllOrders();
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
    const result = await createOrder({
      customerId: validatedData.data.customerId,
      type: validatedData.data.orderType as OrderType,
      received: validatedData.data.received,
      delivered: validatedData.data.delivered,
      price: validatedData.data.price,
      balanceId,
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
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
