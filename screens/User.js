import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import React from 'react';



const User = (props) => {
    const { params } = props.route;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const crn = params ? params.crn : null;

    return (
        <View style={{flex:1}}>
            <Text>User</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("Category", {
                    id: id,
                    pw: pw,
                    phone: phone,
                    name: name,
                    email: email,
                    crn: crn
                })}>
                <Text>카테고리로 가기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("LoginGuide")}>
                <Text>로그아웃</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>ID</Text>
                    <Text style={styles.value}>{id}</Text>
                    <Text style={styles.label}>PW</Text>
                    <Text style={styles.value}>{pw}</Text>
                    <Text style={styles.label}>NAME</Text>
                    <Text style={styles.value}>{name}</Text>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{email}</Text>
                    <Text style={styles.label}>PHONE</Text>
                    <Text style={styles.value}>{phone}</Text>
                    <Text style={styles.label}>사업자 등록 번호</Text>
                    <Text style={styles.value}>{crn}</Text>
                </View>
            </View>
        </View>

    )
}

export default User



const styles = StyleSheet.create({
    //사용자 페이지
    button: {
        margin: 50,
    },



    //개인 정보
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    infoContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333333',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#999999',
        marginBottom: 15,
    },
})