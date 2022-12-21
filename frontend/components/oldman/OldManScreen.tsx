import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Form } from "react-native-form-component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SERVER_ADDRESS } from "../../App";
import { AppContext } from "../../store/AppContextProvider";
import { IStudent } from "../../common/DataTypes";

type Props = NativeStackScreenProps<RootStackParamList, "OldMan">;

export const OldManScreen: React.FC<Props> = ({ navigation }) => {
  const { loginData, students, chosenOldman, pickedOldman } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onVote = async () => {
    setIsLoading(true);
    setError(null);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const voteResult = await fetch(
        SERVER_ADDRESS +
          "/api/session/" +
          loginData.content.jsossessid +
          "/vote/" +
          pickedOldman.idSluchacza,
        {
          method: "POST",
          headers,
        }
      );

      setIsLoading(false);

      if (voteResult.ok) {
        navigation.navigate("Home");
      } else {
        setError("Głosowanie nie powiodło się");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const buttonText = isLoading
    ? "Wysyłanie głosu..."
    : error
    ? error
    : "Wyślij głos";

  return (
    <View style={style.container}>
      <ChosenOldMan oldMan={chosenOldman} />
      <Form onButtonPress={onVote} buttonText={buttonText}>
        <FlatList
          style={style.candidateList}
          data={students.content.array}
          renderItem={({ item }) => <OldmanCandidate student={item} />}
        />
      </Form>
    </View>
  );
};

interface ChosenOldManProps {
  oldMan: IStudent;
}

const ChosenOldMan: React.FC<ChosenOldManProps> = ({ oldMan }) => {
  return (
    <View style={style.currentOldman}>
      <Text style={style.currentOldmanText}>
        Aktualny starosta: {oldMan?.name || "Nieznany"}
      </Text>
    </View>
  );
};

interface OldmanCandidateProps {
  student: IStudent;
}

const OldmanCandidate: React.FC<OldmanCandidateProps> = ({ student }) => {
  const { pickedOldman, pickOldman } = useContext(AppContext);

  const studentStyle = [];
  studentStyle.push(style.student);

  if (
    pickedOldman !== null &&
    student.idSluchacza === pickedOldman.idSluchacza
  ) {
    studentStyle.push(style.pickedOldman);
  }

  const pickStudent = () => {
    pickOldman(student);
  };

  return (
    <TouchableOpacity style={studentStyle} onPress={pickStudent}>
      <Text style={style.studentText}>{student.name || "Nieznany"}</Text>
      <Text style={style.studentText}>{student.votes} głosów</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  candidateList: {},
  currentOldman: {
    padding: "3%",
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  currentOldmanText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  student: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  studentText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  pickedOldman: {
    backgroundColor: "green",
  },
  container: {
    backgroundColor: "#fff",
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "2%",
    paddingBottom: 0,
  },
});
