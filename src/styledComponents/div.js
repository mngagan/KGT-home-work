import styled from 'styled-components'

export const div = styled.div`
    background: ${props => props.theme.primary};
    color : ${props => props.theme.text};
    transition : background-color  1s, color 1s;
`