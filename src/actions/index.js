import axios from 'axios'

export const updateTest = () => async dispatch => {
    // dispatch({
    //     type: 'UPDATE_TEST',
    //     payload: Date.now()
    // })

    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    dispatch({
        type: 'UPDATE_TEST',
        payload: res.data
    })
}