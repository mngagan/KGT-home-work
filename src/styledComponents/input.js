import styled from 'styled-components'

export const input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.theme.text};
  background: ${props => props.theme.primary};
  border: 1px solid;
  border-radius: 3px;
  transition : background-color  1s, color 1s;
`;