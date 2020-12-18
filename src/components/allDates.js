import Axios from 'axios'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import sc from '../styledComponents'



export const AllDates = (props) => {

    const [allDates, setAllDates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [ready, setReady] = useState(false)

    const openNav = () => {
        console.log('in open nav')
        document.getElementById("mySidenav").style.width = "100%";
    }

    useEffect(() => {
        //call service to fetch all dates
        fetchAllDates()
        return () => {

        }
    }, [])
    const fetchAllDates = async () => {
        let response = await Axios.get('/api/homework/allDates')
        // let allDates = response.filter
        if (response.data.success) {
            setAllDates(response.data.data)
            setLoading(false)
            setReady(true)
        }
        else {
            setError(true)
            setLoading(false)
        }
        console.log('after fetching all dates', response.data, response.data.success)
    }
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }
    const handleClick = (data) => {
        closeNav()
        props.fetchSpecificDate(data)
    }
    return (
        <sc.div>
            <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}>&#9776;</span>
            <sc.div id="mySidenav" className="sidenav">
                <a className='closebtn' onClick={closeNav}>&times;</a>
                <sc.div className='container'>
                    {error && <sc.div>failed fetching data</sc.div>}
                    {loading && <sc.div>loading please wait</sc.div>}
                    {ready &&
                        <sc.div className='container'>
                            {allDates.map((data, index) => {
                                return <sc.div className='row' key={index}  onClick={() => { handleClick(data) }}><span style={{ cursor: 'pointer' }}>{moment(data.date).format('DD MMM YYYY')}</span></sc.div>
                            })}
                        </sc.div>
                    }
                </sc.div>
            </sc.div>
        </sc.div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AllDates)
