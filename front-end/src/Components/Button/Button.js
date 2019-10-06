import styled from '@emotion/styled';
import css from '@styled-system/css';
import {
  space,
  color,
  layout,
  flexbox,
  // When `styled-system` v5 types come out, this will not be necessary.
  // See: https://www.npmjs.com/package/@types/styled-system
  // @ts-ignore
} from 'styled-system';

const Button = styled('button')(
  css({
    bg: '0',
    px: 4,
    height: 'field',
    borderRadius: 'normal',
    borderWidth: 0,
    textTransform: 'uppercase',
    fontSize: 1,
    color: 'black',
    letterSpacing: 1.5,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    ':hover': css({
      bg: 'black',
      color: 'white',
      boxShadow: '0 3px 3px rgba(0,0,0,0.3)',
      transform: 'translateY(-3px)',
    }),
  }),
  color,
  space,
  layout,
  flexbox
);

export default Button;
