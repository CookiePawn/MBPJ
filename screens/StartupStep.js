import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


//헤더
import Header from '../components/Header';



const StartupStep = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;




    return (
        <View style={styles.mainView}>
            <Header
                navi = {props}
                params = {{
                    num: num,
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    image: image,
                }}
                iconNameL1='arrow-back-outline'
                iconNameR1='notifications'
                iconNameR2='home'
                login = {num}
                titleName='스타트업의 단계란?'
            />
            <View style = {styles.explanationView}> 
                <Text style = {styles.explanationText}>스타트업의 진행 상황에 따라</Text>
                <Text style = {styles.explanationText1}>5가지 단계로 나누어져 있습니다</Text>
            </View>

            <View style = {styles.stepView}>
                <View style = {styles.boxView}>
                    <Text style = {styles.bigText}>시드 단계</Text>
                    <Text style = {styles.smallText}>아이디어 개발이 완료 되어있는 단계</Text>
                </View>

                <View style = {styles.boxView}>
                    <Text style = {styles.bigText}>시리즈 A 단계</Text>
                    <Text style = {styles.smallText}>시제품 제작이 완료 되어있는 단계</Text>
                </View>

                <View style = {styles.boxView}>
                    <Text style = {styles.bigText}>시리즈 B 단계</Text>
                    <Text style = {styles.smallText}>제품 및 서비스가 정식 출시 되어있는 단계</Text>
                </View>

                <View style = {styles.boxView}>
                    <Text style = {styles.bigText}>시리즈 C 이상</Text>
                    <Text style = {styles.smallText}>대규모 채용 등 성장이 가속화 되어있는 단계</Text>
                </View>

                <View style = {styles.boxView}>
                    <Text style = {styles.bigText}>엑시트</Text>
                    <Text style = {styles.smallText}>해외 진출 등 시장 확대가 진행 되어있는 단계</Text>
                </View>
            </View>

            <View>
                <Text style = {styles.inforText}>각 단계의 진행을 마무리 해야 다음 단계로 갈 수 있습니다</Text>
            </View>

            
        </View>
    )
}



export default StartupStep





const styles = StyleSheet.create({

    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    

    //스타트업 진행 단계 설명 뷰
    explanationView: {
        backgroundColor: 'white',
        width: '90%',
        height: 100,
    },

    explanationText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20
    },

    explanationText1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10
    },

    //5가지 단계 뷰
    stepView: {
        width:'100%',
        height: 560,
        backgroundColor: '#fafafa',
        alignItems: 'center'
    },
    boxView: {
        width: '90%',
        height: 100,
        backgroundColor:'white',
        borderRadius: 13,
        marginTop: 10,
    },

    bigText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
        marginLeft: 30,
    },
    smallText: {
        fontSize: 12,
        marginTop: 10,
        marginLeft: 30,
        color: '#999999',
    },


    inforText: {
        fontSize: 14,
        marginTop: 10,
        color: '#777777',
    }




 

})