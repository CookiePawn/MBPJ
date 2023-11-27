import { googleKey } from '../keys/Key';
import axios from 'axios';

const getAddressCoordinates = async (address) => {
    try {
        if (!address) {
            return null; // 주소가 없을 경우 처리
        }

        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`);

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return { address, lat: location.lat, lng: location.lng };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default getAddressCoordinates;
