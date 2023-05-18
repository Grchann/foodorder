
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions , Image, Alert } from 'react-native'

import * as Location from 'expo-location'
import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux'
import { onUpdateLocation, UserState, ApplicationState } from '../redux'


import { useNavigation } from '../utils'
import { initAsyncStorage } from '../../backend'

const screenWidth = Dimensions.get('screen').width



interface LandingProps{
    userReducer: UserState,
    onUpdateLocation: Function
}


const _LandingScreen: React.FC<LandingProps> = (props) => {

    const { onUpdateLocation }  = props;

    const { navigate } = useNavigation()

    // const [errorMsg, setErrorMsg] = useState("")
    // const [address, setAddress] = useState<Location.Address>()
    
    const [displayAddress, setDisplayAddress] = useState("Đang tìm kiếm")

    const showAlert = (title: string, msg: string)=>{
        Alert.alert(
            title,
            msg,
            [
                {text: 'OK', onPress: ()=>{
                    // navigate to manual add location
                    navigate('LocationPage')
                }}
            ]
        )
    }

    const accessDeviceLocation = async ()=>{
        try {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== 'granted'){
                showAlert('Cần cấp quyền truy cập vị trí', 'Quyền vị trí cần thiết để truy cập vào nhà hàng gần nhất của bạn!')
                return;
            }

            let location: any = await Location.getCurrentPositionAsync({});

            const { coords } = location

            if(coords){

                const { latitude, longitude} = coords;

                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude})

                for(let item of addressResponse){
                    // setAddress(item)
                    let currentAddress = `${item.name} ${item.street}, ${item.city}, ${item.postalCode}`
                    onUpdateLocation({...item, latitude: latitude, longitude: longitude, displayAddress: currentAddress})
                    setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout(() =>{
                            navigate('homeStack')
                        }, 2000)
                    }


                    return;
                }


            }else{
                showAlert('Không tìm thấy vị trí', 'Không tìm thấy vị trí. Vui lòng nhập vị trí của bạn để có quyền truy cập vào nhà hàng gần nhất')

            }
        } catch (error) {
            showAlert('Cần cấp quyền truy cập vị trí', 'Quyền vị trí cần thiết để truy cập vào nhà hàng gần nhất của bạn!')
        }
    }

    const checkExistingLocation = async ()=>{
        try {
            const locationData = await AsyncStorage.getItem('user_location');
            // console.log(locationData);

            if (locationData !== null){
                const savedAddress = JSON.parse(locationData);
                onUpdateLocation(savedAddress);
                setTimeout(()=>{
                    navigate('homeStack')
                }, 500)
            }else{
                await accessDeviceLocation()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        AsyncStorage.clear()
        initAsyncStorage()
        
        checkExistingLocation()
    }, [])

    // [] do lan render dau tien
    // [userReducer.location] do
    // 1. lan render dau tien
    // 2. khi bien user...location thay doi. location.street thay doi.

     
    return (
        <View style={styles.container}>
            <View style={styles.navigation} /> 
                
            <View style={styles.body}>
                <Image source={require('../images/delivery-truck.png')} style={styles.deliveryIcon} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Địa chỉ giao hàng của bạn</Text>
                </View>
                <Text style={styles.addressText}> {displayAddress}</Text>
            </View>
            <View style={styles.footer} />
        </View>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
     },
    navigation: {
        flex: 2,
     },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deliveryIcon:{
        width: 120,
        height: 120
    },
    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center',
        
    },
    addressTitle:{
        fontSize: 22,
        fontWeight: '700',
        color: '#7D7D7D'
    },
    addressText: {
        fontSize: 20,
        fontWeight: '200',
        color: '#4F4F4F'
    },

    footer: {
        flex: 1,
     }

})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapToStateProps, { onUpdateLocation })(_LandingScreen)

export { LandingScreen }