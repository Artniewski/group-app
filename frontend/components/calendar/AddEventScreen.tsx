import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Form, FormItem } from "react-native-form-component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AgendaMockContext } from "../../store/MocksContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "AddEvent">;

interface IEventCreationFormData {
  date: string;
  hour: string;
  name: string;
}

export const AddEventScreen: React.FC<Props> = () => {
  const { events, setEvents } = useContext(AgendaMockContext);

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
      <Form style={styles.container} onButtonPress={onSubmit}>
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
          customValidation={() => {
            const pattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
            const valRes = pattern.test(event.date);
            const result = {
              status: valRes,
              message: "Validation failed (yyyy-mm-dd required)",
            };
            return result;
          }}
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
          customValidation={() => {
            const pattern = /^([0-9]{1,2})|(2[0-4]):[0-5][0-9]$/;
            const valRes = pattern.test(event.date);
            const result = {
              status: valRes,
              message: "Validation failed (hh:mm requiered)",
            };
            return result;
          }}
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
    width: 500,
    padding: 10,
    borderRadius: 4,
  },
});