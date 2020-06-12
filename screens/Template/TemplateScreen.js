import React, { useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import TemplateTask from "./TemplateTask";
import styled from "styled-components";
import firebase from "../../Firebase";
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

const TemplateScreen = () => {
    const styles = StyleSheet.create({
        viewPager: {
          flex: 1,
        },
    });

    const db = firebase.firestore();

    const [uid, setUid] = useState();
    const [theData, setTheData] = useState([]);

    useEffect(() => {
        //Assign UID
        let info;
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


      }, []); // [] 이게 있으면, 실행을 한번만 한다    

      let myArray = [
        {day: "sunday"},
        {day: "monday"},
        {day: "tuesday"},
        {day: "wednesday"},
        {day: "thursday"},
        {day: "friday"},
        {day: "saturday"},
      ];

    return (
        <Momo>
        {
        (myArray.length > 0) ?
            <ViewPager style={styles.viewPager} initialPage={0}>
            {
                myArray.map((day, i) => (
                <ViewEle key={i}>
                    <TemplateTask day={day.day} uid={uid} theData={theData} dayIndex={i} />
                </ViewEle>
                ))
            }
            </ViewPager>
        : null
        }
        </Momo>
    );

}

export default TemplateScreen;