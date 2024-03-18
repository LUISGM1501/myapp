import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import styles from '../Screens/Styles';


//import { initializeMaps } from 'expo-maps';
//initializeMaps({ apiKey: "AIzaSyBKc6KiMT9vb4vhvbyIw9RMBmANjHrzo10" });
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function GoogleMaps() {
    return (
        <View style={styles.Container}>
            <MapView
                style={styles.mapView}
            />
        </View>
    );
}
