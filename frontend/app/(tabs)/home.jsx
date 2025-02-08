import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import CaptureImage from '../../components/ui/CaptureImage';
import LocationPicker from '../../components/ui/LocationPicker';

const IssueScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!imageUri || !location || !description) {
      Alert.alert('Error', 'Please provide all the details');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'issue_image.jpg',
    });
    formData.append('description', description);
    formData.append('location', JSON.stringify(location));

    try {
      await axios.post('http://localhost:3000/api/report-issue', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Issue reported successfully');
    } catch (error) {
      Alert.alert('Error', 'There was an issue reporting the problem');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 p-4">
      {/* Card Section */}
      <View className="p-5 bg-green-100 rounded-2xl mb-5 shadow-xl w-4/5">
        <Text className="text-lg font-semibold mb-4 text-center">
          Report an Issue
        </Text>
        <TouchableOpacity 
          onPress={handleSubmit} 
          className="bg-green-500 p-3 rounded-xl shadow-md"
        >
          <Text className="text-white text-center font-semibold">Add an Issue</Text>
        </TouchableOpacity>
      </View>

      {/* Capture Image Section */}
      <View className="my-4">
        <CaptureImage setImageUri={setImageUri} />
      </View>

      {/* Location Picker Section */}
      <View className="my-4">
        <LocationPicker setLocation={setLocation} />
      </View>

      {/* Description Input Section */}
      <TextInput
        placeholder="Describe the issue"
        value={description}
        onChangeText={setDescription}
        className="border border-gray-300 p-3 rounded-xl w-4/5 bg-white shadow-sm mt-4"
      />
    </View>
  );
};

export default IssueScreen;
