# pidlockfile

Ensure that at most one instance is running, based on PIDs.

Basing it on PIDs in this case means that even if a process dies without taking care of its pidfile, the next process who tries to create a new lockfile will be able to do so.

[![NPM](https://nodei.co/npm/pidlockfile.png?downloads&stars)](https://nodei.co/npm/pidlockfile/)

[![NPM](https://nodei.co/npm-dl/pidlockfile.png)](https://nodei.co/npm/pidlockfile/)

## Installation

```
npm install pidlockfile
```

## Example

### Input

```javascript
var lockFile = require('./pidlockfile')

  , filename = __dirname + '/LOCKFILE'

lockFile.lock(filename, function (err) {
  lockFile.lock(filename, function (err) {
    console.log(err)
    lockFile.unlock(filename)
  })
})
```

### Output

```
[Error: Lockfile already acquired]
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
