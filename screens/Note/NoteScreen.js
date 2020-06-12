import React, {useEffect, useState, useRef } from "react";
import {Text, View} from "react-native";
import styled from "styled-components";
import NoteDisplay from "./NoteDisplay";
import firebase from "../../Firebase";
import { Ionicons } from '@expo/vector-icons';

const NoteWrap = styled.View`
    background:white;
    flex:1;
`;

const ButtonWrap = styled.View`
    flex-direction: row;
    justify-content: space-between;
    height:80px;
    align-items:center;
    background:#3498db;
`;

const TextTitle = styled.Text`
    font-size:15px;
    width:50%;
    text-align:center;
    color: #f2f2f2;
`;

const PrevButton = styled.TouchableOpacity`
    padding: 10px 20px;
    width:25%;
    align-items:center;
    border-radius:5px;
    `;

const NextButton = styled.TouchableOpacity`
    padding: 10px 20px;
    width:25%;    
    align-items:center;
    border-radius:5px;
`;

const NoteScreen = () => {

    const [mcode, setMcode] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [monthName, setMonthName] = useState();
    const [theData, setTheData] = useState([]);
    const [uid, setUid] = useState();

    const db = firebase.firestore();

    const handlePrev = () => {
        let tmonth = month;
        let tyear = year;
        if(month == 1){
            tyear = year - 1;
            tmonth = 12;
            setYear(tyear);
            setMonth(tmonth);
        }else{
            tmonth = month - 1
            setMonth(tmonth);           
        }
        let newcode = tyear + "" + tmonth;
        setMcode(newcode);
        setMonthName(getMonthName(tmonth));
        childRef.current.monthChanged(newcode);
    }

    const handleNext = () => {
        let tmonth = month;
        let tyear = year;
        if(month == 12){
            tyear = year + 1;
            tmonth = 1;
            setYear(tyear);
            setMonth(tmonth);
        }else{
            tmonth = month + 1
            setMonth(tmonth);           
        }
        let newcode = tyear + "" + tmonth;
        setMcode(newcode);
        setMonthName(getMonthName(tmonth));
        childRef.current.monthChanged(newcode);

    }

    const getMonthName = month => {
        const names = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return names[month];
    }

    const updateNote = (mcode, text) => {
        let meme = theData;
        meme['note'][mcode].note = text;
        console.log(meme['note']);
    }

    useEffect(() => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let monthcode = today.getFullYear() + "" + month;
        setMcode(monthcode);
        setMonth(month);
        setYear(today.getFullYear());
        setMonthName(getMonthName(month));
        
        let info;
        //Assign UID
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
            setUid(user.uid);
                const dbb = db.collection("izgym");
                info = dbb.doc(user.uid).onSnapshot(snapshot => {
                    setTheData(snapshot.data());
                });
            }else {
            console.log('no user, need to login properly');
            }
        }); 
        return () => info();


    }, []);

    const childRef = useRef();
    return (
        <NoteWrap>
            <ButtonWrap>
                <PrevButton onPress={()=>handlePrev()}><Text><Ionicons name="md-arrow-dropleft" color={'#f2f2f2'} size={25} /></Text></PrevButton>
                <TextTitle>{year} {monthName}</TextTitle>
                <NextButton onPress={()=>handleNext()}><Text><Ionicons name="md-arrow-dropright" color={'#f2f2f2'} size={25} /></Text></NextButton>
            </ButtonWrap>            
            <NoteDisplay ref={childRef} theData={theData} mcode={mcode} year={year} month={month} uid={uid} updateNote={updateNote} />


        </NoteWrap>
    )
}

export default NoteScreen;