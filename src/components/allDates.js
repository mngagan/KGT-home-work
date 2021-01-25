import Axios from 'axios'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchAllHWDates } from '../actions'
import sc from '../styledComponents'
import { RiMenuFill } from "react-icons/ri";
import _ from 'lodash'

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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
    var groupedByMonth = _.groupBy(allDates, function (item) {
        return item.date.substring(0, 7);
    });
    console.log('in all dates grouped by month', groupedByMonth)
    return (
        <sc.div className='allDatesIcon'>
            <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}><RiMenuFill /></span>
            <sc.div id="mySidenav" className="sidenav">
                <a className='closebtn' onClick={closeNav}>&times;</a>
                {/* {props.showDeleteButton && <sc.button>show delete button</sc.button>} */}
                <sc.div className='container'>
                    {error && <sc.div>{errorMsg}</sc.div>}
                    {isLoading && <sc.div>loading please wait</sc.div>}
                    {!error && !isLoading && false &&
                        <sc.div className='container'>
                            {allDates.map((data, index) => {
                                return <sc.div>
                                    <sc.div className='row' key={index} onClick={() => { handleClick(data) }}><span style={{ cursor: 'pointer' }}>{moment(data.date).format('DD MMM YYYY')}</span></sc.div>
                                </sc.div>
                            })}
                        </sc.div>
                    }
                    {
                        !error && !isLoading && <sc.div className='container'>
                            {Object.keys(groupedByMonth).map((key, index) => {
                                return (
                                    <sc.div className='row'>
                                        <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                                            {`${monthNames[parseInt(key.substring(5)) - 1]}  ${key.substring(0, 4)}`}
                                        </sc.div>
                                        {
                                            groupedByMonth[key].map((val, i) => {
                                                return (
                                                    <sc.div className='col-1 col-sm-1 col-md-1 col-lg-1' style={{ cursor: 'pointer' }} key={index + i} onClick={() => { handleClick(val) }}>
                                                        {val.date.substr(8,2)}
                                                    </sc.div>
                                                )
                                            })
                                        }
                                    </sc.div>
                                )
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
