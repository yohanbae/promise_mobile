import React, {useCallback, useState} from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import styled from "styled-components";
import useInput from "../useInput";
import firebase from "../Firebase";

const LoginWrap = styled.View`
    padding:70px 20px;

`;

const DayScreen = ({route, navigation}) => {
    const {id} = route.params;
    return(
        <LoginWrap>
            <Text>SHOW TODAY INFO HERE~ {id}</Text>
        </LoginWrap>
    )
}


export default DayScreen;