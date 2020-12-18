import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import sc from '../styledComponents'
import moment from 'moment'
import ModalImage from "react-modal-image";
import { AllDates } from './allDates';
import {theme} from '../styledComponents/theme'

const themeTemp = theme(localStorage.getItem('my-mode'))
export const ViewHW = () => {
    const [ready, setReady] = useState(false)
    const [error, setError] = useState(false)
    const [topicName, setTopicName] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [updateBy, setUpdateBy] = useState('')
    const [date, setDate] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {   // component did mount, call the service to show latest homework
        Axios.get('/api/homework/latest')
            .then(res => {
                let response = res.data
                if (response.success && response.data.length) {
                    let { name: topicName, images: imageUrl, youtubeLink: ytLink, updatedBy: uBy, description: memoryVerse, date: date1 } = response.data[0]
                    setTopicName(topicName)
                    setImages(imageUrl)
                    setYoutubeLink(ytLink)
                    setUpdateBy(uBy)
                    setDescription(memoryVerse)
                    setReady(true)
                    setError(false)
                    setDate(date1)
                    setIsLoading(false)
                }
                else if (response.success && !response.data.length) {
                    setError(true)
                    setReady(true)
                    setIsLoading(false)
                }
                else {
                    setError(true)
                    setIsLoading(false)
                }
            })
        return () => {
        }
    }, [])

    const fetchSpecificDate = async (arg) => {
        setIsLoading(true)
        try {
            let result = await Axios.get('/api/homework/specificHomeWork/' + arg.uniqueId)
            let response = result.data
            if (response.success && response.data.length) {
                let { name: topicName, images: imageUrl, youtubeLink: ytLink, updatedBy: uBy, description: memoryVerse, date: date1 } = response.data[0]
                setTopicName(topicName)
                setImages(imageUrl)
                setYoutubeLink(ytLink)
                setUpdateBy(uBy)
                setDescription(memoryVerse)
                setReady(true)
                setError(false)
                setDate(date1)
                setIsLoading(false)
            }
            else if (response.success && !response.data.length) {
                setError(true)
                setReady(true)
                setIsLoading(false)
            }
            else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            setError(true)
        }
    }

    let displayData = [
        { name: 'Topic', value: topicName, showName: topicName.length },
        { name: 'Memory Verse', value: description, showName: description.length },
        { name: 'Updated By', value: updateBy, showName: updateBy.length },
        { name: 'Date', value: moment(date).format('ddd DD-MMM-YYYY'), showName: true },
        { name: 'Youtube Link', value: youtubeLink, showName: youtubeLink.length, anchroTag: true },
        { name: 'Image', value: images, showName: images !== 'false', imageTag: true }
    ]
    return (
        <sc.div className='container-fluid'>
            <sc.div className='row'>
                <sc.header>LW & KGT</sc.header>
            </sc.div>
            <AllDates fetchSpecificDate={fetchSpecificDate} />
            {isLoading && <sc.div className='container'>
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width = "300" height = "300"
                    style = {{"marginLeft":"auto","marginRight":"auto","display":"block"}}
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
            {!error && ready && !isLoading &&
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
                    Failed fetching information, Please try again
                </sc.div>
            }
        </sc.div>
    )
}
