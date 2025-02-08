import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

// Simulated database categories (Fetched in real app)
const categories = [
  { id: 1, name: "Infrastructure", icon: "construction", color: "bg-orange-100", textColor: "text-orange-600" },
  { id: 2, name: "Environment", icon: "nature", color: "bg-green-100", textColor: "text-green-600" },
  { id: 3, name: "Safety", icon: "security", color: "bg-red-100", textColor: "text-red-600" },
  { id: 4, name: "Transport", icon: "directions-bus", color: "bg-blue-100", textColor: "text-blue-600" },
];

export default function StartDiscussion() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = () => {
    if (!title || !description || !selectedCategory) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulating sending data to the database
    console.log("New Discussion Created:", { title, description, selectedCategory });

    // Navigate back to the discussions page
    router.push("/community-discussions");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Header Section */}
        <LinearGradient colors={["#065f46", "#047857"]} className="px-6 pt-10 pb-14 rounded-b-3xl shadow-md">
          <Text className="text-white text-3xl font-bold mb-1">Start a Discussion</Text>
          <Text className="text-green-100 text-lg">Engage with the community</Text>
        </LinearGradient>

        {/* Lottie Animation */}
        <View className="items-center justify-center mt-6">
          <LottieView
            source={{ uri: "https://lottie.host/45b9a81d-fdbb-4b65-a6bb-8f896b7e5279/3YxLJMyOCr.json" }}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
        </View>

        {/* Input Fields */}
        <View className="px-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Discussion Title</Text>
          <View className="bg-white p-4 rounded-xl shadow-sm flex-row items-center mb-4 border border-gray-300">
            <MaterialIcons name="title" size={20} color="#666" />
            <TextInput
              className="ml-3 flex-1 text-gray-700"
              placeholder="Enter discussion title..."
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <Text className="text-lg font-bold text-gray-800 mb-2">Description</Text>
          <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-300">
            <TextInput
              className="text-gray-700"
              placeholder="Describe your issue or idea..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Category Selection */}
          <Text className="text-lg font-bold text-gray-800 mt-6 mb-3">Select Category</Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`w-[48%] p-4 rounded-xl flex-row items-center mb-3 shadow-sm border ${
                  selectedCategory === category.name ? "border-emerald-700 bg-emerald-50" : "border-gray-300 bg-white"
                }`}
                onPress={() => setSelectedCategory(category.name)}
              >
                <View className={`${category.color} p-3 rounded-lg`}>
                  <MaterialIcons name={category.icon} size={24} color="black" />
                </View>
                <Text className={`ml-3 font-medium text-gray-800 ${selectedCategory === category.name ? "text-emerald-700" : ""}`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity className="mt-6" onPress={handleSubmit}>
            <LinearGradient colors={["#065f46", "#047857"]} className="py-4 px-6 rounded-xl flex-row items-center justify-center">
              <Ionicons name="send-outline" size={24} color="white" />
              <Text className="text-white font-bold ml-2">Create Discussion</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Action Button - Back */}
      <TouchableOpacity
        className="absolute bottom-6 left-6 bg-gray-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
