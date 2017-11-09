module.exports.gitResp = function (arg) {
  let head_commit = arg && arg['head_commit']
  let result = Object.assign({ ref: arg && arg.ref}, head_commit)
  result.modified = JSON.stringify(result.modified)
  return result
}