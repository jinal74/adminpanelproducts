import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storageFirebase } from '../../firebase';
import * as ActionTypes from '../ActionTypes';

export const fetchProducts = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, "product"));
        let Arr = []
        querySnapshot.forEach((doc) => {
            let data = {
                id: doc.id,
                title: doc.data().title,
                sub_title: doc.data().sub_title,
                description: doc.data().description,
                image_url: doc.data().image_url,
                quantity: doc.data().quantity,
                category: doc.data().category,
                price: doc.data().price,
                rating: doc.data().rating
            }
            Arr.push(data)
            dispatch({ type: ActionTypes.FETCH_PRODUCTS, payload: Arr })
        });
    } catch (e) {
        console.log(e, "error")
    }
}

export const addProducts = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "product"), {
            title: data.title,
            sub_title: data.sub_title,
            description: data.description,
            quantity: data.quantity,
            image_url: data.image_url,
            category: data.category,
            price: data.price,
            rating: data.rating
        });
        let product_data = {
            id: docRef.id,
            title: data.title,
            sub_title: data.sub_title,
            description: data.description,
            image_url: data.image_url,
            quantity: data.quantity,
            category: data.category,
            price: data.price,
            rating: data.rating
        }
        dispatch({ type: ActionTypes.ADD_PRODUCTS, payload: product_data })
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deleteProducts = (id) => (dispatch) => {
    id && id.map(async (l) => {
        await deleteDoc(doc(db, "product", l));
        dispatch({ type: ActionTypes.DELETE_PRODUCTS, payload: l })
    })
}

export const updateProducts = (data) => async (dispatch) => {
    console.log(data)
    const productRef = doc(db, "product", data.id);
    await updateDoc(productRef, {
        title: data.title,
        sub_title: data.sub_title,
        description: data.description,
        image_url: data.image_url,
        quantity: data.quantity,
        category: data.category,
        price: data.price,
        rating: data.rating
    });

    let updateData = {
        id: data.id,
        title: data.title,
        sub_title: data.sub_title,
        description: data.description,
        image_url: data.image_url,
        quantity: data.quantity,
        category: data.category,
        price: data.price,
        rating: data.rating
    }

    dispatch({ type: ActionTypes.UPDATE_PRODUCTS, payload: updateData })
}

