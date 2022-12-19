import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IExercise } from "./CommonDataTypes";
import { StatusBar } from "expo-status-bar";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AppContext } from "../../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "ExerciseSelection">;

export const ExerciseSelectionScreen: React.FC<Props> = () => {
  const myContext = useContext(AppContext);

  const exercises = myContext.exercises.map((exercise) => {
    return {
      course: {
        courseCode: exercise.taskList.course.id,
        courseName: exercise.taskList.course.name,
      },
      exerciseList: exercise.taskList.listNumber,
      exerciseNumber: exercise.taskNumber,
    };
  });

  return (
    <View style={style.container}>
      <ExerciseList exercises={exercises} />
      <StatusBar style="auto" />
    </View>
  );
};

interface TaskPanelProps {
  courseName: string;
  listNumber: number;
  exerciseNumber: number;
}

const ExercisePanel = (props: TaskPanelProps) => {
  return (
    <View style={style.taskPanel}>
      <Text style={style.taskName}>Kurs: {props.courseName}</Text>
      <Text style={style.taskDescription}>Nr listy: {props.listNumber}</Text>
      <Text style={style.taskDate}>Nr zadania: {props.exerciseNumber}</Text>
    </View>
  );
};

interface TaskListPanelProps {
  exercises: IExercise[];
}

const ExerciseList = (props: TaskListPanelProps) => {
  return (
    <FlatList
      style={style.taskListPanel}
      horizontal={false}
      numColumns={2}
      data={props.exercises}
      renderItem={({ item }) => (
        <ExercisePanel
          courseName={item.course.courseName}
          listNumber={item.exerciseList}
          exerciseNumber={item.exerciseNumber}
        />
      )}
    />
  );
};

const style = StyleSheet.create({
  taskPanel: {
    flex: 1.0,
    backgroundColor: "white",
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  taskDescription: {
    flex: 0.3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  taskName: {
    flex: 0.3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  taskDate: {
    flex: 0.4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  taskListPanel: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
