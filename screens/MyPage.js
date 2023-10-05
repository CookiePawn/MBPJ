import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import storage from '../DB/Storage'
import { listAll, getDownloadURL, ref, } from '@firebase/storage';
import { useIsFocused } from '@react-navigation/native';



const MyPage = (props) => {
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
    let tmp = false

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const storageRef = ref(storage, '/userProfile');
                const result = await listAll(storageRef);
                const imageUrls = [];
                // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    imageUrls.push({ url, name: item.name });
                }
                setImageUrl(imageUrls);
            } catch (error) {
                console.error('이미지 로딩 오류:', error);
            }
        };
        fetchImage();
    }, [isFocused]);





    return (
        <View style={styles.mainView}>
            <View style={styles.iconView}>
                <TouchableOpacity
                    style={[styles.icon, {left: 0,}]}
                    onPress={()=> {
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black'/>    
                </TouchableOpacity>
                <Icon name='notifications-outline' size={25} color='black' style={[styles.icon, {right: 0,}]}/>
                <TouchableOpacity
                    style={[styles.icon, {right: 40,}]}
                    onPress={()=>{
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
                    <Icon name='home-outline' size={25} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.profileView}>
                {imageUrl.map((item, idx) => {
                    tmp = true
                    if(item.name == image) {
                        return(
                            <Image 
                                key={idx}
                                style={styles.profileImage}
                                source={{ uri : item.url}}
                            />
                        )    
                    } else {
                        if(!tmp && idx == imageUrl.length-1) {
                            return (
                                <Image 
                                    key={idx}
                                    style={styles.profileImage}
                                    source={require('../assets/start-solo.png')}
                                />
                            )
                        }
                    }
                })}
                <View style={styles.profileInfoView}>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.infoText}>소속 : 없음</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.profileBtn}
                onPress={()=> {
                    props.navigation.navigate('MyProfile', {
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
                <Text style={styles.profileBtnText}>프로필 보기</Text>
            </TouchableOpacity>
            <View style={styles.btnListView}>
                <TouchableOpacity 
                    style={styles.btnListSubView}
                    onPress={()=>{
                        props.navigation.navigate('EditPeopleInfo', {
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
                    <Icon name='create-outline' size={25} color='black'/>
                    <Text style={styles.btnListText}>내 페이지 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnListSubView}>
                    <Icon name='business-outline' size={25} color='black'/>
                    <Text style={styles.btnListText}>내 스타트업</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnListSubView}>
                    <Icon name='heart-outline' size={25} color='black'/>
                    <Text style={styles.btnListText}>관심</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnListSubView}>
                    <Icon name='bulb-outline' size={25} color='black'/>
                    <Text style={styles.btnListText}>도움말</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={styles.logoutBtn}
                onPress={()=> {
                    props.navigation.navigate('Category')
                    alert('로그아웃 되었습니다!')
                }}
            >
                <Text style={styles.logoutBtnText}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    )
} 



export default MyPage





const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },


    //아이콘 뷰
    iconView: {
        width: '90%',
        height: 100,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },


    //프로필 뷰
    profileView: {
        width: '90%',
        height: 100,
        marginTop: 30,
        flexDirection: 'row',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
        margin: 10,
        marginRight: 20,
    },
    profileInfoView: {
        flex: 1,
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(153, 153, 153, 0.60)',
        marginTop: 25,
    },



    //프로필 보기 버튼
    profileBtn: {
        width: '90%',
        height: 60,
        backgroundColor: '#E2E2F9',
        borderRadius: 30,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileBtnText: {
        fontSize: 16,
        fontWeight: 600,
        color: '#6866E7'
    },


    //버튼 리스트 뷰
    btnListView: {
        width: '90%',
        height: 200,
        marginTop: 30,
        borderColor: '#DDD',
        borderBottomWidth: 1
    },
    btnListSubView: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    btnListText: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 30,
        marginLeft: 10,
    },



    //로그아웃
    logoutBtn: {
        width: '90%',
        marginTop: 30,
    },
    logoutBtnText: {
        fontSize: 14,
        fontWeight: 600,
    },
})