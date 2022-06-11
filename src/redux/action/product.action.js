import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
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
            sub_title: data.subtitle,
            price: data.price,
            rating: data.rate
        });
        let product_data = {
            id: docRef.id,
            title: data.title,
            sub_title: data.subtitle,
            price: data.price,
            rating: data.rate
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
