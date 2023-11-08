import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';


//db 로드
import { loadUserImages } from '../DB/LoadDB'



const LetterPage = (props) => {
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

    const [eInfo, setEInfo] = useState('')


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
                    쪽지 쓰기
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
            
            <View style={styles.inputView}>
                <TextInput
                    style={styles.smallText}
                    placeholder='내용을 입력하세요'
                    value={eInfo}
                    onChangeText={(e) => { setEInfo(e) }}
                    maxLength={30}
                />
            </View>
                
            
            <TouchableOpacity
                style={styles.chatBtn}
            >
                <Text style={styles.chatBtnText}>쪽지 전송</Text>
            </TouchableOpacity>
        </View>
    )
}



export default LetterPage;





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

    // 텍스트 입력 뷰
    inputView: {
        backgroundColor: '#f1f1f1',
        width: '90%',
        height: 600,
        borderRadius: '30'
    },

    // 텍스트 안내
    explanation: {
        fontSize: 16,
        marginLeft: 20,
        marginTop: 20,
        color: '#999999',
    },


    chatBtn: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '90%',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600,
    },

    smallText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 30,
        marginLeft: 20,
        marginTop: 20,
    },
})