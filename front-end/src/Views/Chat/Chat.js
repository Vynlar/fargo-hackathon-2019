/* @jsx jsx */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '@styled-system/css';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

const GET_CURRENT_CHAT = gql`
  query GetCurrentChat {
    currentConversation {
      id
      owner {
        id
        name
      }
      fulfiller {
        id
        name
      }
      messages {
        id
        body
        owner {
          id
          name
        }
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($helpRequestId: ID!, $chatMessage: String!) {
    sendMessage(helpRequestId: $helpRequestId, body: $chatMessage) {
      id
    }
  }
`;

const Chat = ({ match }) => {
  const helpRequestId = match.params.id;
  const [chatMessage, setChatMessage] = useState('');

  return (
    <Mutation mutation={SEND_MESSAGE}>
      {sendMessage => {
        return (
          <Query query={GET_CURRENT_CHAT} pollInterval={2000}>
            {({ loading, error, data, refetch }) => {
              if (loading) return 'loading';
              console.log(error);
              if (error) return 'error';
              const chat = data.currentConversation;
              console.log(chat);
              if (chat.owner && chat.fulfiller) {
                // we know we are connected with someone
                const messages = chat.messages;
                return (
                  <div>
                    Messages:
                    {messages.map(({ id, body, owner }) => (
                      <div key={id}>
                        {owner.name}: {body}
                      </div>
                    ))}
                    <form
                      onSubmit={event => {
                        event.preventDefault();
                        sendMessage({
                          variables: { helpRequestId, chatMessage },
                        }).then(() => refetch());
                        setChatMessage('');
                      }}
                    >
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={event => setChatMessage(event.target.value)}
                      />
                      <button type="submit">Send</button>
                    </form>
                  </div>
                );
              } else {
                // we are waiting
                return 'waiting';
              }
            }}
          </Query>
        );
      }}
    </Mutation>
  );
};
Chat.propTypes = {};

export default Chat;
