import { NextResponse, NextRequest } from "next/server";
import { saveNewBalance, updateBalance } from "@/server/balance";
import { z } from "zod";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

const schema = z.object({
  usdInitialAmount: z.number({
    required_error: "Monto en dolares requerido",
  }),
  pesosInitialAmount: z.number({
    required_error: "Monto en pesos requerido",
  }),
  pesosAmount: z.number({
    required_error: "Monto en pesos actual requerido",
  }),
  usdAmount: z.number({
    required_error: "Monto en dolares actual requerido",
  }),
  state: z.string({
    required_error: "Estado requerido",
  }),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  try {
    const {
      usdInitialAmount,
      pesosInitialAmount,
      usdAmount,
      pesosAmount,
      state,
    } = await request.json();
    const usdInitialAmountFloat = parseFloat(usdInitialAmount);
    const pesosInitialAmountFloat = parseFloat(pesosInitialAmount);
    const usdAmountFloat = parseFloat(usdAmount);
    const pesosAmountFloat = parseFloat(pesosAmount);

    const validatedData = schema.safeParse({
      usdInitialAmount: usdInitialAmountFloat,
      pesosInitialAmount: pesosInitialAmountFloat,
      usdAmount: usdAmountFloat,
      pesosAmount: pesosAmountFloat,
      state,
    });

    if (!validatedData.success) {
      console.error("error", validatedData.error);
      return NextResponse.json({
        message: "Error al momento de validar los datos",
        status: 400,
      });
    }

    const result = await saveNewBalance(
      {
        usdInitialAmount: usdAmountFloat,
        pesosInitialAmount: pesosAmountFloat,
      },
      session.user.id
    );

    if (!result) {
      return NextResponse.json({
        message: "Error al momento de abrir la caja",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "Caja abierta correctamente",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      pesosAmount,
      usdAmount,
      pesosInitialAmount,
      usdInitialAmount,
      state,
    } = await request.json();

    const usdInitialAmountFloat = parseFloat(usdInitialAmount);
    const pesosInitialAmountFloat = parseFloat(pesosInitialAmount);
    const usdAmountFloat = parseFloat(usdAmount);
    const pesosAmountFloat = parseFloat(pesosAmount);

    if (!id) {
      return NextResponse.json({
        message: "Error al momento actualizar el balance",
        status: 400,
      });
    }

    const validatedData = schema.safeParse({
      usdInitialAmount: usdInitialAmountFloat,
      pesosInitialAmount: pesosInitialAmountFloat,
      pesosAmount: pesosAmountFloat,
      usdAmount: usdAmountFloat,
      state,
    });

    if (!validatedData.success) {
      console.error("error", validatedData.error);
      return NextResponse.json({
        message: "Error al momento actualizar el balance",
        status: 400,
      });
    }
    const result = await updateBalance({
      id,
      pesosInitialAmount,
      usdInitialAmount,
      usdAmount,
      pesosAmount,
      state,
    });

    return NextResponse.json({
      message: "Balance actualizado correctamente",
      status: 204,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
