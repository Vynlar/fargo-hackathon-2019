import React from 'react';
import PropTypes from 'prop-types';

import FlexBox from 'Components/FlexBox';
import Box from 'Components/Box';

const Page = ({ children, renderFooter, ...props }) => (
  <FlexBox col width="100vw" bg="neutral" minHeight="100vh" pt={5} {...props}>
    <Box alignSelf="center">
      <Box maxWidth="page" bg="darkerGrey" mx="auto" borderRadius="normal">
        {children}
      </Box>
    </Box>
    <Box mt="auto" width="100%" bg="darkerGrey" color="white" p={5}>
      <Box maxWidth="page" mx="auto">
        {renderFooter()}
      </Box>
    </Box>
  </FlexBox>
);
Page.propTypes = {
  children: PropTypes.node,
  renderFooter: PropTypes.func,
};

export default Page;
