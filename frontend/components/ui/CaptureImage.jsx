import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CaptureImage = ({ setImageUri }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCaptureImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Camera access is needed to capture an image.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="my-4">
      <Button title="Capture Image" onPress={handleCaptureImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} className="w-40 h-40 mt-3 rounded-xl" />
      )}
    </View>
  );
};

export default CaptureImage;
