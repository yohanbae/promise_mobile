import React, { useState, useEffect} from 'react';
import { Platform, StyleSheet } from 'react-native';
import styled from "styled-components";
import firebase from "../../Firebase";
import TodayTask from "../Today/TodayTask";
import ViewPager from '@react-native-community/viewpager';

const Momo = styled.View`
    flex:1;
    background:white;

`;
const WeeklyWrap = styled.View`
    padding:0 20px;
`;

const ViewEle = styled.View`
    background:white;
`;

const WeeklyScreen = () => {
    const styles = StyleSheet.create({
        viewPager: {
          flex: 1,
        },
    });


    const db = firebase.firestore();

    const [theData, setTheData] = useState([]);
    const [uid, setUid] = useState();
    const [dayNameNumber, setDayNameNumber] = useState(0);
    const [weekData, setWeekData] = useState([]);


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
        let today = new Date();
        let month = today.getMonth() + 1;
        setDayNameNumber(today.getDay());
        
        // Calculate This Week
        let DayArray = [];
        for(let i = 0; i < 7; i++){        
            today.setDate(today.getDate() + i - today.getDay());
            let datecode = today.getFullYear() + "" + month + "" + today.getDate();
            let monthName = getMonthName(today);
            let dateName = monthName + " " + today.getDate();
            DayArray.push({id: datecode, day: getDayName(today), theDate: today.getDate(), dateName: dateName  });        
        }
        setWeekData(DayArray);

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
  
                DayArray.map((day) => {
                  if(!momo[day.id]){
                    temp = momo["template"][day.day];
                    datas[day.id] = temp;
                  }
                  // return true;
                });   
                console.log("APRIL", datas);
                db.collection("izgym").doc(user.uid).set({ ...momo, ...datas });
              });
  
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


    return (
        <Momo>
        {
        (weekData.length > 0) ?
            <ViewPager style={styles.viewPager} initialPage={dayNameNumber}>
            {
                weekData.map((day, i) => (
                <ViewEle key={i}>
                    <TodayTask theDay={day.day} dayId={day.id} uid={uid} theData={theData} dayDisplay={day.dateName} />
                </ViewEle>
                ))
            }
            </ViewPager>
        : null
        }
        </Momo>
    );

}

export default WeeklyScreen;