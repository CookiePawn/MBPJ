import Postcode from '@actbase/react-daum-postcode';

const DaumPost = (props, navigation) => {

    const getAddress = {
        zonecode : '',
        address : '',
        buildingName : '',
    }


    const getData = (data) => {
        
        let address = ""
        let zonecode = data.zonecode

        if (data.buildingName === 'N') {
            address = (data.address + " " + data.apartment);
        } else {
            address = (data.address + " " + data.buildingName);
        }
         
        props.navigation.navigate("MyProfile", {address, zonecode})
    }

    return (

        <Postcode
            style={{ width: '100%', height: '100%', top: 50}}
            jsOptions={{ animation: true }}
            onSelected= {data => getData(data)}
            onError={(error) => console.error(error)}
        />

    )

}

export default DaumPost