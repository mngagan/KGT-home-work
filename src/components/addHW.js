import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTest } from "../actions/index";
import sc from '../styledComponents';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { indexOf } from 'lodash';
import { theme } from '../styledComponents/theme'

const themeTemp = theme(localStorage.getItem('my-mode'))

const toastMsg = ({ msg, success, error, warning }) => {
    let config = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    if (success) {
        toast.success(msg, config);
    }
    if (error) {
        toast.error(msg, config)
    }
    if(warning){
        toast.warn(msg, config)
    }
}


const AddHW = (props) => {
    const [imageData, setImageData] = useState(false)
    const [memoryVerse, setMemoryVerse] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [topicName, setTopicName] = useState('')
    const [updatedBy, setUpdatedBy] = useState('')
    const [date, setDate] = useState(new Date());
    const [isUploading, setIsUploading] = useState(false)

    const handleImageUpload = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let size = parseFloat(e.target.files[0].size / 1024).toFixed(2)
        // if (size > 1001) {
        //     toastMsg({ error: true, msg: 'Image file size exceeded, please upload image with size less than 1mb' })
        //     e.target.value = ''
        //     return
        // }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // document.getElementById('myimg').src = reader.result
            setImageData(reader.result)
        };
    }
    const uploadHomeWork = async () => {
        if(isUploading){
            toastMsg({warning : true, msg : 'Your request is in progress. Please wait'})
        }
        // Axios.post('/api/homework/addHomeWork')
        setIsUploading(true)
        try {
            if (!(topicName.length && imageData.length && updatedBy.length && memoryVerse.length)) {
                toastMsg({ error: true, msg: 'Please fill all mandatory fields' })
                return
            }
            let body = { name: topicName, date, images: imageData, youtubeLink, updatedBy, description: memoryVerse }
            const res = await Axios.post('/api/homework/addHomeWork', body)
            if (res.status === 200) {
                toastMsg({ success: true, msg: 'Added succesfully' })
                setIsUploading(false)
            }
            else {
                toastMsg({ error: true, msg: 'Failed, Please try again' })
                setIsUploading(false)
            }
            // Axios.post('/api/homework/addHomeWork', body)
            // .error(e=>{
            // })
        } catch (e) {
            toastMsg({ error: true, msg: 'Failed, Please try again, ERROR' })
            setIsUploading(false)
        }

    }
    let displayData = [
        { name: 'Topic*', type: 'input', inputType: 'text', value: topicName, id: 'topicName', onChange: (e) => { setTopicName(e.target.value) } },
        { name: 'Image*', type: 'input', inputType: 'file', showValueAttr: false, id: 'img', onChange: e => { handleImageUpload(e) } },
        { name: 'Memory Verse*', type: 'input', inputType: 'text', value: memoryVerse, id: 'memoryVerse', onChange: (e) => { setMemoryVerse(e.target.value) } },
        { name: 'Youtube link', type: 'input', inputType: 'text', value: youtubeLink, id: 'youtubeLink', onChange: (e) => { setYoutubeLink(e.target.value) } },
        { name: 'Updated by*', type: 'input', inputType: 'text', value: updatedBy, id: 'updatedBy', onChange: (e) => { setUpdatedBy(e.target.value) } },
        { name: 'Date*', type: 'datePicker', value: date, id: 'date', onChange: date => { setDate(date) }, dateFormat: 'MMMM d, yyyy' },
    ]
    // if (document.querySelector('.react-datepicker-wrapper input')) {
    //     document.querySelector('.react-datepicker-wrapper input').style.color = themeTemp.text
    //     document.querySelector('.react-datepicker-wrapper input').style.backgroundColor = themeTemp.primary
    // }
    return (
        <sc.div className='container'>
            <sc.div className='row'>
                <sc.header>LW & KGT</sc.header>
            </sc.div>
            <sc.div className='row'>
                <sc.header>Add Homework</sc.header>
            </sc.div>
            <sc.div className='row'>
                <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                    Topic*
                </sc.div>
                <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                    <sc.input type="text" id="topicName" value={topicName} onChange={displayData[0].onChange} />
                </sc.div>
            </sc.div>
            <sc.div className='row'>
                <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                    Image*
                </sc.div>
                <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                    <sc.input type="file" id="img" name="img" accept="image/*" onChange={e => { handleImageUpload(e) }} />
                </sc.div>
            </sc.div>
            <sc.div className='row'>
                <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                    Memory verse*
                </sc.div>
                <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                    <sc.input type="text" id="memoryVerse" value={memoryVerse} onChange={(e) => { setMemoryVerse(e.target.value) }} />
                </sc.div>
            </sc.div>
            <sc.div className='row'>
                <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                    Youtube link
                </sc.div>
                <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                    <sc.input type="text" id="youtubeLink" value={youtubeLink} onChange={(e) => { setYoutubeLink(e.target.value) }} />
                </sc.div>
            </sc.div>
            <sc.div className='row'>
                <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                    Updated by*
                </sc.div>
                <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                    <sc.input type="text" id="updated by" value={updatedBy} onChange={(e) => { setUpdatedBy(e.target.value) }} />
                </sc.div>
            </sc.div>
            <sc.div className='row'>
                <sc.div className='col-4 col-md-3 col-sm-4 col-lg-3' >
                    Date
                </sc.div>
                <sc.div className='col-8 col-md-9 col-sm-8 col-lg-9' id='keyLabel'>
                    <DatePicker
                        selected={date}
                        onChange={date => { setDate(date) }}
                        dateFormat="MMMM d, yyyy"
                    />
                </sc.div>
            </sc.div>
            <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12' style = {{textAlign : 'end'}}>
                <sc.button  onClick={() => uploadHomeWork()}> Upload</sc.button>
            </sc.div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </sc.div>
    )
}

const mapStateToProps = state => ({
    hw: state.hw
})
export default connect(mapStateToProps, { updateTest })(AddHW)
