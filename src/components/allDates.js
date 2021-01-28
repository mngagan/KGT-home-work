import Axios from 'axios'
import moment from 'moment'
import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchAllHWDates } from '../actions'
import sc from '../styledComponents'
import { RiMenuFill } from "react-icons/ri";
import _ from 'lodash'
import { theme } from '../styledComponents/theme';
import { toastMsg } from './toastMsg';
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";

const themeTemp = theme(localStorage.getItem('my-mode'))

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const AllDates = (props) => {
    const dispatch = useDispatch()
    const allDates = useSelector((state) => state.hw.allDates)
    const error = useSelector((state) => state.hw.error)
    const errorMsg = useSelector((state) => state.hw.errorMsg)
    const isLoading = useSelector((state) => state.hw.isLoading)
    const [enableDelete, setEnableDelete] = useState(false)
    const [toggleHover, setToggleHover] = useState(false)

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
    const handleDeleteClick = async ({ uniqueId }) => {
        console.log('in delete id clicked', uniqueId)
        let result = await Axios.post('/api/homework/deleteHomeWork', { uniqueId })
        if (result.data.success) {
            toastMsg({ success: true, msg: 'Deletion succesfull' })
            dispatch(fetchAllHWDates())
        }
        else {
            toastMsg({ error: true, msg: 'Deletion failed' })
        }
        console.log('result is as follows', result)

    }
    console.log('in all dates grouped by month', groupedByMonth)
    return (
        <sc.div className='allDatesIcon'>
            <span style={{ fontSize: '30px', cursor: 'pointer' }} onClick={openNav}><RiMenuFill /></span>
            <sc.div id="mySidenav" className="sidenav">
                <a className='closebtn' onClick={closeNav}>&times;</a>
                <sc.div className='container-fluid'>
                    {props.showDeleteButton &&
                        <sc.div className='row'>
                            <sc.div className='col-12 col-sm-12 co-md-12 col-lg-12'>
                                <sc.button style={{ float: 'right' }} onClick={() => setEnableDelete(!enableDelete)}>{enableDelete ? 'Disable delete' : 'Enable delete'}</sc.button>
                            </sc.div>
                        </sc.div>
                    }
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
                                    <sc.div className='row' hover >
                                        <sc.div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                                            {`${monthNames[parseInt(key.substring(5)) - 1]}  ${key.substring(0, 4)}`}
                                        </sc.div>
                                        {
                                            !enableDelete && groupedByMonth[key].map((val, i) => {
                                                return (
                                                    <sc.div className='col-1 col-sm-1 col-md-1 col-lg-1' style={{ cursor: 'pointer' }} key={index + i} onClick={() => { handleClick(val) }}>
                                                        {val.date.substr(8, 2)}
                                                    </sc.div>
                                                )
                                            })
                                        }
                                        {
                                            enableDelete && groupedByMonth[key].map((val, i) => {
                                                let random = Math.random().toString(36).slice(2)
                                                return (
                                                    <sc.div className='' style={{ cursor: 'pointer', paddingLeft: '35px' }} key={index + i}>
                                                        <span style={{ borderBottom: '1px solid black' }}>
                                                            <span onClick={() => { handleClick(val) }}>{val.date.substr(8, 2)}</span>
                                                            <span
                                                                onClick={() => { handleDeleteClick({ uniqueId: val.uniqueId }) }}
                                                                style={{ paddingLeft: '5px' }}
                                                                onMouseEnter={() => setToggleHover(val.uniqueId)}
                                                                onMouseLeave={() => setToggleHover(null)}
                                                            >
                                                                {toggleHover === val.uniqueId ? <AiFillDelete /> : <AiOutlineDelete />}
                                                            </span>
                                                        </span>
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
