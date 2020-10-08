import React, {createContext, useState, useEffect} from 'react';
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
import { getFirestore } from '../firebase/index';

export const ProductContext = createContext();

////////////////////////////////////////////////////////////////
const ProductProvider = ({children}) => {
    const [dataJson, setDataJson] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const itemCollection = db.collection('items');
        itemCollection.get().then((querySnapshot) => {
           const items = (querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            setDataJson(items)           
        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        })
        // eslint-disable-next-line
    }, []);
    
    return ( 
        <ProductContext.Provider
            value={{
                dataJson,
                loading,
                setDataJson,
                setLoading,
            }}
        >
            {children}
        </ProductContext.Provider>
     );
}
 
export default ProductProvider;