import AsyncStorage from "@react-native-community/async-storage";
import { PATH_CATEGORIES_JSON, PATH_FOOD_JSON, PATH_OFFER_JSON, PATH_ORDER_JSON, PATH_RESTAURANT_JSON, PATH_USER_JSON } from "./const";

export const initAsyncStorage = async ()=>{
    const foods = require('./json/foods.json');
    const categories = require('./json/categories.json');
    const restaurants = require('./json/restaurants.json');
    const offers = require('./json/offers.json');
    const orders = require('./json/orders.json');
    const users = require('./json/users.json');

    await AsyncStorage.setItem(PATH_FOOD_JSON, JSON.stringify(foods));
    await AsyncStorage.setItem(PATH_CATEGORIES_JSON, JSON.stringify(categories));
    await AsyncStorage.setItem(PATH_RESTAURANT_JSON, JSON.stringify(restaurants));
    await AsyncStorage.setItem(PATH_OFFER_JSON, JSON.stringify(offers));
    await AsyncStorage.setItem(PATH_ORDER_JSON, JSON.stringify(orders));
    await AsyncStorage.setItem(PATH_USER_JSON, JSON.stringify(users));

}