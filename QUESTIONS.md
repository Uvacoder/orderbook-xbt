# QUESTIONS

## What would you add to your solution if you had more time?

- More features that are found in the example like:
  - dynamic grouping or spread of orders
  - highlight changed orders
  - adding/subtracting rows
- Change the way I implemented the websockets. I just found [this npm package](https://github.com/robtaussig/react-use-websocket#readme) that has features like `retryOnError` and `reconnectAttempts` that I did not yet implement.
- A pipeline with different .env files to store environemnt configs

## What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

- 100% test coverage for both unit tests and end to end tests
- Better/more error handling. I have found that weird bugs are exposed when more people use the software.
- Better a11y. The need for accessibility increases as the views increase. I would go through the page with a screen reader and see if it makes sense. Then I would run an a11y tool like Axe to see what more I could do.
- Internationalization. Thousands of views per second means that many are coming from different countries with different languages.
- Performance stress tests to see if the server can handle the load

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

In Javascript ES2020, the Optional Chaining syntax has been a game changer for that pesky `undefined` or `null` object in the chain. It also works for arrays or function calls.

```js
const x = { key1: { key2: 2 } },
x.key1?.key2 // 2
x.key5?.key6 // undefined
```

Nullish Coalescing is a close second. It works just like the logical OR `||` operator, but only for `undefined` and `null` instead of all falsey values

```js
const nilch = null
const emptyText = '' // falsy
const answerToUniverse = 42

const valA = nilch ?? 'default received' // default received
const valB = emptyText ?? 'default received' // ''
const valC = answerToUniverse ?? 0 // 42
```

In Nextjs v.10.0.0, they added internationalized routing for both subpaths or domain based routing. Most people would say that the new optimized "<Image />" component is the best new feature; however, not all pages use images - like this app I built. This app would largely benefit from internationalizing it. All I would need to do is add this to the next.config.js:

```js
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US'
  }
}
```

and the locale gets added to each page. Example /blog is english, /fr/blog would be french. Beautifully simple.

## How would you track down a performance issue in production? Have you ever had to do this?

I've had to do this many a times. I have found, under stress, that the best way is to keep calm and ask the right questions. For example, "Where is it coming from (server/network?, react?, css?)", "Can you replicate it?", "At what point did it start slowing down so we can isolate the code?", "Do we have any logs or app trackers which would clue us in?".
Make sure to use all the tools available, from the perfomance, network, and lighthouse tab in Chrome to other 3rd party tooling. Once the problem is isolated, the search for the best solution begins.

##### Different Performance Scenarios:

- Initial webpage taking a while to load: run lighthouse. Most of the time, the issue comes from unoptimized images/videos, large JS bundle size, and 3rd party scripts. Lazy load images and 3rd party scripts, find smaller dependencies/get rid of legacy code, gzip everything, make sure code is obfuscated in production mode, and only load what is needed above the fold. Everything else _could_ theoretically be dynamically imported through code splitting.

- Browser has trouble painting the DOM: check animations and only load them on fast connections, reduce CSS complexity/bundle size, throttle/debounce resize and positions changes.

- User interactions are slow (because of Javascript/React): Memoize complex calculations and cache repeated data, avoid reconciliation for React, use asynchronous functions or service workers when needed so that the main thread is not blocked.

- Algorithms are slow: re-check your BigO Notation. Most of the time, you have too many loops within loops. Ask yourself, "what can be cached or put in a hashmap or 'bucket'?"

## Can you describe common security concerns to consider for a frontend developer?

- XSS (cross scripting) attacks or injecting scripts in the DOM. The script can be used to gain sensitive information from cookies or localStorage. Front end developers can be aware of these situations by sanitizing strings before using innerHtml. React uses harsh verbiage: `dangerouslySetInnerHTML` to discourage developers from injecting stringified code directly into the DOM.

- NPM dependencies. Most of us have heard about [left-pad](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/) and how one user deleted his npm package. Millions of people were affected when they received "npm ERR! 404 'left-pad' is not in the npm registry".
  Although recently, I've read about another exploit of npm packages using [dependency confusion](https://blog.sonatype.com/dependency-hijacking-software-supply-chain-attack-hits-more-than-35-organizations). Hackers would create the same name as a company's internal package and publish it publically. Let's say company-x publishes `x-package` internally. If I publish `x-package` publically and someone from company-x goes to install it, the public package would be installed instead of the private package.
  These are just 2 examples of many, so careful auditing of npm packages is a must.

- Handling user authentication. Encrypt passwords. Log users out if they are not active and make them sign in after a certain amount of days. Prevent CSRF attacks by using an unpredictable token tied to the user's account.

- Don't log sensitive information!!!

## How would you improve the API that you just used?

- I would do all the calculations on the API side. I do like the simplicity of just sending the price/size in a tuple; however, it's too "lite". I would prefer that the API send a sorted structure like this:

```json
{
  asks: "[
    {
      price: ...,
      size: ...,
      total: ...,
    },
    ....
  ]",
  bids: "[...same thing...]",
  feed: "book_ui_1",
  product_id: "..."
}
```

This is much clearer to the recipient of the API than [price, size]. Without that initial PDF document sent to me, I would've taken a longer time figuring out what those numbers mean.

- No ping/pong? We had this at tZERO and it was helpful debugging websocket bugs
