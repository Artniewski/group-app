import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Form, FormItem, Picker } from "react-native-form-component";
import { IAddTasksRequest } from "../../common/HttpDataTypes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SERVER_ADDRESS } from "../../App";
import { AppContext } from "../../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "AddExercise">;

export const ExerciseAddScreen: React.FC<Props> = ({ navigation }) => {
  const { loginData, reloadUserTasks, reloadTasks, courses } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskListNumber, setTaskListNumber] = useState<number>(1);
  const [taskCount, setTaskCount] = useState<number>(1);
  const [courseCode, setCourseCode] = useState<string>("");

  const onSubmit = async () => {
    setIsLoading(true);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body: IAddTasksRequest = {
      courseCode,
      taskListNumber,
      taskCount,
    };

    const addTaskResult = await fetch(
      SERVER_ADDRESS +
        "/api/session/" +
        loginData.content.jsossessid +
        "/tasks",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    setIsLoading(false);

    if (addTaskResult.ok) {
      reloadTasks();
      navigation.navigate("ExerciseSelection");
    } else {
      console.log("Adding list failed");
    }
  };

  const buttonText = isLoading
    ? "Wysłanie listy..."
    : "Dodaj listę";

  return (
    <View style={styles.container}>
      {courses.isLoading && <Text>Loading data...</Text>}
      {!courses.isLoading != null && (
        <Form onButtonPress={onSubmit} buttonText={buttonText}>
          <FormItem
            label="Numer listy"
            textInputStyle={styles.input}
            isRequired
            onChangeText={(number) => setTaskListNumber(parseInt(number))}
            value={taskListNumber.toString()}
          />
          <FormItem
            label="Liczba zadań"
            textInputStyle={styles.input}
            isRequired
            onChangeText={(count) => setTaskCount(parseInt(count))}
            value={taskCount.toString()}
          />
          <Picker
            items={courses.content.array.map((data) => {
              return { label: data.courseName, value: data.courseCode };
            })}
            label="Kurs"
            selectedValue={courseCode}
            onSelection={(item) => setCourseCode(item.value.toString())}
          />
        </Form>
      )}
      <StatusBar style="auto" />
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
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    width: 300,
    padding: 10,
    borderRadius: 4,
  },
});
