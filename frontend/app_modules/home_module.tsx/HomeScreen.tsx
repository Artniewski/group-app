import React from "react";
import { Button, FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {ExerciseSelectionScreen} from '../exercise_exchange_module/ExerciseScreen'
import {useNavigation, NavigationContainer} from '@react-navigation/native'
import { ExerciseAddScreen} from "../exercise_exchange_module/AddListScreen"
import {VoteOldMan} from "../vote_oldman_module/VoteOldMan"

//In futre module names should be injected as dependancy depending on language.
interface ModuleData {
  moduleName : string;
  navigationName : string
}

interface ModuleListProps {
  moduleData : ModuleData[];
}

export function HomeScreen({navigation}) {
  const moduleNames : ModuleData[] = [{moduleName: "Giełda zadań", navigationName : "ExerciseSelection"},
                                      {moduleName: "Wybór starosty", navigationName : "VoteOldMan"}
                                     ]
  return (
    <View style={style.container}>
      <ModuleList moduleData={moduleNames}/>
      <StatusBar style="auto" />
    </View>
  );
}

const ModuleList = (props : ModuleListProps) => {
  const navigation = useNavigation();
  return (
    <FlatList
      style={style.taskListPanel}
      horizontal={false} 
      numColumns={2}
      data={props.moduleData}
      renderItem={({item}) => <TouchableOpacity style={style.taskPanel} onPress={() => navigation.navigate(item.navigationName)}><Text>{item.moduleName}</Text></TouchableOpacity>}
    />
  );
}

const style = StyleSheet.create({
  taskPanel: {
    flex: 0.5,
    backgroundColor: 'white',
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    margin: 2
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
