import React from 'react'
import axios from 'axios'
import sc from '../styledComponents'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styledComponents/theme'
import styled from 'styled-components'

export default function App() {
    const handleClick = () => {
        console.log('in handle click button -- to add homework')
        axios.post('/api/homeWork/addHomeWork', {
            name: 'Paul jouney',
            title: 'Paul Journey',
            updatedBy: "gagan",
            description: "paul journey",
            date: "09-12-2020"
        })
            .then(function (response) {
                console.log('in response', response);
            })
            .catch(function (error) {
                console.error('in error', error);
            });
    }
    const getLatest = () => {
        axios.get('/api/homeWork/allDates')
            .then(function (response) {
                console.log('in response', response);
            })
            .catch(function (error) {
                console.error('in error', error);
            });
    }
    return (
        <ThemeProvider  theme = {theme()}>
            <sc.div>
                in app component
                <button onClick={handleClick}>click to add data to homework</button>
                <button onClick={getLatest}>get latest</button>
                <sc.div>test inside div</sc.div>
            </sc.div>
        </ThemeProvider>
    )

}
