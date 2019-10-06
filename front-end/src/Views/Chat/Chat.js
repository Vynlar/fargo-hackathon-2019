/* eslint-disable react/prop-types */
/* @jsx jsx */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '@styled-system/css';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import FlexBox from 'Components/FlexBox';
import Box from 'Components/Box';
import Text from 'Components/Text';

const GET_CURRENT_CHAT = gql`
  query GetCurrentChat {
    currentConversation {
      id
      complete
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
    me {
      id
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

const Bubble = ({ name, children, me }) => {
  return (
    <FlexBox
      bg={me ? '4' : '0'}
      color="black"
      py={2}
      px={3}
      borderRadius={16}
      mb={3}
      alignSelf={me ? 'flex-end' : 'flex-start'}
      position="relative"
      maxWidth="80%"
    >
      <Box
        position="absolute"
        top="-18px"
        right={me ? '10px' : 'auto'}
        left={me ? 'auto' : '10px'}
        width="80vw"
        textAlign={me ? 'right' : 'left'}
      >
        <Text color="black" fontSize="12px">
          {name}
        </Text>
      </Box>
      {children}
    </FlexBox>
  );
};

const Chat = () => {
  const [chatMessage, setChatMessage] = useState('');

  return (
    <FlexBox column height="100vh" py={40} px={3}>
      <Mutation mutation={SEND_MESSAGE}>
        {sendMessage => {
          return (
            <>
              <Query query={GET_CURRENT_CHAT} pollInterval={500}>
                {({ loading, error, data, refetch }) => {
                  if (loading) return 'loading';
                  if (error) return 'error';
                  const chat = data.currentConversation;
                  const me = data.me;
                  if (chat.owner && chat.fulfiller) {
                    const otherPerson =
                      chat.owner.id === me.id ? chat.fulfiller : chat.owner;
                    // we know we are connected with someone
                    const messages = chat.messages;
                    return (
                      <div>
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
                        <FlexBox justifyContent="center" mb={4}>
                          <Text fontWeight="bold">{otherPerson.name}</Text>
                        </FlexBox>
                        <FlexBox column css={css({ overflowY: 'auto', pt: 3 })}>
                          <Text color="grey" fontSize="14px" pb={4}>
                            You have been connected with {otherPerson.name}. Say
                            hi!
                          </Text>
                          {messages.map(({ id, body, owner }) => (
                            <Bubble
                              name={owner.name}
                              me={me.id === owner.id}
                              key={id}
                            >
                              {body}
                            </Bubble>
                          ))}
                          {chat.complete && (
                            <Text color="grey" fontSize="14px" pb={4}>
                              The conversation has ended.
                            </Text>
                          )}
                        </FlexBox>
                        <form
                          onSubmit={event => {
                            event.preventDefault();
                            if (!chatMessage) return;
                            sendMessage({
                              variables: {
                                helpRequestId: chat.id,
                                chatMessage,
                              },
                            }).then(() => refetch());
                            setChatMessage('');
                          }}
                        >
                          <FlexBox
                            height="40px"
                            alignItems="stretch"
                            mb={3}
                            css={css({
                              display: chat.complete ? 'none' : 'flex',
                            })}
                          >
                            <input
                              type="text"
                              value={chatMessage}
                              onChange={event =>
                                setChatMessage(event.target.value)
                              }
                              placeholder="Type a message..."
                              css={css({
                                flex: 1,
                                border: '1px solid',
                                borderColor: '#bbb',
                                mr: 2,
                                borderRadius: '8px',
                                px: 2,
                              })}
                            />
                            <button
                              type="submit"
                              css={css({
                                bg: '4',
                                py: 2,
                                px: 3,
                                borderRadius: '8px',
                                height: '100%',
                                border: 'none',
                              })}
                            >
                              Send
                            </button>
                          </FlexBox>
                        </form>
                      </div>
                    );
                  } else {
                    // we are waiting
                    return (
                      <FlexBox column alignItems="center" textAlign="center">
                        <img
                          src="https://media.giphy.com/media/o5oLImoQgGsKY/giphy.gif"
                          css={css({
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            mb: 4,
                          })}
                        />
                        <Text fontSize={16} fontWeight="bold">
                          Please wait while we <br /> find you a match :)
                        </Text>
                      </FlexBox>
                    );
                  }
                }}
              </Query>
            </>
          );
        }}
      </Mutation>
    </FlexBox>
  );
};
Chat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Chat;
