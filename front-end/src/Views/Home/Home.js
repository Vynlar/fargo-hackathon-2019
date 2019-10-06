import React from 'react';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FlexBox from 'Components/FlexBox';
import Button from 'Components/Button';
import Page from 'Components/Page';
import { useAuth } from 'Components/AuthContext';

function Home() {
  const auth = useAuth();
  /* The component below is a flexbox layout component built using `styled-system` */

  return (
    <Page>
      <FlexBox col alignItems="center" p={4} py={5}>
        {auth.isLoggedIn ? (
          <Button my={3} onClick={auth.logout} data-cy="logout">
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button my={2} data-cy="login">
                Login
              </Button>
            </Link>
          </>
        )}
      </FlexBox>
    </Page>
  );
}
Home.propTypes = {};

export default Home;
