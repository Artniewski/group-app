import React, { useContext } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

import { AppContext, AuthCookies } from "./AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "loginForm">;

interface IFormInput {
  username: string;
  password: string;
}

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const { logIn } = useContext(AppContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async ({
    username,
    password,
  }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      username,
      password,
    });

    const loginResult = await fetch("http://192.168.2.53:8080/auth", {
      method: "POST",
      headers,
      body,
    });

    const authCookies = (await loginResult.json()) as AuthCookies;

    logIn(authCookies);
    navigation.navigate("tasks");
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
          />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

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

export default LoginForm;
