import React, { useRef, useState } from 'react';
import { Dimensions, View, StyleSheet, TextInput, Button, Text, Keyboard } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02; 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = 9.8563;
const INITIAL_LONG = -83.9126;
const INITIAL_POSITION = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LONG,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const apiKey = 'AIzaSyB2Rc8-vQsX11dzSs29rBVLb2T1m59Gy2I';


export default function GoogleMaps() {

  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [seachText, setSearchText] = useState('');
  const [result, setResult] = useState<any[]>([]);
  const map = useRef<MapView | null>(null);
  const [markersList, setMarkersList] = useState([
    {
        latitude: 9.8563, 
        longitude:-83.9126,
        title: 'Posicion',
        description: 'Current Location',
    }
  ]);

  const searchPlaces = async () => {
    if (!seachText.trim()) {
      return;
    }

    const googleApisUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
    const input = seachText.trim();
    const location = `${INITIAL_LAT},${INITIAL_LONG}`;
    const url = `${googleApisUrl}?query=${input}&location=${location}&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      //console.log(data);
      //setMarkersList(json.results);
      if (data && data.results ){

        const coords: LatLng[] = []; 

        for ( const item of data.results ){
          coords.push({
            latitude: item.geometry.location.lat, 
            longitude: item.geometry.location.lng,
          });
        }
        setResult(data.results)
        if (coords.length ){
            map.current?.fitToCoordinates(coords, {
            edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
            animated: true,
          });
        }
        Keyboard.dismiss();
      }

    } catch (error) {
      console.log(error);
    }

  }
  
  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={'#000'}
          placeholder="Buscar..."
          //value={searchQuery}
          onChangeText={setSearchText}
          autoCapitalize='sentences'
        />
        <Button title="Buscar" onPress={searchPlaces} />
      </View>
      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            ref = {map}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation
            initialRegion={INITIAL_POSITION}
          >
            {result.length ? result.map((item, i) => {
              const coord : LatLng = {
                latitude: item.geometry.location.lat, 
                longitude: item.geometry.location.lng,
              }
              return <Marker 
              key={`search-item-${i}`} 
              coordinate={coord} 
              title={item.name} 
              description=''/>
             }) : null}
          </MapView>
        </View>
      )}
    </View>
  );
}
