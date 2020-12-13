// import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = {
    data : 1
}

export default function (state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case 'UPDATE_TEST':
            console.log('in hw reducer.js')
            return {...state, payload}
        default:
            return state
    }
}