import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiClient } from "@/lib/api-client"

interface ContactState {
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
}

export const submitContactForm = createAsyncThunk(
  "contact/submit",
  async (formData: { name: string; email: string; phone: string; message: string }, { rejectWithValue }) => {
    try {
      const data = await apiClient.post("/contact", formData)
      return data
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to submit form")
    }
  },
)

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, clearSuccess } = contactSlice.actions
export default contactSlice.reducer
