import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Picker, Form } from "react-native-form-component";

import { AppContext } from "../store/AppContextProvider";

const Tasks: React.FC = () => {
  const myContext = useContext(AppContext);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Form
        onButtonPress={() => {
          return;
        }}
      >
        {myContext.courseData !== null && (
          <Picker
            label="Wybierz kurs"
            items={myContext.courseData.map((course) => {
              return { label: course.courseName, value: course.courseCode };
            })}
            selectedValue={selectedCourse}
            onSelection={(item) => setSelectedCourse(item.value.toString())}
          />
        )}
        {myContext.courseData === null && <Text>Loading course data...</Text>}
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#0e101c",
  },
});

export default Tasks;
