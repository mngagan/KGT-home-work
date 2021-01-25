import styled from 'styled-components'

export const button = styled.button`
  /* Adapt the colors based on primary prop */
  background-color: ${props => props.theme.text};
  color: ${props => props.theme.primary};

  font-size: 1em;
  border: 2px solid ${props => props.theme.primary} ;
  border-radius: 5px;
  transition : background-color  1s, color 1s, border 1s;
  &:hover{
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    border: 2px solid ${props => props.theme.text};
  }
`;