import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {router} from 'expo-router';

const Travel = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold">Welcome to App</Text>
      <Text className="text-lg mt-4">Your adventure starts here!</Text>
      <TouchableOpacity
        className="absolute bottom-[1rem] left-4 right-4 bg-emerald-800 rounded-full py-3 shadow-lg"
        onPress={() => {
          router.push({
            pathname: "/(tabs)/travel/routescreen",
            params: {
              text: "Find Routes",
            },
          });
        }}
        style={{ zIndex: 10 }}
      >
        <Text className="text-white text-center font-bold text-lg">
          Find Routes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Travel;