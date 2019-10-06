import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import FlexBox from 'Components/FlexBox';
import Box from 'Components/Box';

const HeaderContainer = styled(FlexBox)(
  css({
    width: '100%',
    my: 3,
    fontSize: 5,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
  })
);

const Page = ({ children, ...props }) => (
  <FlexBox col width="100vw" bg="blue" minHeight="100vh" {...props}>
    <HeaderContainer justifyContent="center" py={3}>
      ReachOut
    </HeaderContainer>
    <Box alignSelf="center">{children}</Box>
  </FlexBox>
);
Page.propTypes = {
  children: PropTypes.node,
  renderFooter: PropTypes.func,
};

export default Page;
