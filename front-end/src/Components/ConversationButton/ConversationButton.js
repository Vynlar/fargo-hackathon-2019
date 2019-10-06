/* @jsx jsx */
import React from 'react';
import PropTypes from 'prop-types';
import css from '@styled-system/css';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

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
    <Query query={GET_CURRENT_CONVERSATION}>
      {({ loading, error, data }) => {
        console.log(data);
        if (loading || error || !data.currentConversation.matched) return '';
        return (
          <Link to={`/chat/${data.currentConversation.id}`}>
            View Current Conversation
          </Link>
        );
      }}
    </Query>
  );
};
ConversationButton.propTypes = {};

export default ConversationButton;
