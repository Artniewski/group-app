import React from "react";
import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./components/home/HomeScreen";
import { ExerciseSelectionScreen } from "./components/exerciseExchange/ExerciseScreen";
import { ExerciseAddScreen } from "./components/exerciseExchange/AddListScreen";
import { OldManScreen } from "./components/oldman/OldManScreen";
import { LoginScreen } from "./components/login/LoginScreen";
import { CalendarScreen } from "./components/calendar/CalendarScreen";
import { AddEventScreen } from "./components/calendar/AddEventScreen";

import { AppContextProvider } from "./store/AppContextProvider";
import { AgendaMockContextProvider } from "./store/MocksContextProvider";

export const SERVER_ADDRESS = "http://172.24.83.225:8080";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ExerciseSelection: undefined;
  AddExercise: undefined;
  OldMan: undefined;
  Calendar: undefined;
  AddEvent: undefined;
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AppContextProvider>
      <AgendaMockContextProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="OldMan">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Logowanie" }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Moduły" }}
            />
            {/* <Stack.Screen */}
            {/*   name="ExerciseSelection" */}
            {/*   component={ExerciseSelectionScreen} */}
            {/*   options={({ navigation }) => ({ */}
            {/*     title: "Zadania", */}
            {/*     headerRight: () => ( */}
            {/*       <Button */}
            {/*         title="Dodaj listę" */}
            {/*         onPress={() => navigation.navigate("AddExercise")} */}
            {/*       /> */}
            {/*     ), */}
            {/*   })} */}
            {/* /> */}
            <Stack.Screen
              name="Calendar"
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
            {/* <Stack.Screen */}
            {/*   name="AddEvent" */}
            {/*   component={AddEventScreen} */}
            {/*   options={{ title: "Dodaj wydarzenie" }} */}
            {/* /> */}
            {/* <Stack.Screen */}
            {/*   name="AddExercise" */}
            {/*   component={ExerciseAddScreen} */}
            {/*   options={{ title: "Dodaj zadanie" }} */}
            {/* /> */}
            <Stack.Screen
              name="OldMan"
              component={OldManScreen}
              options={{ title: "Wybór starosty" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AgendaMockContextProvider>
    </AppContextProvider>
  );
};

export default App;
