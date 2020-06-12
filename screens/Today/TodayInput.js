import React, {useState} from "react";
import useInput from "../../useInput";
import styled from "styled-components";
import { Modal, Alert, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import PercentageCircle from 'react-native-percentage-circle';


const DelButton = styled.TouchableOpacity`
    margin:0;
    border-radius:5px;
`;

const TopGrid = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const TextCenter = styled.Text`
    text-align:center;
`;

const TextWrap = styled.View`
    padding:15px;
    background: rgba(227, 227, 227, 0.5);
    border-radius:5px;
    align-items:center;
    flex:1;
`;

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

const TodayInput = ({ theTask, theTaskCurrent, theTaskTotal, index,
    updateTask, updateCurrentTask, updateTotalTask, deleteThisTask, updatePercent, extra=false }) => {
        const [modalVisible, setModalVisible] = useState(false);

        const handleChange = () => {
            if(task.value == "") {
                return Alert.alert("Please fill name correctly");
            }
            updateTask(index, task.value);
        }
        const handleChangeCurrent = () => {
            if(parseInt(taskCurrent.value) > parseInt(taskTotal.value)){
                taskCurrent.setValue(taskTotal.value); 
                return Alert.alert("Number must be smaller than total");
            }

            if(taskCurrent.value == ""){
                taskCurrent.setValue(0); 
                return Alert.alert("Please fill number properly.");
            }

            updateCurrentTask(index, parseInt(taskCurrent.value));
            updatePercent();
        } 
        const handleChangeTotal = () => {
            if(taskTotal.value == ""){
                taskTotal.setValue(0);
                return Alert.alert("Please fill number properly.");
            }

            updateTotalTask(index, parseInt(taskTotal.value));
            updatePercent();
        }               

        const handleDelete = () => {

            Alert.alert(
                'Delete',
                'Are you sure?',
                [
                  {text: 'Cancel', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel'},
                  {text: 'OK', onPress: () => {
                        console.log('OK Pressed')
                        deleteThisTask(index);
                        updatePercent();
                    }},
                ],
                { cancelable: true }
              )
        }

        const task = useInput(theTask);
        const taskCurrent = useInput(theTaskCurrent);
        const taskTotal = useInput(theTaskTotal);

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
                            <TextTitle value={task.value} onChangeText={task.onChange} onEndEditing={()=>handleChange() } />
                        </View>
                        <DelButton onPress={()=>handleDelete()}><TextCenter><Ionicons name="md-close-circle-outline" color={'gray'} size={30} /></TextCenter></DelButton>
                    </TopGrid>
                    <EditWrap>
                        <EmptyView></EmptyView>
                        <CurrentWrap>
                            <TextTitleSub>CURRENT</TextTitleSub>
                            <TextNumber keyboardType={'numeric'} value={taskCurrent.value.toString()} onChangeText={taskCurrent.onChange} onEndEditing={()=>handleChangeCurrent()} />
                        </CurrentWrap>
                        <CurrentWrap>
                            <TextTitleSub>TOTAL</TextTitleSub>
                            <TextNumber keyboardType={'numeric'} value={taskTotal.value.toString()} onChangeText={taskTotal.onChange} onEndEditing={()=>handleChangeTotal()} />
                        </CurrentWrap>
                    </EditWrap>
                </SubWrap>
            </TextWrap>
        </Modal>        

        <TouchableOpacity onPress={() => {setModalVisible(true);}}>
            <ViewKan style={{paddingLeft:10, paddingRight:10 }}>
                <ListText><Ionicons name="md-more" color="gray" size={15} />   {task.value}</ListText>
                <PercentageCircle radius={20} percent={Math.floor(taskCurrent.value / taskTotal.value * 100)} color={"#3498db"}></PercentageCircle>  
            </ViewKan>
        </TouchableOpacity>
        </>
    )    
}

export default TodayInput;

