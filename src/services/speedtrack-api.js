import axios from 'axios';
import moment from 'moment';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

async function findSpeeds(date = new Date()) {
    let page = 1;

    const speeds = [];

    while (true) {
        const response = await instance.get(`/speeds?page=${page}&date=${moment(date).format('YYYY-MM-DD')}`).then(data => data.data);

        const { docs } = response;

        if (!docs.length) {
            break;
        }

        speeds.push(...docs);

        page += 1;
    }

    return speeds;
}

export { findSpeeds };
