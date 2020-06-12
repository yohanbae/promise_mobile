import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";
import styled from "styled-components";
import {TextInput, Text,Button} from "react-native";
import useInput from "../../useInput";

const Momo = styled.View`
    padding:0 30px;
    margin-top:30px;
`;

const TextBox = styled.TextInput`
    background:rgba(201, 201, 201, 0.2);
    textAlignVertical: top;
    padding:10px;
    border-radius:5px;
    `;

const SaveButton = styled.TouchableOpacity`
    padding:15px 0;
    background:#3498db;
    margin-top:30px;
    border-radius:5px;
`;

const SaveText = styled.Text`
    text-align:center;
    color:white;
`;

const NoteInput = forwardRef(({theText, updateText, theNote}, ref) => {

    useImperativeHandle(ref, () => ({
        handleChange(newcode) {
            if(theNote[newcode]){
                noteData.setValue(theNote[newcode].note);
            }else{
                noteData.setValue("");
            }

        }
    }));

    const handleSubmit = () => {
        updateText(noteData.value);
        // console.log("HEY", noteData.value);

    }


    const noteData = useInput(theText);

    return (
        <Momo>
            <TextBox 
            value={noteData.value} onChangeText={noteData.onChange}
            multiline={true} numberOfLines={20}
            blurOnSubmit={true}
            placeholder={"Leave your monthly plans"}
            
            />
            <SaveButton onPress={()=>handleSubmit()}><SaveText>SAVE NOTE</SaveText></SaveButton>
        </Momo>
    )
});

export default NoteInput;