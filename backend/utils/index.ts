import {v4 as uuidv4} from "uuid";
import { DBObject } from "../models";

import AsyncStorage from "@react-native-community/async-storage";

export const generateID = (listObject: [DBObject])=>{
    let id = uuidv4();
    //check existance
    while (listObject.filter(obj=>obj._id === id).length > 0){
        id = uuidv4();
    }
    return id;
}

// export const createJSON = (path: string, dict: object) => {
//     // const dictString = JSON.stringify(dict);
//     // fs.writeFile(path, dictString, function(err, result) {
//     //     if(err) console.log('error', err);
//     // });
// }
export const createJSON = async (path: string, dict: object) => {

    const dictString = JSON.stringify(dict);
    return await AsyncStorage.setItem(path, dictString)
}

// export const readJSON = (path, onGetData) => {
//     fs.readFile(path, (err, data)=>{
//         if (err){
//             console.log(err);
//         }
//         onGetData(data);
//     })
//     fs.readFileSync
// }

export const readJSON = async (path: string) => {
    const data = await AsyncStorage.getItem(path);
    if (data !== null){
        return JSON.parse(data)
    }else{
        return null
    }
}