import styled from '@emotion/styled';
import { typography, space, color } from 'styled-system';
import styledSystemPropTypes from '@styled-system/prop-types';

const Text = styled('span')(typography, space, color);
Text.propTypes = {
  ...styledSystemPropTypes.typography,
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.color,
};

export default Text;
