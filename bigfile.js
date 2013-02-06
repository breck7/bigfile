#!/usr/bin/env node
var fs = require("fs"),
    _ = require('underscore')

var args = process.argv.slice(2)
if (args.length < 1)
  path = __dirname
else
  path = args[0]

var ignoreHidden = false
if (args.length == 2)
  ignoreHidden = true

function scanDir (path) {
  // Strip a trailing slash
  path = path.replace(/\/$/, '')
  var queue = [path]
  var all = []
  var total = 0
  while (queue.length) {
    var dir = queue.pop()
    var files = fs.readdirSync(dir)
    if (ignoreHidden)
      files = _.filter(files, function (name) {return name.substr(0,1) != '.'})
    _.each(files, function (file, index, list) {
      var filepath = dir + '/' + file
      var stat = fs.statSync(filepath)
      if (stat.isDirectory())
        queue.push(filepath)
      else {
        all.push([filepath, stat.size])
        total += stat.size
      }
    })
  }
  all = _.sortBy(all, function(file){ return file[1] })
  all = all.reverse()
  // show top 10
  var max = (all.length > 10 ? 10 : all.length)
  console.log('Total: ' + (total/1000000).toFixed(1) + 'MB')
  console.log(max + ' biggest files:')
  for (i = 0; i < max; i++) {
    console.log(all[i][0] + ' ' + (all[i][1]/1000000).toFixed(1) + 'MB' + ' ' + (100 * all[i][1]/total).toFixed(0) + '%')
  }
}

scanDir(path)
