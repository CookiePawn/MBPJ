import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const PersonUser = (props) => {

    const { params } = props.route;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const crn = params ? params.crn : null;


    return (
        <View style={styles.mainView}>
            <View style={styles.profileView}>
                <Image
                    style={styles.profileImage}
                    source={require('../assets/profile.png')}
                />
                <Text style={styles.profileText}>{name} 님</Text>
                <View style={styles.profileSubView}>
                    <Text style={styles.profileSubText}>
                        1{'\n'}
                        <Text style={styles.profileSubSubText}>
                            관심
                        </Text>
                    </Text>
                    <Text style={{ color: '#BEBDBD', fontSize: 15, margin: 30, }}>|</Text>
                    <Text style={styles.profileSubText}>
                        1{'\n'}
                        <Text style={styles.profileSubSubText}>
                            등급
                        </Text>
                    </Text>
                    <Text style={{ color: '#BEBDBD', fontSize: 15, margin: 30, }}>|</Text>
                    <Text style={styles.profileSubText}>
                        100{'\n'}
                        <Text style={styles.profileSubSubText}>
                            등급
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={styles.settingView}>
                <View style={styles.settingSubView}>
                    <Text style={styles.settingTitle}>내 정보</Text>
                    <View style={styles.settingListView}>
                        <TouchableOpacity style={styles.settingListButton}>
                            <Icon name="lock-closed-outline" size={25} color="#767676" style={styles.settingListIcon} />
                            <Text style={styles.settingListText}>내 정보 수정</Text>
                            <Icon name="chevron-forward-outline" size={25} color="#767676" style={styles.settingListIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.settingListBorderView}><View style={styles.settingListBorderSubView}></View></View>
                    <View style={styles.settingListView}>
                        <TouchableOpacity style={styles.settingListButton}>
                            <Icon name="lock-closed-outline" size={25} color="#767676" style={styles.settingListIcon} />
                            <Text style={styles.settingListText}>리뷰 보기</Text>
                            <Icon name="chevron-forward-outline" size={25} color="#767676" style={styles.settingListIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.settingListBorderView}><View style={styles.settingListBorderSubView}></View></View>
                    <View style={styles.settingListView}>
                        <TouchableOpacity style={styles.settingListButton}>
                            <Icon name="lock-closed-outline" size={25} color="#767676" style={styles.settingListIcon} />
                            <Text style={styles.settingListText}>관심 보기</Text>
                            <Icon name="chevron-forward-outline" size={25} color="#767676" style={styles.settingListIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.introduceView}>

            </View>
        </View>
    )
}


export default PersonUser





const styles = StyleSheet.create({

    //개인 마이페이지
    mainView: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    profileView: {
        flex: 0.32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 94,
        height: 94,
        borderRadius: 100,
        marginTop: 70,
    },
    profileText: {
        fontSize: 20,
        fontWeight: 600,
        margin: 10,
    },
    profileSubView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileSubText: {
        fontSize: 14,
        fontWeight: 600,
        textAlign: 'center',
    },
    profileSubSubText: {
        color: '#767676',
        fontSize: 12,
        fontWeight: 400,
    },



    settingView: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingSubView: {
        width: '90%',
        height: '95%',
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.456,
        shadowRadius: 5,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: 500,
        padding: 14,
    },
    settingListView: {
        flex: 0.31,
        alignItems: 'center',
    },
    settingListButton: {
        flex: 1,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingListIcon: {
        flex: 0.1,
    },
    settingListText: {
        flex: 0.8,
        color: '#767676',
    },
    settingListBorderView: {
        height: 1,
        width: '100%',
        alignItems: 'center',
    },
    settingListBorderSubView: {
        width: '73%',
        height: '100%',
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 2,
    },






    introduceView: {
        flex: 0.38,
        backgroundColor: 'white'
    },
})