import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";
import getConfig from "../../utils/getConfig";

export const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: [],
  reducers: {
    setSideBar: (state, action) => {
      return action.payload;
    },
    deleteProduct: (state, action)=>{
      const id = action.payload
      const filteredProducts = state.filter(product => product.id !== id)
      return filteredProducts
    },
  }
});

export const getSideBarThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
    .then((res) => dispatch(setSideBar(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addProductToCart = (adding) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', 
    adding,
    getConfig())
        .then(() => dispatch(getSideBarThunk()))
        .catch(error => console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
}

export const purchaseThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', {}, getConfig())
        .then(() => dispatch(setSideBar([])))
        .finally(() => dispatch(setIsLoading(false)));
}

export const deleteCartProductThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
   axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
      .then(() => {dispatch(deleteProduct(id))})
      .finally(() => dispatch(setIsLoading(false)));
}

export const { setSideBar, deleteProduct } = sideBarSlice.actions;

export default sideBarSlice.reducer;
