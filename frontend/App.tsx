import React from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { HomeScreen } from "./app_modules/home_module.tsx/HomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExerciseSelectionScreen } from "./app_modules/exercise_exchange_module/ExerciseScreen";
import { ExerciseAddScreen} from "./app_modules/exercise_exchange_module/AddListScreen"
import { VoteOldMan } from "./app_modules/vote_oldman_module/VoteOldMan";

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
        options={({navigation}) => ({
          title: "Wybierz zadanie",
          headerRight: () => (
            <Button
              title="Dodaj listę"
              onPress={() => navigation.navigate('AddExercise')}
            />
          )
        })}
      />
      <Stack.Screen
        name="AddExercise"
        component={ExerciseAddScreen}
        options={{title: 'Dodaj zadanie'}}
      />
      <Stack.Screen
        name="VoteOldMan"
        component={VoteOldMan}
        options={{title : "Wybór starosty"}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
