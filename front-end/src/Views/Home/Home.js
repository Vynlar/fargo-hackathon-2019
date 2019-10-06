import React from 'react';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import FlexBox from 'Components/FlexBox';
import Button from 'Components/Button';
import Text from 'Components/Text';
import Page from 'Components/Page';
import { useAuth } from 'Components/AuthContext';

/* This is a component built using Emotion */
const Hover = styled.div`
  @keyframes hover {
    from {
      transform: translateY(0px) scale(1);

      filter: drop-shadow(0px 0px -1px rgba(0, 0, 0, 0.3));
    }
    to {
      transform: translateY(-25px) scale(1.1);
      filter: drop-shadow(0px 15px 5px rgba(0, 0, 0, 0.1));
    }
  }

  animation: hover 1.5s ease-in-out 1s infinite alternate;

  img {
    max-width: 70vw;
  }
`;

function Home() {
  const auth = useAuth();
  /* The component below is a flexbox layout component built using `styled-system` */

  return (
    <Page renderFooter={() => `Bushel!`}>
      <FlexBox col alignItems="center" p={4} py={5}>
        <Hover>
          <img
            alt=""
            src="https://bushel.ag/wp-content/uploads/2019/06/logo-616x117.png"
          />
        </Hover>

        {auth.isLoggedIn ? (
          <Button mt={30} mb={3} onClick={auth.logout} data-cy="logout">
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button mt={30} mb={2} data-cy="login">
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
