import {
    View,
    Text,
    Image,
    TextInput,
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
                    <Text style={styles.nameText}>{props.info}</Text>
                    <Text style={styles.infoText}>{props.name}</Text>
                    <Icon name='heart-outline' size={25} color='red' style={[styles.icon, {right: 10, bottom: 10,}]}/>
                </View>
            </View>    
        </TouchableOpacity>
    )
}





const Team = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;


    //검색
    const [search, setSearch] = useState('')

    //db
    const [startupImage, setStartupImage] = useState([]);
    const [startup, setStartup] = useState([])

    const isFocused = useIsFocused();

    useEffect(() => {
        const startupImage = async () => {
            try {
                const storageRef = ref(storage, '/startupProfile');
                const result = await listAll(storageRef);
                const imageUrls = [];
                // 각 아이템의 URL과 이름을 가져와 imageUrls 배열에 저장
                for (const item of result.items) {
                    const url = await getDownloadURL(item);
                    imageUrls.push({ url, name: item.name });
                }
                setStartupImage(imageUrls);
            } catch (error) {
                console.error('이미지 로딩 오류:', error);
            }
        };
        const startupDB = async () => {
            try {
                const data = await getDocs(collection(db, 'startupInfo'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setStartup(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        startupImage();
        startupDB();
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
                    팀원 모집
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
            <View style={styles.searchView}>
                <TextInput
                    style={styles.searchTextinput}
                    placeholder='검색어를 입력하세요'
                    placeholderTextColor='#777'
                    value={search}
                    onChangeText={(e)=>{setSearch(e)}}
                    maxLength={20}
                />
            </View>
            <View style={styles.listView}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {startup.map((startupItem, idx) => {
                        if (idx >= 5) return null;

                        const startupUrl = startupImage.filter((item) => item.name === startupItem.image);


                        if (search == '') {
                            if (startupUrl.length > 0) {
                                return startupUrl.map((urlItem, urlIdx) => (
                                    <CustomList
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={startupItem.name}
                                        info={startupItem.info}
                                    />
                                ));
                            }
                            
                            return (
                                <CustomList
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={startupItem.name}
                                    info={startupItem.info}
                                />
                            );
                        } else if (startupItem.info.includes(search)) {
                            if (startupUrl.length > 0) {
                                return startupUrl.map((urlItem, urlIdx) => (
                                    <CustomList
                                        key={idx}
                                        image={{ uri: urlItem.url }}
                                        name={startupItem.name}
                                        info={startupItem.info}
                                    />
                                ));
                            }
                            
                            return (
                                <CustomList
                                    key={idx}
                                    image={require('../assets/start-solo.png')}
                                    name={startupItem.name}
                                    info={startupItem.info}
                                />
                            );
                        }
                        
                    })}
                </ScrollView>
            </View>
        </View>
    )
}



export default Team




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



    //검색창
    searchView: {
        width: '90%',
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchTextinput: {
        flex: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        paddingLeft: 10,
    },



    //스타트업 리스트
    listView: {
        width: '90%',
    },
    listSubView: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 10,
        margin: 10,
        marginRight: 20,
    },
    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
    },
    nameText: {
        fontSize: 17,
        fontWeight: 'bold',
        lineHeight: 40,

    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)',
        position: 'absolute',
        bottom: 10,
    },
})