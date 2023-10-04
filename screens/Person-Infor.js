import { stopLocationUpdatesAsync } from 'expo-location'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const PersonInfor = (props) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.iconView}>
                <Icon name='arrow-back-outline' size={25} color='black' style={styles.icon}/>
                <Icon name='home-outline' size={25} color='black' style={styles.homeicon}/>
                <Icon name='notifications-outline' size={25} color='black' style={styles.bellicon}/>
            </View>

            <View style={styles.profileView}>
                <Image 
                    style={styles.profileImage}
                    source={require('../assets/peopleImage/moohee.png')}
                />
                <Text style={styles.nameText}>
                    김우희{'\n'}
                    <Text style={styles.infoText}>소속: 없음</Text>
                </Text>
                <Icon name='heart' size={25} color='red' style={styles.hearticon}/>
                <Text style = {styles.heartNum}>100</Text>
            </View>
            
            <ScrollView style={styles.inforView}>
                <View style={{flex:1}}>
                    <Text style = {styles.bigText}>
                        직종 {'\n'}
                        <Text style={styles.smallText}>Backend Developer</Text>
                    </Text>
                
                    <Text style = {styles.bigText}>
                        설명 {'\n'}
                        <Text style={styles.smallText}>안녕하세요 매일 지각하는 김우희입니다</Text>
                    </Text>

                    <Text style = {styles.bigText}>
                        경력 {'\n'}
                        <Text style={styles.smallText}>- 선문대학교 컴퓨터공학부 3학년 재학 중 {'\n'}</Text>
                        <Text style={styles.smallText}>- 검정치마, 포스트말론 콘서트 다녀옴 {'\n'}</Text>
                        <Text style={styles.smallText}>- 불꽃남자임 {'\n'}</Text>
                        <Text style={styles.smallText}>- 왕돈가스 거의 다 먹음  </Text>
                    </Text>

                    <Text style = {styles.bigText}>
                        프로젝트 {'\n'}
                        <Text style={styles.smallText}>프로젝트 관련 링크 삽입</Text>
                    </Text>
                    <View style ={{flexDirection:'row'}}>
                        <Text sttle = {styles.midText}>포트폴리오 다운로드   </Text>
                        <Icon name='folder-outline' size={20} style={styles.fileicon}></Icon>
                    </View>
                </View>
            </ScrollView>
            
            <View style = {styles.chatView}>
                <Text style={styles.chatText}>채팅하기</Text>
            </View>
        </View>
    )
}



export default PersonInfor

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    

    //아이콘 세션
    iconView: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
    },
    icon: {
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    homeicon: {
        position:'absolute',
        bottom: 0,
        right: 40
    },
    bellicon: {
        position:'absolute',
        bottom: 0,
        right: 0
    },
    fileicon: {
       
    },




    //프로필 세션
    profileView: {
        backgroundColor: 'white',
        height: 100,
        width: '90%',
        marginTop: 30,
        flexDirection: 'row', //가로배치
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginRight:10
    },

    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    infoText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 14,
        lineHeight: 50,
    },
    hearticon: {
        position:'absolute',
        top: 0,
        right:25,
    },
    heartNum: {
        fontSize: 14,
        color: 'rgba(153, 153, 153, 0.60)',
        position: 'absolute',
        top:4,
        right:0
    },


    // 정보 세션
    inforView: {
        width: '90%',
        height: 500,
        backgroundColor:'gray',
    },
    bigText: {
        color: ' #111',
        fontSize: 20,
        fontWeight: '500',
        marginBottom:35,
    },
    smallText: {
        color: 'rgba(153, 153, 153, 0.60)',
        fontSize: 14,
        lineHeight: 30,
        fontWeight:'400',
    },
    midText: {
        fontSize: 16,
        color: '#111',
    },


    //채팅 세션
    chatView: {
        backgroundColor: '#5552E2',
        height: 60,
        width: '90%',   
        marginTop:10,
        borderRadius:30
    },
    chatText: {
        color:'white',
        fontSize:16,
        fontWeight:600,
        position:'absolute',
        right:150,
        top:21
    }
})