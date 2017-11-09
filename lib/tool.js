module.exports.gitResp = function (arg) {
  let head_commit = arg && arg['head_commit']
  return Object.assign({ ref: arg && arg.ref}, head_commit)
}