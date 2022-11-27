import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Form, FormItem } from "react-native-form-component";

import { IAuthCookies } from "../common/CommonDataTypes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SERVER_ADDRESS } from "../App";

import { AppContext } from "../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "LoginForm">;

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const { logIn } = useContext(AppContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      username,
      password,
    });

    const loginResult = await fetch(SERVER_ADDRESS + "/auth", {
      method: "POST",
      headers,
      body,
    });

    if (loginResult.ok) {
      const authCookies = (await loginResult.json()) as IAuthCookies;

      logIn(authCookies);
      navigation.navigate("Tasks");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Form onButtonPress={onSubmit}>
        <FormItem
          label="Nazwa użytkownika"
          isRequired
          onChangeText={setUsername}
          value={username}
        />
        <FormItem
          label="Hasło"
          isRequired
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0e101c",
  },
});

export default LoginForm;
