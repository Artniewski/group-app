import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

import { AppContext } from "../../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { tasks, courses, students, userTasks } = useContext(AppContext);

  const loadingButton = (
    <View style={style.loadingTaskPanel}>
      <Text style={style.loadingTaskPanelText}>Ładowanie...</Text>
    </View>
  );

  const errorButton = (
    <View style={style.loadingTaskPanel}>
      <Text style={style.loadingTaskPanelText}>Error</Text>
    </View>
  );

  const tasksModuleButton =
    tasks.isLoading || userTasks.isLoading || courses.isLoading ? (
      loadingButton
    ) : tasks.error !== null ||
      userTasks.error !== null ||
      courses.error !== null ? (
      errorButton
    ) : (
      <TouchableOpacity
        style={style.taskPanel}
        onPress={() => navigation.navigate("ExerciseSelection")}
      >
        <Text style={style.taskPanelText}>Giełda zadań</Text>
      </TouchableOpacity>
    );

  const voteOldManModuleButton = students.isLoading ? (
    loadingButton
  ) : students.error !== null ? (
    errorButton
  ) : (
    <TouchableOpacity
      style={style.taskPanel}
      onPress={() => navigation.navigate("OldMan")}
    >
      <Text style={style.taskPanelText}>Wybór starosty</Text>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      {tasksModuleButton}
      {voteOldManModuleButton}
      <TouchableOpacity
        style={style.taskPanel}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Text style={style.taskPanelText}>Kalendarz</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  taskPanelText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  loadingTaskPanelText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
  taskPanel: {
    backgroundColor: "#d81f28",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 10,
  },
  loadingTaskPanel: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 10,
  },
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "lightblue",
    padding: 10,
    width: "50%",
    height: "100%",
  },
});
