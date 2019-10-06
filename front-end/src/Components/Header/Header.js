import React from 'react';
import styled from '@emotion/styled';
import css from '@styled-system/css';
import Typing from 'react-typing-animation';
import { keyframes } from '@emotion/core';
import { pulse } from 'react-animations';
import { Link } from 'react-router-dom';

import Box from 'Components/Box';
import FlexBox from 'Components/FlexBox';
import Text from 'Components/Text';

const Header = () => {
  const pulseAnimation = keyframes`${pulse}`;
  const PulseDiv = styled.div`
    animation: 3s infinite ${pulseAnimation};
  `;

  const HeaderContainer = styled(Box)(
    css({
      width: '100%',
      mb: 3,
      mt: 5,
      fontSize: '24px',
      color: 'darkerGrey',
      justifyContent: 'center',
    })
  );

  return (
    <FlexBox justifyContent="center">
      <Box position="absolute" top={20} left={20}>
        <Link
          to="/main"
          css={css({
            textDecoration: 'none',
            color: 'black',
          })}
        >
          Back
        </Link>
      </Box>
      <Typing>
        <HeaderContainer>
          <PulseDiv>
            <Text>How are you feeling?</Text>
          </PulseDiv>
          <Text fontSize="16px">Select an option below to chat</Text>
        </HeaderContainer>
      </Typing>
    </FlexBox>
  );
};

export default Header;
