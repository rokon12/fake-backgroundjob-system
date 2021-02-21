import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk, {ThunkMiddleware} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {jobReducer, JobsState} from "../reducers/jobReducers";
import {JobsAction} from '../actions/jobActions';

export interface RootState {
    readonly jobs: JobsState;
}

const rootReducer = combineReducers<RootState>({jobs: jobReducer});

export type RootActions = JobsAction;
export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
    )
);
