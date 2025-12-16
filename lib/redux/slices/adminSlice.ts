import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api-client"

interface DashboardStats {
  bookings: {
    total: number
    pending: number
    completed: number
    revenue: number
  }
  users: {
    total: number
    admins: number
  }
  content: {
    services: number
    plans: number
  }
}

interface Booking {
  id: string
  userName: string
  userEmail: string
  studioType: string
  bookingDate: string
  timeSlot: string
  duration: number
  totalPrice: number
  status: string
  createdAt: string
}

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

interface AdminState {
  stats: DashboardStats | null
  bookings: Booking[]
  messages: Message[]
  loading: boolean
  error: string | null
}

const initialState: AdminState = {
  stats: null,
  bookings: [],
  messages: [],
  loading: false,
  error: null,
}

export const fetchDashboardStats = createAsyncThunk("admin/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const data: any = await apiClient.get("/admin/dashboard")
    return data
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch dashboard stats")
  }
})

export const fetchAdminBookings = createAsyncThunk("admin/fetchBookings", async (_, { rejectWithValue }) => {
  try {
    const data: any = await apiClient.get("/admin/bookings")
    return data.bookings
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch bookings")
  }
})

export const fetchAdminMessages = createAsyncThunk("admin/fetchMessages", async (_, { rejectWithValue }) => {
  try {
    const data: any = await apiClient.get("/admin/messages")
    return data.messages
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch messages")
  }
})

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.stats = action.payload.stats
        state.bookings = action.payload.recentBookings
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Bookings
      .addCase(fetchAdminBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(fetchAdminBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Messages
      .addCase(fetchAdminMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAdminMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(fetchAdminMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = adminSlice.actions
export default adminSlice.reducer
