import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'


import Icon from 'react-native-vector-icons/Ionicons'

import { useIsFocused } from '@react-navigation/native'

import { useState, useEffect } from 'react'


//DB
import {
    addStartUp,
    loadStartUps,
    loadStartUpImages,
    loadMember,
} from '../../DB/LoadDB'


import { openAI } from '../OpenAI'







export const Stat0 = (props) => {

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [introduce, setIntroduce] = useState('')
    const [stack, setStack] = useState('')






    return (
        <View style={styles.mainView}>
            <Text style={[styles.title, { fontSize: 24 }]}>이름</Text>
            <TextInput
                style={styles.textInput}
                placeholder='이름을 입력해주세요'
                value={name}
                onChangeText={(e) => setName(e)}
                maxLength={20}
            />
            <Text style={styles.title}>스타트업 단계</Text>
            <TouchableOpacity
                onPress={() => {
                    props.navi.navigation.navigate('StartupStep', props.params)
                }}
            >
                <Text style={[styles.textInput, { color: '#999' }]}>초기 단계는 준비입니다. {'\n'}이후 등급 재설정을 통해 등급을 정할 수 있습니다.{'\n'}{'\n'}자세한 내용은 클릭 후 확인 가능합니다.</Text>
            </TouchableOpacity>
            <Text style={styles.title}>주제</Text>
            <TextInput
                style={styles.textInput}
                placeholder='주제를 입력해주세요'
                value={title}
                onChangeText={(e) => setTitle(e)}
                maxLength={20}
            />
            <Text style={styles.title}>소개</Text>
            <TextInput
                style={styles.textInput}
                placeholder='소개를 입력해주세요'
                value={introduce}
                onChangeText={(e) => setIntroduce(e)}
                maxLength={1000}
                multiline={true}
            />
            <Text style={styles.title}>기술 / 스택</Text>
            <TextInput
                style={styles.textInput}
                placeholder='기술 및 스택을 입력해주세요'
                value={stack}
                onChangeText={(e) => setStack(e)}
                maxLength={1000}
                multiline={true}
            />
            <TouchableOpacity
                style={styles.saveBtn}
                onPress={async () => {
                    openAI(name, title, introduce, stack)
                    //await addStartUp(name, title, introduce, stack, props.perID)
                    //props.navi.navigation.navigate('Category', props.params)
                }}
            >
                <Text style={styles.saveBtnText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    )
}














//소속 스타트업
export const Stat1 = (props) => {

    const [imageUrl, setImageUrl] = useState([])
    const [startup, setStartup] = useState([])
    const [member, setMember] = useState([])

    const [admin, setAdmin] = useState([]);

    const isFocused = useIsFocused();



    useEffect(() => {
        const fetchStartUpImage = async () => {
            const images = await loadStartUpImages()
            setImageUrl(images)
        };
        const fetchStartups = async () => {
            const startups = await loadStartUps()
            setStartup(startups)
        };
        const fetchMember = async () => {
            const members = await loadMember();
            const newMembers = []; // 새로운 멤버를 임시 저장할 배열을 생성합니다.

            members.forEach((item) => {
                if (props.perID === item.perID) {
                    newMembers.push({ suID: item.suID, admin: item.admin }); // 조건에 맞는 suID만 임시 배열에 추가합니다.
                }
            });
            setMember(newMembers); // 상태를 한 번만 업데이트합니다.
        };


        fetchStartUpImage()
        fetchStartups()
        fetchMember()
    }, [isFocused])




    const getFilteredStartups = () => {
        if (!member || member.length === 0) {
            return []; // 빈 배열을 반환하거나 이 경우를 적절히 처리하세요.
        }

        return startup.filter((item) =>
            member.some(memberInfo => memberInfo.suID === item.id)
        );
    };





    useEffect(() => {
        const fetchAdmins = () => {
            if (member && member.length > 0) {
                const adminMembers = member.filter(memberInfo => memberInfo.admin === 1);
                const adminIDs = adminMembers.map(adminMember => adminMember.suID);
                setAdmin(adminIDs);
            }
        };

        fetchAdmins();
    }, [member]);






    return (
        <ScrollView style={styles.mainView}>
            <View style={{ flex: 1 }}>
                {getFilteredStartups().map((item, idx) => {
                    const matchingStartupImage = imageUrl.find(startupImg => startupImg.name === item.name);
                    const isAdmin = admin.includes(item.id);

                    return (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => {
                                props.navi.navigation.navigate('StartUpInfo',
                                    {
                                        ...props.params,
                                        people: item.id
                                    }
                                )
                            }}
                        >

                            <View style={[styles.startupView, { borderColor: isAdmin ? 'gold' : 'rgba(0, 0, 0, 0.05)' }]}>
                                {isAdmin && (
                                    <Icon name='star' color='gold' size={25} style={{ marginLeft: 10 }} />
                                )}
                                <Image
                                    style={styles.profileImage}
                                    source={matchingStartupImage ? { uri: matchingStartupImage.url } : require('../../assets/start-solo.png')}
                                />
                                <Text style={styles.startupName}>
                                    {item.name}{'\n'}
                                    <Text style={styles.startupInfo}>{item.info}</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
}








const styles = StyleSheet.create({
    mainView: {
        width: '90%',
    },


    //스타트업 생성 스타일  
    title: {
        fontSize: 20,
        fontWeight: 600,
        marginTop: 40,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 16,
    },



    saveBtn: {
        marginTop: 50,
    },
    saveBtnText: {
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'right',
    },







    //소속 스타트업 스타일
    startupView: {
        height: 100,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.10)',
        borderWidth: 1,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10,
    },
    startupName: {
        fontSize: 20,
        fontWeight: 600,
    },
    startupInfo: {
        fontSize: 16,
        fontWeight: 400,
        color: 'rgba(0, 0, 0, 0.3)',
        lineHeight: 25,
    },


})




