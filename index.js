const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const axios = require('axios')

const router = new Router()

const { WECHAT_CORP_ID, WECHAT_CORP_SECRET, WECHAT_GET_TOKEN_URL } = require('./config')

router.get('/test', async (ctx) => {
   const {
    data: { errcode, errmsg, access_token, expires_in }
  } = await axios.request({
    method: 'get',
    url: WECHAT_GET_TOKEN_URL,
    params: { corpid: WECHAT_CORP_ID, corpsecret: WECHAT_CORP_SECRET }
  })
  ctx.body = {
    errcode, errmsg, access_token, expires_in
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('app is running')
})
