import Axios from 'axios';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import sc from '../styledComponents';
import { toastMsg } from './toastMsg';


export default function BulkUpload(props) {
    const [data, setData] = useState([])
    const [enableDataUpload, setEnableDataUpload] = useState(true)
    const dataRef = useRef(null)
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
        console.log('difference is', Math.floor((utc2 - utc1) / _MS_PER_DAY))
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
    const uploadJSON = async () => {
        // let data = [{ "uniqueId": "20201211", "date": "2020-12-11T15:42:01.000Z", "description": " నిర్గమ 20:13 (Tel) నరహత్య చేయకూడదు. Exod 20:13 (NET2) “You shall not murder.", "name": "LW & KGT CHILDREN CLUB~ 11TH, DEC 2020~ DAY# 250 ~ DO NOT MURDER~ LESSON BY NIRMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://www.youtube.com/watch?v=aVm5O_VF2Og&feature=youtu.be", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201212", "date": "2020-12-12T13:07:37.000Z", "description": "లూకా 19:10 (Tel) నశించినదానిని వెదకి రక్షించుటకు మనుష్యకుమారుడు వచ్చెనని అతనితో చెప్పెను. Luke 19:10 (NET2) For the Son of Man came to seek and to save the lost.”", "name": "LW & KGT CHILDREN CLUB~ 12TH, DEC 2020~ DAY# 251 ~ ZACCHAUS~ LESSON BY HANNAH", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/2A2PoIcBrRY", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201213", "date": "2020-12-13T12:53:07.000Z", "description": "రోమా 3:23 (Tel) ఏ భేదమును లేదు; అందరును పాపముచేసి దేవుడు అను గ్రహించు మహిమను పొందలేక పోవుచున్నారు. Rom 3:23 (NET2) for all have sinned and fall short of the glory of God.", "name": "మూవీ డే -CHRISTIANA TELUGU క్రిస్టియానా (యాత్రికుని భార్య అయిన యాత్రికురాలి ప్రయాణం)", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/onrU5k740v0", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201214", "date": "2020-12-14T11:56:04.000Z", "description": "Col 3:13 (Tel) ప్రభువు మిమ్మును క్షమించినలాగున మీరును క్షమించుడి. Col 3:13 (NET2) Just as the Lord has forgiven you, so you also forgive others.", "name": "LW & KGT CHILDREN CLUB~ 14TH, DEC 2020~ DAY# 253 ~ BREAKOUT ROOM~ CHRISTIANA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/R3pKwfAaZYw", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201215", "date": "2020-12-15T11:47:27.000Z", "description": "కీర్తన 89:7. పరిశుద్ధదూతల సభలో ఆయన మిక్కిలి భీకరుడు తన చుట్టునున్న వారందరికంటె భయంకరుడు. Psalm 89:7 In the council of the holy ones God is greatly feared; he is more awesome than all who surround him.", "name": "LW & KGT CHILDREN CLUB~ 15TH, DEC 2020~ DAY# 254 ~ WHO ARE ANGELS~ SHYAMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/jbdbnUc1KAA", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201216", "date": "2020-12-16T11:41:24.000Z", "description": " Prov. 3:5 Trust in the LORD with all thine heart; సామెతలు 3:5 నీ పూర్ణహృదయముతో యెహోవాయందు నమ్మక ముంచుము", "name": "LW & KGT CHILDREN CLUB~ 16TH, DEC 2020~ DAY# 255 ~ ABRAHAM & ISAAC~ LESSON BY SUSHMITHA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/MgqMJzcvVgk", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201217", "date": "2020-12-17T11:35:15.000Z", "description": "నిర్గమకాండము 20: 14 వ్యభిచరింపకూడదు. Exodus 20: 14 Thou shalt not commit adultery. KJV", "name": "LW & KGT CHILDREN CLUB~ 17TH, DEC 2020~ DAY# 256 ~ DO NOT COMMIT ADULTERY~ LESSON BY NIRMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/xfC9UsMraLk", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201218", "date": "2020-12-18T10:14:14.000Z", "description": "లూకా Luke 6:38 (Tel) క్షమించుడి, అప్పుడు మీరు క్షమింపబడుదురు; Luke 6:38 (NET) Give, and it will be given to you: ", "name": "LW & KGT CHILDREN CLUB~ 18TH, DEC 2020~ DAY# 257 ~ FORGIVING 490 TIMES~ LESSON BY MAHIMALATHA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/84nCV3OyNmU", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201219", "date": "2020-12-19T18:44:38.000Z", "description": "యాకోబు 1:15 (Tel) దురాశ గర్భము ధరించి పాపమును కనగా, పాపము పరిపక్వమై మరణమును కనును. Jas 1:15 (NET2) Then when desire conceives, it gives birth to sin, and when sin is full grown, it gives birth to death.", "name": "LW & KGT CHILDREN CLUB~ 20th, DEC 2020~ DAY# 259 ~ ARCHANA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/__Y7zrHXfCc", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201220", "date": "2020-12-20T12:22:50.968Z", "description": "కీర్తన 148:1 (Tel) యెహోవాను స్తుతించుడి. ఆకాశవాసులారా, యెహోవాను స్తుతించుడి ఉన్నతస్థలముల నివాసులారా, ఆయనను స్తుతించుడి. Ps 148:1 (NET2) Praise the LORD! Praise the LORD from the sky! Praise him in the heavens!", "name": "LW & KGT CHILDREN CLUB~ 19TH, DEC 2020~ DAY# 258 ~ దేవదూతలు ఎందుకు సృష్టింపబడ్డారు ~ SHYAMALA", "updatedBy": "Shalem Israel", "youtubeLink": "https://youtu.be/TU4p5J-Pvxk", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20201226", "date": "2020-12-25T19:11:06.008Z", "description": "", "name": "hghjghj", "updatedBy": "", "youtubeLink": "", "dayNo": "", "prayerTopic": "" }, { "uniqueId": "20210101", "date": "2020-12-31T18:30:00.000Z", "description": "fas", "name": "hghjghj", "updatedBy": "lkj ", "youtubeLink": "kjjlk ", "dayNo": "updated day no", "prayerTopic": "updated prayer topic" }]
        let data = dataRef.current.value
        if (!data.length && !IsJsonString(data)) {
            toastMsg({ error: true, msg: 'Invalid Data' })
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
        console.log('before upload data', data)
        const res = await Axios.post('/api/homework/updateBulk', { data })
        if (res.data.success) {
            toastMsg({ success: true, msg: `Operation succesfull. ${res.data.count.updated} updated and ${res.data.count.added} added` })
        }
        console.log('after uploading data', res)
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
                    <sc.textArea ref={dataRef} rows="10" onChange={e => console.log(dataRef)} />
                </sc.div>
            }
            <sc.div style = {{textAlign : 'end'}}>
                {!enableDataUpload && <sc.button onClick={addData}>Upload</sc.button>}
                {enableDataUpload && <sc.button onClick={download}>Download existing data</sc.button>}
                {enableDataUpload && <sc.button onClick={uploadJSON}>Upload data</sc.button>}
                {/* {enableDataUpload && <sc.button onClick={() => setEnableDataUpload(false)}>Disable bulk upload</sc.button>} */}
                {enableDataUpload && <sc.button onClick={() =>  props.setBulkUpload(false)}>Disable bulk upload</sc.button>}
               
                {!enableDataUpload && <sc.button onClick={() => setEnableDataUpload(true)}>Enable bulk upload</sc.button>}
            </sc.div>
            {enableDataUpload && <sc.div className='row'>
                <sc.div className='col-sm-12 col-md-12'>information regarding keys</sc.div>
                <sc.div className='col-sm-3 col-md-3'>uniqueId</sc.div>
                <sc.div className='col-sm-9 col-md-9'>
                    - This is just a date in a format of year month and day without any seperations.<br />
                    &ensp;This is the main information to identifty. <br />
                    &ensp;This should always have 8 numbers. <br />
                    &ensp;Example : <br />
                    &emsp;&ensp; if date is 31st december 2005 then uniqueId is 20051231 <br />
                    &emsp;&ensp; if date is 1st march 2012 then uniqueId is 20120301 <br />
                </sc.div>
                <hr />
                <sc.div className='col-sm-3 col-md-3'>name</sc.div>
                <sc.div className='col-sm-9 col-md-9'>
                    - Name/Topic of the class
                </sc.div>
                <sc.div className='col-sm-3 col-md-3'>description</sc.div>
                <sc.div className='col-sm-9 col-md-9'>
                    - Memory verse
                </sc.div>
                <sc.div className='col-sm-3 col-md-3'>prayerTopic</sc.div>
                <sc.div className='col-sm-9 col-md-9'>
                    - Prayer Topic
                </sc.div>
                <sc.div className='col-sm-3 col-md-3'>dayNo</sc.div>
                <sc.div className='col-sm-9 col-md-9'>
                    - Day Number
                </sc.div>
                <sc.div className='col-sm-3 col-md-3'>updatedBy</sc.div>
                <sc.div className='col-sm-9 col-md-9'>
                    - resource who presented to class
                </sc.div>
            </sc.div>}

        </sc.div>
    )
}
