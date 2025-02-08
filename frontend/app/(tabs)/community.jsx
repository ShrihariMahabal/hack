// app/index.js (Main Forum Screen)
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";

// Dummy data structured like it would come from a backend
const communityData = [
  {
    id: 1,
    name: "Road Warriors",
    description: "Dedicated to identifying and fixing road infrastructure issues like potholes, broken signals, and road signs.",
    members: 1234,
    activeIssues: 15,
    resolvedIssues: 89,
    icon: "construction",
    category: "Infrastructure",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200"
  },
  {
    id: 2,
    name: "Green Guardians",
    description: "Environmental issues, park maintenance, and urban greenery preservation community.",
    members: 892,
    activeIssues: 8,
    resolvedIssues: 67,
    icon: "nature",
    category: "Environment",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    borderColor: "border-green-200"
  },
  {
    id: 3,
    name: "Safety Watch",
    description: "Community focused on public safety issues, broken streetlights, and emergency response.",
    members: 2156,
    activeIssues: 12,
    resolvedIssues: 234,
    icon: "security",
    category: "Safety",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    borderColor: "border-red-200"
  },
  {
    id: 4,
    name: "Transit Trackers",
    description: "Monitoring and reporting public transport delays, route issues, and infrastructure problems.",
    members: 1567,
    activeIssues: 19,
    resolvedIssues: 156,
    icon: "directions-bus",
    category: "Transport",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200"
  }
];

const CommunityCard = ({ community }) => (
  <Link href={`/community/${community.id}`} asChild>
    <TouchableOpacity 
      className={`${community.bgColor} p-4 rounded-xl mb-4 border ${community.borderColor}`}
    >
      <View className="flex-row items-start">
        <View className={`${community.iconColor} p-3 rounded-lg`}>
          <MaterialIcons name={community.icon} size={24} color="#000" />
        </View>
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold mb-1">{community.name}</Text>
          <Text className="text-gray-600 mb-3">{community.description}</Text>
          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <MaterialIcons name="people" size={16} color="#666" />
              <Text className="ml-1 text-gray-600">{community.members}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-red-500">{community.activeIssues} active</Text>
              <Text className="mx-1">•</Text>
              <Text className="text-green-500">{community.resolvedIssues} resolved</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

export default function CommunityForum() {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white p-4 shadow-sm">
        <Text className="text-2xl font-bold">Communities</Text>
        <Text className="text-gray-600 mt-1">Join forces to improve your neighborhood</Text>
      </View>
      
      <ScrollView className="flex-1 px-4 pt-4">
        {communityData.map(community => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </ScrollView>
    </View>
  );
}