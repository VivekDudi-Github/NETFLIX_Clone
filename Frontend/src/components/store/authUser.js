import axios from 'axios';
import {create} from 'zustand' ;
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
    User : null , 
    isLoading : false , 
    signup : async(credentials) => {
        try {
            set({isLoading : true})
            const response = await axios.post('/api/v1/auth/signup' , credentials)
            
            set({User : response.data , isLoading : false } )
            toast.success('Account created Successfully')
            
            
        } catch (error) {
            toast.error(error.response.data.error || "An error occured")
            set({user : null , isLoading : false})
        }
    } , 
    login :  async() => {} , 
    logout :  async() => {} ,
    authCheck :  async() => {} ,
}))