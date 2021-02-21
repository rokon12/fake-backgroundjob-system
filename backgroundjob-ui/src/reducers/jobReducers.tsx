import _ from 'lodash';
import {Reducer} from 'redux';
import {JobsAction, JobsActionTypes} from "../actions/jobActions";

export interface Job {
    jobName: string;
    payload: string,
    callbackUrl: string
    uuid: string
    status?: string
}

export interface Jobs {
    [uuid: string]: Job;
}

export interface JobsState {
    items: Jobs;
    loading: boolean;
    error: string | null
}

const initialState = {
    items: {},
    loading: false,
    error: null
};


export const jobReducer: Reducer<JobsState, JobsAction> = (
    state = initialState, action
) => {
    switch (action.type) {
        case JobsActionTypes.FETCH_JOBS:
        case JobsActionTypes.FETCH_JOB:
        case JobsActionTypes.ADD_JOB:
            return {
                ...state, loading: true
            };
        case JobsActionTypes.FETCH_JOB_FAIL:
        case JobsActionTypes.FETCH_JOBS_FAIL:
        case JobsActionTypes.ADD_JOB_FAIL:
            return {...state, loading: false};

        case JobsActionTypes.FETCH_JOB_SUCCESS:
        case JobsActionTypes.ADD_JOB_SUCCESS:
            const {uuid} = action.payload;
            return {
                ...state,
                items: {...state.items, [uuid]: action.payload},
                loading: false
            };
        case JobsActionTypes.FETCH_JOBS_SUCCESS:
            return {
                ...state,
                items: {...state.items, ..._.mapKeys(action.payload, 'uuid')},
                loading: false
            }
        default:
            return state;
    }
}
