import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Form, FormItem } from "react-native-form-component";
import { ICourseData } from "../common/CommonDataTypes";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AgendaMockContext } from "./Mocks";

type Props = NativeStackScreenProps<RootStackParamList, "AddEvent">;

interface IEventCreationFormData {
  date: string;
  hour: string;
  name: string;
}

export const AddEventScreen: React.FC<Props> = () => {
  const {events, setEvents} = useContext(AgendaMockContext);

  //TODO: verify if useRef would work here instead of state.
  const [event, setNewList] = useState<IEventCreationFormData>({
    date: "",
    hour: "",
    name: "",
  });

  const onSubmit = () => {
    const newList = [...events];
    newList.push({
      name: event.hour + "|" + event.name,
      day: event.date,
      height: 100,
    });
    setEvents(newList);
  };

  return (
    <View style={styles.container}>
        <Form onButtonPress={onSubmit}>
          <FormItem
            label="Data"
            textInputStyle={styles.input}
            isRequired
            onChangeText={(x) => {
              const newListCopy = { ...event };
              newListCopy.date = x;
              setNewList(newListCopy);
            }}
            value={event.date}
          />
          <FormItem
            label="Godzina"
            textInputStyle={styles.input}
            isRequired
            onChangeText={(x) => {
              const newListCopy = { ...event };
              newListCopy.hour = x;
              setNewList(newListCopy);
            }}
            value={event.hour}
          />
          <FormItem
            label="Nazwa"
            textInputStyle={styles.input}
            isRequired
            onChangeText={(x) => {
              const newListCopy = { ...event };
              newListCopy.name = x;
              setNewList(newListCopy);
            }}
            value={event.name}
          />
        </Form>
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
