import React from "react";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppContextProvider from "./store/AppContextProvider";

import LoginForm from "./modules/LoginForm";
import Tasks from "./modules/Tasks";

export const SERVER_ADDRESS = "http://192.168.2.53:8080";

export type RootStackParamList = {
  Tasks: undefined;
  LoginForm: undefined;
};

const App: React.FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AppContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginForm">
          <Stack.Screen
            name="LoginForm"
            component={LoginForm}
            options={{ title: "Logowanie" }}
          />
          <Stack.Screen
            name="Tasks"
            component={Tasks}
            options={{ title: "Zadania" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
