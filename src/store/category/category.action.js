import { createAction } from "../../utils/reducer/reducer.utils"
import { CATEGORIES_ACTION_TYPE } from "./category.types"
import { GetCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories)

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START)
export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categoriesArray)
export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error)


export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart())
    try {
        const categoriesArray = await GetCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }

}