import React, {useState, useEffect} from 'react';
import { Alert, Platform, Text, View, Modal } from 'react-native';
import styled from "styled-components";
import useInput from "../../useInput";
import firebase from "../../Firebase";
import TodayInput from "./TodayInput";
import PercentageCircle from 'react-native-percentage-circle';
import { Ionicons } from '@expo/vector-icons';


const ScrollWrap = styled.ScrollView`
    padding: 20px 20px 80px 20px;
`;

const PadWrap = styled.View`
    padding: 0 20px;
    margin-top:20px;
`;

const PadBottom = styled.View`
    height:400px;
`;

const ExtraInput = styled.TextInput`
    padding:5px;
    padding-left:20px;
    border-radius:5px;
    background:white;
    margin-top:20px;
    border:1px solid lightgray;
`;

const TopWrap = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    height:80px;
    background: #3498db; 
    borderBottomWidth:1px;
    borderBottomColor:lightgray;
    padding:0 20px 0 10px;
`;

const SubText = styled.Text`
    margin-bottom:5px;
    font-size:10px;
`;

const DateWrap = styled.View`
    width:70%;
    padding-left:10px;
`;

const UpperText = styled.Text`
    text-transform: uppercase;
    font-size:15px;
    color: #f2f2f2;
`;

const ExtraButton = styled.TouchableOpacity`
    position:absolute;
    right:20px;
    bottom:100px;
    justify-content:center;
    align-items:center;
    width:70px;
    height:70px;
    z-index:99;
`;

const TodayTask = ({ theDay, dayId, uid, theData, dayDisplay }) => {
    let tasks = [];
    let extras = [];
    
    const db = firebase.firestore();

    const [modalVisible, setModalVisible] = useState(false);
    const [percent, setPercent] = useState(0);
    const extra = useInput('');

    const handleExtra = () => {
        if(extra.value == ""){
            return Alert.alert("Empty");
        }

        db.collection("izgym").doc(uid).get().then(data => {
            let meme = data.data();

            extras.push({name: extra.value, current:0, total:10 });

            let tempExtra = meme['extra'];
            tempExtra[dayId] = extras;

            console.log("THE EXTRA", tempExtra);
            db.collection("izgym").doc(uid).set({ ...meme, extra: { ...tempExtra }  });
            assignPercent(dayId, theData);
            extra.setValue("");
            setModalVisible(!modalVisible);
        });       
    }

    const assignPercent = (datecode, datas = theData) => {
        let templateTotal = 0;
        let templateCurrent = 0;
        let extraTotal = 0; let extraCurrent = 0;
  
        if(datas[datecode]){
          datas[datecode].map(data => {
            templateTotal += parseInt(data.total);
            templateCurrent += parseInt(data.current);
          });
    
          if(datas['extra'][datecode] !== undefined){
            datas['extra'][datecode].map(data => {
              extraTotal += parseInt(data.total);
              extraCurrent += parseInt(data.current);
            });
          }
          let theTotal = templateTotal + extraTotal;
          let theCurrent = templateCurrent + extraCurrent;
          let finalPercent = Math.floor(theCurrent / theTotal * 100);
          setPercent(finalPercent);
        }
    }
    
    const updateTask = (i, text) => {
        theData[dayId][i].name = text;
        let final=[]; 
        final[dayId] = theData[dayId];
        db.collection("izgym").doc(uid).set({ ...theData, ...final });
    }
    const updateCurrentTask = (i, current) => {
        theData[dayId][i].current = current;
        let final=[]; 
        final[dayId] = theData[dayId];
        db.collection("izgym").doc(uid).set({ ...theData, ...final });
    }
    const updateTotalTask = (i, total) => {
        theData[dayId][i].total = total;
        let final=[]; 
        final[dayId] = theData[dayId];
        db.collection("izgym").doc(uid).set({ ...theData, ...final });
    }    

    const deleteThisTask = (i) => {
        theData[dayId].splice(i, 1);
        db.collection("izgym").doc(uid).set({ ...theData });        
    }

    //EXTRA PART
    const updateExtra = (i, text) => {
        theData['extra'][dayId][i].name = text;
        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });

    }
    const updateCurrentExtra = (i, current) => {
        theData['extra'][dayId][i].current = current;
        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });
    }
    const updateTotalExtra = (i, total) => {
        theData['extra'][dayId][i].total = total;
        db.collection("izgym").doc(uid).set({ ...theData, extra: { ...theData['extra'] }  });
    }    

    const deleteThisExtra = i => {
        theData['extra'][dayId].splice(i, 1);
        db.collection("izgym").doc(uid).set({ ...theData });        
    }

    if(theData[dayId] === undefined){
        if(theData["template"] !== undefined){
            if(theData["template"][theDay]) {
                tasks = theData["template"][theDay];         
            }
        }
    }else {
        tasks = theData[dayId];
    }
    if(theData['extra']){
        if(theData['extra'][dayId] === undefined){
            // extras[dayId] = [];
        }else{
            extras = theData['extra'][dayId];
        }
    }

    useEffect(() => {
        assignPercent(dayId, theData);
    });


    const updatePercent = () => {
        assignPercent(dayId, theData);
    }

    return (
        <>
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <TopWrap>
                <UpperText>ENTER NEW TASK NAME</UpperText>
            </TopWrap>
            <PadWrap>
                <ExtraInput name="extra" type="text" placeholder="Add Extra" value={extra.value} onChangeText={extra.onChange} onEndEditing={()=>handleExtra()} />
            </PadWrap>
        </Modal>                
        
        <View>
            <TopWrap>
                <DateWrap>
                    <UpperText>{dayDisplay}</UpperText>
                    <UpperText>{theDay} </UpperText>
                </DateWrap>
                <PercentageCircle radius={25} percent={percent} borderWidth={5} innerColor={"#fff"} color={"#ad3910"}></PercentageCircle>                  

            </TopWrap>

            <ExtraButton onPress={() => {setModalVisible(true);}}><Text><Ionicons name="md-add-circle" color="#3498db" size={70} /></Text></ExtraButton>
            
            <ScrollWrap>
            {
                (tasks.length > 0) ?
                    <SubText>REGULAR TASK</SubText>
                : null
            }                
            {
                tasks.map((task, index) => (
                <View key={"r"+task.name+index+task.current}>
                    <TodayInput 
                        theTask={task.name} theTaskCurrent={task.current} 
                        theTaskTotal={task.total} index={index}
                        updateTask={updateTask} 
                        updateCurrentTask={updateCurrentTask}
                        updateTotalTask={updateTotalTask}
                        deleteThisTask={deleteThisTask}
                        updatePercent={updatePercent}
                    />
                </View>
                ))
            }

            {
                (extras.length > 0) ?
                    <SubText>EXTRA</SubText>
                : null
            }
            {
                extras.map((task, index) => (
                <View key={"e"+task.name+index+task.current}>
                    <TodayInput 
                        theTask={task.name} theTaskCurrent={task.current} 
                        theTaskTotal={task.total} index={index}
                        updateTask={updateExtra} 
                        updateCurrentTask={updateCurrentExtra}
                        updateTotalTask={updateTotalExtra}
                        deleteThisTask={deleteThisExtra}
                        updatePercent={updatePercent}
                    />
                </View>
                ))
            }

                <PadBottom></PadBottom>
            </ScrollWrap>
        </View>
        </>
    )
}

export default TodayTask;