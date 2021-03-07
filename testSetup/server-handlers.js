// server-handlers.js
// this is put into here so I can share these same handlers between my tests
// as well as my development in the browser.
import { rest } from 'msw'

const handlers = [
  // rest.get('/api/orderBook', async (req, res, ctx) => {
  //   // TODO:
  //   return res(ctx.json({}))
  // })
]

export { handlers }
