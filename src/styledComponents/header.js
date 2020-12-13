// font-size:8vw

import styled from 'styled-components'

export const header = styled.span`
    color: ${props => props.theme.text};
    font-size: 2rem;
    text-align: center;
    width: 100%;
    transition : background-color  1s, color 1s;
`