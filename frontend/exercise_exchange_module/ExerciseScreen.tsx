import { FlatList, StyleSheet, Text, View } from 'react-native';
import { IExercise } from './commonDataTypes';
import {StatusBar} from 'expo-status-bar';

export const ExerciseSelectionScreen = () => {
  return (
    <View style={style.container}>
      <ExerciseList exercises={[{course: {courseCode: "siema", courseName: "Kikd"}, exerciseList: 1, exerciseNumber : 1},
                                {course: {courseCode: "siema", courseName: "Kikd"}, exerciseList: 1, exerciseNumber : 2}]}/>
      <StatusBar style="auto" />
    </View>
  );
}

interface TaskPanelProps {
  courseName : string
  listNumber : number
  exerciseNumber : number
}

const ExercisePanel = (props : TaskPanelProps) => {
    return (
      <View style={style.taskPanel}>
        <Text style={style.taskName}>Kurs: {props.courseName}</Text>
        <Text style={style.taskDescription}>Nr listy: {props.listNumber}</Text>
        <Text style={style.taskDate}>Nr zadania: {props.exerciseNumber}</Text>        
      </View>
    );
}

interface TaskListPanelProps {
  exercises : IExercise[]
}

const ExerciseList = (props : TaskListPanelProps) => {
  return (
    <FlatList
      style={style.taskListPanel}
      horizontal={false} 
      numColumns={2}
      data={props.exercises}
      renderItem={({item}) => <ExercisePanel courseName={item.course.courseName}
                              listNumber={item.exerciseList}
                              exerciseNumber={item.exerciseNumber}/>}
    />
  );
}

const style = StyleSheet.create({
    taskPanel: {
      flex: 1.0,
      backgroundColor: 'white',
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    },
    taskDescription: {
      flex: 0.3,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: "white",
    },
    taskName: {
      flex: 0.3,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: "white",
    },
    taskDate: {
      flex: 0.4,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: "white",
    },
    taskListPanel: {
      height: '100%',
      width: '100%',
      backgroundColor: "white",
    },
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });