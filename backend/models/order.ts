import { generateID } from "../utils"

export interface DBOrder{
    _id: string,
    orderID: string,
    items: [string], // [DBCart]
    totalAmount: number,
    orderDate: Date | undefined | null,
    paidThrough: string,
    paymentResponse: string,
    orderStatus: string,
    offer: string | undefined | null  // DBOffer
}

export const generateOrder = (orders: [DBOrder])=>{
    return {
        _id: generateID(orders),
        orderID: (Math.random() * 1000).toFixed(0),
        items: [],
        totalAmount: 0,
        orderDate: new Date(),
        paidThrough: 'cash',
        paymentResponse: '',
        orderStatus: 'waiting',
        offer: null
    }
}
