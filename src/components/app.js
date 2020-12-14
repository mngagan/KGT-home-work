import React, { useEffect, useState, AsyncStorage } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from '../store'
import sc from '../styledComponents'
import { theme } from '../styledComponents/theme'
import AddHW from './addHW'
import { ViewHW } from './viewHW'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.scss'
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      padding : '100px',
      transform             : 'translate(-50%, -50%)',
      border                : '0px'
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
                // console.log(value);
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
        // document
    }
    const checkUser = () => {
        if(document.getElementById('pwdInput').value === '6565'){
            setIsOpen(false)
            setPage(page === 'view' ? 'add' : 'view')
            return
        }

    }
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme(mode)}>
                {/* <button onClick={() => handleChangeMode()}>change theme</button> */}
                {/* <Router>
                    <a href="#" class="float" onClick={() => handleChangeMode()} style={{ backgroundColor: theme(mode).text }}>
                        <i class="fa fa-plus my-float"></i>
                    </a>
                    <Link to="/add">
                        <a href="#" class="float-right" style={{ backgroundColor: theme(mode).text }}>
                            <i class="fa fa-plus my-float1"></i>
                        </a>
                    </Link>
                    <Switch>
                        <Route path="/add">
                            <sc.div style={{ height: '100vh' }}>
                                <AddHW />
                            </sc.div>
                        </Route>
                        <Route path="/">
                            <sc.div style={{ height: '100vh' }}>
                                <ViewHW />
                            </sc.div>
                        </Route>
                    </Switch>
                </Router> */}
                <a href="#" class="float" onClick={() => handleChangeMode()} style={{ backgroundColor: theme(mode).text }}>
                    <i class="fa fa-plus my-float"></i>
                </a>
                <a href="#" class="float-right" onClick={() => setIsOpen(true)} style={{ backgroundColor: theme(mode).text }}>
                    <i class="fa fa-plus my-float1"></i>
                </a>
                {/* <button onClick = {() => {setIsOpen(true)}}>modal window</button> */}
                {page === 'view' && <sc.div style={{ height: '100vh' }}><ViewHW /></sc.div>}
                {page === 'add' && <sc.div style={{ height: '100vh' }}><AddHW /></sc.div>}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <sc.div className = 'container'>
                        <sc.div className = 'row'>
                            <sc.input type = 'text' id = 'pwdInput' />
                        </sc.div>
                        <sc.div className = 'row'>
                            <button onClick = {checkUser}>Submit</button>
                            <button onClick = {() => setIsOpen(false)}>Close</button>
                        </sc.div>
                    </sc.div>
                </Modal>
            </ThemeProvider>
        </Provider>
    )
}
