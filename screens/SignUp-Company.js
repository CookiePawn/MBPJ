import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import db from '../DB/FireBase'
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react'



const CustomTextInput = (props) => {
    return (
        <View>
            <Text style={styles.textInputTitleText}>{props.name}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={`${props.name}${props.named} 입력해주세요`}
                maxLength = {20}
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
    const [crn, setCRN] = useState('')
    const [error, setError] = useState('')

    const isFocused = useIsFocused();

    useEffect(() => {
        const readFromDB = async () => {
            try {
                const data = await getDocs(collection(db, 'CompanyLogin'));
                let tempArray = [];
                data.forEach((doc) => {
                    tempArray.push({ ...doc.data(), id: doc.id });
                });
                setUser(tempArray);
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        readFromDB();
    }, [isFocused]);


    const signUp = async () => {
        let bool = true;

        if (id === '' || pw === '' || name === '' || phone === '' || email === '' || crn === '') {
            alert('빈칸을 채워주세요')
            return;
        }

        user.map((row, idx) => {
            if (row.CRN == crn) {
                bool = false
                alert('이미 등록된 기업입니다')
            } else if (row.comID == id) {
                bool = false
                alert('이미 등록된 아이디입니다')
            }
        })
        if (bool) {
            //db에 넣어라
            try {
                await addDoc(collection(db, 'CompanyLogin'), {
                    comID: id,
                    comPW: pw,
                    comName: name,
                    comEmail: email,
                    comPhone: phone,
                    CRN: crn
                });
                alert('회원가입이 완료되었습니다!')
                props.navigation.navigate("Login")
            } catch (error) {
                console.log(error)
            }
        }
    }




    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>가입하기</Text>
            </View>
            <View style={styles.textInputView}>
                <CustomTextInput
                    name='기업 이름'
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
                    name='사업자 번호'
                    named='를'
                    onChangeText={(e) => setCRN(e)}
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
            </View>
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
                            onPress={() => {props.navigation.navigate('Login')}}
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

    //회원가입 페이지
    titleView: {
        flex: 0.16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },

    textInputView: {
        flex: 0.7,
        width: '90%',
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
        flex: 0.2,
        width: '90%',
    },
    signButton: {
        height: 60,
        borderRadius: 16,
        backgroundColor: '#5552E2',
        marginTop: 32,
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
        marginTop: 20,
    },
    loginButtonSubText: {
        color: 'black',
        textDecorationLine: 'underline',
        marginLeft: 8
    },
    buttonSubView: {
        width: '100%',
        alignItems: 'center',
    },
})