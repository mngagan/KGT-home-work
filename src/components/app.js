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
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

let allModes = ['default', 'dark', 'other1', 'other2', 'other3', 'other4', 'other5', 'other6', 'other7', 'other8']
export default function App() {
    const [mode, setMode] = useState('default')
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
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme(mode)}>
                {/* <button onClick={() => handleChangeMode()}>change theme</button> */}
                <a href="#" class="float" onClick={() => handleChangeMode()} style = {{backgroundColor : theme(mode).text}}>
                    <i class="fa fa-plus my-float"></i>
                </a>
                <Router>
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
                </Router>
            </ThemeProvider>
        </Provider>
    )
}
