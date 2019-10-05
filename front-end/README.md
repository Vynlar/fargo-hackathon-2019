# Please read this whole file to understand the conventions of the project

## Developer Setup

### Eslint Editor Plugin

Please install the eslint editor plugin, and enable automatic formatting on save. This allows you to write terrible, ugly code and have the editor format it for you. It's great! Give it a try!

## Project structure

The project is shaped like this:

```
src/
  Components/ <-- reusable components (input fields, buttons, navigation)
    ExampleButton
      index.js <-- does nothing but export the component
      MyComponent.js <-- the component definition. If using redux, should be a pure component with no state.
      MyComponent.test.js <-- Unit tests. Write unit tests only for component behavior that is non trivial.
      MyComponent.stories.js <-- 'Storybook' stories. Should create several examples for each reusable component.
      MyComponent.docs.md <-- Markdown documentation for this component. Include if the component is not self-explanatory. Consider documenting props inline rather than in this file. Be sure to import this file into the stories file so it will appear in Storybook.
      components/ <-- If needed (should be very rare), contains sub-components that are too large to live inside of the MyComponent file _and_ do not make sense on their own. Only use when MyComponent is very complex.
  Views/ <-- single-use components that do not make sense to re-use (pages, forms)
    ExampleHomePage
      See structure of MyComponent above
      components/ <-- components that do not make sense outside the context of this view
        See structure of MyComponent above
```

It is convention to use UpperCamelCase to title the top level directories to distinguish them when using absolute imports.
For example, we import a component like this:

```javascript
import Box from 'Components/Box';
```

# Building production assets

`yarn build`

The assets will appear in the `build` directory.

# Styling

Due to how `create-react-app` works, it is not possible to use the `babel-plugin-emotion`. Instead follow the directions here: https://emotion.sh/docs/babel-macros when using Emotion.

# Storybook

Storybook is a component library viewer. You can read about it [here](https://storybook.js.org/). When building a new component, instead of building it in-place in the app, instead, create a story for it inside of Storybook and develop it there. This encourages you to create generic components. Also, it creates a collection of examples of how to use the component and can even contain documentation.

# Apollo

[Apollo](https://www.apollographql.com/) is a GraphQL ecosystem of which this project uses the Apollo GraphQL client + react integration. There is also a Node.js server and enterprise platform but those are not included. The Apollo client is preconfigured in this project, along with an authentication system that works out-of-the-box with the included Laravel server. There are examples included in the `UserList`, `UserProfile` and `Login` components of how queries and mutations work using Apollo.

# Testing

## Jest

To run the tests: `yarn test`

See the file `TESING_GUIDE.md` for a more in-depth guide to testing.

This will also run snapshot tests for all the Storybook stories:

## Automatic snapshot testing

All stories in the Storybook are automatically snapshot tested in the unit tests when running `jest`. This means that if any changes occur to the HTML output, the test will fail. This prevents unintended regressions.

## Cypress

To run the tests: `yarn cypress:open`. From here you can run individual tests or run a complete suite.

# Bunzle Size Analysis

We recommend using `source-map-explorer` to analyze the app bundle. We recommend running this tool with every new dependency to check in on the size of the bundle to understand the impact of these additions.

To view the bundle analysis run `yarn analyze`

# State Management

See the `STATE_MANAGEMENT.md` file for more information on state management.
