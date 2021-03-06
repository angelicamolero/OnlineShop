import React, {createContext, useState, useEffect} from 'react';
////////////////////////////////////////////////////////////////
import { getFirestore } from '../firebase/index';
////////////////////////////////////////////////////////////////

export const ProductContext = createContext();

////////////////////////////////////////////////////////////////
const ProductProvider = ({children}) => {
    const [dataJson, setDataJson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        setLoading(true)
        setDataJson([])
        const db = getFirestore();
        const itemCollection = db.collection('items');
        const itemPerCategory = itemCollection.where('category', '==', categoryName)
        itemPerCategory.get().then((querySnapshot) => {
            const items = (querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
            setDataJson(items)          
        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        })
    }, [categoryName]);
    
    return ( 
        <ProductContext.Provider
            value={{
                dataJson,
                loading,
                setDataJson,
                setLoading,
                setCategoryName
            }}
        >
            {children}
        </ProductContext.Provider>
     );
}
 
export default ProductProvider;