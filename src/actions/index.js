import axios from 'axios'

export const updateTest = () => async dispatch => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    dispatch({
        type: 'UPDATE_TEST',
        payload: res.data
    })
}

export const updateState = (data) => dispatch => {
    dispatch({
        type: 'UPDATE_STATE',
        payload: data
    })
}

export const fetchLatestHW = () => async dispatch => {
    dispatch({
        type: 'IS_LOADING',
        payload: true
    })
    const res = await axios.get('/api/homework/latest')
    let result = res.data
    if (result.success && !result.data.length) {
        dispatch({
            type: 'ERROR',
            payload: { error: true, msg: 'No data found' }
        })
    }
    else if (result.success && result.data.length === 1) {
        dispatch({
            type: 'FETCH_LATEST_HW',
            payload: result.data[0]
        })
        dispatch({
            type: 'ERROR',
            payload: { error: false }
        })
    }
    else {
        dispatch({
            type: 'ERROR',
            payload: { error: true, msg: result.msg }
        })
    }
    dispatch({
        type: 'IS_LOADING',
        payload: false
    })
}

export const fetchSpecificDateHW = (arg) => async dispatch => {
    dispatch({
        type: 'IS_LOADING',
        payload: true
    })
    const res = await axios.get('/api/homework/specificHomeWork/' + arg.uniqueId)
    let result = res.data
    if (result.success && !result.data.length) {
        dispatch({
            type: 'ERROR',
            payload: { error: true, msg: 'No data found' }
        })
    }
    else if (result.success && result.data.length === 1) {
        dispatch({
            type: 'FETCH_SPECIFIC_DATE_HW',
            payload: result.data[0]
        })
        dispatch({
            type: 'ERROR',
            payload: { error: false }
        })
    }
    else {
        dispatch({
            type: 'ERROR',
            payload: { error: true, msg: result.msg }
        })
    }
    dispatch({
        type: 'IS_LOADING',
        payload: false
    })
}

export const fetchAllHWDates = () => async dispatch => {
    dispatch({
        type: 'IS_LOADING',
        payload: true
    })
    let response = await axios.get('/api/homework/allDates')
    if (response.data.success && response.data.data.length > 0) {
        dispatch({
            type: 'FETCH_ALL_DATES',
            payload: response.data.data
        })
        dispatch({
            type: 'ERROR',
            payload: { error: false }
        })
    }
    else if (response.data.success && response.data.data.length == 0) {
        dispatch({
            type: 'FETCH_ALL_DATES',
            payload: response.data.data
        })
        dispatch({
            type: 'ERROR',
            payload: { error: true, errorMsg: 'No data found' }
        })
    }
    else {
        dispatch({
            type: 'ERROR',
            payload: { error: true, msg: response.data.errorMsg }
        })
    }
    dispatch({
        type: 'IS_LOADING',
        payload: false
    })
}



export const data = () => {

}