import React, { useEffect, useState, AsyncStorage } from 'react'
import sc from '../../styledComponents'
import DatePicker from 'react-date-picker';
import moment from 'moment';
import ImageUploading from "react-images-uploading";
import Axios from 'axios'
import { toastMsg } from '../toastMsg';



const AddBirthday = () => {
    const [date, setDate] = useState(new Date())
    const [name, setName] = useState('')
    const [images, setImages] = React.useState([]);
    const [isUploading, setIsUploading] = useState(false)
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }
    const handleBirthdayUpload = async () => {
        if (isUploading) {
            toastMsg({ warning: true, msg: 'Your request is in progress. Please wait' })
        }
        // setIsUploading(true)
        let imageData = images.map(i => i.data_url)
        try {
            let body = { date, name,  images : imageData}
            const res = await Axios.post('/api/birthday/add', body)
            if (res.data.success) {
                toastMsg({ success: true, msg: 'Added succesfully' })
                setDate(new Date())
                setName('')
                setImages([])
                // dispatch(fetchAllHWDates())
                setIsUploading(false)
            }
            else {
                toastMsg({ error: true, msg: res.data?.msg || 'Failed, Please try again' })
                setIsUploading(false)
            }
        } catch (e) {
            toastMsg({ error: true, msg: 'Failed, Please try again, ERROR' })
            setIsUploading(false)
        }
    }
    const imageUploadUtil = () => {
        return <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <sc.button
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        Click to upload
                                    </sc.button>
                                    &nbsp;
                    {!!imageList.length && <sc.button onClick={onImageRemoveAll}>Remove all images</sc.button>}
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                                <sc.button onClick={() => onImageUpdate(index)}>Update</sc.button>
                                <sc.button onClick={() => onImageRemove(index)}>Remove</sc.button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    }
    return (
        <sc.div style={{ height: '100vh' }}>
            <sc.div className='container-fluid' style={{ paddingTop: '50px' }}>
                <sc.div className='row'>
                    <sc.div className='col-3 col-sm-3 col-md-2 col-lg-2'>
                        Name
                    </sc.div>
                    <sc.div className='col-9 col-sm-9 col-md-10 col-lg-10'>
                        <sc.input type="text" value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)}></sc.input>
                    </sc.div>
                    <sc.div className='col-3 col-sm-3 col-md-2 col-lg-2'>
                        Date
                    </sc.div>
                    <sc.div className='col-9 col-sm-9 col-md-10 col-lg-10'>
                        <DatePicker
                            value={date}
                            onChange={date => { setDate(date); console.log('in setdate', date) }}
                            format="MMMM d, yyyy"
                        />
                    </sc.div>
                    <sc.div className='col-3 col-sm-3 col-md-2 col-lg-2'>
                        Images
                    </sc.div>
                    <sc.div className='col-9 col-sm-9 col-md-10 col-lg-10'>
                        {imageUploadUtil()}
                    </sc.div>
                </sc.div>
                <sc.div className = 'col-12 col-sm-12 col-md-12 col-lg-12'>
                    <sc.button style = {{float : 'right'}} onClick = {() => {handleBirthdayUpload()}} >Upload</sc.button>
                </sc.div>
            </sc.div>
        </sc.div>
    )
}
export default AddBirthday