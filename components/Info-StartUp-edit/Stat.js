import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import { useState, useEffect } from 'react'


//DB
import {
    addStartUp,
    loadStartUps,
    loadStartUpImages,
    loadMember,
} from '../../DB/LoadDB'





export const Stat0 = (props) => {

    const [name, setName] = useState('')
    const [step, setStep] = useState(0)
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
                    props.navi.navigation.navigate('StartupServey', props.params)
                }}
            >
                <Text style={[styles.textInput, { color: '#c9c9c9' }]}>측정하기 ▷</Text>
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
                maxLength={20}
            />
            <Text style={styles.title}>기술 / 스택</Text>
            <TextInput
                style={styles.textInput}
                placeholder='기술 및 스택을 입력해주세요'
                value={stack}
                onChangeText={(e) => setStack(e)}
                maxLength={20}
            />
            <TouchableOpacity
                style={styles.saveBtn}
                onPress={async () => {
                    await addStartUp(name, step, title, introduce, stack, props.perID)
                    props.navi.navigation.navigate('Category', props.params)
                }}
            >
                <Text style={styles.saveBtnText}>저장하기</Text>
            </TouchableOpacity>
        </View>
    )
}








//스타트업 수정
export const Stat1 = (props) => {
    return (
        <View style={[styles.mainView, { backgroundColor: 'blue' }]}>
            <Text>{props.name}</Text>
        </View>
    )
}






//소속 스타트업
export const Stat2 = (props) => {

    const [imageUrl, setImageUrl] = useState([])
    const [startup, setStartup] = useState([])
    const [member, setMember] = useState([])

    const [foundImage, setFoundImage] = useState(null);


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
                    newMembers.push(item.suID); // 조건에 맞는 suID만 임시 배열에 추가합니다.
                }
            });
            setMember(newMembers); // 상태를 한 번만 업데이트합니다.
        };


        fetchStartUpImage()
        fetchStartups()
        fetchMember()
    }, [])



    useEffect(() => {
        if (startup.name && imageUrl.length > 0) {
            const matchImage = imageUrl.find(item => item.name === startup.name);
            setFoundImage(matchImage);
        }
    }, [member]);




    // member 상태에 있는 suID와 일치하는 startup만 필터링하는 함수
    const getFilteredStartUps = () => {
        return startup.filter((su) => member.includes(su.id));
    };


    return (
        <ScrollView style={styles.mainView}>
            <View style={{ flex: 1 }}>
                {getFilteredStartUps().map((item, idx) => (
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

                        <View style={styles.startupView}>
                            <Image
                                style={styles.profileImage}
                                source={foundImage ? { uri: foundImage.url } : require('../../assets/start-solo.png')}
                            />
                            <Text style={styles.startupName}>
                                {item.name}{'\n'}
                                <Text style={styles.startupInfo}>{item.info}</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
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




