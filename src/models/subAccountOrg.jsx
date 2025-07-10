import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { subAccountService } from '../services/subAccountService';

// 异步action
export const fetchOrgList = createAsyncThunk(
  'subAccountOrg/fetchOrgList',
  async (params, { rejectWithValue }) => {
    try {
      const response = await subAccountService.getOrgList(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createOrg = createAsyncThunk(
  'subAccountOrg/createOrg',
  async (orgData, { rejectWithValue }) => {
    try {
      const response = await subAccountService.createOrg(orgData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrg = createAsyncThunk(
  'subAccountOrg/updateOrg',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await subAccountService.updateOrg(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrg = createAsyncThunk(
  'subAccountOrg/deleteOrg',
  async (id, { rejectWithValue }) => {
    try {
      await subAccountService.deleteOrg(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  orgList: [],
  loading: false,
  error: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  selectedOrg: null,
};

const subAccountOrgSlice = createSlice({
  name: 'subAccountOrg',
  initialState,
  reducers: {
    setSelectedOrg: (state, action) => {
      state.selectedOrg = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchOrgList
      .addCase(fetchOrgList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrgList.fulfilled, (state, action) => {
        state.loading = false;
        state.orgList = action.payload.content || action.payload;
        if (action.payload.totalElements !== undefined) {
          state.pagination.total = action.payload.totalElements;
        }
      })
      .addCase(fetchOrgList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // createOrg
      .addCase(createOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.orgList.unshift(action.payload);
      })
      .addCase(createOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // updateOrg
      .addCase(updateOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrg.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orgList.findIndex(org => org.id === action.payload.id);
        if (index !== -1) {
          state.orgList[index] = action.payload;
        }
      })
      .addCase(updateOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // deleteOrg
      .addCase(deleteOrg.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrg.fulfilled, (state, action) => {
        state.loading = false;
        state.orgList = state.orgList.filter(org => org.id !== action.payload);
      })
      .addCase(deleteOrg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedOrg,
  clearError,
  setPagination,
} = subAccountOrgSlice.actions;

export default subAccountOrgSlice.reducer; 