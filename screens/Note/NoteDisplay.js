import React, {useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import NoteInput from "./NoteInput";
import firebase from "../../Firebase";

const NoteDisplay = forwardRef(({ theData, mcode, year, month, uid, updateNote }, ref) => {

    const db = firebase.firestore();

    useImperativeHandle(ref, () => ({
        monthChanged(newcode) {
            console.log("monthChangedzz", newcode);
            childRef.current.handleChange(newcode);
        }    
    }));

    useEffect(() => {
        console.log("MOMO", theData['note']);
    });


    const updateText = (text) => {
        let meme = [];
        meme['note'] = theData['note'];
        if(meme['note']){
            if(meme['note'][mcode]){
                meme['note'][mcode].note = text;
                console.log(meme['note']);
            }else{
                let momo = {[mcode]: {note: text}};
                meme['note'] = { ...theData['note'], ...momo};
                console.log("HOHO", meme['note']);
            }
        }
        db.collection("izgym").doc(uid).set({ ...theData, note: { ...meme['note']} });       // db.collection("izgym").doc("myuid").set({note: noteData});


    }
    let myNote = "";

    if(theData['note']){
        if(theData['note'][mcode]){
            let note = theData['note'][mcode];
            myNote = note.note
        }
    }
    
    const childRef = useRef();

    return (
        <>
            {theData['note'] ?
            <NoteInput ref={childRef} theText={myNote} updateText={updateText} theNote={theData['note']} />            
            : null
            }
        </>
    )
});

export default NoteDisplay;