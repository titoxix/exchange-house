import prisma from "@/libs/prisma";

export const getOrders = async () => {
    try {
        const orders = await prisma.orders.findMany({
            include: {
                customer: true
            }
        });
        
        return orders;

    } catch (error) {
        console.log(error)
        return null;
    }
}