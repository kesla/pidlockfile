var lockFile = require('./pidlockfile')

  , filename = __dirname + '/LOCKFILE'

lockFile.lock(filename, function (err) {
  lockFile.lock(filename, function (err) {
    console.log(err)
    lockFile.unlock(filename)
  })
})