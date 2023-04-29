import uuid from "react-native-uuid";
import { DBObject } from "../models";

import AsyncStorage from "@react-native-community/async-storage";

export const generateID = (listObject: [DBObject])=>{
    let id = uuid.v4();
    //check existance
    while (listObject.filter(obj=>obj._id === id).length > 0){
        id = uuid.v4();
    }
    return id;
}

export const createJSON = async (path: string, dict: object) => {

    const dictString = JSON.stringify(dict);
    return await AsyncStorage.setItem(path, dictString)
}

export const readJSON = async (path: string) => {
    const data = await AsyncStorage.getItem(path);
    if (data !== null){
        return JSON.parse(data)
    }else{
        return null
    }
}