import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import sc from '../styledComponents'
import moment from 'moment'
import ModalImage from "react-modal-image";
import { AllDates } from './allDates';
import { theme } from '../styledComponents/theme'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLatestHW, fetchSpecificDateHW, updateState } from '../actions'
import store from '../store';
import { connect } from 'react-redux';

const themeTemp = theme(localStorage.getItem('my-mode'))
const ViewHW = () => {
    const dispatch = useDispatch()
    const ready = useSelector((state) => state.hw.ready)
    const error = useSelector((state) => state.hw.error)
    const errorMsg = useSelector((state) => state.hw.errorMsg)
    const isLoading = useSelector((state) => state.hw.isLoading)
    const name = useSelector((state) => state.hw.name)
    const description = useSelector((state) => state.hw.description)
    const images = useSelector((state) => state.hw.images)
    const updatedBy = useSelector((state) => state.hw.updatedBy)
    const date = useSelector((state) => state.hw.date)
    const youtubeLink = useSelector((state) => state.hw.youtubeLink)
    const uniqueId = useSelector((state) => state.hw.uniqueId)
    const dayNo = useSelector((state) => state.hw.dayNo)
    const prayerTopic = useSelector((state) => state.hw.prayerTopic)

    useEffect(() => {   // component did mount, call the service to show latest homework
        !uniqueId.length && dispatch(fetchLatestHW())
    }, [])


    const fetchSpecificDate = async (arg) => {
        dispatch(fetchSpecificDateHW(arg))
    }

    let displayData = [
        { name: 'Topic', value: name, showName: name.length },
        { name: 'Memory Verse', value: description, showName: description?.length },
        { name: 'Updated By', value: updatedBy, showName: updatedBy?.length },
        { name: 'Day No', value: dayNo, showName: dayNo?.length },
        { name: 'Prayer Topic', value: prayerTopic, showName: prayerTopic?.length },
        { name: 'Date', value: date !== '' ? moment(date).format('ddd DD-MMM-YYYY') : '', showName: true },
        { name: 'Youtube Link', value: youtubeLink, showName: youtubeLink?.length, anchroTag: true },
        { name: 'Activity', value: images, showName: images !== 'false', imageTag: true }
    ]
    let isReady = uniqueId.length ? true : false
    return (
        <sc.div className='container-fluid'>
            <sc.div className='row'>
                <sc.header>LW & KGT</sc.header>
            </sc.div>
            <AllDates fetchSpecificDate={fetchSpecificDate} />
            {isLoading && <sc.div className='container'>
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
            {!error && !isLoading && isReady &&
                <sc.div className='container-fluid'>
                    {displayData.map((data, index) => {
                        if (data.showName) {
                            return (
                                <sc.div className='row' id='bottomPadding' key={index} >
                                    {/* <sc.div > */}
                                    <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' key={index + data.name} >
                                        {data.name}
                                    </sc.div>
                                    <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel' key={index + 'qwe'} >
                                        : {!data.anchroTag && !data.imageTag && data.value}
                                        {data.anchroTag && <a href={data.value} target="blank">open youtube</a>}
                                        {data.imageTag && data.value !== 'false' && <ModalImage
                                            small={data.value}
                                            large={data.value}
                                            alt="Activity"
                                            showRotate={true}
                                            height={'500px'}
                                            width={'500px'}
                                            key={index}
                                        />}
                                    </sc.div>
                                    {/* </sc.div> */}
                                    <hr></hr>
                                </sc.div>
                            )
                        }
                        return (
                            <React.Fragment />
                        )
                    })}
                </sc.div>
            }
            {error &&
                <sc.div className='row'>
                    {errorMsg}
                </sc.div>
            }
        </sc.div>
    )
}
export default ViewHW