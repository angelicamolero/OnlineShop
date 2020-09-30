import React, {createContext, useState, useEffect} from 'react';
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
import { getFirestore } from '../firebase/index';

export const ProductContext = createContext();


////////////////////////////////////////////////////////////////
const ProductProvider = ({children}) => {
    const [dataJson, setDataJson] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searching, setSearch] = useState('');

    const search = e => {
        if(e.target.value === ''){
            setSearch('')
            return;
        }
        setSearch(e.target.value);
    }


    
    useEffect(() => {
        const setData = (d) => {
            setDataJson( d.docs.map(doc => ({...doc.data(), id: doc.id})));
        }
        const filteringSearch = () => {
            if(searching !== ''){
                const product = dataJson.filter(item => item.name.toLowerCase().includes(searching));
                setDataJson(product);
            }
        }
        const db = getFirestore();
        const itemCollection = db.collection('items');
        itemCollection.get().then((querySnapshot) => {
            setData(querySnapshot)
            filteringSearch()
        }).finally(() => {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        })
        // eslint-disable-next-line
    }, [searching]);

    return ( 
        <ProductContext.Provider
            value={{
                dataJson,
                loading,
                searching,
                setDataJson,
                setLoading,
                search
            }}
        >
            {children}
        </ProductContext.Provider>
     );
}
 
export default ProductProvider;