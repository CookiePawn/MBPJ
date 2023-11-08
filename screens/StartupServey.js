import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';


//db 로드
import { loadUserImages } from '../DB/LoadDB'



const StartupServey = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;




    //db
    const [imageUrl, setImageUrl] = useState([]);


    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchImage = async () => {
            const images = await loadUserImages();
            setImageUrl(images);
        };
    
        fetchImage();
    }, [isFocused]);


    const [foundImage, setFoundImage] = useState(null);
    
    useEffect(() => {
        if (imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === id);
            setFoundImage(matchImage);
        }
    }, [imageUrl]);


    // 설문 (질문)
    const [isYesSelected1, setIsYesSelected1] = useState(false);
    const [isNoSelected1, setIsNoSelected1] = useState(false);

    const [isYesSelected2, setIsYesSelected2] = useState(false);
    const [isNoSelected2, setIsNoSelected2] = useState(false);

    const [isYesSelected3, setIsYesSelected3] = useState(false);
    const [isNoSelected3, setIsNoSelected3] = useState(false);

    const [isYesSelected4, setIsYesSelected4] = useState(false);
    const [isNoSelected4, setIsNoSelected4] = useState(false);

    const [isYesSelected5, setIsYesSelected5] = useState(false);
    const [isNoSelected5, setIsNoSelected5] = useState(false);


    
    const handleYesButtonPress = (questionNumber) => {
        switch (questionNumber) {
          case 1:
            setIsYesSelected1(!isYesSelected1);
            setIsNoSelected1(false);
            // 질문 2부터 5까지 모두 초기화
            setIsYesSelected2(false);
            setIsNoSelected2(false);
            setIsYesSelected3(false);
            setIsNoSelected3(false);
            setIsYesSelected4(false);
            setIsNoSelected4(false);
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 2:
            setIsYesSelected2(!isYesSelected2);
            setIsNoSelected2(false);
            // 질문 3부터 5까지 모두 초기화
            setIsYesSelected3(false);
            setIsNoSelected3(false);
            setIsYesSelected4(false);
            setIsNoSelected4(false);
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 3:
            setIsYesSelected3(!isYesSelected3);
            setIsNoSelected3(false);
            // 질문 4와 5 초기화
            setIsYesSelected4(false);
            setIsNoSelected4(false);
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 4:
            setIsYesSelected4(!isYesSelected4);
            setIsNoSelected4(false);
            // 질문 5 초기화
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 5:
            setIsYesSelected5(!isYesSelected5);
            setIsNoSelected5(false);
            break;
          default:
            break;
        }
    };
      
      const handleNoButtonPress = (questionNumber) => {
        // "아니오"를 선택한 경우 해당 질문의 상태를 변경하고 "예"는 모두 해제
        switch (questionNumber) {
          case 1:
            setIsNoSelected1(true);
            setIsYesSelected1(false);
            // 질문 2부터 5까지 비활성화
            setIsYesSelected2(false);
            setIsNoSelected2(false);
            setIsYesSelected3(false);
            setIsNoSelected3(false);
            setIsYesSelected4(false);
            setIsNoSelected4(false);
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 2:
            setIsNoSelected2(true);
            setIsYesSelected2(false);
            // 질문 3부터 5까지 비활성화
            setIsYesSelected3(false);
            setIsNoSelected3(false);
            setIsYesSelected4(false);
            setIsNoSelected4(false);
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 3:
            setIsNoSelected3(true);
            setIsYesSelected3(false);
            // 질문 4와 5 비활성화
            setIsYesSelected4(false);
            setIsNoSelected4(false);
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 4:
            setIsNoSelected4(true);
            setIsYesSelected4(false);
            // 질문 5 비활성화
            setIsYesSelected5(false);
            setIsNoSelected5(false);
            break;
          case 5:
            setIsNoSelected5(true);
            setIsYesSelected5(false);
            break;
          default:
            break;
        }
    };
    
      


      

    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TouchableOpacity
                    style={[styles.icon, { left: 0, }]}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black' />
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    스타트업 단계
                </Text>
                <Icon name='notifications-outline' size={25} color='black' style={[styles.icon, { right: 0, }]} />
                <TouchableOpacity
                    style={[styles.icon, { right: 40, }]}
                    onPress={() => {
                        props.navigation.navigate('Category', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                            image: image,
                        })
                    }}
                >
                    <Icon name='home-outline' size={25} color='black' />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('StartupStep')
                    }}
                >
                    <Text style = {styles.stepText}>스타트업의 단계란?</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style = {styles.serveyView}>
                <Text style = {styles.questionMainText}>질문 1</Text> 
                <Text style = {styles.questionSubText}>아이디어 개발이 완료되었나요?</Text>
                <View style = {styles.btView}>   
                    <TouchableOpacity onPress={() => handleYesButtonPress(1)}>
                        <View
                            style={[
                            styles.yesBt,
                            {
                                backgroundColor: isYesSelected1 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isYesSelected1 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                예
                            </Text>
                        </View>
                    </TouchableOpacity>
                                    
                    <TouchableOpacity onPress={() => handleNoButtonPress(1)}>
                        <View
                            style={[
                            styles.noBt,
                            {
                                backgroundColor: isNoSelected1 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isNoSelected1 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                아니오
                            </Text>
                        </View>
                    </TouchableOpacity>

                    
                </View>

                <Text style = {styles.questionMainText1}>질문 2</Text> 
                <Text style = {styles.questionSubText}>시제품 제작이 완료되었나요?</Text>
                <View style = {[styles.btView, , { opacity: isYesSelected1 ? 1 : 0.1 }]}>
                    <TouchableOpacity onPress={() => handleYesButtonPress(2)}disabled={!isYesSelected1}>
                        <View
                            style={[
                            styles.yesBt,
                            {
                                backgroundColor: isYesSelected2 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isYesSelected2 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                예
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleNoButtonPress(2)}disabled={!isYesSelected1}>
                        <View
                            style={[
                            styles.noBt,
                            {
                                backgroundColor: isNoSelected2 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isNoSelected2 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                아니오
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> 

                <Text style = {styles.questionMainText1}>질문 3</Text> 
                <Text style = {styles.questionSubText}>제품 및 서비스가 정식 출시 되었나요?</Text>
                <View style = {[styles.btView, , { opacity: isYesSelected2 ? 1 : 0.1 }]}>   
                    <TouchableOpacity onPress={() => handleYesButtonPress(3)}disabled={!isYesSelected2}>
                        <View
                            style={[
                            styles.yesBt,
                            {
                                backgroundColor: isYesSelected3 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isYesSelected3 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                예
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => handleNoButtonPress(3)}disabled={!isYesSelected2}>
                        <View
                            style={[
                            styles.noBt,
                            {
                                backgroundColor: isNoSelected3 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isNoSelected3 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                아니오
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>  

                <Text style = {styles.questionMainText1}>질문 4</Text> 
                <Text style = {styles.questionSubText}>대규모 채용 등 성장 가속화가 진행 되었나요?</Text>
                <View style = {[styles.btView, , { opacity: isYesSelected3 ? 1 : 0.1 }]}>
                    <TouchableOpacity onPress={() => handleYesButtonPress(4)}disabled={!isYesSelected3}>
                        <View
                            style={[
                            styles.yesBt,
                            {
                                backgroundColor: isYesSelected4 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isYesSelected4 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                예
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleNoButtonPress(4)}disabled={!isYesSelected3}>
                        <View
                            style={[
                            styles.noBt,
                            {
                                backgroundColor: isNoSelected4 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isNoSelected4 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                아니오
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> 

                <Text style = {styles.questionMainText1}>질문 5</Text> 
                <Text style = {styles.questionSubText}>해외 진출 등 시장 확대가 진행 되었나요?</Text>
                <View style = {[styles.btView, , { opacity: isYesSelected4 ? 1 : 0.2 }]}>
                    <TouchableOpacity onPress={() => handleYesButtonPress(5)}disabled={!isYesSelected4}>
                        <View
                            style={[
                            styles.yesBt,
                            {
                                backgroundColor: isYesSelected5 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isYesSelected5 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                예
                            </Text>
                        </View>
                    </TouchableOpacity>   
                    
                    <TouchableOpacity onPress={() => handleNoButtonPress(5)}disabled={!isYesSelected4}>
                        <View
                            style={[
                            styles.noBt,
                            {
                                backgroundColor: isNoSelected5 ? '#5552E2' : '#f1f1f1',
                            },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.yesText,
                                    {
                                    color: isNoSelected5 ? 'white' : '#999999',
                                    },
                                ]}
                            >
                                아니오
                            </Text>
                        </View>
                    </TouchableOpacity>
                    
                </View> 

                <View>
                    <TouchableOpacity>
                        <Text style = {styles.stepGoText}>단계 선정하기</Text>
                    </TouchableOpacity>
                        
                </View>   
            </View>
            
        </View>

    )
}



export default StartupServey





const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    //아이콘 뷰
    titleView: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        marginBottom: 30,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },
    titleText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 23,
        fontWeight: 'bold',
    },

    //단계 안내 텍스트
    stepText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#767676',
        position:'absolute',
        marginLeft: 90,
    },

    //질문 뷰
    serveyView: {
        backgroundColor:'white',
        width:'90%',
        height: 600,
        marginTop:30,
    },

    //버튼 뷰
    btView:{
        flexDirection:'row',
        marginTop: 15,
    },

    //질문 텍스트
    questionMainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111111',
        textAlign:'center',
    },
    questionMainText1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111111',
        textAlign:'center',
        marginTop: 34
    },
    questionSubText: {
        fontSize: 12,
        fontWeight: 'light',
        textAlign:'center',
        marginTop: 10,
        color: '#767676',
    },

    //버튼 뷰
    yesBt: {
        backgroundColor:'#f1f1f1',
        width: 76,
        height: 34,
        borderRadius: 20,
        position: 'relative',
        marginLeft: 90,
    },
    noBt: {
        backgroundColor:'#f1f1f1',
        width: 76,
        height: 34,
        borderRadius: 20,
        position: 'relative',
        marginLeft: 20
    },




    //버튼 내부 텍스트
    yesText: {
        fontWeight: 'light',
        color: '#999999',
        textAlign:'center',
        marginTop: 10,
    },

    stepGoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111111',
        marginTop: 40,
        position: 'absolute',
        marginLeft: 270
    }
})