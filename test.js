var fork = require('child_process').fork
  , fs = require('fs')
  , path = require('path')

  , test = require('tape')
  , directory = path.join(__dirname, 'tmpfiles')
  , idx = 0
  , getFilename = function () {
      return path.join(directory, 'lockfile' + idx++)
    }

  , lockfile = require('./pidlockfile')

// fork this file in a few tests
if (process.argv.indexOf('child') !== -1) {
  lockfile.lock(process.env.FILENAME, function () {
    process.send('initialized')
  })

  return
}

test('setup', function (t) {
  require('rimraf').sync(directory)
  fs.mkdirSync(directory)

  t.end()
})

test('lock()/unlock()', function (t) {
  var filename = getFilename()

  lockfile.lock(filename, function (err) {
    t.error(err)
    lockfile.lock(filename, function (err) {
      t.ok(err)
      lockfile.unlock(filename, function (err) {
        t.error(err)
        lockfile.lock(filename, function (err) {
          t.error(err)
          t.end()
        })
      })
    })
  })
})

test('lock() when process SIGINT', function (t) {
  var filename = getFilename()
    , child = fork(__filename, ['child'], { env: { FILENAME: filename } })

  child.on('close', function () {
    lockfile.lock(filename, function (err) {
      t.error(err)
      fs.readFile(filename, function (err, pidfile) {
        t.error(err)
        t.equal(parseInt(pidfile, 10), process.pid)
        t.end()
      })
    })
  })

  child.on('message', function () {
    lockfile.lock(filename, function (err) {
      t.ok(err)
      child.kill('SIGINT')
    })
  })
})

test('lock() when process SIGKILL', function (t) {
  var filename = getFilename()
    , child = fork(__filename, ['child'], { env: { FILENAME: filename } })

  child.on('close', function () {
    lockfile.lock(filename, function (err) {
      t.error(err)
      fs.readFile(filename, function (err, pidfile) {
        t.error(err)
        t.equal(parseInt(pidfile, 10), process.pid)
        t.end()
      })
    })
  })

  child.on('message', function () {
    lockfile.lock(filename, function (err) {
      t.ok(err)
      child.kill('SIGKILL')
    })
  })
})
