import axios from 'axios';

class Vid {
    public async Random(){
        return axios.get('api/v1/video/getRandom')
    }
}

export default Vid