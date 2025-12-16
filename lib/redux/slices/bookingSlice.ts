import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api-client"

interface Booking {
  _id: string
  user: string
  service: string
  date: string
  startTime: string
  duration: number
  totalPrice: number
  notes?: string
  status: string
  createdAt: string
}

interface BookingState {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
}

export const createBooking = createAsyncThunk("booking/create", async (bookingData: any, { rejectWithValue }) => {
  try {
    const data: any = await apiClient.post("/bookings", bookingData)
    return data // Backend returns the booking object directly
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to create booking")
  }
})

export const fetchBookings = createAsyncThunk("booking/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data: any = await apiClient.get("/bookings")
    return data // Backend returns the array directly
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch bookings")
  }
})

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.loading = false
        state.currentBooking = action.payload
        state.bookings.push(action.payload)
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearCurrentBooking } = bookingSlice.actions
export default bookingSlice.reducer
