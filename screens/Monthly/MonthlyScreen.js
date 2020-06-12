import React, {useState, useEffect} from "react";
import {Text, ScrollView} from "react-native";
import styled from "styled-components";
import firebase from "../../Firebase";
import ShowExtra from "./ShowExtra";
import { Ionicons } from '@expo/vector-icons';

const BackWhite = styled.View`
  background:white;
  flex:1;
`;

const TopWrap = styled.View`
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

const TextNumber = styled.Text`
    font-size:10px;
    padding-top:5px;
    text-align:center;
`;
const MonthWrap = styled.View`
    padding:20px;
    flex: 1; 
    flexDirection: row;
    flexWrap: wrap;
    width: 100%
`;

const DivDay = styled.View`
    width:14.2%;
    padding:3px;
    padding-bottom:25px;
`;


const DivDayUp = styled.View`
    width:14.2%;
    padding:6px 3px;
    padding-bottom:3px;
`;


const TextName = styled.Text`
    font-size:13px;
    text-align:center;
    color:#161466;
`;

const TodayPoint = styled.Text`
  text-align:center;
  font-size:10px;
`;

const TheButton = styled.TouchableOpacity`
`;

const MonthlyScreen = ({navigation}) => {
    const [uid, setUid] = useState();
    const [theData, setTheData] = useState([]);
    const [gcode, setGcode] =useState();
    const [mcode, setMcode] =useState("");

    const [monthData, setMonthData] = useState([]);
    const [monthDataBefore, setMonthDataBefore] = useState([]);

    const [currentMonth, setCurrentMonth] = useState();
    const [currentYear, setCurrentYear] = useState();

    // const [dayName, setDayName] = useState([]);
    // const [dayNameFull, setDayNameFull] = useState();

    const db = firebase.firestore();

    useEffect(() => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let numberOfMonth = new Date(year, month, 0).getDate(); 
        let monthcode = today.getFullYear() + "" + month;
        let datecode = today.getFullYear() + "" + month + "" + today.getDate();

        setGcode(datecode);
        setMcode(monthcode);    
        setCurrentMonth(month);
        setCurrentYear(year);
  
        setBeforeAfter(year, month - 1);
  

        // CREATE DAYS ARR this MONTH
        let MonthArray = [];
        for(let i = 1; i <= numberOfMonth; i++){
          today.setDate(i);
          let datecode = today.getFullYear() + "" + month + "" + today.getDate();

          let monthName = getMonthName(today);
          let dateName = monthName + " " + today.getDate();

          MonthArray.push({id: datecode, day: getDayName(today), theDate: today.getDate(), dayNameFull: dateName  });
        }
        setMonthData(MonthArray);
  
  
        let info;
  
        firebase.auth().onAuthStateChanged(user => {        
          if(user) {
            setUid(user.uid);
  
            const dbb = db.collection("izgym");
            info = dbb.doc(user.uid).onSnapshot(snapshot => {
              setTheData(snapshot.data());            
            });
          }else {
            console.log('NO USER, MUST LOGGIN PROPERTLY');
          }
        }); 
        return () => info();
      }, []); // [] 이게 있으면, 실행을 한번만 한다

      const setBeforeAfter = (year, month) =>{
        let firstDay = new Date(year, month, 1); 
        let before = 0 + firstDay.getDay();
  
        let beforeBox = [];
        for(let i = 1; i <= before; i++){
          beforeBox.push({name:"hoho"});
        }
  
        setMonthDataBefore(beforeBox);
      }
  

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

      const nextMonth = () => {
        let year = currentYear;
        let month = currentMonth;
        if(month == 12){
          year += 1;
          month = 1;
        }else{
          month += 1;
        }      
        monthArrayGenerator(year, month);
  
      }
  
      const prevMonth = () => {
        let year = currentYear; let month = currentMonth;
        if(month == 1){
          year -= 1;
          month = 12;
        }else {
          month -= 1;
        }
        monthArrayGenerator(year, month);
      }
  
      const monthArrayGenerator = (year, month) => {
        setBeforeAfter(year, month - 1);
        let numberOfMonth = new Date(year, month, 0).getDate(); 
  
        let newCode = year + ""+month;
        // childRef.current.getNoteFromChild(newCode);
        setMcode(newCode);
  
        setCurrentMonth(month);
        setCurrentYear(year);
  
        // CREATE DAYS ARR this MONTH
        let MonthArray = [];
        let today = new Date(year, month, 0);
  
        for(let i = 1; i <= numberOfMonth; i++){
          today.setDate(i);
          let datecode = year + "" + month + "" + i;

          let monthName = getMonthName(today);
          let dateName = monthName + " " + today.getDate();
          
          MonthArray.push({id: datecode, day: getDayName(today), theDate: today.getDate(), dayNameFull: dateName  });
        }
        setMonthData(MonthArray);
      }
  
      const monthNames = ["", "JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];    


    return (
        <BackWhite>
        <TopWrap>
            <PrevButton title="prev" onPress={() => prevMonth()}><Text><Ionicons name="md-arrow-dropleft" size={25} color={'#f2f2f2'} /></Text></PrevButton>
            <TextTitle>{currentYear} {monthNames[currentMonth]}</TextTitle>
            <NextButton onPress={() => nextMonth()}><Text> <Ionicons name="md-arrow-dropright" size={25} color={'#f2f2f2'} /></Text></NextButton>        
        </TopWrap>

        <ScrollView>
        <MonthWrap>
            <DivDayUp><TextName>SUN</TextName></DivDayUp>
            <DivDayUp><TextName>MON</TextName></DivDayUp>
            <DivDayUp><TextName>TUE</TextName></DivDayUp>
            <DivDayUp><TextName>WED</TextName></DivDayUp>
            <DivDayUp><TextName>THU</TextName></DivDayUp>
            <DivDayUp><TextName>FRI</TextName></DivDayUp>
            <DivDayUp><TextName>SAT</TextName></DivDayUp>
            {
              monthDataBefore.map((day, i) => (
                <DivDay key={i}></DivDay>
              ))
            }

            {
              monthData.map((day, i) => (
                <DivDay key={day.id}>
                    <TheButton onPress={() => navigation.navigate('MonthlyPath', {
                        theDay:day.day, 
                        dayId: day.id, 
                        uid: uid, 
                        theData: theData, 
                        dayDisplay: day.dayNameFull })}                    
                    >
                      {
                        gcode == day.id ?
                        <TodayPoint><Ionicons name="md-sunny" size={20} color="red" /></TodayPoint> : null
                      }


                        <TextNumber>{day.theDate}</TextNumber>

                    {
                        theData['extra'] ?
                            theData['extra'][day.id] ?
                            <ShowExtra theData={theData['extra'][day.id]} />     
                            :null                   
                        : null
                    }


                    </TheButton>
                </DivDay>
              ))
            }
        </MonthWrap>
        </ScrollView>

        </BackWhite>
    )
}

export default MonthlyScreen;
