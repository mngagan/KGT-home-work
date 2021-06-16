import React, { useEffect, useState, AsyncStorage } from 'react'
import sc from '../../styledComponents'
// import data from './data'
import { lastIndexOf } from 'lodash'
import bibieVerses from './bibleVerses'
import Axios from 'axios'
import _ from 'lodash'
import { withRouter } from 'react-router-dom';
import { theme } from '../../styledComponents/theme'
const themeTemp = theme(localStorage.getItem('my-mode'))

const timeoutTimes = {
    image: 2000,
    person: 5000
}
let data = []
const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
let personInterval, imageInterval, tempBirthdayData
const BirthdayIndex = (props) => {
    // const [data, setData] = useState([])
    // const [birthdayData, setBirthdayData] = useState([])
    const [birthdayData, setBirthdayData] = useState([])
    const [dataIndex, setDataIndex] = useState(0)
    const [imageCollage, setImageCollage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const getBdayTemp = () => {
        return tempBirthdayData
    }
    useEffect(() => {
        getTodaysData()
        imageInterval = setInterval(() => {
            // if (birthdayData && birthdayData.images) {
            //     let imagesLength = birthdayData.images.length
            if (getBdayTemp() && getBdayTemp().images) {
                let imagesLength = getBdayTemp().images.length
                setImageCollage(prevImageCollage => prevImageCollage + 1 <= imagesLength - 1 ? prevImageCollage + 1 : 0)
            }
        }, timeoutTimes.image)
        personInterval = setInterval(() => {
            setBirthdayData(prevData => {
                let result
                if (!data.length) {
                    result = []
                    tempBirthdayData = result
                    return result
                }
                if (data.length === 1) {
                    result = data[0]
                    tempBirthdayData = result
                    return result
                }
                result = data[!data[prevData.index + 1] ? 0 : prevData.index + 1]
                tempBirthdayData = result
                return result
            }
            )
            setImageCollage(0)
        }, timeoutTimes.person)
        return () => {
            clearInterval(imageInterval)
            clearInterval(personInterval)
        }
    }, [])
    const getTodaysData = async () => {
        try {
            const res = await Axios.get('/api/birthday/today')
            if (res.data.success) {
                let tempData = res.data.data
                tempData = tempData.map((d, i) => {
                    d.index = i;
                    d.verse = _.sample(bibieVerses)
                    return d
                })
                data = tempData
                setBirthdayData(tempData[0])
                setIsLoading(false)
                setError('')
            }
            else {
                setIsLoading(false)
                setError('Failed loading data, try again')
            }
        } catch (e) {
            setIsLoading(false)
            setError('Failed loading data, try again')
        }
    }
    const changePerson = ({ next, prev }) => {
        let newIndex = dataIndex
        if (next) {
            if (newIndex < data.length - 1) {
                newIndex += 1
            }
            else {
                newIndex = 0
            }
        }
        else if (prev) {
            if (newIndex == 0) {
                newIndex = data.length - 1
            }
            else {
                newIndex -= 1
            }
        }
        setBirthdayData(data[newIndex])
        setDataIndex(newIndex)
        setImageCollage(0)
        clearInterval(personInterval)
    }
    const imageUtil = ({ images }) => {
        if (!!images) {
            let imageCount = images.length
            // imageCollageInterval =  setInterval(() => {}, 1000)
            return (
                images[imageCollage] && <img src={images[imageCollage]} width={'100%'} height={'600px'} />
            )
        }
    }
    const getBibleVerse = () => {
        if (birthdayData && birthdayData.verse) {
            let { verse, reference } = birthdayData.verse
            return (
                <sc.div id="bibleVerseContainer" className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <sc.div id="bibleVerse">
                        {verse}
                    </sc.div>
                    <sc.div id="bibleReference">
                        {reference}
                    </sc.div>
                </sc.div>
            )
        }
    }
    const generateBirthdayWish = () => {
        if (birthdayData) {

            let { name } = birthdayData
            return (
                <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12 nopad' id="wishContainer">
                    <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12 nopad' id="wishHead">Happy Birthday</sc.div>
                    <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12 nopad' id="wishName">{toTitleCase(name)}</sc.div>
                </sc.div>
            )
        }
    }
    const imagesCount = () => {
        return birthdayData && birthdayData.images && birthdayData.images.length ? birthdayData.images.length : 0
    }
    return (
        <sc.div style={{ height: '100vh' }}>
            {!!isLoading && <sc.div className='container'>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="300" height="300"
                    style={{ "marginLeft": "auto", "marginRight": "auto", "display": "block" }}
                >
                    <path
                        fill={themeTemp.text}
                        stroke={themeTemp.text}
                        d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"
                    >
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            dur="1s"
                            from="0 50 50"
                            to="360 50 50"
                            repeatCount="indefinite"
                        />
                    </path>
                </svg>
            </sc.div>}
            {!!!isLoading && !!!error.length && <sc.div className='container-fluid' style={{ paddingTop: '50px' }}>
                <sc.div className="row" >
                    {!!imagesCount() && <sc.div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <sc.div>
                            <sc.div style={{ maxHeight: '50%' }}>
                                {imageUtil({ images: birthdayData?.images ? birthdayData.images : [] })}
                            </sc.div>

                        </sc.div>
                    </sc.div>}
                    <sc.div className={!!!imagesCount() ? 'col-12 col-sm-12 col-md-12 col-lg-12' : 'col-12 col-sm-6 col-md-6 col-lg-6'}>
                        <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                            {generateBirthdayWish()}
                        </sc.div>
                        <sc.div>
                            {getBibleVerse()}
                        </sc.div>
                    </sc.div>
                    <sc.div className="col-12 col-sm-12 col-md-12 col-lg-12" style={{ textAlign: 'center' }}>
                        <sc.button style={{ float: 'left' }} onClick={() => changePerson({ prev: true })}>Prev</sc.button>
                        <sc.button style={{ float: 'right' }} onClick={() => changePerson({ next: true })}>Next</sc.button>
                        <sc.button style={{}} onClick={() => props.history.push('/birthday/add')}>
                            Add yours!!
                        </sc.button>
                    </sc.div>
                </sc.div>
            </sc.div>}
            {!!error.length && <sc.div className='container' id="errorContainer">
                <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12 nopad' id="error" style={{ color: 'tomato' }}>{error}</sc.div>
            </sc.div>}
        </sc.div>
    )
}
export default withRouter(BirthdayIndex)