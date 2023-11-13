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
    loadStartUps,
    loadStartUpImages,
    loadMember,
    loadTeam,
    addTeam,
} from '../../DB/LoadDB'









//소속 스타트업
export const Stat1 = (props) => {

    const [imageUrl, setImageUrl] = useState([])
    const [startup, setStartup] = useState([])
    const [member, setMember] = useState([])
    const [team, setTeam] = useState([])

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
        const fetchTeam = async () => {
            const teams = await loadTeam()
            setTeam(teams)
        };


        fetchStartUpImage()
        fetchStartups()
        fetchMember()
        fetchTeam()
    }, [isFocused])




    // getFilteredStartups 함수 수정
    const getFilteredStartups = () => {
        if (!member || member.length === 0) {
            return []; // 빈 배열을 반환하거나 이 경우를 적절히 처리하세요.
        }

        return startup.filter((item) => {
            const isAdmin = admin.includes(item.id);
            return isAdmin; // admin이 1인 경우만 반환
        });
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
                            onPress={async() => {
                                await addTeam(item.id);
                                props.navi.navigation.navigate('Category',
                                    {
                                        ...props.params,
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




