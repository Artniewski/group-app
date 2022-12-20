import React from "react";
import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./app_modules/home_module.tsx/HomeScreen";
import { ExerciseSelectionScreen } from "./app_modules/exercise_exchange_module/ExerciseScreen";
import { ExerciseAddScreen } from "./app_modules/exercise_exchange_module/AddListScreen";
import { VoteOldManScreen } from "./app_modules/vote_oldman_module/VoteOldManScreen";
import LoginForm from "./app_modules/login_module/LoginForm";

import AppContextProvider from "./store/AppContextProvider";
import AgendaMockContextProvider from "./app_modules/calendar_module/Mocks";
import { CalendarScreen } from "./app_modules/calendar_module/CalendarScreen";
import { AddEventScreen } from "./app_modules/calendar_module/AddEventScreen";

export const SERVER_ADDRESS = "http://192.168.174.126:8080";

export type RootStackParamList = {
  LoginForm: undefined;
  HomeScreen: undefined;
  ExerciseSelection: undefined;
  AddExercise: undefined;
  VoteOldMan: undefined;
  CalendarScreen: undefined;
  AddEvent: undefined;
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AppContextProvider>
      <AgendaMockContextProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginForm">
            <Stack.Screen
              name="LoginForm"
              component={LoginForm}
              options={{ title: "Logowanie" }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: "Wybierz moduł" }}
            />
            <Stack.Screen
              name="ExerciseSelection"
              component={ExerciseSelectionScreen}
              options={({ navigation }) => ({
                title: "Wybierz zadanie",
                headerRight: () => (
                  <Button
                    title="Dodaj listę"
                    onPress={() => navigation.navigate("AddExercise")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="CalendarScreen"
              component={CalendarScreen}
              options={({ navigation }) => ({
                title: "Kalendarz",
                headerRight: () => (
                  <Button
                    title="Dodaj wydarzenie"
                    onPress={() => navigation.navigate("AddEvent")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddEvent"
              component={AddEventScreen}
              options={{title: "Dodaj wydarzenie"}}
            />
            <Stack.Screen
              name="AddExercise"
              component={ExerciseAddScreen}
              options={{ title: "Dodaj zadanie" }}
            />
            <Stack.Screen
              name="VoteOldMan"
              component={VoteOldManScreen}
              options={{ title: "Wybór starosty" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AgendaMockContextProvider>
    </AppContextProvider>
  );
};

export default App;
