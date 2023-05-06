import { createJSON, readJSON } from "../utils"
import { PATH_USER_JSON } from "../const";
import BcryptReactNative from "bcrypt-react-native"
import { DBUser, generateUser } from "../models/user";

const SALT = '$2b$15$TBo3gzMnDmXyU6MjqimRn.'
const OTP = '494949'

const createUser = async (users: [DBUser], email: string, password: string, phone: string)=>{
    // const hashPassword = await BcryptReactNative.hash(SALT, password)
    const hashPassword = password
    let user = generateUser(users) as DBUser;
    user.email = email;
    user.password = hashPassword;
    user.phone = phone;
    return user
}

const checkExistingEmail = (users: [DBUser], email: string)=>{
    return users.filter(user=>user.email === email).length > 0
}

export const onLogin = async (email: string, password: string)=>{
    const users = (await readJSON(PATH_USER_JSON)) as [DBUser];
    if (checkExistingEmail(users, email)){
        const user = users.filter(user=>user.email === email)[0]
        // BcryptReactNative.hash(SALT, password).then(data=>console.log(data)).catch((err)=>console.log('err', err))
        // if (user.password === await BcryptReactNative.hash(SALT, password)){
        if (user.password === password){
            console.log('correct password')
            return {
                status: 200,
                body:{
                    data: {
                        ...user,
                        token: 'TEMP'
                    }
                }
            }
        }else{
            return {
                status: 403, // Understood but now allow
                body: {
                    message: 'Mật khẩu chưa đúng với tài khoản'
                }
            }
        }
    }else{
        return {
            status: 404, // Not found
            body:{
                message: 'Tài khoản chưa tồn tại'
            }
        }
    }
}


export const onSignUp = async (email: string, password: string, phone: string)=>{
    const users = (await readJSON(PATH_USER_JSON)) as [DBUser]
    // console.log('users: ', users)
    if (!checkExistingEmail(users, email)){
        const user = await createUser(users, email, password, phone);
        // console.log(user)
        users.push(user)
        createJSON(PATH_USER_JSON, users);
        return {
            status: 200,
            body:{
                
                data: {
                    ...user,
                    token: 'TEMP'
                }

            }
        }
    }else{
        return {
            status: 409, // conflict
            body:{
                message: 'Email đã tồn tại'
            }
        }
    }
}

export const onConfirmOTP = async (idUser: string, otp: string)=>{
    const users = (await readJSON(PATH_USER_JSON)) as [DBUser]
    const indexUser = users.findIndex(user=>user._id === idUser)
    // console.log(indexUser)
    if (indexUser !== -1){
        if (otp === OTP){
            users[indexUser].verified = true;
            createJSON(PATH_USER_JSON, users);
            return {
                status: 200,
                body: {
                    data: {
                        ...users[indexUser],
                        token: 'TEMP'
                    }
                }
            }
        }else{
            return {
                status: 403, // Understood but now allow
                body: {
                    message: 'Mã OTP bị sai. Xin nhập lại hoặc yêu cầu mã OTP mới!'
                }
            }
        }

    }else{
        return {
            status: 404, // Not found
            body:{
                message: 'Tài khoản chưa được đăng ký'
            }
        }
    }
}

export const onChangeProfile = async (idUser: string, firstName: string, lastName: string) => {
    const users = (await readJSON(PATH_USER_JSON)) as [DBUser]
    const indexUser = users.findIndex(user=>user._id === idUser)
    // console.log(indexUser)
    if (indexUser !== -1){
        users[indexUser].firstName = firstName;
        users[indexUser].lastName = lastName;
        createJSON(PATH_USER_JSON, users);
        return {
            status: 200,
            body: {
                data: {
                    ...users[indexUser],
                    token: 'TEMP'
                }
            }
        }
    }else{
        return {
            status: 404, // Not found
            body:{
                message: 'Tài khoản chưa được đăng ký'
            }
        }
    }
}