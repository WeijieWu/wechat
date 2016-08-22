module.exports.getToken = function * () {
  var token = yield WechatTokens.findOne({
    where: {
      ttl: {$gt: new Date().getTime()}
    },
    raw: true
  });
  if (token) {
    return token.token;
  }
  var param = {
    grant_type: "client_credential",
    appid: wechat.appid,
    secret: wechat.appsecret
  };
  var res = yield http.get(tokenUrl, param);
  var body = res.body;
  body = JSON.parse(body) || {};
  token = body.access_token;
  var expires_in = ((Number(body.expires_in) * 1000) + new Date().getTime()) - 2000;
  yield WechatTokens.create({
    token: token,
    ttl: expires_in
  });
  return token;
};