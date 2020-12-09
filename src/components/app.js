import React from 'react'
import axios from 'axios'

export default function App() {
    const handleClick = () => {
        console.log('in handle click button -- to add homework')
        axios.post('/api/homeWork/addHomeWork', {
            name: 'Paul jouney',
            title: 'Paul Journey',
            updatedBy: "gagan",
            description: "paul journey",
            date : "09-12-2020"
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
        <div>
            in app component
            <button onClick={handleClick}>click to add data to homework</button>
            <button onClick={getLatest}>get latest</button>

        </div>
    )
}
