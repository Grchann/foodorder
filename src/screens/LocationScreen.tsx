
import React, { useState, useReducer, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions , Image, Alert } from 'react-native'

import { connect } from 'react-redux'
import { onUpdateLocation, UserState, ApplicationState, onFetchLocation, Address } from '../redux'


import { useNavigation } from '../utils'
import { ButtonWithIcon, ButtonWithTitle, LocationPick, LocationPickMap } from '../components'
import { Point } from 'react-native-google-places-autocomplete'




const screenWidth = Dimensions.get('screen').width

interface Region{
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface LocationProps{
    userReducer: UserState,
    onUpdateLocation: Function,
    onFetchLocation: Function,
}


 const _LocationScreen: React.FC<LocationProps> = (props) => {

    const { userReducer, onUpdateLocation }  = props;

    const { pickedAddress } = userReducer;

    const { navigate } = useNavigation()

    const [isMap, setIsMap] = useState(false);

    const [currentAddress, setCurrentAddress] = useState('Your Address is here');
    const [selectedAddress, setSelectedAddress] = useState<Address>()

    const [region, setRegion] = useState<Region>({
        latitude: 26.90,
        longitude: 91.781,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    // call when picked from autocomplete 
    const onChangeLocation = (location: Point)=>{
        // console.log(location)
        setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })
        setIsMap(true)
    }

    // call when picked from map
    const onPickLocationFromMap = (newRegion: Region)=>{
        setRegion(newRegion)
        // fetch physical address by api
        props.onFetchLocation(newRegion.latitude, newRegion.longitude)
    }

    const onTapConfirmLocation = ()=>{
        if (selectedAddress?.postalCode !== ''){
            onUpdateLocation(selectedAddress)
            navigate('HomePage')
        }
    }


    useEffect(() => {
        if (pickedAddress !== undefined){
            const { address_components } = pickedAddress;
            if (Array.isArray(address_components)){
                setCurrentAddress(pickedAddress.formatted_address) // display in the bottom area
                address_components.map(item=>{
                    let city = '';
                    let country = '';
                    let postalCode = '';

                    if (item.types.filter(type => type === 'postal_code').length > 0){
                        postalCode = item.short_name
                    }

                    if (item.types.filter(type => type === 'country').length > 0){
                        country = item.short_name
                    }

                    if (item.types.filter(type => type === 'locality ').length > 0){
                        city = item.short_name
                    }
                    
                    setSelectedAddress({
                        displayAddress: pickedAddress.formatted_address,
                        city,
                        country,
                        postalCode,
                        name: '',
                        street: '',
                        region: ''
                    })
                })
            }
        }

    }, [pickedAddress])

    const pickLocationView = ()=>{
        return <View style={styles.container}>
            <View style={{flex: 1, display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', marginTop: 44, marginLeft: 10}}>
                <ButtonWithIcon 
                    icon={require('../images/back_arrow.png')} 
                    onTap={()=>navigate('HomePage')}
                    width={30}
                    height={30}/>
                <View style={{display: 'flex', flex: 1, marginRight: 10}}>
                    <LocationPick onChangeLocation={onChangeLocation}/>
                </View>
            </View>
            <View style={styles.centerMsg}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon} />
                <Text style={styles.addressTitle}>Chọn vị trí của bạn</Text>
            </View>
        </View>
    }

    const mapView = ()=>{
        return <View style={styles.container}>
            <View style={styles.navigation}> 
                <View style={{ display: 'flex', height: 60, justifyContent: 'flex-start', 
                    flexDirection: 'row', alignItems: 'center', marginLeft: 4, paddingLeft: 10}}>
                    <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigate("HomePage")} width={30} height={30} />
                    <View style={{flex: 1, marginLeft: 20}}>
                        <Text style={{fontSize: 18, fontWeight: '500', color: '#656565'}}>Pick your Location from Map</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <LocationPickMap lastLocation={region} onMarkerChanged={onPickLocationFromMap} />
            </View>
            <View style={styles.footer}>
                <View style={{flex: 1, backgroundColor: 'white', padding: 10, paddingLeft: 20, paddingRight: 20}}>
                    <Text style={{fontSize: 16, fontWeight: '500', color: '#545454'}}>{currentAddress}</Text>
                    <ButtonWithTitle title='Confirm' onTap={onTapConfirmLocation} width={320} height={50}/>
                </View>
            </View>
        </View>
    }

    if (isMap){
        return mapView();
    }else{
        return pickLocationView();
    }

    // return mapView()

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 1,
        marginTop: 44
    },
    body: {
        display: 'flex',
        flex: 7.5,
    },
    footer: {
        flex: 1,
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
        color: '#7D7D7D',
        marginLeft: -40
    },
    centerMsg: {
        left: '50%',
        top: '50%',
        position: 'absolute',
        marginLeft: -60,
        marginTop: -50
    }

})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LocationScreen = connect(mapToStateProps, { onUpdateLocation, onFetchLocation })(_LocationScreen)

export { LocationScreen }