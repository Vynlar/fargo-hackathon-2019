import styled from '@emotion/styled';
import css from '@styled-system/css';
import { layout, space } from 'styled-system';
import { Field } from 'formik';

const Input = styled(Field)(
  {
    boxSizing: 'border-box',
  },
  css({
    outline: 'none',
    height: '40px',
    border: 'none',
    mt: 2,
    mb: 1,
    px: 2,
    height: 'field',
    borderRadius: 4,
  }),
  layout,
  space
);

export default Input;
