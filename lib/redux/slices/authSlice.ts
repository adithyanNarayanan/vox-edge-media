import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api-client"

interface User {
  id: string
  name?: string
  displayName?: string
  email: string
  phone?: string
  phoneNumber?: string
  isAdmin: boolean
  photoURL?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, phoneNumber }: { email?: string; password?: string, phoneNumber?: string }, { rejectWithValue }) => {
    try {
      const response: any = await apiClient.post("/auth/login", { email, password, phoneNumber })

      if (response.token) {
        localStorage.setItem("auth_token", response.token)
      }

      return response.user
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to login")
    }
  },
)

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    userData: { displayName: string; email: string; phone?: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // Backend expects: email, password, displayName, phoneNumber
      const payload = {
        ...userData,
        phoneNumber: userData.phone
      }

      const response: any = await apiClient.post("/auth/register", payload)

      if (response.token) {
        localStorage.setItem("auth_token", response.token)
      }

      return response.user
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create account")
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await apiClient.post("/auth/logout", {})
    localStorage.removeItem("auth_token")
    return null
  } catch (error: any) {
    localStorage.removeItem("auth_token") // Force logout on client even if server fails
    return rejectWithValue(error.message || "Network error")
  }
})

export const verifyAuth = createAsyncThunk("auth/verify", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("auth_token")
    if (!token) return rejectWithValue("No token found")

    const response: any = await apiClient.get("/auth/me")
    return response.user
  } catch (error: any) {
    localStorage.removeItem("auth_token")
    return rejectWithValue(error.message || "Not authenticated")
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      // Verify
      .addCase(verifyAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isAuthenticated = false
        state.user = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
