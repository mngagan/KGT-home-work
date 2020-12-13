import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTest } from "../actions/index";
import sc from '../styledComponents';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';


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
            console.log('reader', reader.result)
        };
    }
    const uploadHomeWork = async () => {
        console.log('in upload homework')
        // Axios.post('/api/homework/addHomeWork')
        let body = {name : topicName, date, images : imageData, youtubeLink, updatedBy, description : memoryVerse}
        const res = await Axios.post('/api/homework/addHomeWork', body)
        console.log('upload homwwork response', res)
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
                Topic
                <sc.input type="text" id="topicName" value={topicName} onChange={(e) => { setTopicName(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Image
                <sc.input type="file" id="img" name="img" accept="image/*" onChange={handleImageUpload} />
            </sc.div>
            <sc.div className='row'>
                Memory verse
                <sc.input type="text" id="memoryVerse" value={memoryVerse} onChange={(e) => { setMemoryVerse(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Youtube link
                <sc.input type="text" id="youtubeLink" value={youtubeLink} onChange={(e) => { setYoutubeLink(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                Updated by
                <sc.input type="text" id="updated by" value={updatedBy} onChange={(e) => { setUpdatedBy(e.target.value) }} />
            </sc.div>
            <sc.div className='row'>
                select date
                <DatePicker 
                selected={date} 
                onChange={date => { console.log(date); setDate(date) }} 
                dateFormat="MMMM d, yyyy"
                />
            </sc.div>
            <button onClick={() => uploadHomeWork()}>upload</button>
        </sc.div>
    )
}

const mapStateToProps = state => ({
    hw: state.hw
})
export default connect(mapStateToProps, { updateTest })(AddHW)
