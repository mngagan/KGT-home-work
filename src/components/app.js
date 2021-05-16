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
import ParticlesBg from 'particles-bg'

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
    let config = {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-40, 40],
        alpha: [0.6, 0],
        scale: [.1, 0.4],
        position: "all",
        color: ["random", "#ff0000"],
        cross: "dead",
        // emitter: "follow",
        random: 15
    };

    if (Math.random() > 0.85) {
        config = Object.assign(config, {
            onParticleUpdate: (ctx, particle) => {
                ctx.beginPath();
                ctx.rect(
                    particle.p.x,
                    particle.p.y,
                    particle.radius * 2,
                    particle.radius * 2
                );
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.closePath();
            }
        });
    }
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
        if (codePressed === 13) {
            checkUser();
        }
    }
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme(mode)}>
                {/* <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>

                        <hr />
                        <Switch>
                            <Route exact path="/">
                                <h2>Home</h2>
                            </Route>
                            <Route path="/about">
                                <h2>about</h2>
                            </Route>
                            <Route path="/dashboard">
                                <h2>dashboard</h2>
                            </Route>
                        </Switch>
                    </div>
                </Router> */}
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
                <ParticlesBg type="custom" config={config} bg={true} />
            </ThemeProvider>
        </Provider>
    )
}
