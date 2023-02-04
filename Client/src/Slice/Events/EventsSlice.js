import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const eventUrl = 'http://api.eventoo.online/home/events'

export const axiosModeEvents = createAsyncThunk(
  'events/axiosModeEvents',
  async () => {
    const res = await axios.get(eventUrl)
    return res.data
  }
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [axiosModeEvents.pending]: (state) => {
      state.loading = true
    },
    [axiosModeEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;

    },
    [axiosModeEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
}
)
export default eventsSlice.reducer