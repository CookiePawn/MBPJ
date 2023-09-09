import {
    View,
    Text,
} from 'react-native'


const CompanyUser = (props) => {

    const { params } = props.route;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const crn = params ? params.crn : null;


    return (
        <View>
            <Text>기업 마인페이지</Text>
        </View>
    )
}


export default CompanyUser