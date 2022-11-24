import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { HomeScreen } from "./home_module.tsx/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExerciseSelectionScreen } from "./exercise_exchange_module/ExerciseScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Wybierz moduł' }}
      />
      <Stack.Screen
        name="ExerciseSelection"
        component={ExerciseSelectionScreen}
        options={{ title: 'Wybierz zadanie' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
