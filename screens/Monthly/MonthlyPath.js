import React from "react";
import TodayTask from "../Today/TodayTask";
import styled from "styled-components";

const TodayWrap = styled.View`
    background:white;
`;

const MonthlyPath = ({route}) => {
    const {theDay, dayId, uid, theData, dayDisplay} = route.params;

    return (
        <TodayWrap>
            <TodayTask theDay={theDay} dayId={dayId} uid={uid} theData={theData} dayDisplay={dayDisplay} />
        </TodayWrap>
    )
}

export default MonthlyPath;