import jobs from '../api'
import {ThunkAction} from 'redux-thunk';
import {Dispatch} from 'redux';
import {RootState, RootActions} from '../store/store';
import {AxiosResponse} from 'axios';
import history from '../history';
import {Job, Jobs} from "../reducers/jobReducers";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export enum JobsActionTypes {
    FETCH_JOBS = 'FETCH_JOBS',
    FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS',
    FETCH_JOBS_FAIL = 'FETCH_JOBS_FAIL',

    FETCH_JOB = 'FETCH_JOB',
    FETCH_JOB_SUCCESS = 'FETCH_JOB_SUCCESS',
    FETCH_JOB_FAIL = 'FETCH_JOB_FAIL',

    ADD_JOB = 'ADD_JOB',
    ADD_JOB_SUCCESS = 'ADD_JOB_SUCCESS',
    ADD_JOB_FAIL = 'ADD_JOB_FAIL',

    // EDIT_JOB = 'EDIT_JOB',
    // EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS',
    // EDIT_JOB_FAIL = 'EDIT_JOB_FAIL',
    // DELETE_JOB = 'DELETE_JOB',
    // DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS',
    // DELETE_JOB_FAIL = 'DELETE_JOB_FAIL'
}

interface FetchJobs {
    type: JobsActionTypes.FETCH_JOBS;
}

interface FetchJobsSuccess {
    type: JobsActionTypes.FETCH_JOBS_SUCCESS;
    payload: Jobs;
}

interface FetchJobsFail {
    type: JobsActionTypes.FETCH_JOBS_FAIL;
}

export const fetchJobs = (): ThunkResult<void> => async dispatch => {
    handleFetchJobs(dispatch);
    try {
        const response: AxiosResponse<Jobs> = await jobs.get('/jobs');
        handleFetchJobsSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchJobsFail(dispatch);
    }
};

export const handleFetchJobs = (dispatch: Dispatch<FetchJobs>) => {
    dispatch({type: JobsActionTypes.FETCH_JOBS});
};

export const handleFetchJobsSuccess = (dispatch: Dispatch<FetchJobsSuccess>,
                                       response: Jobs
) => {
    dispatch({
        type: JobsActionTypes.FETCH_JOBS_SUCCESS,
        payload: response
    });
};

export const handleFetchJobsFail = (dispatch: Dispatch<FetchJobsFail>) => {
    dispatch({
        type: JobsActionTypes.FETCH_JOBS_FAIL
    });
};


// FETCH Job
interface FetchJob {
    type: JobsActionTypes.FETCH_JOB;
}

interface FetchJobSuccess {
    type: JobsActionTypes.FETCH_JOB_SUCCESS;
    payload: Job;
}

interface FetchJobFail {
    type: JobsActionTypes.FETCH_JOB_FAIL;
}

export const fetchJob = (uuid: string): ThunkResult<void> => async dispatch => {
    handleFetchJob(dispatch);
    try {
        const response: AxiosResponse<Job> = await jobs.get(`/jobs/${uuid}`);
        handleFetchJobSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchJobFail(dispatch);
    }
};

export const handleFetchJob = (dispatch: Dispatch<FetchJob>) => {
    dispatch({type: JobsActionTypes.FETCH_JOB});
};

const handleFetchJobSuccess = (
    dispatch: Dispatch<FetchJobSuccess>,
    response: Job
) => {
    dispatch({
        type: JobsActionTypes.FETCH_JOB_SUCCESS,
        payload: response
    });
};

const handleFetchJobFail = (dispatch: Dispatch<FetchJobFail>) => {
    dispatch({
        type: JobsActionTypes.FETCH_JOB_FAIL
    });
};

// ADD Job
interface AddJob {
    type: JobsActionTypes.ADD_JOB;
}

interface AddJobSuccess {
    type: JobsActionTypes.ADD_JOB_SUCCESS;
    payload: Job;
}

interface AddJobFail {
    type: JobsActionTypes.ADD_JOB_FAIL;
}

export const addJob = (job: Job): ThunkResult<void> => async dispatch => {
    handleAddJob(dispatch);
    try {
        const response: AxiosResponse<Job> = await jobs.post(`/jobs`, job);
        handleAddJobSuccess(dispatch, response.data);
    } catch (e) {
        handleAddJobFail(dispatch);
    }
};

const handleAddJob = (dispatch: Dispatch<AddJob>) => {
    dispatch({type: JobsActionTypes.ADD_JOB});
};

const handleAddJobSuccess = (
    dispatch: Dispatch<AddJobSuccess>,
    response: Job
) => {
    console.log("response: ");
    console.log(response);

    dispatch({type: JobsActionTypes.ADD_JOB_SUCCESS, payload: response});
    history.push('/all-jobs');
};

const handleAddJobFail = (dispatch: Dispatch<AddJobFail>) => {
    dispatch({type: JobsActionTypes.ADD_JOB_FAIL});
};


export type JobsAction =
    | FetchJobs
    | FetchJobsSuccess
    | FetchJobsFail
    | FetchJob
    | FetchJobSuccess
    | FetchJobFail
    | AddJob
    | AddJobSuccess
    | AddJobFail;