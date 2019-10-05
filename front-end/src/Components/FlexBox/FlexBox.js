/*
  This is a generic layout component. Use this instead of a `div` with `display: flex;` when performing layout tasks.
  This component accepts useful styling props documented here:
  https://styled-system.com/table
  All the props under the `space`, `color`, `layout`, and 'flexbox' headers are accepted.
  If you need a normal div instead of a flexbox, use the `Box` component.
*/
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { flexbox } from 'styled-system';
import styledSystemPropTypes from '@styled-system/prop-types';

import Box from 'Components/Box';

const FlexBox = styled(Box)(
  ({ col, column }) => ({
    display: 'flex',
    flexDirection: col || column ? 'column' : 'row',
  }),
  flexbox
);
FlexBox.propTypes = {
  ...styledSystemPropTypes.flexbox,
  ...Box.propTypes,

  // If either col or column is true, this will render the children in a column.
  col: PropTypes.bool,
  column: PropTypes.bool,
};

export const Row = FlexBox;
export const Column = props => <FlexBox col {...props} />;

export default FlexBox;
