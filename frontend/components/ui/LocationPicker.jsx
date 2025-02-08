import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Location from 'expo-location';

const LocationPicker = ({ setLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleGetLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
    setLocation(location.coords);
  };

  return (
    <View>
      <Button title="Get Location" onPress={handleGetLocation} />
      {currentLocation && (
        <Text>Lat: {currentLocation.latitude}, Lng: {currentLocation.longitude}</Text>
      )}
    </View>
  );
};

export default LocationPicker;
