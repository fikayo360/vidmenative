import axios from 'axios';

interface commentData{
    videoId:string;
    username:string;
    userPic:string;
    comment:string;
}

interface likeData{
    videoId:string;
    username:string;
}

class Vid {
    public async Random(){
        return axios.get('api/v1/video/getRandom')
    }
    public async getComments(videoId:string){
        return axios.get(`api/v1/comment/getAll?videoId=${videoId}`)
    }
    public async getLikes(videoId:string){
        return axios.get(`api/v1/like/getAll?videoId=${videoId}`)
    }
    public async addComment(commentData:commentData){
        return axios.post('api/v1/comment/add',commentData)
    }
    public async addLikes(likeData:likeData){
        return axios.post('api/v1/like/add',likeData)
    }
}

export default Vid