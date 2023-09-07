import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet
  } from 'react-native'
  import {useState, useEffect} from 'react'
  import { useIsFocused } from '@react-navigation/native';
  import db from '../DB/FireBase'
  import { collection, getDocs, addDoc } from 'firebase/firestore';
  import { AntDesign } from '@expo/vector-icons';
  
  
  
  const SignUp = (props) => {
    const [user, setUser] = useState([])
    const [id, setID] = useState()
    const [pw, setPW] = useState()
    const [rePw, setRePW] = useState()
    const [nickname, setNickname] = useState()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
  
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
  
  
  
    const signUp = async () => {
      let bool = true;
  
      user.map((row, idx) => {
        if (row.ID == id) {
          bool = false
        } 
      })
      if (bool) {
        if (pw == rePw) {
          //db에 넣어라
          try {
            await addDoc(collection(db, 'users'), {
                ID : id,
                PW : pw,
                NAME : name,
                NICKNAME : nickname,
                PHONE : phone
            });
            alert('회원가입이 완료되었습니다!')
            props.navigation.navigate("Login")
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        alert('아이디가 이미 존재합니다')
      }
    }
  
  
  
  
  
  
  
    return (
      <View style={{
        flex: 1,
        justifyContent : 'center',
        alignItems: 'center'}}
      >
        <View
          style = {styles.signUpBox}>
          <TagLine title = {'ID 설정'}/>
          <CustomTextInput
            text = '아이디'
            icon = 'user'
            lock = {false}
            value = {id}
            onChangeText = {(e) => setID(e)}
          />
          <CustomTextInput
            text = '비밀번호'
            icon = 'lock'
            lock = {true}
            value = {pw}
            onChangeText = {(e) => setPW(e)}
          />
          <CustomTextInput
            text = '비밀번호 재입력'
            icon = 'lock'
            lock = {true}
            value = {rePw}
            onChangeText = {(e) => setRePW(e)}
          />
          <TagLine title = {'개인정보'}/>
          <CustomTextInput
            text = '닉네임'
            icon = 'tago'
            lock = {false}
            value = {nickname}
            onChangeText = {(e) => setNickname(e)}
          />
          <CustomTextInput
            text = '이름'
            icon = 'contacts'
            lock = {false}
            value = {name}
            onChangeText = {(e) => setName(e)}
          />
          <CustomTextInput
            text = '전화번호'
            icon = 'mobile1'
            lock = {false}
            value = {phone}
            onChangeText = {(e) => setPhone(e)}
          />
  
  
  
          <TouchableOpacity
            style = {styles.signUpBtn}
            title = "Back"
            onPress = {signUp}
          >
            <Text style = {{color: 'white', fontWeight: 'bold'}}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.backBtn}
            title = "Back"
            onPress = {() => {
              props.navigation.navigate('Login')
            }}
          >
            <Text style = {{color: 'white', fontWeight: 'bold'}}>뒤로가기</Text>
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
            name = {props.icon}
            size={20}
            color="black"
            style={{ margin: 5 }}
          />
          <TextInput
            style = {styles.textInput}
            value = {props.value}
            onChangeText = {props.onChangeText}
            secureTextEntry={props.lock}
            maxLength = {20}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </View>
      </View>
    );
  };
  
  
  const TagLine = (props) => {
    return (
      <View style={{
        width: "90%",
        height: 1,
        textAlign: "center",
        borderWidth: 1,
        borderColor: 'gray',
        lineHeight: "0.1em",
        marginTop: 40,
        marginBottom: 20,
        alignItems: 'center',
      }}>
        <Text style={{ 
          backgroundColor: "white", 
          padding: '4%',
          position: 'absolute',
          top: -22,
          left: '38%',
          zIndex: 100,
        }}>{props.title}</Text>
      </View>
    )
  }
  
  
  
  
  
  
  const styles = StyleSheet.create({
    signUpBox: {
      width: '98%',
      height: '98%',
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
    backBtn: {
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
    signUpBtn: {
      width: '95%',
      height: 40,
      marginTop: 100,
      backgroundColor: 'lightskyblue',
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
  
  
  
  
  
  
  export default SignUp