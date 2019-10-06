/* @jsx jsx */
import React from 'react';
import styled from '@emotion/styled/macro';
import { jsx } from '@emotion/core';
import css from '@styled-system/css';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FlexBox from 'Components/FlexBox';
import Box from 'Components/Box';
import Text from 'Components/Text';
import Button from 'Components/Button';
import Page from 'Components/Page';
import { useAuth } from 'Components/AuthContext';

function Home() {
  const auth = useAuth();
  /* The component below is a flexbox layout component built using `styled-system` */

  return (
    <Page>
      <FlexBox
        col
        alignItems="center"
        justifyContent="center"
        height="100vh"
        p={4}
        pt={5}
        pb="300px"
      >
        <Box pt={3}>
          <Text fontSize="50px" color="white" fontWeight={100}>
            <Text fontWeight="Bold">reach</Text>
            out
          </Text>
        </Box>
        <Box pb={4}>
          <Text
            fontSize="14px"
            color="white"
            fontWeight="bold"
            letterSpacing="1.4px"
          >
            CONNECT WITH OTHERS
          </Text>
        </Box>
        {auth.isLoggedIn ? (
          <Button my={3} onClick={auth.logout} data-cy="logout">
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login" pb={2} css={css({ alignSelf: 'stretch' })}>
              <Button my={2}>Login</Button>
            </Link>
            <Link to="/register" css={css({ alignSelf: 'stretch' })}>
              <Button my={2}>Register</Button>
            </Link>
          </>
        )}
      </FlexBox>
    </Page>
  );
}
Home.propTypes = {};

export default Home;
