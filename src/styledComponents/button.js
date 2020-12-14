import styled from 'styled-components'

export const button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.theme.primary};
  color: ${props => props.theme.text};

  font-size: 1em;
  border: 2px solid ${props => props.theme.text} ;
  border-radius: 3px;
  transition : background-color  1s, color 1s, border 1s;
`;