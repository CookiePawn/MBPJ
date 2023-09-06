import {
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import  db  from '../DB/FireBase'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';


const Login = (props) => {
    const [user, setUser] = useState(['']);
    const [id, setID] = useState();
    const [pw, setPW] = useState();
    const isFocused = useIsFocused();


    useEffect(() => {
        const readFromDB = async () => {
            try {
                const data = await getDocs(collection(db, 'users'));
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


    const login = () => {
        let bool = false
        user.map((row, idx) => {
            if (row.ID == id && row.PW == pw) {
                props.navigation.navigate("TabNavigator", {
                    screen: "User",
                    params: {
                        id: row.ID,
                        pw: row.PW,
                        nickname: row.NICKNAME,
                        name: row.NAME,
                        phone: row.PHONE
                    },
                });
                alert(`어서오세요 ${row.NICKNAME}님!`)
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
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={styles.loginBox}>
                <CustomTextInput
                    text='아이디'
                    icon='user'
                    lock={false}
                    value={id}
                    onChangeText={(e) => setID(e)}
                />
                <CustomTextInput
                    text='비밀번호'
                    icon='lock'
                    lock={true}
                    value={pw}
                    onChangeText={(e) => setPW(e)}
                />
                <TouchableOpacity
                    style={styles.loginBtn}
                    title="Login"
                    onPress={login}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.signUpBtn}
                    title="signUp"
                    onPress={() => {
                        props.navigation.navigate('SignUp')
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}







const CustomTextInput = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <View style={{ width: '95%', paddingTop: 10, marginBottom: 7, marginTop: 10 }}>
            <Text
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 10,
                    zIndex: 100,
                    backgroundColor: 'white',
                    paddingLeft: 7,
                    paddingRight: 7
                }}>
                {props.text}
            </Text>
            <View
                style={[{
                    borderWidth: 2,
                    borderColor: 'lightskyblue',
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingTop: 5,
                }, isFocused ? styles.inputFocused : null,]}>
                <AntDesign
                    name={props.icon}
                    size={20}
                    color="black"
                    style={{ margin: 5 }}
                />
                <TextInput
                    style={styles.textInput}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    secureTextEntry={props.lock}
                    maxLength={20}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>
    );
};













const styles = StyleSheet.create({
    loginBox: {
        width: '98%',
        height: 290,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#1111',
        borderWidth: 2,
        alignItems: 'center'
    },
    textInput: {
        width: '98%',
        height: 40,
        position: 'relative',
        top: -2,
        outline: 'none'
    },
    loginBtn: {
        width: '95%',
        height: 40,
        marginTop: 35,
        backgroundColor: 'lightskyblue',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpBtn: {
        width: '95%',
        height: 40,
        marginTop: 5,
        backgroundColor: '#c9c9c9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFocused: {
        borderColor: 'black',
    },
})




export default Login