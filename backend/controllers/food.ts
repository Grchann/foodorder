import { PATH_FOOD_JSON, PATH_CATEGORIES_JSON, PATH_IMAGES } from "../const";
import { DBCategory } from "../models/category";
import { DBFood } from "../models/food";
import { readJSON } from "../utils";
import { onGetAvailableRestaurants } from "./restaurant";


const transformURLFoods = (foods: [DBFood])=>{
    for (let idFood = 0; idFood < foods.length; idFood++){
        for (let idImg = 0; idImg < foods[idFood].images.length; idImg++){
            foods[idFood].images[idImg] = PATH_IMAGES + foods[idFood].images[idImg]
        }
    }
}

function transformURLCategories(categories: [DBCategory]){
    for (let idCate = 0; idCate < categories.length; idCate++){
        categories[idCate].icon = PATH_IMAGES + categories[idCate].icon
    }
}

export const onGetAvailability = async (lat: number, lng: number)=>{
    const dbFoods = (await readJSON(PATH_FOOD_JSON)) as [DBFood];
    transformURLFoods(dbFoods)
    const dbCategories = (await readJSON(PATH_CATEGORIES_JSON)) as [DBCategory];

    const availableRestaurants = (await onGetAvailableRestaurants(lat, lng)) as [any];
    for (let idRest = 0; idRest < availableRestaurants.length; idRest++){
        const indicesFood = availableRestaurants[idRest].foods

        availableRestaurants[idRest].foods = dbFoods.filter(food=> indicesFood.indexOf(food._id) > -1);
    }
    // const availableIDFoods = availableRestaurants.reduce((foods, currentRest)=>foods.concat(currentRest.foods), []);
    // const availableFoods = dbFoods.filter(food=> availableIDFoods.indexOf(food._id) > -1);
    const availableFoods = availableRestaurants.reduce((foods, currentRest)=>foods.concat(currentRest.foods), []) as [DBFood];
    const availableCategoriesTitle = Array.from(new Set(availableFoods.map(food=>food.category)))

    const availableCategories = availableCategoriesTitle.map(title=>{
        return dbCategories.filter(category=>category.title === title)[0]
    }) as [DBCategory]
    transformURLCategories(availableCategories)
    return {
        status: 200,
        body:{
            data: {
                categories: availableCategories,
                foods: availableFoods,
                restaurants: availableRestaurants
            }
        }
    }
}