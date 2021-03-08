# QUESTIONS

## What would you add to your solution if you had more time?

- Pipeline with different files .env to store configs
- More features found in the example like:
  - dynamic grouping of orders
  - highlight changed orders

## What would you have done differently if you knew this page was going to get thousands of views per second vs per week?

- 100% test coverage for both unit tests and end to end tests
- More error handling. I have found that weird bugs are exposed with more people using the software.
- Better a11y. The accessibility/diversity increases as the views increase. I would go through the page with a screen reader and see if it makes sense. Then I would run an a11y tool like Axe to see what more I could do (color contrast is probably off)
- Internationalization. Thousands of views per second means that many are coming from different countries with different languages.
- Performance stress tests to see if the server can handle the load

## What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

In Javascript es2020, the optional chaining syntax has been a game changer for that pesky `undefined` or `null` object in the object chain. It also works for arrays or function calls.

```js
const x = { key1: { key2: 2 } },
x.key1?.key2 // 2
x.key5.key6 // undefined
```

In Nextjs v. 10.0.0, they added internationalized routing for both subpaths or domain based routing. Most people would say that the new optimized "<Image />" component is the best new feature; however, not all pages use images - like this app I built. This app would largely benefit from internationalizing it. All I would need to do is add this to the next.config.js:

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

## Can you describe common security concerns to consider for a frontend developer?

- XSS attacks or injecting scripts in the DOM. The script can be used to gain sensitive information from cookies or localStorage.
  Front end developers can be aware of these situations by sanitizing strings before using innerHtml. React uses harsh verbiage: `dangerouslySetInnerHTML` to discourage developers to inject string code directly into the DOM.

- NPM dependencies
  Most of us have heard about (left-pad)[https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/] and how one user deleted his npm package. Millions of people were affected when they received "npm ERR! 404 'left-pad' is not in the npm registry".
  Though recently, I've read about another exploit of npm packages using (dependency confusion)[https://blog.sonatype.com/dependency-hijacking-software-supply-chain-attack-hits-more-than-35-organizations]. Hackers would create the same name as a company's internal package and publish it publically. Let's say companyx publishes `x-package` internally. If I publish `x-package` publically and someone from companyx goes to install it, the public package would be installed.
  These are just 2 examples of many, so careful auditing of npm packages is a must.

## How would you improve the API that you just used?

I would do the calculations on the API side. I do like the simplicity of just sending the price/size in a tuple; however, it's too "lite". I would prefer that the API sended a sorted structure like this:

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

This is much clearer to the recipient of the API than [price, size]. I know documentation exists, but if there was no documentation, those are just random numbers.
