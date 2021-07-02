# Getting Started with LetMeAsk App

This project was developed during the NLW Together Event by [Rocketseat](https://www.rocketseat.com.br).

## Concept

It is a simple Question & Answer (aka Q&A) app.
Use case:
Admin creates a room specifically for a day (or a topic), for example and pass the room ID to the audience.

Audience goes to the main page, insert the code they have and click "Join room".
They join the room and can start making questions to the admin.

**Basic permissions:**
Admin: _Answer, highlight and delete questions._
Audience: _Send and like questions._

## How to test

Open a terminal/CLI navigate to the project directory and run:

`yarn`

or

`npm`

Yarn/NPM will install dependencies.

Then you can run the app with

`yarn start`

or

`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Extra features changed from the original

- Created components
- Added modal for confirmations
- Custom Favicon

#### TODO branch

- Answer question function (auto check as answered)
- Create Modal component and custom styles
- Create user types and permissions (today every authenticated user is an admin)
- Refine styles
- Use other databases
- Create dark mode
- Responsivity
- PWA Version
- Styled Components

**Used Packages/Components**

- [https://www.npmjs.com/package/react-modal](React Modal): Accessible modal dialog component for React.JS
- [https://www.npmjs.com/package/sass](SASS): A pure JavaScript implementation of Sass
- [https://www.npmjs.com/package/date-fns](Date-fns): provides the most comprehensive, yet simple and consistent toolset
  for manipulating JavaScript dates in a browser & Node.js.
- [https://www.npmjs.com/package/firebase](Firebase): Intended for end-user client access from environments such as the Web.
- [https://firebase.google.com](Google Firebase Main page): provides the tools and infrastructure you need to develop, grow, and earn money from your app. This package supports web (browser), mobile-web, and server (Node.js) clients.
- [https://www.npmjs.com/package/classnames](Classnames): A simple JavaScript utility for conditionally joining classNames together.
