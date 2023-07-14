import { IWorker } from '../../types/IWorker';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WorkerService from '../../API/WorkerService';
import {isFulfilled, isError, isPending} from '../../utils/matcherFunctions';

export const fetchWorkers = createAsyncThunk<IWorker[], {
  paramPage: number,
  paramLimit: number,
  paramSearchName: string,
  paramSearchOccupation: string,
  paramSearchDepartment: string,
}>(
  'user/fetchMe',
  async ({paramPage = 0, paramLimit = 0, paramSearchName = '',
           paramSearchOccupation = '',
           paramSearchDepartment = '',}, { rejectWithValue }) => {
    try {
      const response = await WorkerService.getWorker(paramPage,
        paramLimit,
        paramSearchName,
        paramSearchOccupation,
        paramSearchDepartment)
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface workersState {
  workers: IWorker | null;
  status: Status;
}

const initialState: workersState = {
  workers: null,
  status: Status.LOADING,
}

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = Status.LOADING;
        state.workers = null;
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.workers = {
          id: action.payload.id,
          name: action.payload.name,
          occupation: action.payload.occupation,
          dateOccupation: action.payload?.dateOccupation,
          department: action.payload.department,
          other_info: action.payload.other_info,
        };
        state.status = Status.SUCCESS;
      })
      .addMatcher(isError, (state) => {
        state.status = Status.ERROR;
        state.workers = null;
      });
  },
})

export default workersSlice.reducer;