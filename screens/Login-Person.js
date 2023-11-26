import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react'


//헤더
import Header from '../components/Header';


//db 로드
import { loadUsers } from '../DB/LoadDB'





const CustomTextInput = (props) => {
    return (
        <View>
            <Text style={styles.textInputTitleText}>{props.name}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={`${props.name}${props.named} 입력해주세요`}
                maxLength={20}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}







const Login = (props) => {
    const [user, setUser] = useState([])
    const [id, setID] = useState('')
    const [pw, setPW] = useState('')

    const isFocused = useIsFocused();



    useEffect(() => {
        const fetchUser = async () => {
            const users = await loadUsers();
            setUser(users);
        };

        fetchUser();
    }, [isFocused]);


    const login = () => {
        let bool = false
        user.map((row, idx) => {
            if (row.perID == id && row.perPW == pw) {
                props.navigation.navigate("Category", {
                    num: row.id,
                    id: row.perID,
                    pw: row.perPW,
                    phone: row.perPhone,
                    name: row.name,
                    email: row.perEmail,
                    image: row.image,
                });
                alert(`어서오세요 ${row.name}님!`)
                setID('')
                setPW('')
                bool = true
            }
        })
        if (!bool) {
            alert('ID 또는 PASSWORD가 틀렸습니다')
            setID('')
            setPW('')
        }
    }




    return (
        <View style={styles.mainView}>
            <Header
                navi = {props}
                iconNameL1='arrow-back-outline'
                titleName='로그인'
            />
            
            <View style={styles.textInputView}>
                <CustomTextInput
                    name='아이디'
                    named='를'
                    onChangeText={(e) => setID(e)}
                />
                <CustomTextInput
                    name='비밀번호'
                    named='를'
                    onChangeText={(e) => setPW(e)}
                />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.signButton}
                    onPress={login}
                >
                    <Text style={styles.signButtonText}>로그인</Text>
                </TouchableOpacity>
                <View style={styles.buttonSubView}>
                    <Text style={styles.loginButtonText}>
                        아직 회원이 아니신가요?
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('PersonSignUp') }}
                        >
                            <Text style={styles.loginButtonSubText}>회원가입</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                
            </View>
        </View>
    )
}


export default Login





const styles = StyleSheet.create({

    //로그인
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    },


    textInputView: {
        flex: 0.3,
        width: '90%',
        justifyContent: 'center',
    },
    textInputTitleText: {
        color: '#9EA3B2',
    },
    textInput: {
        height: 60,
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        borderWidth: 0,
        marginTop: 8,
        marginBottom: 20,

        color: '#9EA3B2',
        paddingLeft: 14,
        fontSize: 14,
    },



    buttonView: {
        flex: 0.45,
        width: '90%',
    },
    signButton: {
        height: 60,
        borderRadius: 16,
        backgroundColor: '#5552E2',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    signButtonText: {
        color: 'white',
        fontSize: 16,
    },
    loginButtonText: {
        color: '#9EA3B2',
        fontSize: 14,
    },
    loginButtonSubText: {
        color: 'black',
        textDecorationLine: 'underline',
        marginLeft: 8
    },
    buttonSubView: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        marginTop: 350,
    },

})