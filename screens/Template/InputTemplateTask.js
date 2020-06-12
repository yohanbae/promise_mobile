import React, {useState} from "react";
import {View, Alert, Modal, Text, TextInput, TouchableOpacity} from "react-native";
import useInput from "../../useInput";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';



const ViewKan = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom:20px;
    align-items:center;
`;

const ListText = styled.Text`
    font-size:15px;
    font-weight:300;
    color: #333333;
`;


// const InputWrap = styled.div`
//     background:rgba(132, 144, 187, 0.6);
//     padding:15px 10px;
//     margin-bottom:5px;
//     position:relative;
// `;

// const InputTaskStyle = styled.input`
//     width:100%;
//     font-size:13px;border:0;
//     margin:0;
//     background:none;
//     color:white;
//     width: calc(100% - 15px);
// `;

// const InputTotal = styled.input`
//     width:100%;

//     font-size:13px;
//     border:0;margin:0;
//     height:14px;
//     color:white; background:none;
//     text-align:left;

// `;
// const ButtonDel = styled.button`
//     font-size:13px;        
//     margin:0;
//     border:none;
//     background:none; color:white;
//     text-align:right;
//     cursor:pointer;
// `;

// const LowWrap = styled.div`
//     height:13px;
//     display:grid;
//     grid-gap:2px;
//     grid-template-columns: 1fr 1fr;
//     color:white;
//     margin-top:15px;
// `;


const Header = styled.View`
    height:80px;
    background:#3498db;
    justify-content:center;
    padding-left:20px;
`;
const HeaderText = styled.Text`
    color: #f2f2f2;
    font-size: 15px;
`;

const SubWrap = styled.View`
    border:1px solid lightgray;
    padding:20px;
    border-radius:5px;
    width: 95%;
`;

const TopGrid = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const EditWrap = styled.View`
    margin-top:30px;
    flex-direction: row;
    justify-content: space-between;
`;

const EmptyView = styled.View`
    width:50%;
`;

const TextTitle = styled.TextInput`
    margin-bottom:5px;
    font-size:20px;
    border-radius:5px;
    font-weight:300;
    color:#1a1a1a;
`;
const TextTitleSub = styled.Text`
    font-size:10px;
    color:gray;
`;

const TextNumber = styled.TextInput`
    position:relative;
    font-size:20px;    
    color:#1a1a1a;
`;

const CurrentWrap = styled.View`
    align-items:center;
`;

const DelButton = styled.TouchableOpacity`
    margin:0;
    border-radius:5px;
`;

const TextWrap = styled.View`
    padding:15px;
    background: rgba(227, 227, 227, 0.5);
    border-radius:5px;
    align-items:center;
    flex:1;
`;


const TextCenter = styled.Text`
    text-align:center;
`;


const InputTemplateTask = ({name, total, index, updateTask, updateTotalTask, deleteTask}) => {
    const task = useInput(name);
    const taskTotal = useInput(total);

    const handleChange = (event) => {    task.setValue(event.target.value);   };
    const handleTotalChange = (event) => {    taskTotal.setValue(event.target.value);   };

    const [modalVisible, setModalVisible] = useState(false);

    const update = () => {
        if(task.value == ""){
            task.setValue("Task");
            updateTask(index, "Task");
            return Alert.alert("Please enter name correctly");
        }else{
            updateTask(index, task.value);
        }
    }

    const updateTotal = () => {
        if (parseInt(taskTotal.value) === 0){
            return Alert.alert("Number must be bigger than 0");
            taskTotal.setValue(10);
        } else{
            updateTotalTask(index, parseInt(taskTotal.value));   
        }
    }

    const deleteThisTask = () => {
        deleteTask(index);
    }

    return (
        <>
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Header><HeaderText>MANAGE THIS TASK</HeaderText></Header>
            <TextWrap>           
                <SubWrap> 
                    <TopGrid>
                        <View>
                            <TextTitleSub>TASK NAME</TextTitleSub>
                            <TextTitle value={task.value} onChangeText={task.onChange} onEndEditing={update} />
                        </View>
                        <DelButton onPress={deleteThisTask}><TextCenter><Ionicons name="md-close-circle-outline" color={'gray'} size={30} /></TextCenter></DelButton>
                    </TopGrid>
                    <EditWrap>
                        <EmptyView></EmptyView>
                        <CurrentWrap>
                            <TextTitleSub>TOTAL</TextTitleSub>
                            <TextNumber keyboardType={'numeric'} value={taskTotal.value.toString()} onChangeText={taskTotal.onChange} onEndEditing={updateTotal} />
                        </CurrentWrap>
                    </EditWrap>
                </SubWrap>
            </TextWrap>
        </Modal>                
        <View>
            {/* <TextInput value={task.value} onChangeText={task.onChange} onEndEditing={update} /> */}
            {/* <View>
                <TextInput value={taskTotal.value.toString()} onChangeText={taskTotal.onChange} onEndEditing={updateTotal} />
                <TouchableOpacity onPress={deleteThisTask}><Text>DEL</Text></TouchableOpacity>
            </View> */}

            <TouchableOpacity onPress={() => {setModalVisible(true);}}>
                <ViewKan style={{paddingLeft:10, paddingRight:10 }}>
                    <ListText><Ionicons name="md-more" color="gray" size={15} />   {task.value}</ListText>
                    <ListText>{taskTotal.value}</ListText>
                </ViewKan>
            </TouchableOpacity>

        </View>
        </>
    )
};

export default InputTemplateTask;