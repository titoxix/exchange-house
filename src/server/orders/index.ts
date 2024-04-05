import { getOrders } from "@/db/orders";
import { Order } from "@/interfaces/order";

interface Response {
    error?: string,
    message?: string,
    status: number
    data: Order[] | []
}

export const getAllOrders = async (): Promise<Response> => {
    try {
        const orders = await getOrders();
        
        if (!orders) {
            return { message: 'No se encontrarón resultados', status: 404, data: [] }
        }

        const adaptedOrders: Order[] = orders.map((order) => {
            return {
                id: order.id,
                date: order.createdAt.toLocaleDateString(),
                time: order.createdAt.toLocaleTimeString(),
                pesosAmount: order.pesoAmount,
                type: order.type === 'BUY' ? 'Compra' : 'Venta',
                price: order.price,
                usdAmount: order.usdAmount,
                customerId: order.customer.id,
                customerName: order.customer.name
            };
          });
        
        return { message: 'OK', status: 200, data: adaptedOrders }

    } catch (error) {
        console.log(error)
        return { error: 'Error to get data from DB', status: 500 , data: []}
    }

}