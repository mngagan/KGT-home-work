import styled from 'styled-components'

export const div = styled.div`
    background: ${props => props.theme.primary};
    color : ${props => props.theme.text};
    transition : background-color  1s, color 1s, width 1s;
    // -webkit-transition: width 1s ease-in-out;
    // -moz-transition: width 1s ease-in-out;
    // -o-transition: width 1s ease-in-out;
    // transition: width 1s ease-in-out;
`