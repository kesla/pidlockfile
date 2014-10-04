var fs = require('fs')

  , pid = process.pid.toString()

  , checkPid = function (filename, callback) {
      fs.readFile(filename, { encoding: 'utf8' }, function (err, otherPid) {
        if (err && err.code === 'ENOENT')
          return callback()
        else if (err)
          return callback(err)

        otherPid = parseInt(otherPid, 10)

        try {
          process.kill(otherPid, 0)
          callback(new Error('Lockfile already acquired'))
        } catch(e) {
          // remove the pidfile if the previous process didn't remove it
          // properly
          fs.unlink(filename, callback)
        }
      })
    }

  , check = function (filename, callback) {
      fs.readFile(filename, { encoding: 'utf8' }, function (err, pid) {
        if (err) return callback(err)

        pid = parseInt(pid, 10)

        try {
          process.kill(pid, 0)
          callback(null, true)
        } catch(e) {
          callback(null, false)
        }
      })
    }

  , lock = function (filename, callback) {

      checkPid(filename, function(err) {
        if (err)
          return callback(err)

        fs.writeFile(filename, pid, { flag: 'wx' }, callback)
      })
    }
  , unlock = function (filename, callback) {
      fs.unlink(filename, callback)
    }

module.exports = {
    lock: lock
  , check: check
  , unlock: unlock
}