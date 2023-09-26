import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, useEffect } from 'react'
import storage from '../DB/Storage'
import db from '../DB/FireBase'
import { collection, getDocs, } from 'firebase/firestore';
import { listAll, getDownloadURL, ref, } from '@firebase/storage';
import { useIsFocused } from '@react-navigation/native';



const CustomList = (props) => {
    return (
        <TouchableOpacity>
            <View style= {styles.listSubView}>
                <Image 
                    style= {styles.profileImage}
                    source= {props.image}
                />
                <View style={styles.listSubSubView}>
                    <Text style={styles.nameText}>{props.name}</Text>
                    <Text style={styles.infoText}>{props.info}</Text>
                    <Icon name='heart-outline' size={25} color='red' style={[styles.icon, {right: 10, bottom: 10,}]}/>
                </View>
            </View>    
        </TouchableOpacity>
    )
}





const People = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;


    //db
    const [imageUrl, setImageUrl] = useState([]);
    const [user, setUser] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const storageRef = ref(storage, '/image/user/profile/');
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
        const readFromDB = async () => {
            try {
                const data = await getDocs(collection(db, 'userInfo'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setUser(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        fetchImage();
        readFromDB();
    }, [isFocused]);









    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TouchableOpacity
                    style={[styles.icon, {left: 0,}]}
                    onPress={()=>{
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black'/>
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    이런 사람은 어때요?
                </Text>
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
                        })
                    }}
                >
                    <Icon name='home-outline' size={25} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.listView}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {imageUrl.map((imageUrlItem, idx) => {
                        if (idx >= 7) return null;

                        let url = imageUrlItem.url;
                        let name = imageUrlItem.name;
                        const matchingUsers = user.filter((item) => item.image === name);
                        return matchingUsers.map((matchingUserItem) => (
                            <CustomList
                                image={{ uri: url }}
                                name={matchingUserItem.name}
                                info={matchingUserItem.info}
                            />
                        ));
                    })}
                </ScrollView>
            </View>
        </View>
    )
}



export default People




const styles = StyleSheet.create({
    
    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },


    //content
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

    listView: {
        width: '90%',
    },
    listSubView: {
        width: '100%',
        height: 90,
        flexDirection: 'row',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        margin: 10,
    },
    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 40,
    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)'
    },
})