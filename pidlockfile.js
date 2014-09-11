var fs = require('fs')

  , pid = process.pid.toString()

  , checkPid = function (filename, callback) {
      fs.readFile(filename, { encoding: 'utf8' }, function (err, otherPid) {
        if (err)
          return callback(err)

        otherPid = parseInt(otherPid, 10)

        try {
          process.kill(otherPid, 0)
          callback(new Error('Lockfile already acquired'))
        } catch(e) {
          callback(null)
        }
      })
    }

  , lock = function (filename, callback) {

      fs.writeFile(filename, pid, { flag: 'wx' }, function (err) {

        if (err && err.code === 'EEXIST') {
          return checkPid(filename, callback)
        }
        callback(err)
      })
    }
  , unlock = function (filename, callback) {
      fs.unlink(filename, callback)
    }

module.exports = {
    lock: lock
  , unlock: unlock
}