import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//헤더
import Header from '../components/Header';

//db 로드
import { loadUsers, addUser } from '../DB/LoadDB'



const CustomTextInput = (props) => {
    return (
        <View>
            <Text style={styles.textInputTitleText}>{props.name}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={`${props.name}${props.named} 입력해주세요`}
                maxLength={30}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}




const SignUp = (props) => {

    const [user, setUser] = useState([])
    const [id, setID] = useState('')
    const [pw, setPW] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const isFocused = useIsFocused();

    useEffect(() => {
        const fetchUser = async () => {
            const users = await loadUsers();
            setUser(users);
        };

        fetchUser();
    }, [isFocused]);


    const signUp = async () => {
        let bool = true;

        if (id === '' || pw === '' || name === '' || phone === '' || email === '') {
            alert('빈칸을 채워주세요')
            return;
        }

        user.map((row, idx) => {
            if (row.perPhone == phone) {
                bool = false
                alert('이미 등록된 전화번호입니다')
            } else if (row.perID == id) {
                bool = false
                alert('이미 등록된 아이디입니다')
            }
        })
        if (bool) {
            //db에 넣어라
            try {
                await addUser(id, pw, name, email, phone)
                alert('회원가입이 완료되었습니다!')
                props.navigation.navigate("Category")
            } catch (error) {
                console.log(error)
            }
        }
    }



    return (
        <View style={styles.mainView}>
            <Header
                titleName='가입하기'
            />
            <KeyboardAwareScrollView
                style={styles.textInputView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <CustomTextInput
                    name='이름'
                    named='을'
                    onChangeText={(e) => setName(e)}
                />
                <CustomTextInput
                    name='전화번호'
                    named='를'
                    onChangeText={(e) => setPhone(e)}
                />
                <CustomTextInput
                    name='이메일'
                    named='을'
                    onChangeText={(e) => setEmail(e)}
                />
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
            </KeyboardAwareScrollView>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.signButton}
                    onPress={signUp}
                >
                    <Text style={styles.signButtonText}>회원가입</Text>
                </TouchableOpacity>
                <View style={styles.buttonSubView}>
                    <Text style={styles.loginButtonText}>
                        이미 계정이 있으신가요?
                        <TouchableOpacity
                            onPress={() => { props.navigation.navigate('PersonLogin') }}
                        >
                            <Text style={styles.loginButtonSubText}>로그인</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>
    )
}


export default SignUp



const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },




    textInputView: {
        width: '90%',
        flex: 1
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
        width: '90%',
        height: 180,
    },
    signButton: {
        height: 60,
        borderRadius: 16,
        backgroundColor: '#5552E2',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 65
    },
})