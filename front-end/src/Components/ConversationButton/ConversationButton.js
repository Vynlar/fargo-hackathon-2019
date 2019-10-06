/* @jsx jsx */
import React from 'react';
import { path } from 'ramda';
import PropTypes from 'prop-types';
import css from '@styled-system/css';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import Box from 'Components/Box';

const GET_CURRENT_CONVERSATION = gql`
  query GetCurrentConversation {
    currentConversation {
      id
      matched
    }
  }
`;

const ConversationButton = () => {
  return (
    <Box position="fixed" bottom="0" left="0" right="0">
      <Query query={GET_CURRENT_CONVERSATION}>
        {({ loading, error, data }) => {
          console.log(data);
          const isMatched = path(['currentConversation', 'matched'])(data);
          if (loading || error || !isMatched) return '';
          return (
            <Link
              to="/chat"
              css={css({
                textDecoration: 'none',
                fontWeight: 'bold',
                color: 'black',
              })}
            >
              <Box bg="0" p={3} textAlign="center">
                View Current Conversation
              </Box>
            </Link>
          );
        }}
      </Query>
    </Box>
  );
};
ConversationButton.propTypes = {};

export default ConversationButton;
