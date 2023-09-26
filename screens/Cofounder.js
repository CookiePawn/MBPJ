import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'



const CustomList = (props) => {
    return (
        <TouchableOpacity>
            <View style= {styles.listSubView}>
                <Image 
                    style= {styles.profileImage}
                    source= {props.image}
                />
                <View style={styles.listSubSubView}>
                    <Text style={styles.nameText}>{props.info}</Text>
                    <Text style={styles.infoText}>{props.name}</Text>
                    <Icon name='heart-outline' size={25} color='red' style={[styles.icon, {right: 10, bottom: 10,}]}/>
                </View>
            </View>    
        </TouchableOpacity>
    )
}





const Cofounder = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;

    return (
        <View style={styles.mainView}>
            <View style={styles.titleView}>
                <TouchableOpacity
                    style={[styles.icon, {left: 0,}]}
                    onPress={()=>{
                        props.navigation.goBack()
                    }}
                >
                    <Icon name='arrow-back-outline' size={25} color='black'/>
                </TouchableOpacity>
                <Text style={styles.titleText}>
                    공동 창업자 모집
                </Text>
                <Icon name='notifications-outline' size={25} color='black' style={[styles.icon, {right: 0,}]}/>
                <TouchableOpacity
                    style={[styles.icon, {right: 40,}]}
                    onPress={()=>{
                        props.navigation.navigate('Category', {
                            num: num,
                            id: id,
                            pw: pw,
                            phone: phone,
                            name: name,
                            email: email,
                        })
                    }}
                >
                    <Icon name='home-outline' size={25} color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.listView}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <CustomList
                        image= {require('../assets/category-it.jpg')}
                        name= '김우희'
                        info= '모바일 어플리케이션 창업자 모집'
                    />
                    <CustomList
                        image={require('../assets/start-solo.png')}
                        name= '김채원'
                        info= 'Health care application'
                    />
                    <CustomList
                        image={require('../assets/category-design.jpg')}
                        name= '권은비'
                        info= 'UI/UX'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/whdbfl.jpg')}
                        name= '조유리'
                        info= '모트라스'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/cyeks.png')}
                        name= '쵸단'
                        info= 'Backend Delveloper'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/sakura.jpg')}
                        name= '사쿠라'
                        info= 'Backend Delveloper'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/tlstjdus.jpg')}
                        name= '신서연'
                        info= 'Backend Delveloper'
                    />
                    <CustomList
                        image= {require('../assets/peopleImage/moohee.png')}
                        name= '김우희'
                        info= 'Backend Developer'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/rlacodnjs.jpeg')}
                        name= '김채원'
                        info= 'Frontend Delveloper'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/rnjsdmsql.jpg')}
                        name= '권은비'
                        info= 'UI/UX Designer'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/whdbfl.jpg')}
                        name= '조유리'
                        info= 'Backend Delveloper'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/cyeks.png')}
                        name= '쵸단'
                        info= 'Backend Delveloper'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/sakura.jpg')}
                        name= '사쿠라'
                        info= 'Backend Delveloper'
                    />
                    <CustomList
                        image={require('../assets/peopleImage/tlstjdus.jpg')}
                        name= '신서연'
                        info= 'Backend Delveloper'
                    />
                </ScrollView>
            </View>
        </View>
    )
}



export default Cofounder




const styles = StyleSheet.create({
    
    //메인 뷰
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },


    //content
    titleView: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        marginBottom: 30,
    },
    icon: {
        position: 'absolute',
        bottom: 0,
    },
    titleText: {
        position: 'absolute',
        bottom: 0,
        fontSize: 23,
        fontWeight: 'bold',
    },

    listView: {
        width: '90%',
    },
    listSubView: {
        width: '100%',
        height: 110,
        flexDirection: 'row',
    },
    profileImage: {
        width: 85,
        height: 85,
        borderRadius: 10,
        margin: 10,
        marginRight: 20,
    },
    listSubSubView: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
    },
    nameText: {
        fontSize: 17,
        fontWeight: 'bold',
        lineHeight: 40,

    },
    infoText: {
        fontSize: 12,
        color: 'rgba(0, 0, 0, 0.60)',
        position: 'absolute',
        bottom: 10,
    },
})