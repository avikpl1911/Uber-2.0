import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react';
import MapView ,{Marker}from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import {useDispatch, useSelector} from 'react-redux';
import {selectDestination, selectOrigin, setTravelTimeInformation} from '../slices/navSlice'
import  MapViewDirections from 'react-native-maps-directions'; 
import {GOOGLE_MAPS_KEY} from "@env";

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    
    useEffect(()=>{
       

       const fitMarkers =  ()=>{
        
        if(origin === null || destination===null ) return;

         mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50}})
        
       }
       setTimeout(()=>{fitMarkers();},1000)
      
      

    },[origin,destination]);


    useEffect(()=>{
        const getTravelTime= async ()=>{
          if(!origin || !destination) return;
           await fetch(`https://maps.google.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_KEY}`)
          .then((res)=> res.json())
          .then(data=>{
            
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
          })
        }
        getTravelTime();
    },[origin,destination,GOOGLE_MAPS_KEY])


  return (
    
      <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
    initialRegion={{
      latitude: origin?.location.lat,
      longitude: origin?.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >
   {origin && destination && (
    <MapViewDirections 
    origin={origin.description}
    destination={destination.description}
    apikey={GOOGLE_MAPS_KEY}
    strokeWidth={3}
    strokeColor="black"
    />
   )}




   {origin?.location && 
   <Marker
   coordinate={{
    latitude: origin.location.lat,
    longitude: origin.location.lng
   }}
   title="Origin"
   description={origin.description}
   identifier="origin"
   />
   }

{destination?.location && 
   <Marker
   coordinate={{
    latitude: destination.location.lat,
    longitude: destination.location.lng
   }}
   title="Destination"
   description={destination.description}
   identifier="destination"
   />
   }


  </MapView>
   
  )
}

export default Map

const styles = StyleSheet.create({})