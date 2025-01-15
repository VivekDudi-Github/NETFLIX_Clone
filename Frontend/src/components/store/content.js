import {create} from 'zustand' ;

export const useContentStore = create((set) => ({
    contentType : 'movies' ,
    setContentType : async(type) => {set({contentType : type})}
}))