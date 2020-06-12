import React from "react";
import styled from "styled-components";
import {Text, View} from "react-native";

const ShowExtra = ({theData}) => {
    const ViewWrap = styled.View`
        margin-bottom:1px;
    `;

    const Extras = styled.Text`
        font-size:8px;
        text-align:center;
    `;

    return (
        <>
        {
            theData.map(data => (
                <ViewWrap key={data.name}><Extras>
                    {
                        data.name.substring(0, 6)
                    }
                    {
                        (data.name.length > 6) ?
                        <Text>..</Text>
                        : null
                    }
                    
                </Extras></ViewWrap>
            ))
        }
        </>
    )
}

export default ShowExtra;