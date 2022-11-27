import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { AppContext } from "./AppContextProvider";

interface CourseListResponse {
  idSluchacza: string;
  courseIdList: string[];
}

const Tasks: React.FC = () => {
  const { authCookies } = useContext(AppContext);
  const { YII_CSRF_TOKEN, JSOSSESSID } = authCookies;

  const [courses, setCourses] = useState<string[] | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        YII_CSRF_TOKEN,
        JSOSSESSID,
      });

      const loginResult = await fetch("http://192.168.2.53:8080/courseList", {
        method: "POST",
        headers,
        body,
      });

      const { courseIdList } = (await loginResult.json()) as CourseListResponse;

      setCourses(courseIdList);
    };

    fetchGroups();
  }, [setCourses]);

  return (
    <View>
      <Picker
        selectedValue={selectedCourse}
        onValueChange={(course) => setSelectedCourse(course)}
      >
        {courses?.map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>
    </View>
  );
};

export default Tasks;
