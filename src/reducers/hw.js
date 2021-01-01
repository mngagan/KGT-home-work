// import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = () => ({
    name: '',
    timeStatmp: '',
    date: '',
    ready: false,
    error: false,
    errorMsg: '',
    description: '',
    images: '',
    updatedBy: '',
    date: '',
    youtubeLink: '',
    isLoading: false,
    allDates: [],
    uniqueId: '',
    prayerTopic : '',
    dayNo : '',
})

export default function (state = initialState(), action) {
    let { type, payload } = action
    switch (type) {
        case 'UPDATE_TEST':
            return { ...state, payload }
        case 'UPDATE_STATE':
            return { ...state }
        case 'FETCH_LATEST_HW':
        case 'FETCH_SPECIFIC_DATE_HW':
            let { description = '', images = '', name = '', title = '', updatedBy = '', youtubeLink = '', date, uniqueId, dayNo = '', prayerTopic = '' } = payload
            return { ...state, description, images, name, title, updatedBy, youtubeLink, date, uniqueId, dayNo, prayerTopic }
        case 'IS_LOADING':
            return { ...state, isLoading: payload }
        case 'FETCH_ALL_DATES':
            return { ...state, allDates: payload }
        case "ERROR":
            if (!payload.error) {
                return { ...state, error: false, errorMsg: "" }
            }
            return { ...state, error: true, errorMsg: payload.msg }
        default:
            return state
    }
}