import Axios from 'axios';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import sc from '../styledComponents';
import { toastMsg } from './toastMsg';
import { fetchAllHWDates } from '../actions'
import Select from 'react-select'
import { connect, useDispatch, useSelector } from 'react-redux'


export default function BulkUpload(props) {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const [enableDataUpload, setEnableDataUpload] = useState(true)
    const dataRef = useRef(null)
    const startDate = useRef(null)
    const endDate = useRef(null)
    const selectRef = useRef(null)

    let renderInfo = [
        { name: 'Topic', id: 'topic' },
        { name: 'Day no', id: 'dayNo' },
        { name: 'uniqueId', id: 'uniqueId', onChange: e => handleUniqueIdChanged() },
        { name: 'memory verse', id: 'memoryVerse' },
        { name: 'youtube link', id: 'youtubeLink' },
        { name: 'updated by', id: 'updatedBy' },
    ]
    const handleUniqueIdChanged = () => {
        if (document.getElementById('uniqueId').value === '' || document.getElementById('uniqueId').value.length !== 8) {
            return
        }
        if (!/^\d+$/.test(document.getElementById('uniqueId').value)) {
            return
        }
        document.getElementById('dayNo').value = getDayDifference(document.getElementById('uniqueId').value)

    }
    const getDayDifference = (uniqueId) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const a = new Date("2020-04-04"),
            b = new Date(moment(uniqueId).format('YYYY-MM-DD'))
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    const addData = () => {
        let state = [...data]
        if (document.getElementById('uniqueId').value === '' || document.getElementById('uniqueId').value.length !== 8) {
            return
        }
        if (!/^\d+$/.test(document.getElementById('uniqueId').value)) {
            return
        }
        let newObj = {
            uniqueId: document.getElementById('uniqueId').value,
            name: document.getElementById('topic').value !== '' ? document.getElementById('topic').value : false,
            dayNo: document.getElementById('dayNo').value !== '' ? document.getElementById('dayNo').value : false,
            description: document.getElementById('memoryVerse').value !== '' ? document.getElementById('memoryVerse').value : false,
            youtubeLink: document.getElementById('youtubeLink').value !== '' ? document.getElementById('memoryVerse').value : false,
            updatedBy: document.getElementById('updatedBy').value !== '' ? document.getElementById('updatedBy').value : false
        }
        for (var key in newObj) {
            if (newObj.hasOwnProperty(key) && newObj[key] === false) {
                delete newObj[key];
            }
        }
        state = [...state, newObj]
        setData(state)
        document.getElementById('topic').value = ''
        document.getElementById('uniqueId').value = ''
        document.getElementById('dayNo').value = ''
        document.getElementById('memoryVerse').value = ''
        document.getElementById('youtubeLink').value = ''
        document.getElementById('updatedBy').value = ''
    }
    const download = async () => {
        let data = await Axios.get('/api/homework/allHWInfo')
        if (!data.data?.success) {
            return false
        }
        data = data.data.data
        data = data.map(d => {
            if (!d.dayNo) {
                d.dayNo = ''
            }
            if (!d.prayerTopic) {
                d.prayerTopic = ''
            }
            d.memoryVerse = d.description
            delete d.description
            d.lessonBy = d.updatedBy
            delete d.updatedBy
            return d
        })
        var blob = new Blob([JSON.stringify(data)], { type: 'json' });
        var csvURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'hwdata-' + data.length + '.json');
        tempLink.click();
    }
    const IsJsonString = str => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const customizeDownload = () => {
        try {
            let startDate_1 = startDate.current.value
            let endDate_1 = endDate.current.value
            let properties = selectRef.current.state.value
            let aprilDate = moment('2020-04-05')
            // var startDate = '2021-02-01'
            // var endDate = '2021-02-28'
            // let properties = [{ "value": "memoryVerse", "label": "Memory Verse", "color": "#0052CC" }, { "value": "DayNo", "label": "Day No", "color": "#FF5630" }, { "value": "prayerTopic", "label": "Prayer Topic", "color": "#5243AA" }]
            let keys = properties.map(o => o.value)
            let start = moment(startDate_1)
            let end = moment(endDate_1)
            if (end.diff(start, 'days') < 0) {
                toastMsg({ error: true, msg: 'Invalid dates' })
            }
            let diff = end.diff(start, 'days')
            let tempArr = new Array(diff).fill('a')
            let result = []
            tempArr.map((v, i) => {
                let obj = {}
                // obj.dayNo = start.diff(aprilDate, 'days')
                obj.uniqueId = start.add(1, 'days').format('YYYYMMDD')
                obj['date_for_reference'] = start.format('dddd, MMMM Do, YYYY')
                keys.map(k => {
                    obj[k] = ''
                })
                result.push(obj)
            })

            var blob = new Blob([JSON.stringify(result)], { type: 'json' });
            var csvURL = window.URL.createObjectURL(blob);
            var tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'custom-hwdata-' + startDate_1 + ' to ' + endDate_1 + '.json');
            tempLink.click();
        }
        catch (e) {
            toastMsg({ error: true, msg: 'Please select valid data' })
        }
    }
    const uploadJSON = async () => {
        // let data = [{ "uniqueId": "20201211", "date": "2020-12-11T15:42:01.000Z", "description": " నిర్గమ 20:13 (Tel) నరహత్య చేయకూడదు. Exod 20:13 (NET2) “You shall not murder.", "name": "LW & KGT CHILDREN CLUB~ 11TH, DEC 2020~ DAY# 250 ~ DO NOT MURDER~ LESSON BY NIRMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://www.youtube.com/watch?v=aVm5O_VF2Og&feature=youtu.be", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201212", "date": "2020-12-12T13:07:37.000Z", "description": "లూకా 19:10 (Tel) నశించినదానిని వెదకి రక్షించుటకు మనుష్యకుమారుడు వచ్చెనని అతనితో చెప్పెను. Luke 19:10 (NET2) For the Son of Man came to seek and to save the lost.”", "name": "LW & KGT CHILDREN CLUB~ 12TH, DEC 2020~ DAY# 251 ~ ZACCHAUS~ LESSON BY HANNAH", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/2A2PoIcBrRY", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201213", "date": "2020-12-13T12:53:07.000Z", "description": "రోమా 3:23 (Tel) ఏ భేదమును లేదు; అందరును పాపముచేసి దేవుడు అను గ్రహించు మహిమను పొందలేక పోవుచున్నారు. Rom 3:23 (NET2) for all have sinned and fall short of the glory of God.", "name": "మూవీ డే -CHRISTIANA TELUGU క్రిస్టియానా (యాత్రికుని భార్య అయిన యాత్రికురాలి ప్రయాణం)", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/onrU5k740v0", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201214", "date": "2020-12-14T11:56:04.000Z", "description": "Col 3:13 (Tel) ప్రభువు మిమ్మును క్షమించినలాగున మీరును క్షమించుడి. Col 3:13 (NET2) Just as the Lord has forgiven you, so you also forgive others.", "name": "LW & KGT CHILDREN CLUB~ 14TH, DEC 2020~ DAY# 253 ~ BREAKOUT ROOM~ CHRISTIANA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/R3pKwfAaZYw", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201215", "date": "2020-12-15T11:47:27.000Z", "description": "కీర్తన 89:7. పరిశుద్ధదూతల సభలో ఆయన మిక్కిలి భీకరుడు తన చుట్టునున్న వారందరికంటె భయంకరుడు. Psalm 89:7 In the council of the holy ones God is greatly feared; he is more awesome than all who surround him.", "name": "LW & KGT CHILDREN CLUB~ 15TH, DEC 2020~ DAY# 254 ~ WHO ARE ANGELS~ SHYAMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/jbdbnUc1KAA", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201216", "date": "2020-12-16T11:41:24.000Z", "description": " Prov. 3:5 Trust in the LORD with all thine heart; సామెతలు 3:5 నీ పూర్ణహృదయముతో యెహోవాయందు నమ్మక ముంచుము", "name": "LW & KGT CHILDREN CLUB~ 16TH, DEC 2020~ DAY# 255 ~ ABRAHAM & ISAAC~ LESSON BY SUSHMITHA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/MgqMJzcvVgk", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201217", "date": "2020-12-17T11:35:15.000Z", "description": "నిర్గమకాండము 20: 14 వ్యభిచరింపకూడదు. Exodus 20: 14 Thou shalt not commit adultery. KJV", "name": "LW & KGT CHILDREN CLUB~ 17TH, DEC 2020~ DAY# 256 ~ DO NOT COMMIT ADULTERY~ LESSON BY NIRMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/xfC9UsMraLk", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201218", "date": "2020-12-18T10:14:14.000Z", "description": "లూకా Luke 6:38 (Tel) క్షమించుడి, అప్పుడు మీరు క్షమింపబడుదురు; Luke 6:38 (NET) Give, and it will be given to you: ", "name": "LW & KGT CHILDREN CLUB~ 18TH, DEC 2020~ DAY# 257 ~ FORGIVING 490 TIMES~ LESSON BY MAHIMALATHA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/84nCV3OyNmU", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201219", "date": "2020-12-19T18:44:38.000Z", "description": "యాకోబు 1:15 (Tel) దురాశ గర్భము ధరించి పాపమును కనగా, పాపము పరిపక్వమై మరణమును కనును. Jas 1:15 (NET2) Then when desire conceives, it gives birth to sin, and when sin is full grown, it gives birth to death.", "name": "LW & KGT CHILDREN CLUB~ 20th, DEC 2020~ DAY# 259 ~ ARCHANA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/__Y7zrHXfCc", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201220", "date": "2020-12-20T12:22:50.968Z", "description": "కీర్తన 148:1 (Tel) యెహోవాను స్తుతించుడి. ఆకాశవాసులారా, యెహోవాను స్తుతించుడి ఉన్నతస్థలముల నివాసులారా, ఆయనను స్తుతించుడి. Ps 148:1 (NET2) Praise the LORD! Praise the LORD from the sky! Praise him in the heavens!", "name": "LW & KGT CHILDREN CLUB~ 19TH, DEC 2020~ DAY# 258 ~ దేవదూతలు ఎందుకు సృష్టింపబడ్డారు ~ SHYAMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/TU4p5J-Pvxk", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201226", "date": "2020-12-25T19:11:06.008Z", "description": "", "name": "hghjghj", "updatedBy": "", "youtubeLink": "", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20210101", "date": "2020-12-31T18:30:00.000Z", "description": "fas", "name": "hghjghj", "updatedBy": "lkj ", "youtubeLink": "kjjlk ", "dayNo": "updated day no", "prayerTopic": "updated prayer topic" }]
        let data = dataRef.current.value
        if (!data.length || !IsJsonString(data)) {
            toastMsg({ error: true, msg: 'Invalid Data, Please check' })
            return
        }
        data = JSON.parse(data)
        // validate json
        // check if uniqId is present
        let isValid = true, msg = ''
        data = data.map(d => {
            if (!d.uniqueId) {
                isValid = false
            }
            if (d.uniqueId.length != 8) {
                msg = 'uniqueId not valid. Provided uniqueId is as follows : ' + d.uniqueId
                isValid = false
            }
            if (d.lessonBy?.length) {
                d.updatedBy = d.lessonBy
            }
            if (d.memoryVerse?.length) {
                d.description = d.memoryVerse
            }
            let keys = Object.keys(d)
            keys.map(k => {
                if (d[k] === null || d[k].length === 0) {
                    delete d[k]
                }
            })

            return d
        })
        if (!isValid) {
            toastMsg({ error: true, msg: msg || '' })
            return
        }
        const res = await Axios.post('/api/homework/updateBulk', { data })
        if (res.data.success) {
            toastMsg({ success: true, msg: `Operation succesfull. ${res.data.count.updated} updated and ${res.data.count.added} added` })
            dispatch(fetchAllHWDates())
        }
    }
    return (
        <sc.div className='container-fluid'>
            <sc.div className='row'>
                <sc.header>LW & KGT</sc.header>
                <sc.header>Bulk upload</sc.header>
            </sc.div>
            {!enableDataUpload && renderInfo.map(i => (
                <sc.div className='col-md-12 col-sm-12 col-lg-12'>
                    <sc.div className='col-md-3 col-sm-3 col-lg-3'>{i.name}</sc.div>
                    <sc.input className='col-md-8 col-sm-8 col-lg-8' id={i.id} onChange={i.onChange}></sc.input>
                </sc.div>
            ))}
            {enableDataUpload &&
                <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                </sc.div>
            }
            <sc.div style={{ textAlign: 'end' }}>
                {!enableDataUpload && <sc.button onClick={addData}>Upload</sc.button>}
                {enableDataUpload && <sc.button onClick={download}>Download existing data</sc.button>}
                {enableDataUpload && <sc.button onClick={uploadJSON}>Upload data</sc.button>}
                {/* {enableDataUpload && <sc.button onClick={() => setEnableDataUpload(false)}>Disable bulk upload</sc.button>} */}
                {enableDataUpload && <sc.button onClick={() => props.setBulkUpload(false)}>Close</sc.button>}

                {!enableDataUpload && <sc.button onClick={() => setEnableDataUpload(true)}>Enable bulk upload</sc.button>}
            </sc.div>
            <sc.div className='container-fluid'>
                <sc.div className='row'>
                    <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                        <b>Create Data</b>
                    </sc.div>
                </sc.div>
                <sc.div className='row'>
                    <sc.div className='col-md-3'>Start</sc.div>
                    <sc.div className='col-md-9'>
                        <input
                            type="date"
                            name="start date"
                            ref={startDate}
                        />
                    </sc.div>
                </sc.div>
                <sc.div className='row'>
                    <sc.div className='col-md-3'>End</sc.div>
                    <sc.div className='col-md-9'>
                        <input
                            type="date"
                            name="end date"
                            ref={endDate}
                        />
                    </sc.div>
                </sc.div><sc.div className='row'>
                    <sc.div className='col-md-3'>Properties</sc.div>
                    <sc.div className='col-md-9'>
                        <Select
                            // defaultValue={[colourOptions[2], colourOptions[3]]}
                            isMulti
                            name="colors"
                            ref={selectRef}
                            options={[
                                { value: 'name', label: 'Name', color: '#00B8D9' },
                                { value: 'memoryVerse', label: 'Memory Verse', color: '#0052CC' },
                                { value: 'prayerTopic', label: 'Prayer Topic', color: '#5243AA' },
                                { value: 'dayNo', label: 'Day No', color: '#FF5630' },
                                { value: 'lessonBy', label: 'Lesson By', color: '#FF8B00' }
                            ]}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </sc.div>
                </sc.div>
                <sc.div className='col-sm-12 col-md-12 col-lg-12'>
                    <sc.button onClick={customizeDownload}>Download Data</sc.button>
                </sc.div>
            </sc.div>
            {enableDataUpload && <sc.div className='container-fluid'><sc.div className='row'>
                <sc.div className='col-sm-12 col-md-12'><b>Keys Information</b></sc.div>
                <sc.div className='col-sm-3 col-md-3' border>uniqueId</sc.div>
                <sc.div className='col-sm-9 col-md-9' border>
                    - This is just a date in a format of year month and day without any seperations.<br />
                    &ensp;This is the main information to identifty any day. <br />
                    &ensp;This should always have 8 numbers. <br />
                    &ensp;Example : <br />
                    &emsp;&ensp; if date is 31st december 2005 then uniqueId is 20051231 <br />
                    &emsp;&ensp; if date is 1st march 2012 then uniqueId is 20120301 <br />
                </sc.div>
                <hr />
                <sc.div className='col-sm-3 col-md-3 ' border >name</sc.div>
                <sc.div className='col-sm-9 col-md-9' border>
                    - Name/Topic of the class
                </sc.div>
                <sc.div className='col-sm-3 col-md-3' border>description</sc.div>
                <sc.div className='col-sm-9 col-md-9' border>
                    - Memory verse
                </sc.div>
                <sc.div className='col-sm-3 col-md-3' border>prayerTopic</sc.div>
                <sc.div className='col-sm-9 col-md-9' border>
                    - Prayer Topic
                </sc.div>
                <sc.div className='col-sm-3 col-md-3' border>dayNo</sc.div>
                <sc.div className='col-sm-9 col-md-9' border>
                    - Day Number
                </sc.div>
                <sc.div className='col-sm-3 col-md-3' border>lessonBy</sc.div>
                <sc.div className='col-sm-9 col-md-9' border>
                    - resource who presented to class
                </sc.div>
            </sc.div>
            </sc.div>}

        </sc.div>
    )
}
