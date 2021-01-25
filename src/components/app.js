import React, { useEffect, useState, AsyncStorage } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from '../store'
import sc from '../styledComponents'
import { theme } from '../styledComponents/theme'
import AddHW from './addHW'
import ViewHW from './viewHW'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import AllDates from './allDates'
import { toast, ToastContainer } from 'react-toastify';
import { FaBrush } from "react-icons/fa";

import { RiAdminFill } from "react-icons/ri";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '0',
        transform: 'translate(-50%, -50%)',
        border: '0px'
    }
};
let allModes = ['default', 'dark', 'other1', 'other2', 'other3', 'other4', 'other5', 'other6', 'other7', 'other8']
export default function App() {
    const [mode, setMode] = useState('default')
    const [page, setPage] = useState('view')
    const [modalIsOpen, setIsOpen] = useState(false)
    useEffect(() => {
        try {
            const value = localStorage.getItem('my-mode');
            if (value !== null) {
                // We have data!
                setMode(value)
            }
        } catch (error) {
            // Error retrieving data
        }
    }, [])
    const handleChangeMode = () => {
        let index = allModes.indexOf(mode)
        let newMode = allModes[index == allModes.length - 1 ? 0 : index + 1]
        localStorage.setItem('my-mode', newMode);
        setMode(newMode)
    }
    const afterOpenModal = () => {
        document.getElementById('pwdInput').focus()
    }
    const checkUser = () => {
        console.log('in check user')
        if (document.getElementById('pwdInput').value === '6565') {
            setIsOpen(false)
            setPage(page === 'view' ? 'add' : 'view')
            return
        }

    }
    const leftButtonClick = () => {
        if (page === 'view') {
            setIsOpen(true)
        }
        else {
            setPage('view')
        }
    }
    const handleKeypress = e => {
        //it triggers by pressing the enter key
        // e.persist()
        let codePressed = e.keyCode || e.charCode
        // console.log('in handle key press', e.keyCode, e.charCode)
        if (codePressed === 13) {
            checkUser();
        }
    }
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme(mode)}>
                <a href="#" class="float" onClick={() => handleChangeMode()} >
                    <FaBrush style={{ color: theme(mode).text }} />
                </a>
                <a href="#" class="float-right" onClick={() => leftButtonClick()} >
                    <RiAdminFill style={{ color: theme(mode).text }} />
                </a>
                {page === 'view' && <sc.div style={{ height: '100vh' }}><ViewHW /></sc.div>}
                {page === 'add' && <sc.div style={{ height: '100vh' }}><AddHW /></sc.div>}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                    contentLabel="Example Modal"
                >
                    <sc.div className='container'>
                        <sc.div className='row'>
                            <sc.input type='text' id='pwdInput' autoFocus onKeyPress={handleKeypress} />
                        </sc.div>
                        <sc.div className='row'>
                            <sc.button onClick={checkUser} >Submit</sc.button>
                            <sc.button onClick={() => setIsOpen(false)}>Close</sc.button>
                        </sc.div>
                    </sc.div>
                </Modal>
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
            </ThemeProvider>
        </Provider>
    )
}
