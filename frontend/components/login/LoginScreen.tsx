import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Form, FormItem } from "react-native-form-component";

import { ILoginRequest, ILoginResponse } from "../../common/HttpDataTypes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SERVER_ADDRESS } from "../../App";

import { AppContext } from "../../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { loginData, startLogin, logIn, errorLogin } = useContext(AppContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogIn = async () => {
    startLogin();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body: ILoginRequest = {
      username,
      password,
    };

    try {
      const loginResult = await fetch(SERVER_ADDRESS + "/api/session/login", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (loginResult.ok) {
        const loginResponse = (await loginResult.json()) as ILoginResponse;

        logIn(loginResponse);

        navigation.navigate("Home");
      } else {
        errorLogin("Nieprawidłowe dane");
      }
    } catch (error) {
      errorLogin(error);
    }
  };

  const pwrLoginValidator = (): { status: boolean; message: string } => {
    const pwrLoginRe = /^pwr[0-9]{6}$/;

    return {
      status: pwrLoginRe.test(username),
      message: "Nieprawidłowy login JSOS",
    };
  };

  const pwrPasswordValidator = (): { status: boolean; message: string } => {
    return {
      status: password.length > 0,
      message: "Hasło jest wymagane",
    };
  };

  const buttonText = loginData.isLoading
    ? "Logowanie..."
    : loginData.error !== null
    ? loginData.error
    : "Zaloguj się";

  return (
    <View style={styles.container}>
      <Form onButtonPress={onLogIn} buttonText={buttonText} style={styles.form}>
        <FormItem
          label="Nazwa użytkownika"
          customValidation={pwrLoginValidator}
          onChangeText={setUsername}
          value={username}
        />
        <FormItem
          label="Hasło"
          customValidation={pwrPasswordValidator}
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
    padding: "25%",
  },
  form: {
    backgroundColor: "lightblue",
    padding: "5%",
    paddingBottom: 0,
    borderRadius: 10,
  },
});
