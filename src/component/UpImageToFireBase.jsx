import React from 'react';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../config/firebaseConfig';



export const uploadImageAndGetUrl = async(file , path = 'image/')=> {
    if(!file) throw new Error('Ko co file');
    try{
        const newStore = ref(storage , `${path}${file.name}`);
        await uploadBytes(newStore, file);
        const url = await getDownloadURL(newStore);
        return url;
    }catch(error){
        console.log("Lỗi " + error)
    }
}
export const uploadVideoAndGetUrl = async(file , path = 'video/')=> {
    if(!file) throw new Error('Ko co file');
    try{
        const newStore = ref(storage , `${path}${file.name}`);
        await uploadBytes(newStore, file);
        const url = await getDownloadURL(newStore);
        return url;
    }catch(error){
        console.log("Lỗi " + error)
    }
}