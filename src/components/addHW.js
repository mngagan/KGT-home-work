import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTest } from "../actions/index";
import sc from '../styledComponents';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const toastMsg = ({ msg, success, error }) => {
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
}


const AddHW = (props) => {
    const [imageData, setImageData] = useState(false)
    const [memoryVerse, setMemoryVerse] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [topicName, setTopicName] = useState('')
    const [updatedBy, setUpdatedBy] = useState('')
    const [date, setDate] = useState(new Date());

    const handleImageUpload = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // document.getElementById('myimg').src = reader.result
            setImageData(reader.result)
        };
    }
    const uploadHomeWork = async () => {
        // Axios.post('/api/homework/addHomeWork')
        if (!(topicName.length && imageData.length && updatedBy.length && memoryVerse.length)) {
            toastMsg({error : true, msg : 'Please fill all mandatory fields'})
            return
        }
        let body = { name: topicName, date, images: imageData, youtubeLink, updatedBy, description: memoryVerse }
        const res = await Axios.post('/api/homework/addHomeWork', body)
        if (res.status === 200) {
            toastMsg({ success: true, msg: 'Added succesfully' })
        }
        else {
            toastMsg({ error: true, msg: 'Failed, Please try again' })
        }
    }
    return (
        <sc.div className='container'>
            <sc.div className='row'>
                <sc.header>LW & KGT</sc.header>
            </sc.div>
            <sc.div className='row'>
                <sc.header>Add Homework</sc.header>
            </sc.div>
            <sc.div className='row'>
                Topic*
                <sc.input type="text" id="topicName" value={topicName} onChange={(e) => { setTopicName(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Image*
                <sc.input type="file" id="img" name="img" accept="image/*" onChange={handleImageUpload} />
            </sc.div>
            <sc.div className='row'>
                Memory verse*
                <sc.input type="text" id="memoryVerse" value={memoryVerse} onChange={(e) => { setMemoryVerse(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Youtube link
                <sc.input type="text" id="youtubeLink" value={youtubeLink} onChange={(e) => { setYoutubeLink(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Updated by*
                <sc.input type="text" id="updated by" value={updatedBy} onChange={(e) => { setUpdatedBy(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Date
                <DatePicker
                    selected={date}
                    onChange={date => { setDate(date) }}
                    dateFormat="MMMM d, yyyy"
                />
            </sc.div>
            <button onClick={() => uploadHomeWork()}>upload</button>
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
