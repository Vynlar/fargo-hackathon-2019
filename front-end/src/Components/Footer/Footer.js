import React from 'react';
import FlexBox from '../FlexBox/FlexBox';
import styled from '@emotion/styled';
import css from '@styled-system/css';

const Footer = () => {
  const breakpoints = [1150, 950, 750];
  const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);

  const FooterContainer = styled(FlexBox)(
    css({
      display: 'none',
      position: 'fixed',
      bottom: '0',
      bg: 'leastTransparent',
      width: '100%',
      height: '60px',
      justifyContent: 'center',
      alignItems: 'center',
    })
  );

  return (
    <FlexBox>
      <FooterContainer>Footer Container</FooterContainer>
    </FlexBox>
  );
};

export default Footer;
