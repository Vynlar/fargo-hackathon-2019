# Jest

## Snapshot Testing

Snapshot tests are simple. You render a component and store the output in a file. When you run the test in the future, the test output is compared to the stored file and fails the test if there are any changes.

These tests are useful because they catch unintended rendering regressions. For example, if you add a feature to the `Button` component but you accidentally break how a different prop affects the `Button`, a snapshot test will catch this.

_Note: Don't write snapshot tests yourself. Instead, create a `@storybook/react` story. All the stories are automatically snapshot tested with the added benefit of creating a more complete storybook._

## Integration Testing

Snapshot testing only tests rendering, but not component behavior. If a component (or ideally group of components that implement a feature) is sufficiently complex to require testing (you'll have to develop a feel for this), you can consider writing some integration tests.

These integration tests should stay as close to real user interaction as possible. For example, avoid interacting with programatic interfaces like props and state, but rather, think like a user. Essentially, only interact though props like `onClick` and `onChange`, as well as reading the rendering results.

`react-testing-library` provides tools that help with writing these tests. I recommend reading the repository page to learn: https://github.com/testing-library/react-testing-library

# Cypress

`Cypress` is a tool that takes testing one step further; Cypress automates a browser to perform tests. Cypress tests are naturally slower due to their higher complexity and therefore should test higher level features.

There are two types of Cypress tests: Integration and End-to-end.

## Integration Testing

Integration tests test the UI without ever touching the server. Any network traffic is mocked/stubbed out. These tests run _much_ faster than end-to-end tests.

Refer to this page: https://docs.cypress.io/guides/guides/network-requests.html#Testing-Strategies for a deeper introduction to the difference.

# End-to-end Testing

End-to-end tests should be used sparingly. Typically there will be only one test per feature that tests only the happy path.

# Summary

In general, nearly every component should have snapshot tests because they are trivial to implement.

Only some components/features will have Jest Integration tests. As a rule of thumb, if there is behavior more complex than a simple form or button, consider writing some basic integration tests. Avoid testing components in isolation but rather try and test collections of components that implement an entire feature.

Cypress tests should be used to validate that the entire app's components are working together. There is some overlap between Jest and Cypress integration tests. When choosing between them, prefer the one that will be easier to implement, but if they are similar in difficulty, prefer Jest because it is more performant.

There can be several Cypress integration tests per feature, but be careful about ones that touch the server.

For all of the above libraries, I recommend reading their documentation and perhaps watching talks of people who have used the tools before.

I recommend the following Cypress resources:

1. Core concepts section: https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html
2. Best practices: https://docs.cypress.io/guides/references/best-practices.html
3. Best practices video talk: https://www.youtube.com/watch?v=5XQOK0v_YRE
