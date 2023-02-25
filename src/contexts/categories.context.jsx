import { useEffect } from "react";
import { createContext, useState } from "react";
import { GetCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
    categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await GetCategoriesAndDocuments();
            setCategoriesMap(categoriesMap)
        }

        getCategoriesMap();
    }, [])
    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}