import axios from 'axios';

interface loginData {
    username:string;
    password:string
}

interface signupData{
    username:string;
    email:string;
    password:string
}

interface forgotPasswordData{
    email:string
}

interface changePasswordData{
    email:string;
    token:string;
    newPassword:string;
}

interface updateProfileData{
    newProfilePic:string
}

class Auth {
    Login(loginData:loginData){
        return axios.post('api/v1/user/login',loginData)   
      }
  
       Signup(signUpData:signupData){
          return axios.post('api/v1/user/signup',signUpData)
      }
  
      ForgotPassword(data:forgotPasswordData){
          return axios.post('api/v1/user/forgotPassword',data)   
      }
  
       ChangePassword(data:changePasswordData){
          return axios.post('api/v1/user/changePassword',data)
      }
  
      UpdateProfilePic(data:updateProfileData){
          return axios.post('api/v1/user/updateProfilePic',data)
      }
}

export default Auth