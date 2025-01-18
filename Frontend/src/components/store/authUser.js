import axios from 'axios';
import {create} from 'zustand' ;
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    User : 'null' , 
    isLoading : false , 
    signup : async(credentials) => {
        try {
            set({isLoading : true})
            const response = await axios.post('/api/v1/auth/signup' , credentials)
            
            set({User : response.data , isLoading : false } )
            toast.success('Account created Successfully')
            
            
        } catch (error) {
            toast.error(error.response.data.error || "An error occured")
            set({User : null , isLoading : false})
        }
    } , 
    login :  async(credentials) => {
        try {
            set({isLoading : true})
            const response = await axios.post('/api/v1/auth/login' , credentials)
            set({User : response.data.user , isLoading : false})
            toast.success('Login Successfull')
            return {success : true}
        } catch (error) {
            set({User : null , isLoading : false})
            toast.error(error.response.data.error || 'An error occured')
        }
    } , 
    logout :  async() => {
        try {
            await axios.post('/api/v1/auth/logout')
            set({User : null , isLoading : false})
            toast.success("Logged Out Successfully")
        } catch (error) {
            set({isLoading : false})
            toast.error(error.response.data.error || 'Error while logging out')
        }

    } ,
    authCheck :  async() => {
        try {
            set({isLoading : true})
            const response = await axios.get('/api/v1/auth/authCheck')
            if(response.data.user){
                set({User : response.data.user , isLoading : false})
            }
        } catch (error) {
            set({User : null , isLoading : false})
        }
    } ,
}))