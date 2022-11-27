import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Form, FormItem, Picker } from "react-native-form-component";
import { ICourseData } from "../common/CommonDataTypes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "AddExercise">;

interface IExerciseCreationFormData {
  exerciseNumbers: string;
  exerciseList: number;
  courseCode: string;
}

export const ExerciseAddScreen: React.FC<Props> = () => {
  //Replace with something useful
  const [courses, setCourses] = useState<ICourseData[]>([
    { courseCode: "312", courseName: "Kikd" },
    { courseCode: "123", courseName: "Akiso" },
  ]);

  //TODO: verify if useRef would work here in place of state.
  const [newList, setNewList] = useState<IExerciseCreationFormData>({
    exerciseNumbers: "",
    exerciseList: -1,
    courseCode: "",
  });

  const onSubmit = () => console.log(newList);

  courses.map((x) => {
    return { label: x.courseName, value: x.courseCode };
  });

  return (
    <View style={styles.container}>
      <Form onButtonPress={onSubmit}>
        <FormItem
          label="Nr listy"
          textInputStyle={styles.input}
          isRequired
          onChangeText={(exerciseList) => {
            const newListCopy = { ...newList };
            newListCopy.exerciseList = parseInt(exerciseList);
            setNewList(newListCopy);
          }}
          value={newList.exerciseList.toString()}
        />
        <FormItem
          label="Nr zadania"
          textInputStyle={styles.input}
          isRequired
          onChangeText={(exerciseNumbers) => {
            const newListCopy = { ...newList };
            newListCopy.exerciseNumbers = exerciseNumbers;
            setNewList(newListCopy);
          }}
          value={newList.exerciseNumbers}
        />
        <Picker
          items={courses.map((x) => {
            return { label: x.courseName, value: x.courseCode };
          })}
          label="Kurs"
          selectedValue={newList.courseCode}
          onSelection={(item) => {
            const newListCopy = { ...newList };
            newListCopy.courseCode = item.value.toString();
            setNewList(newListCopy);
          }}
        />
      </Form>
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
