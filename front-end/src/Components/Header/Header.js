import React from 'react';
import FlexBox from '../FlexBox/FlexBox';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import Typing from 'react-typing-animation';
import { keyframes } from '@emotion/core';
import { pulse } from 'react-animations';

const Header = () => {
  const pulseAnimation = keyframes`${pulse}`;

  const PulseDiv = styled.div`
    animation: 3s infinite ${pulseAnimation};
  `;

  const HeaderContainer = styled(FlexBox)(
    css({
      width: '100%',
      my: 3,
      fontSize: 5,
      color: 'darkerGrey',
      justifyContent: 'center',
    })
  );

  return (
    <FlexBox justifyContent="center">
        <Typing>
          <HeaderContainer>
            <PulseDiv>
            <div>
              How are you feeling?
            </div>
            </PulseDiv>
          </HeaderContainer>
        </Typing>
    </FlexBox>
  );
};

export default Header;
