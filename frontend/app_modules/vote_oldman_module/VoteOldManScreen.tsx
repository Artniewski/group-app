import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { AppContext } from "../../store/AppContextProvider";

type Props = NativeStackScreenProps<RootStackParamList, "VoteOldMan">;

interface OldmanCandidateData {
  studentId: string;
  studentName: string;
  numberOfVotes: number;
  selected: boolean;
}

export const VoteOldManScreen: React.FC<Props> = () => {
  const myContext = useContext(AppContext);

  const candidates = myContext.votableUsers.map((user) => {
    return {
      studentId: user.userId,
      studentName: user.name,
      numberOfVotes: 0,
      selected: false,
    };
  });

  return (
    <View style={style.container}>
      <CurrentOldMan data={candidates[0]} />
      <FlatList
        style={style.candidateList}
        horizontal={false}
        numColumns={1}
        data={candidates}
        renderItem={({ item }) => <OldmanCandidate data={item} />}
      />
    </View>
  );
};

interface CurrentOldManProps {
  data: OldmanCandidateData;
}

const CurrentOldMan = (props: CurrentOldManProps) => {
  return (
    <View style={style.currentOldman}>
      <Text>Twoim starostą jest aktualnie {props.data.studentName}!</Text>
    </View>
  );
};

interface OldmanCandidateProps {
  data: OldmanCandidateData;
}

const OldmanCandidate = (props: OldmanCandidateProps) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <View style={style.candidate}>
      <Text>Kandydat: {props.data.studentName}</Text>
      <Text>Liczba głosów: {props.data.numberOfVotes}</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button
          title={selected ? "Usuń głos" : "Oddaj głos"}
          onPress={() => {
            setSelected(!selected);
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  candidateList: {
    flex: 0.9,
    backgroundColor: "white",
  },
  currentOldman: {
    flex: 0.1,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    margin: 2,
  },
  candidate: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    margin: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
