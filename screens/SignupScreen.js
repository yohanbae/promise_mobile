import React, {useCallback} from "react";
import styled from "styled-components";
import { Alert, View, Text, TextInput, Button, Image } from "react-native";
import useInput from "../useInput";
import firebase from "../Firebase";
import logoimg from "../assets/images/finger-icon.png";

const LoginWrap = styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
`;

const FormWrap = styled.View`
    width:75%;
    text-align:center;
`;

const ImageWrap = styled.View`
    align-items:center;
    justify-content:center;
    margin-bottom:20px;
`;

const TitleText = styled.Text`
    font-size:20px;
    text-align:center;
    margin-bottom:20px;
`;


const SignButton = styled.TouchableOpacity`
    margin-top:30px;
`;
const SignText = styled.Text`
    text-align:center;
`;

const FormText = styled.TextInput`
    text-align:center;
    padding:5px;
    border:1px solid lightgray;
    margin-bottom:10px;
`;


const SignupWrap = styled.View`
    padding:20px;
`;

const InputWrap = styled.View`
    width:250px;
`;

const SignupScreen = ({navigation}) => {

    const createDB = (uid) => {
        const dbData = {
          note: [],
          template: { 
            sunday: [{name:"Sunday Rest", current:0, total:10}],
            monday: [{name:"Monday Task", current:0, total:10}],
            tuesday: [{name:"Movie Day", current:0, total:10}],
            wednesday: [{name:"Wednesday Excersize", current:0, total:10}],
            thursday: [{name:"Bank", current:0, total:10}],
            friday: [{name:"Have a fun", current:0, total:10}],
            saturday: [{name:"Clean House", current:0, total:10}],
          },
          extra: []
        };
        const db = firebase.firestore();
        db.collection("izgym").doc(uid).set(dbData);
    
      }
    

    const nickname = useInput("");
    const email = useInput("");
    const password = useInput("");

    const handleSignUp = () => {
        // event.preventDefault();
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email.value)) {
          return Alert.alert("Email is invalid");
        }

        if(password.value === "" || password.value.length < 6){
            return Alert.alert("Invalid Password", "Password length must be at least 6 digits.");
        }
    
        if(nickname.value === ""){
            return Alert.alert("EMPTY", "Please enter your name.");
        }        

        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        createDB(user.uid);
                        firebase.auth().currentUser.updateProfile({
                        displayName: nickname.value,
                        }).then(function() {
                        console.log('updated successfuly', nickname.value);
                        });
            
                    } else {
                        // No user is signed in.
                        console.log('no');
                    }
                    });
            console.log("SUCESS YA");
            // history.push("/main");
        }catch(error){
            console.log("ERROR~~~~", error);
        }
    }



    const handleSubmit = () => {
        console.log(email.value, password.value);
    }

    return (
        <LoginWrap>
            <FormWrap>
            <ImageWrap>
                <Image source={logoimg} style={{width: 80, height:80 }} />
            </ImageWrap>
            <TitleText>SIGN UP</TitleText>
            <FormText type="text" placeholder="Nick Name" value={nickname.value} onChangeText={nickname.onChange} />
            <FormText type="email" placeholder="Email" value={email.value} onChangeText={email.onChange} />
            <FormText secureTextEntry={true} type="password" placeholder="Password" value={password.value} onChangeText={password.onChange} />
            <Button title="SIGN UP" onPress={() => handleSignUp() } /> 
            </FormWrap>
        </LoginWrap>
    )
}

export default SignupScreen;