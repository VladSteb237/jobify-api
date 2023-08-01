import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    DELETE_JOB_ERROR,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
} from './actions';

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',
    jobLocation: '',
    showSidebar: false,
    // jobs initial state
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'interview', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    // search initial state
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    // get current user
    userLoading: true,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // axios global setup
    const authFetch = axios.create({
        baseURL: '/api/v1',
    });

    // axios response interceptor
    authFetch.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            console.log('AUTH ERROR');
            logoutUser();
        }
        return Promise.reject(error);
    });

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000)
    };

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);

            const { user, location } = data;
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, location, alertText } });
        } catch (error) {
            dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg } });
        }
        clearAlert();
    };

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser);
            // no token
            const { user, location } = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location },
            });
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                });
            }
        }
        clearAlert();
    };

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const logoutUser = async () => {
        await authFetch('/auth/logout')
        dispatch({ type: LOGOUT_USER });
    };

    const handleChange = (props) => {
        const { name, value } = props;
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } });

    };

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES });
    };

    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;

            await authFetch.post('/jobs', {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });
            dispatch({ type: CREATE_JOB_SUCCESS });
            // call function instead clearValues()
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    };
    const getJobs = async () => {
        const { page, search, searchStatus, searchType, sort, } = state;
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        }
        dispatch({ type: GET_JOBS_BEGIN });
        try {
            const { data } = await authFetch.get(url);
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, totalJobs, numOfPages },
            });
        } catch (error) {
            logoutUser();
        }
        clearAlert();
    };
    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } });
    };
    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN });
        try {
            await authFetch.delete(`/jobs/${jobId}`);
            getJobs();
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: DELETE_JOB_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    };
    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN });
        try {
            const { company, position, jobLocation, jobType, status } = state;

            await authFetch.patch(`/jobs/${state.editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });
            dispatch({ type: EDIT_JOB_SUCCESS });

            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg }
            });
        }
        clearAlert();
    };
    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN });
        try {
            const { data } = await authFetch('/jobs/stats');
            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data.defaultStats,
                    monthlyApplications: data.monthlyApplications,
                },
            });
        } catch (error) {
            logoutUser();
        }
        clearAlert();
    };
    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };
    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } });
    };
    const getCurrentUser = async () => {
        dispatch({ type: GET_CURRENT_USER_BEGIN });
        try {
            const { data } = await authFetch('/auth/getCurrentUser');
            const { user, location } = data;

            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                payload: { user, location }
            });
        } catch (error) {
            if (error.response.status === 401) return;
            logoutUser();
        }
    };
    useEffect(() => {
        // eslint-disable-next-line
        getCurrentUser();
    }, []);

    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            toggleSidebar,
            logoutUser,
            updateUser,
            handleChange,
            clearValues,
            createJob,
            getJobs,
            setEditJob,
            deleteJob,
            editJob,
            showStats,
            clearFilters,
            changePage,
            setupUser,
            getCurrentUser,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider };