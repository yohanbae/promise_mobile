import React, {useCallback, useState} from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import styled from "styled-components";
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


const LoginScreen = ({navigation}) => {

    const email = useInput("");
    const password = useInput("");

    const handleSubmit = useCallback(async event => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email.value)) {
          return Alert.alert("That email is invalid");
        }

        if(password.value === "" || password.value.length < 6){
            return Alert.alert("Invalid Password", "Password length must be at least 6 digits.");
        }
    
        try{
            await firebase
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            console.log("success login");
        } catch (error) {
            console.log("failed");
            Alert.alert("Cannot Log In", "Please type correct information");
        }
    });

    // const handleSubmit = useCallback(
    //     async event => {
    //         event.preventDefault();
    //         const {email, password} = event.target.elements;
    //         console.log(email.value);
    //         // try{
    //         //     await firebase
    //         //         .auth()
    //         //         .signInWithEmailAndPassword(email.value, password.value);
    //         //     history.push("/main");
    //         // } catch (error) {
    //         //     toast.error(`Please enter information correctly: ${error}`, {hideProgressBar: true});
    //         // }
        
    // );
    return(
        <LoginWrap>
            <FormWrap>
            <ImageWrap>
                <Image source={logoimg} style={{width: 80, height:80 }} />
            </ImageWrap>
            <TitleText>LOG IN</TitleText>
            <FormText name="email" type="email" placeholder="Email" value={email.value} onChangeText={email.onChange} />
            <FormText secureTextEntry={true} name="password" type="password" placeholder="Password" value={password.value} onChangeText={password.onChange} />
            <Button title="LOG IN" onPress={() => handleSubmit() } /> 
            <SignButton onPress={() => navigation.navigate('SignupScreen', {}) }>
                <SignText>SIGN UP</SignText>
            </SignButton>
            </FormWrap>
        </LoginWrap>
    )
}


export default LoginScreen;