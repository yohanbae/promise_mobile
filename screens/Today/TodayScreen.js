import React, { useState, useEffect} from 'react';
// import { Platform, StyleSheet, Text, ScrollView, TouchableOpacity, View, TextInput, Button, AsyncStorage } from 'react-native';
import styled from "styled-components";
// import useInput from "../../useInput";
import firebase from "../../Firebase";

import TodayTask from "./TodayTask";


const TodayWrap = styled.View``;

const LoginScreen = () => {
    const db = firebase.firestore();

    const [theData, setTheData] = useState([]);
    const [gcode, setGcode] = useState();
    const [uid, setUid] = useState();
    const [dayName, setDayName] = useState();
    const [dayNameFull, setDayNameFull] = useState();

    const [day, setDay] = useState();

    const getDayName = (today) => {
        var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        var dayName = days[today.getDay()];      
        return dayName;
    }

    const getMonthName = (today) => {
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var monthName = months[today.getMonth()];              
        return monthName
    }


  useEffect(() => {
    // GET TODAY"S DAY CODE
    let today = new Date();
    let month = today.getMonth() + 1;
    let datecode = today.getFullYear() + "" + month + "" + today.getDate();
    // let monthcode = today.getFullYear() + "" + month;
    setGcode(datecode);
    setDayName(getDayName(today));

    let monthName = getMonthName(today);
    let dateName = monthName + " " + today.getDate();
    setDayNameFull(dateName);



    let info;
    //Assign UID
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        setUid(user.uid);
        // CREATE WEEKLY DB BASED on TEMPLATE
          let datas = [];
          db.collection("izgym").doc(user.uid).get().then(data => {
            let momo = data.data();
            let temp;

              if(!momo[datecode]){
                  temp = momo["template"][day.day];
                  datas[day.id] = temp;
              }
            db.collection("izgym").doc(user.uid).set({ ...momo, ...datas });
          });


        const dbb = db.collection("izgym");
        info = dbb.doc(user.uid).onSnapshot(snapshot => {
          // console.log("The DATA ", snapshot.data());
          setTheData(snapshot.data());
        });

      }else {
        console.log('no user, need to login properly');
      }
    }); 
    return () => info();
      

  }, []);


  return (
      <TodayWrap>
          <TodayTask theDay={dayName} dayId={gcode} uid={uid} theData={theData} dayDisplay={dayNameFull} />
      </TodayWrap>
  )
}

export default LoginScreen;

