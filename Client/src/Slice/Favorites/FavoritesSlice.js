import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../App";

export const getFavorites = createAsyncThunk(
  'favorites/getFavorites',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API('/favorites')
      return response.data
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

export const switchFavorites = createAsyncThunk(
  'favorites/switchFavorites',
  async (id, { getState, rejectWithValue }) => { 
    try {
      const {favorites:{favorites}} = getState()
      console.log(favorites, id)
      if(favorites.some(f => f === id)) {
        const response = await API.delete('/favorites', {id: id})
        console.log('delete: ', response.data)
        return response.data
      } else {
        const response = await API.post('/favorites', {id: id})
        console.log('post: ', response.data)
        return response.data
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
})

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getFavorites.pending]: (state) => {
      state.loading = true
    },
    [getFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [switchFavorites.pending]: (state) => {
      state.loading = true
    },
    [switchFavorites.fulfilled]: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    [switchFavorites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default favoritesSlice.reducer