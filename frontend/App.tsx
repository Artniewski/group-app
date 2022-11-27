import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppContextProvider from "./components/AppContextProvider";
import LoginForm from "./components/LoginForm";
import Tasks from "./components/Tasks";

export type RootStackParamList = {
  tasks: undefined;
  loginForm: undefined;
};

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <AppContextProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="loginForm">
            <Stack.Screen
              name="loginForm"
              component={LoginForm}
              options={{ title: "Logowanie" }}
            />
            <Stack.Screen
              name="tasks"
              component={Tasks}
              options={{ title: "Zadania" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "#ec5990",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "white",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
  },
});
