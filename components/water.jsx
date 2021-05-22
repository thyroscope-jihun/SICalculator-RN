import React, { useState } from 'react';
import styled from 'styled-components/native';
import Box from './box/box';
import AddBox from './box/addBox';
import Result from './box/result';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';

const Container = styled.View`
height:100%;
`;

const ScrollView = styled.ScrollView`
    height:100%;
    width:100%;
`;

const PlusBox = styled.TouchableOpacity`
align-items:center;
justify-content:center;
height:100%;
`;

const Text = styled.Text`
color:#ffffff;
font-weight:800;
`;

const Line = styled.View`
    background-color:black;
    height:1px;
    width:100%;
    margin-bottom:4px;
`;

const RContainer = styled.View`
    /* margin-top:8px;  */
    margin-bottom:1px;
    width:100%;
    `;

const BtnContainer = styled.View`
    padding:6px;
    flex-direction:row;
    justify-content:space-around;
`;


const Water = () => {
    const [result, setResult] = useState(
        {num:0,result:0}
        ); //최종 결과
    const [del, setDel] = useState(false); // 삭제명령
    const [scal, setScal] = useState(false); // 계산명령


    const [add ,setAdd] = useState([
        {num:0,aver:0,res:0},
        {num:0,aver:0,res:0}
    ]); //박스개수

    const getAddResult = (num,aver,res,idx) =>{
        add[idx].num = num; 
        add[idx].aver = aver;  
        add[idx].res = res; 
        setAdd(add);
        let lnum = 0; let lres = 0;
        add.map(r => lnum +=Number(r.num));
        add.map(r => lres += Number(r.res));
        setResult({num:lnum, result:lres});
        setScal(false);
    }

    

    const onDelete = () =>{
        setDel(true);
        setAdd([
            {num:0,aver:0,res:0},
            {num:0,aver:0,res:0}
        ]);
    }

    const onAdd = () =>{
        setAdd([...add,{num:0,aver:0,res:0}]);
    }

    const onCal = () =>{
        Keyboard.dismiss();
        setScal(true);
    }
    const setScals = () =>{
        setScal(false);
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <Container>
        <ScrollView keyboardShouldPersistTaps='handled'>
        {add.map((res,idx) => <AddBox key={idx} setScals={setScals} scal={scal} index={idx} getAddResult={getAddResult} del={del}/>)}
        </ScrollView>
        <Line/>
        <LinearGradient
            start={{x: 1, y: 0.25}} end={{x: 1, y: 2.0}}
            colors={['#ECE9E6', '#FFFFFF', '#ECE9E6']}
            style={{
                paddingHorizontal:14,
                paddingVertical:1,
            }}
            >
        <BtnContainer>
        <LinearGradient
        style={{
            height:40,
            width:'30%',
            borderRadius:7,
            marginBottom:3,
            borderColor:'black',
            borderWidth:1
        }}
        start={{x: 1, y: 0.25}} end={{x: 1, y: 2.0}}
        colors={['#e53935', '#e35d5b', '#e53935']}>
        <PlusBox onPress={onCal}>
        <Text>계산하기</Text>
        </PlusBox>
        </LinearGradient>
        <LinearGradient
        style={{
            height:40,
            width:'30%',
            borderRadius:7,
            marginBottom:3,
            borderColor:'black',
            borderWidth:1
        }}
        start={{x: 1, y: 0.25}} end={{x: 1, y: 2.0}}
        colors={['#5691c8', '#457fca', '#5691c8']}>
        <PlusBox onPress={onAdd}>
        <Text>물타기 추가</Text>
        </PlusBox>
        </LinearGradient>
        <LinearGradient
        style={{
            height:40,
            width:'30%',
            borderRadius:7,
            marginBottom:3,
            borderColor:'black',
            borderWidth:1
        }}
        start={{x: 1, y: 0.25}} end={{x: 1, y: 2.0}}
        colors={['#606c88', '#3f4c6b', '#606c88']}>
        <PlusBox onPress={onDelete}>
        <Text>초기화</Text>
        </PlusBox>
        </LinearGradient>
        </BtnContainer>
        <RContainer>
        <Line/>
        <Result num={result.num} result={result.result} del={del}/>
        </RContainer>
        </LinearGradient>
        </Container>
        </KeyboardAvoidingView>
    );
};

export default Water;

//https://earthquake.kr:23490/query/USDKRW 환율불러오기

