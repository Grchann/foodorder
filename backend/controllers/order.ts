import { PATH_FOOD_JSON, PATH_ORDER_JSON, PATH_OFFER_JSON, PATH_USER_JSON, PATH_IMAGES } from "../const";
import { DBFood } from "../models/food";
import { generateOrder } from "../models/order";
import { DBUser } from "../models/user";
import { createJSON, readJSON } from "../utils";

// BE to FE
const transformOrder = async (order: any)=>{
    const dbFoods = (await readJSON(PATH_FOOD_JSON)) as [DBFood];
    for (let idItem = 0; idItem < order.items.length; idItem++){
        const idFood = order.items[idItem].food;
        const food = dbFoods.filter(food=>food._id === idFood)[0];

        for (let idImg = 0; idImg < food.images.length; idImg++){
            food.images[idImg] = PATH_IMAGES + food.images[idImg]
        }
        order.items[idItem].food = food;
    }

    if (order.offer){
        const dbOffers = (await readJSON(PATH_OFFER_JSON)) as [any];
        order.offer = dbOffers.filter(offer=>offer._id === order.offer)[0];
    }

    return order
}

// FE to BE
const unTransformOrder = (order: any)=>{
    for (let idItem = 0; idItem < order.items.length; idItem++){
        const idFood = order.items[idItem].food._id;
        order.items[idItem].food = idFood;
    }
    try {
        order.offer = order.offer._id;
    } catch (err) {
        
    }
}

export const onBECreateOrder = async (idUser: string, order: any)=>{
    const dbUsers = (await readJSON(PATH_USER_JSON)) as [DBUser];
    const indexUser = dbUsers.findIndex(dbUser=>dbUser._id === idUser);
    if (indexUser>-1){
        
        const dbOrders = await readJSON(PATH_ORDER_JSON);
    
        const newOrder = generateOrder(dbOrders);
        newOrder.paidThrough = order.paidThrough;
        newOrder.totalAmount = order.totalAmount;
        newOrder.items = order.items;
        newOrder.offer = order.offer;
    
        order = {...newOrder}
    
        unTransformOrder(newOrder);
        dbOrders.push(newOrder);
        createJSON(PATH_ORDER_JSON, dbOrders);
        
        dbUsers[indexUser].orders.push(order._id);
        createJSON(PATH_USER_JSON, dbUsers)

        return {
            status: 200,
            body: {
                data: order
            }
        }
    }else{
        return {
            status: 404,
            body: {
                message: 'Tài khoản của bạn không tồn tại'
            }
        }
    }

}

export const onBEGetOrders = async (idUser: string) =>{
    const dbUsers = (await readJSON(PATH_USER_JSON)) as [DBUser];
    const dbOrders = (await readJSON(PATH_ORDER_JSON)) as [any];
    const indexUser = dbUsers.findIndex(dbUser=>dbUser._id === idUser);
    if (indexUser>-1){
        const userOrders = await dbUsers[indexUser].orders.map((order)=>{
            return dbOrders.filter(dbOrder=>dbOrder._id  === order)[0];
        })
        for (let idOrder = 0; idOrder< userOrders.length; idOrder++){
            userOrders[idOrder] = await transformOrder(userOrders[idOrder])
        }
        return {
            status: 200,
            body: {
                data: userOrders
            }
        }
    }else{
        return {
            status: 404,
            body: {
                message: 'Tài khoản của bạn không tồn tại'
            }
        }
    }
}

export const onCancelOrder = async (user: DBUser, order: any)=>{
    const dbUsers = (await readJSON(PATH_USER_JSON)) as [DBUser];
    const dbOrders = (await readJSON(PATH_ORDER_JSON)) as [any];
    const indexUser = dbUsers.findIndex(dbUser=>dbUser._id === user._id);
    if (indexUser>-1){
        if (dbUsers[indexUser].orders.findIndex(idOrder=>idOrder === order._id)>-1){
            const indexOrder = dbOrders.findIndex(order=>order._id === order._id);
            // console.log(indexOrder)
            dbOrders[indexOrder].orderStatus = 'Hủy'
        }
        createJSON(PATH_ORDER_JSON, dbOrders)
        const userOrders = await dbUsers[indexUser].orders.map((order)=>{
            return dbOrders.filter(dbOrder=>dbOrder._id  === order)[0];
        })
        for (let idOrder = 0; idOrder< userOrders.length; idOrder++){
            userOrders[idOrder] = await transformOrder(userOrders[idOrder])
        }
        return {
            status: 200,
            body: {
                data: userOrders
            }
        }
    }else{
        return {
            status: 404,
            body: {
                message: 'Tài khoản của bạn không tồn tại'
            }
        }
    }
    
}


