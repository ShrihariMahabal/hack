import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import React, { useEffect } from "react";

// // Firebase Configuration

// // Initialize Firebase only once
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export default function App() {
  //   useEffect(() => {
  //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //       console.log("Received message:", remoteMessage);
  //     });

  //     return () => unsubscribe();
  //   }, []);

  return (
    <View className="flex h-full justify-center items-center">
      <Stack />
      <Text className="text-blue-800">
        Open up App.js to start working on your app!
      </Text>
      <Link href="/home">Go to Home Page</Link>
      <StatusBar backgroundColor="#000000" style="auto" />
    </View>
  );
}
