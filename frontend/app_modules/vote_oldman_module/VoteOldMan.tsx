import React, { useState } from "react";
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';



interface OldmanCandidateData {
  studentId: string,
  studentName: string,
  numberOfVotes: number
  selected: boolean
}

export function VoteOldMan() {
  const [candidates, setCandidates] : [OldmanCandidateData[], any] = useState([
    {studentId: "123", studentName: "Kamil Ślimak", numberOfVotes: 0, selected: false}
  ]);
  
  return (
    <View style={style.container}>
        <CurrentOldMan
          data={candidates[0]}
        />
        <FlatList
          style={style.candidateList}
          horizontal={false} 
          numColumns={1}
          data={candidates}
          renderItem={({item}) => <OldmanCandidate data={item}/>}
        />
    </View>
  );
}

interface CurrentOldManProps {
  data: OldmanCandidateData
}

const CurrentOldMan = (props : CurrentOldManProps) => {
  return(<View style={style.currentOldman}>
  <Text>Twoim starostą jest aktualnie {props.data.studentName}!</Text>
  </View>);
}

interface OldmanCandidateProps {
  data : OldmanCandidateData

}

const OldmanCandidate = (props : OldmanCandidateProps) => {
  const [selected, setSelected] : [Boolean, any] = useState(false);
  const [candidateRef, setCandidateReff] : [OldmanCandidateData, any] = useState(props.data);
  return(
  <View style={style.candidate}>
    <Text>Kandydat: {props.data.studentName}</Text>
    <Text>Liczba głosów: {props.data.numberOfVotes}</Text>
    <View style={{
      flexDirection: "row",
    }}>
      <Button
        title={selected ? "Usuń głos" : "Oddaj głos"}
        onPress={() => {setSelected(!selected);
          setCandidateReff()    
        }
      }
      />
    </View>
  </View>
  );
}

const style = StyleSheet.create({
  candidateList: {
    flex: 0.9,
    backgroundColor: "white",
  },
  currentOldman: {
    flex: 0.1,
    backgroundColor: "white",
    borderColor: 'black',
    borderWidth: 2,
    margin: 2,
  },
  candidate: {
    flex: 1,
    backgroundColor: "white",
    borderColor: 'black',
    borderWidth: 2,
    margin: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});