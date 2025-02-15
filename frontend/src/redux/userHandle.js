import axios from 'axios';
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    stuffAdded,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    productSuccess,
    productDetailsSuccess,
    getProductDetailsFailed,
    getProductsFailed,
    setFilteredProducts,
    getSearchFailed,
    sellerProductSuccess,
    getSellerProductsFailed,
    stuffUpdated,
    updateFailed,
    getCustomersListFailed,
    customersListSuccess,
    getSpecificProductsFailed,
    specificProductSuccess,
    updateCurrentUser,
} from './userSlice';

const BASE_URL = 'http://localhost:5000'; // Define your base URL here

const handleAxiosError = (error, dispatch, errorAction) => {
    if (error.response) {
        // Server responded with a status other than 200 range
        dispatch(errorAction(error.response.data.message || 'An error occurred'));
    } else if (error.request) {
        // Request was made but no response received
        dispatch(errorAction('No response received from server'));
    } else {
        // Something else happened while setting up the request
        dispatch(errorAction(error.message));
    }
};

export const authUser = (fields, role, mode) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${BASE_URL}/${role}${mode}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, authError);
    }
};

export const addStuff = (address, fields) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${BASE_URL}/${address}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded());
        }
    } catch (error) {
        handleAxiosError(error, dispatch, authError);
    }
};

export const updateStuff = (fields, id, address) => async (dispatch) => {
    try {
        const result = await axios.put(`${BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(updateFailed(result.data.message));
        } else {
            dispatch(stuffUpdated());
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const deleteStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const updateCustomer = (fields, id) => async (dispatch) => {
    dispatch(updateCurrentUser(fields));

    const newFields = { ...fields };
    delete newFields.token;

    try {
        await axios.put(`${BASE_URL}/CustomerUpdate/${id}`, newFields, {
            headers: { 'Content-Type': 'application/json' },
        });

        dispatch(stuffUpdated());
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const getProductsbySeller = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/getSellerProducts/${id}`);
        if (result.data.message) {
            dispatch(getSellerProductsFailed(result.data.message));
        } else {
            dispatch(sellerProductSuccess(result.data));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const getProducts = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/getProducts`);
        if (result.data.message) {
            dispatch(getProductsFailed(result.data.message));
        } else {
            dispatch(productSuccess(result.data));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/getProductDetail/${id}`);
        if (result.data.message) {
            dispatch(getProductDetailsFailed(result.data.message));
        } else {
            dispatch(productDetailsSuccess(result.data));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const getCustomers = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getCustomersListFailed(result.data.message));
        } else {
            dispatch(customersListSuccess(result.data));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const getSpecificProducts = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getSpecificProductsFailed(result.data.message));
        } else {
            dispatch(specificProductSuccess(result.data));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};

export const getSearchedProducts = (address, key) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/${address}/${key}`);
        if (result.data.message) {
            dispatch(getSearchFailed(result.data.message));
        } else {
            dispatch(setFilteredProducts(result.data));
        }
    } catch (error) {
        handleAxiosError(error, dispatch, getError);
    }
};