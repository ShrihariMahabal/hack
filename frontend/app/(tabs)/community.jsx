import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { LinearGradient } from 'expo-linear-gradient';

const discussions = [
  {
    id: 1,
    title: "Fixing Potholes in Downtown",
    description: "Let's organize a weekend pothole repair drive and request city assistance.",
    createdBy: "Alex Johnson",
    votes: 56,
    comments: 12,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 2,
    title: "Community Cleanup Initiative",
    description: "Plan a cleanup day for the local park and invite volunteers.",
    createdBy: "Samantha Lee",
    votes: 102,
    comments: 25,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Streetlight Safety Concerns",
    description: "Report and replace broken streetlights to improve nighttime safety.",
    createdBy: "Michael Brown",
    votes: 78,
    comments: 18,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    id: 4,
    title: "Public Transport Delays Discussion",
    description: "Brainstorm solutions for unreliable bus schedules and metro issues.",
    createdBy: "Emily Davis",
    votes: 134,
    comments: 41,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

const DiscussionCard = ({ discussion }) => {
  const [votes, setVotes] = useState(discussion.votes);
  const [pressed, setPressed] = useState(false);

  return (
    <Link href={`/discussion/${discussion.id}`} asChild>
      <TouchableOpacity 
        className="bg-white p-5 rounded-2xl shadow-md mb-4 active:scale-95"
      >
        <View className="flex-row items-center mb-3">
          <View className={`${discussion.bgColor} p-3 rounded-full`}>
            <MaterialIcons name="forum" size={24} color={discussion.iconColor.replace('text-', '')} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-gray-800">{discussion.title}</Text>
            <Text className="text-xs text-gray-500 mt-1">
              <Ionicons name="person-outline" size={12} /> {discussion.createdBy}
            </Text>
          </View>
        </View>

        <Text className="text-gray-600 text-sm leading-5 mb-4">{discussion.description}</Text>

        <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
          <TouchableOpacity 
            onPress={() => {
              setVotes(votes + 1);
              setPressed(true);
            }}
            className={`flex-row items-center px-3 py-1 rounded-full ${pressed ? 'bg-blue-100' : ''}`}
          >
            <Ionicons 
              name={pressed ? "heart" : "heart-outline"} 
              size={20} 
              color={pressed ? "#2563EB" : "#666"} 
            />
            <Text className={`ml-1 font-medium ${pressed ? 'text-blue-600' : 'text-gray-600'}`}>
              {votes}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <Ionicons name="chatbubble-outline" size={18} color="#666" />
              <Text className="ml-1 text-gray-600">{discussion.comments}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default function CommunityDiscussions() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header Section */}
        <LinearGradient
          colors={['#065f46', '#047857']}
          className="px-6 pt-10 pb-14 rounded-b-3xl shadow-md"
        >
          <Text className="text-white text-3xl font-bold mb-1">Community Hub</Text>
          <Text className="text-green-100 text-lg">Join the conversation, make a difference</Text>
        </LinearGradient>

        {/* Quick Stats */}
        <View className="flex-row justify-around mx-6 -mt-10">
          <View className="bg-white px-6 py-4 rounded-xl shadow-md items-center">
            <Text className="text-2xl font-bold text-gray-800">{discussions.length}</Text>
            <Text className="text-sm text-gray-600">Active Topics</Text>
          </View>
          <View className="bg-white px-6 py-4 rounded-xl shadow-md items-center">
            <Text className="text-2xl font-bold text-gray-800">324</Text>
            <Text className="text-sm text-gray-600">Members</Text>
          </View>
          <View className="bg-white px-6 py-4 rounded-xl shadow-md items-center">
            <Text className="text-2xl font-bold text-gray-800">89%</Text>
            <Text className="text-sm text-gray-600">Resolved</Text>
          </View>
        </View>

        {/* Create Discussion Button */}
        <TouchableOpacity 
          className="mx-6 mt-6 mb-6" 
          onPress={() => navigation.navigate('newdiscussion')}>
          <LinearGradient
            colors={['#065f46', '#047857']}
            className="py-4 px-6 rounded-xl flex-row items-center justify-center"
          >
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Start New Discussion</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Discussions Container */}
        <View className="px-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Discussions</Text>
          {discussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 bg-green-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: "#065f46",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8,
        }}
        onPress={() => navigation.navigate('newdiscussion')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
