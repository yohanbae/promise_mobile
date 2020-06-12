import React, {useState, useEffect} from 'react';
import { Alert, Platform, Text, View, Modal, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import styled from "styled-components";
import useInput from "../../useInput";
import firebase from "../../Firebase";
import InputTemplateTask from "./InputTemplateTask";
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

const DescText = styled.Text`
    padding-left:25px;
    font-size:11px;
    padding-top:5px;
    color:gray;
`;

const TemplateTask = ({ theData, day, dayIndex, uid }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const db = firebase.firestore();
    const updateTask = (i, text) => {
        theData['template'][day][i].name = text;
        db.collection("izgym").doc(uid).set({ ...theData });
        afterUpdateCleanDB();
    }

    const updateTotalTask = (i, total) => {
        theData['template'][day][i].total = total;
        db.collection("izgym").doc(uid).set({ ...theData });
        afterUpdateCleanDB();
    }

    const addTask = (day) => {
        theData['template'][day].push({name:"Task", current:0, total:10});
        db.collection("izgym").doc(uid).set({ ...theData });
        afterUpdateCleanDB();
    }

    const deleteTask = i => {
        theData['template'][day].splice(i, 1);
        db.collection("izgym").doc(uid).set({ ...theData, template:{ ...theData['template']} });   
        afterUpdateCleanDB();
    }

    const afterUpdateCleanDB = () => {
        let today = new Date();
        today.setDate(today.getDate() + dayIndex - today.getDay());
        let month = parseInt(today.getMonth()) + 1;
        let datecode = today.getFullYear() + "" + month + "" + today.getDate();

        delete theData[datecode];
        db.collection("izgym").doc(uid).set({ ...theData });
        console.log("EDITING", datecode);
    }

    const signOutConfirm = () => {
        Alert.alert(
            'SIGN OUT',
            'Are you sure?',
            [
              {text: 'Cancel', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
              {text: 'OK', onPress: () => {
                    console.log('OK Pressed');
                    clearLoginData();
                    signout();
                }},
            ],
            { cancelable: true }
          )
    }    

    const signout = () => {
        clearLoginData();
        firebase.auth().signOut();
    }
    const clearLoginData = async () => {
        try {
            await AsyncStorage.removeItem("LOGINDATA");
        }
        catch(exception) {
        }
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

        </Modal>                
        
        <View>
            <TopWrap>
                <UpperText>EDIT {day} </UpperText>
                <TouchableOpacity><UpperText onPress={() => signOutConfirm()}><Ionicons size={30} name="md-log-out" /></UpperText></TouchableOpacity>
            </TopWrap>
            <DescText>Tasks for regular life routine</DescText>
            <ScrollWrap>         
                {
                (theData['template']) ?
                theData['template'][day].map((data,i) => (
                    <View key={i} >             
                        <InputTemplateTask name={data.name} index={i} total={data.total} updateTask={updateTask} updateTotalTask={updateTotalTask} deleteTask={deleteTask} />
                    </View>
                ))
                : console.log('not yet')
                }
                <Button title="NEW TASK" onPress={()=>addTask(day)}></Button>
            </ScrollWrap>
        </View>
        </>
    )
}

export default TemplateTask;