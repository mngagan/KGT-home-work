import styled from 'styled-components'

export const textArea = styled.textarea`
  /* Adapt the colors based on primary prop */
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  width: 100%;
  font-size: 1em;
  border: 2px solid ${props => props.theme.text} ;
  border-radius: 5px;
  transition : background-color  1s, color 1s, border 1s;
`;