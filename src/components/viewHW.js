import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import sc from '../styledComponents'
import moment from 'moment'
import ModalImage from "react-modal-image";

// [
//     {
//       "timeStatmp": "2020-12-11T14:31:57.190Z",
//       "_id": "5fd3831705f1be00207985e2",
//       "name": "new",
//       "updatedBy": "new",
//       "images": "false",
//       "youtubeLink": "new",
//       "date": "2020-12-11T14:32:30.834Z",
//       "__v": 0
//     }
//   ]
export const ViewHW = () => {
    const [ready, setReady] = useState(false)
    const [error, setError] = useState(false)
    const [topicName, setTopicName] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [updateBy, setUpdateBy] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {   // component did mount, call the service to show latest homework
        console.log('in load for the first time')
        Axios.get('/api/homework/latest')
            .then(res => {
                console.log('in fetch latest', res)
                let response = res.data
                if (response.success) {
                    let { name: topicName, images: imageUrl, youtubeLink: ytLink, updatedBy: uBy, description: memoryVerse, date: date1 } = response.data[0]
                    console.log('in latest homework', response.data[0], topicName)
                    setTopicName(topicName)
                    setImages(imageUrl)
                    setYoutubeLink(ytLink)
                    setUpdateBy(uBy)
                    setDescription(memoryVerse)
                    setReady(true)
                    setError(false)
                    setDate(date1)
                }
                else {
                    setError(true)
                }
            })
        return () => {
        }
    }, [])
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
            {!ready && <sc.div className='container'>Loading</sc.div>}
            {!error && ready &&
                <sc.div className='container-fluid'>
                    {displayData.map((data, index) => {
                        if (data.showName) {
                            return (
                                <sc.div className='row' id='bottomPadding' key={index} >
                                    {/* <sc.div > */}
                                    <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                                        {data.name}
                                    </sc.div>
                                    <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                                        : {!data.anchroTag && !data.imageTag && data.value}
                                        {data.anchroTag && data.value.length === '' && <a href={data.value} target="blank">open youtube</a>}
                                        {data.imageTag && data.value !== 'false' && <ModalImage
                                            small={data.value}
                                            large={data.value}
                                            alt="Activity"
                                            showRotate={true}
                                            height={'500px'}
                                            width={'500px'}
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
                    {/* <sc.div className='row'>
                        <sc.div className='col-xs-3 col-md-3 col-sm-3'>
                            topic
                        </sc.div>
                        <sc.div className='col-xs-9 col-md-9 col-sm-9'></sc.div>
                         : {topicName}
                    </sc.div>
                    <sc.div className='row'>
                        <sc.div className='col-xs-3 col-md-3 col-sm-3'></sc.div>
                        <sc.div className='col-xs-9 col-md-9 col-sm-9'></sc.div>
                        Memory verse : {description}
                    </sc.div>
                    <sc.div className='row'>
                        <sc.div className='col-xs-3 col-md-3 col-sm-3'></sc.div>
                        <sc.div className='col-xs-9 col-md-9 col-sm-9'></sc.div>
                        updated by : {updateBy}
                    </sc.div>
                    <sc.div className='row'>
                        <sc.div className='col-xs-3 col-md-3 col-sm-3'></sc.div>
                        <sc.div className='col-xs-9 col-md-9 col-sm-9'></sc.div>
                        youtube link : <a href={youtubeLink} target="blank">open youtube</a>
                    </sc.div>
                    <sc.div className='row'>
                        <sc.div className='col-xs-3 col-md-3 col-sm-3'></sc.div>
                        <sc.div className='col-xs-9 col-md-9 col-sm-9'></sc.div>
                        image : <img height='100px' width='100px' src={images} />
                    </sc.div> */}
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
