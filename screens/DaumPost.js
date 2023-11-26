import Postcode from '@actbase/react-daum-postcode';

const DaumPost = (props) => {
    //로그인 확인
    const { params } = props.route;
    const num = params ? params.num : null;
    const id = params ? params.id : null;
    const pw = params ? params.pw : null;
    const name = params ? params.name : null;
    const email = params ? params.email : null;
    const phone = params ? params.phone : null;
    const image = params ? params.image : null;
    const screen = params ? params.screen : null;
    const people = params ? params.people : null;




    const getData = (data) => {

        let address = ""
        let zonecode = data.zonecode

        if (data.buildingName === 'N') {
            address = (data.address + " " + data.apartment);
        } else {
            address = (data.address + " " + data.buildingName);
        }

        props.navigation.navigate(screen, {
            address,
            zonecode,
            num: num,
            id: id,
            pw: pw,
            phone: phone,
            name: name,
            email: email,
            image: image,
            people : people,
        })
    }

    return (

        <Postcode
            style={{ width: '100%', height: '100%', top: 50 }}
            jsOptions={{ animation: true }}
            onSelected={data => getData(data)}
            onError={(error) => console.error(error)}
        />

    )

}

export default DaumPost