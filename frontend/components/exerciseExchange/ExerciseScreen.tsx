import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { IExerciseData, ISendExercisesReq } from "../common/CommonDataTypes";
import { StatusBar } from "expo-status-bar";

import { Form } from "react-native-form-component";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SERVER_ADDRESS } from "../../App";
import { AppContext } from "../../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "ExerciseSelection">;

export const ExerciseSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const myContext = useContext(AppContext);

  const onSubmit = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body: ISendExercisesReq = {
      offeredTasks: myContext.userTasks.offeredTasks.map((task) => {
        return {
          taskNumber: task.taskNumber,
          taskListNumber: task.taskList.listNumber,
          course: {
            courseName: task.taskList.course.name,
            courseCode: task.taskList.course.id,
          },
        };
      }),
      requestedTasks: myContext.userTasks.requestedTasks.map((task) => {
        return {
          taskNumber: task.taskNumber,
          taskListNumber: task.taskList.listNumber,
          course: {
            courseName: task.taskList.course.name,
            courseCode: task.taskList.course.id,
          },
        };
      }),
    };

    const addTaskResult = await fetch(
      SERVER_ADDRESS + "/api/session/" + myContext.jsossessid + "/ontasks",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    console.log(JSON.stringify(body));

    if (addTaskResult.ok) {
      myContext.refreshStudentData();
      navigation.navigate("HomeScreen");
    } else {
      console.log("Adding list failed");
    }
  };

  return (
    <View style={style.container}>
      <Form onButtonPress={onSubmit}>
        <ExerciseList exercises={myContext.exercises} />
        <StatusBar style="auto" />
      </Form>
    </View>
  );
};

type TaskPanelProps = IExerciseData;

const ExercisePanel = (props: TaskPanelProps) => {
  const myContext = useContext(AppContext);

  const [isOffered, setIsOffered] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const isTaskOffered = (task: IExerciseData) => {
    for (const offeredTask of myContext.userTasks.offeredTasks) {
      if (task.id === offeredTask.id) {
        return true;
      }
    }

    return false;
  };

  const isTaskRequested = (task: IExerciseData) => {
    for (const requestedTask of myContext.userTasks.requestedTasks) {
      if (task.id === requestedTask.id) {
        return true;
      }
    }

    return false;
  };

  const taskPanelStyle = [];
  taskPanelStyle.push(style.taskPanel);

  if (isOffered) {
    taskPanelStyle.push(style.offered);
  } else if (isRequested) {
    taskPanelStyle.push(style.requested);
  }

  useEffect(() => {
    if (isTaskOffered(props)) {
      setIsOffered(true);
    } else if (isTaskRequested(props)) {
      setIsRequested(true);
    }
  }, [setIsOffered, setIsRequested]);

  const clickTask = () => {
    if (isTaskOffered(props)) {
      myContext.userTasks.offeredTasks =
        myContext.userTasks.offeredTasks.filter((task) => task.id != props.id);
      myContext.userTasks.requestedTasks.push(props);
      setIsOffered(false);
      setIsRequested(true);
    } else if (isTaskRequested(props)) {
      myContext.userTasks.requestedTasks =
        myContext.userTasks.requestedTasks.filter(
          (task) => task.id != props.id
        );
      setIsRequested(false);
    } else {
      myContext.userTasks.offeredTasks.push(props);
      setIsOffered(true);
    }

    myContext.userTasks = { ...myContext.userTasks };
  };

  return (
    <TouchableOpacity style={taskPanelStyle} onPress={clickTask}>
      <Text style={style.taskName}>Kurs: {props.taskList.course.name}</Text>
      <Text style={style.taskDescription}>
        Nr listy: {props.taskList.listNumber}
      </Text>
      <Text style={style.taskDate}>Nr zadania: {props.taskNumber}</Text>
    </TouchableOpacity>
  );
};

interface TaskListPanelProps {
  exercises: IExerciseData[]; }

const ExerciseList = (props: TaskListPanelProps) => {
  return (
    <FlatList
      style={style.taskListPanel}
      horizontal={false}
      numColumns={2}
      data={props.exercises}
      renderItem={({ item }) => <ExercisePanel {...item} />}
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
    alignItems: "center",
    justifyContent: "center",
  },
  taskName: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  taskDate: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
  },
  taskListPanel: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  offered: {
    backgroundColor: "green",
    color: "white",
  },
  requested: {
    backgroundColor: "red",
    color: "white",
  },
});
