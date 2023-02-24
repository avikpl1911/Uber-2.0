import React from 'react'
import { Image,StyleSheet,View,Text,SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from "@env";
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setOrigin,setDestination } from '../slices/navSlice.js';
import Navfavourites from '../components/Navfavourites';

const HomeScreen = () => {
   const dispatch = useDispatch(); 
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5 pt-10`}>
            
            <Image

            style={{
                width: 100,height:100,resizeMode:'contain'
            }}
            
            source={{
                uri:"https://links.papareact.com/gzs"
            }} />

            <GooglePlacesAutocomplete

            styles={{
                container:{
                    flex: 0
                },
                textInput:{
                    fontSize: 18
                }
            }}
            enablePoweredByContainer={false}

            onPress={(data,details = null)=>{
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
              }));

              dispatch(setDestination(null));

            }}
            fetchDetails={true}
            minLength={2}
            query={{
                key: GOOGLE_MAPS_KEY,
                language:'en'
            }}

            placeholder='Where From?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            />
            <NavOptions/>
            <Navfavourites />
        </View>
        
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
    text:{
        color: 'blue'
    }
})

export default HomeScreen
