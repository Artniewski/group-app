import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, SERVER_ADDRESS } from "../../App";
import { AppContext } from "../../store/AppContextProvider";
import { IUserData } from "../common/CommonDataTypes";

type Props = NativeStackScreenProps<RootStackParamList, "VoteOldMan">;

interface OldmanCandidateData {
  studentId: string;
  studentName: string;
  numberOfVotes: number;
  selected: boolean;
}

export const VoteOldManScreen: React.FC<Props> = () => {
  const myContext = useContext(AppContext);

  const maxVotesId = () => {
    let maxVotes = 0;
    let maxId = "";

    for (const user of myContext.votableUsers) {
      if (user.votes > maxVotes) {
        maxVotes = user.votes;
        maxId = user.idSluchacza;
      }
    }

    return maxId;
  };

  const maxId = maxVotesId();

  console.log(myContext.votableUsers);

  const candidates: OldmanCandidateData[] = myContext.votableUsers.map((user) => {
    return {
      studentId: user.idSluchacza,
      studentName: user.name,
      numberOfVotes: user.votes,
      selected: user.idSluchacza === maxId,
    };
  });

  console.log(candidates);

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

const OldmanCandidate= (props: OldmanCandidateProps) => {
  const myContext = useContext(AppContext);

  console.log(props);

  const [selected, setSelected] = useState<boolean>(false);

  const voteForCandidate = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const voteResult = await fetch(SERVER_ADDRESS + "/api/session/" + myContext.jsossessid + "/vote/" + props.data.studentId, {
      method: "POST",
      headers,
    });

    if (voteResult.ok) {
      console.log("Vote succesfull");
    } else {
      console.log("Voting failed");
    }
  };

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
          onPress={voteForCandidate}
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
