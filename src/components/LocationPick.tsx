import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageSourcePropType } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { MAP_API_KEY } from '../utils'


interface LocationPickProps{ 
    onChangeLocation: Function
}


const LocationPick: React.FC<LocationPickProps> = ({ onChangeLocation }) => {

    return <View style={styles.container}>
        <GooglePlacesAutocomplete
            minLength={4}
            placeholder='Search your Address'
            fetchDetails={true}
            onPress={(_, details = null)=>{
                if (details?.geometry){
                    onChangeLocation(details.geometry.location)
                }
            }}
            query={{
                key: MAP_API_KEY,
                language: 'vi'
            }}
            debounce={300}/>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex'
    },
    btn: { display: 'flex',  justifyContent: 'center', alignItems: 'center', width: 60, height: 40},
})

export { LocationPick }