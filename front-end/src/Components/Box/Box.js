/*
  This is a generic layout component. Use this instead of a `div` when performing layout tasks.
  This component accepts useful styling props documented here:
  https://styled-system.com/table
  All the props under the `space`, `color`, and `layout` headers are accepted.
  If you need a flex box, use the FlexBox component which is simply an extension of this component.
  */
import styled from '@emotion/styled';

import { space, color, border, layout } from 'styled-system';
import styledSystemPropTypes from '@styled-system/prop-types';

export const Box = styled('div')(
  {
    minWidth: 0,
    boxSizing: 'border-box',
  },
  space,
  color,
  layout,
  border
);

Box.propTypes = {
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.color,
  ...styledSystemPropTypes.layout,
  ...styledSystemPropTypes.border,
};

export default Box;
