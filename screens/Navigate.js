import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Platform,TextInput,BackHandler } from 'react-native';
import MapView, { Marker, AnimatedRegion,Circle,Callout} from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../utils';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector,useDispatch } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SearchVenue from '../components/Molecules/SearchVenue';
import { COLORS } from '../constants/theme';
import { getUserLocation } from '../utils/helper';



const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Navigate = ({ navigation}) => {
    useEffect(() => {
        getUserLocation().then((res)=>{
            if(res){
             console.log(res);
              dispatch({
                type: "ON_UPDATE_LOCATION",
                payload: {
                    location: res.item,
                    coords:res.coords,
                },
              });
              }});
      }, []);
    const dispatch = useDispatch();
    //==============================BOTTOM SHEET============================
    const closeSheet = (t) => {


        if (sheetRef.current) {
          sheetRef.current.close();
        }
      };
      const openSheet = () => {
        if (sheetRef.current) {
          sheetRef.current.open();
        }
    };
    const onMethodSelected = (method) => {
      closeSheet();
    };
    const sheetRef = useRef(null);  
     //==============================REDUX============================
    const location = useSelector (
        (state) => state.userReducer.location
        );
        console.log("====my",location);
   

//==============================Backpress============================


const handleBackPress=()=>{
    
    navigation.navigate("Me")
    return true
   
}
useEffect(() => {
   openSheet()
    BackHandler.addEventListener('hardwareBackPress',handleBackPress);
}, [])
useEffect(() => {
   
    BackHandler.addEventListener('hardwareBackPress',handleBackPress);
    return()=>{
        BackHandler.removeEventListener('hardwareBackPress',handleBackPress);
        
    }
}, [])
//==============================Search============================

const [searchQuery, setSearchQuery] = useState('');


//==============================MAP STATE============================

        const { latitude, longitude} = location.coords;
        const [ pin, setPin ] = useState({
            latitude: latitude,
            longitude: longitude,
        })
        const mapRef = useRef()
    const markerRef = useRef()
 

    const [state, setState] = useState({
        curLoc: {
            latitude: latitude,
            longitude: longitude,
        },
        destinationCords: {    
            latitude: latitude,
            longitude: longitude,
        },
        isLoading: true,
        coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0

    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate,heading } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));
    const [SelectedMarker, setSelectedMarker] = useState(destinationCords);
 


  
    const onCenter = () => {
        openSheet()
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })
    }
  
    useEffect(() => {
        setSelectedMarker(true);
      }, []);
      const CustomMarker = () => (
        <View style={styles.marker}>
          <Image source={require('../assets/bella.jpg')} style={styles.markerImage} />
        </View>
      );
     
    return (
        <View style={styles.container}>

          
            <View style={{ flex: 1 }}>
                {latitude&&longitude?<MapView
                    ref={mapRef}
                    customMapStyle={mapStyle}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >




                    <Marker coordinate={pin}>
                         {/* <CustomMarker/> */}
                    </Marker>
                    
                    <Circle center={pin} radius={100} strokeColor="#fff" fillColor="#00000a10"  />

                {Object.keys(destinationCords).length > 0 && (
                    
                    <Marker coordinate={destinationCords}>
                                                        
                    </Marker>
                )}

                {Object.keys(destinationCords).length > 0 && (
                
                <MapViewDirections
                    origin={curLoc}
                    destination={destinationCords}
                    apikey={GOOGLE_MAP_KEY}
                    strokeWidth={3}
                    strokeColor={COLORS.primary}
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)
                        fetchTime(result.distance, result.duration),
                            mapRef.current.fitToCoordinates(result.coordinates, {                        
                            });
                    }}
                    onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                    }}
                />
                )}
                </MapView>:<>
                </>}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    {/* <Image source={require('../assets/360.png')} /> */}
                </TouchableOpacity>
               
               
             
            </View> 

            <View style={styles.containern}>
      {/* ... (previous code) */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Venue..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            // Implement your search functionality here
            // You can use the 'searchQuery' state to perform the search
            // Update the map markers or take other actions based on search results
          }}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {/* ... (other code) */}
    </View>

            {/* <SearchVenue onMethodSelected={closeSheet} ref={sheetRef} navigation={navigation}  state={state}/>  */}
        </View>
    );  
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      searchInput: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
      },
      searchButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
  text:{
fontWeight:"500",
color:"#008873",
fontSize:13

  },

  marker: {
    width: 200,
    height: 100,
    alignItems: 'center',
    paddingTop:10,
    // backgroundColor:"#00000a10" ,
    // borderRadius:5

  },
  markerImage: {
   
    width: 78,
    height: 70
  },
});

export default Navigate;
// const mapStyle = [
//     {
//       elementType: 'geometry',
//       stylers: [
//         {
//           color: '#123', // Dark background color
//         },
//       ],
//     },
//     {
//       elementType: 'labels.text.fill',
//       stylers: [
//         {
//           color: '#8ec3b9', // Text color
//         },
//       ],
//     },
//     {
//       elementType: 'labels.text.stroke',
//       stylers: [
//         {
//           color: '#1a3646', // Text stroke color
//         },
//       ],
//     },
//     // Add more style rules for other map elements as needed
//   ];
  
const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000', // Dark background color
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#000000', // Text stroke color
        },
        {
          weight: 2,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Text color
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off', // Hide icons
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Administrative text color
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off', // Hide land parcels
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off', // Hide neighborhood labels
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Points of Interest text color
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#121212', // Parks geometry color
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Parks text color
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#121212', // Roads geometry color
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Roads text color
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#121212', // Highways geometry color
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Highways text color
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#121212', // Controlled access roads geometry color
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Local roads text color
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Transit text color
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000', // Water geometry color
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#ffffff', // Water text color
        },
      ],
    },
  ];
  
  
