# Important note!

_Apollo should handle the majority of the state management for us. The remaining state is ethereal such as dropdown toggles, modal toggles, and list checkboxes. This type of state can be likely be handled as component state. If there is a very complex bit of state that is not fetched from the server, there is a small possiblity you want to include another state management library. The information below is for times like that._

# Very Difficult State Management

Ahhhh! I have the state woes!

So you are here because you are considering a more advanced state management solution!

First, determine what problem is causing your desire. Here are the basic categories of problems:

1. I have a lot of state -> Redux or Mobx
2. I have state that needs to be accessed in a lot of different areas of the app -> Try Context first
3. I have complex state mutations -> Redux

# Solutions

## Just Good ol' React State

Also consider the possibility that the problem does not require the addition of another tool but could be better solved by refactoring the existing state management. Try and determine if your state is isolated or global. Isolated state, espeially ephemeral state, is usually best stored inside of the component. (You can always create a wrapper component that handles the state, and isolate the rendering to a child.)

If you have global state (for example, a list of records that are loaded from the server, created, and edited), consider adding a library to track that data and have all components load from the central store.

It's important to consider the extra effort it will take in the future to maintain this extra dependency and the additional complexity of using this tool. In general, start simple, identify problems, analyze them, and choose the simplest tool to solve the problem at hand.

## React Context

If you chose problem 2 above, consider this solution first. The React context API allows you to use normal component state but share it by many disparate components. See the `AuthContext` component in this app for an example.

## Redux (with Rematch)

`redux` is a state management tool that follows functional programming principles. If you know you like functional programming, this is probably the way to go.

`redux` is especially good for complex state mutation because it has an amazing debugging tool called `redux-dev-tools` that lets you debug backwards in time.

_Note: Using `rematch` is recommended over plain `redux` because it simplifies the API into something significantly more reasonable. It's also pretty easy to setup and is basically always worth it._

## Mobx

If you like imperative programming better, look into Mobx instead of Redux. Do note that if your mutations are very complex Redux may provide a better experience.

## ReactN

A bit of a new kid on the block but gaining steam fast, ReactN is a simplistic library that provides a way to store global state using react's hooks API. Consider this as a lightweight solution.

# Conclusion

It is very unlikely you need any of the above tools. It will require evaulating each of them for the particular project and choosing the simplest that solves the problem.
