import Axios from 'axios'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchAllHWDates } from '../actions'
import sc from '../styledComponents'



export const AllDates = (props) => {
    const dispatch = useDispatch()
    const allDates = useSelector((state) => state.hw.allDates)
    const error = useSelector((state) => state.hw.error)
    const errorMsg = useSelector((state) => state.hw.errorMsg)
    const isLoading = useSelector((state) => state.hw.isLoading)

    const openNav = () => {
        console.log('in open nav')
        document.getElementById("mySidenav").style.width = "100%";
    }

    useEffect(() => {
        !allDates.length && dispatch(fetchAllHWDates())
    }, [])

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
                    {error && <sc.div>{errorMsg}</sc.div>}
                    {isLoading && <sc.div>loading please wait</sc.div>}
                    {!error && !isLoading &&
                        <sc.div className='container'>
                            {allDates.map((data, index) => {
                                return <sc.div className='row' key={index} onClick={() => { handleClick(data) }}><span style={{ cursor: 'pointer' }}>{moment(data.date).format('DD MMM YYYY')}</span></sc.div>
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
