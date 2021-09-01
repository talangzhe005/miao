var talangzhe005 = (function(){
  'use strict'
  function chunk(array, size = 1){
    var res = []
    var a = []
    var count = 0
    for(var i = 0; i < array.length; i++){
      
      a.push(array[i])
      count++
      if(count == size){
        res.push(a)
        count = 0
        a = []
      }
    }
    if(a.length){
      res.push(a)
    }
    
    return res
  }

  function compact(array){
    var res = []
    for(var i = 0; i < array.length; i++){
      if(array[i]){
        res.push(array[i])
      }
    }
    return res
  }

  function concat(array, a){
    for(var i = 1; i < arguments.length; i++){
      if(Array.isArray(arguments[i])){
        array.push(...arguments[i])
      }else{
        array.push(arguments[i])
      }
    }
    return array
  }

  function difference(array, ...values){
    var res = []
    var val = [].concat(...values)

    for(var i = 0; i < array.length; i++){
      if(val.indexOf(array[i]) == -1){
        res.push(array[i])
      }
    }
    return res

  }


  function  differenceBy(array, ...values) {
    let f = values.pop()
    let val = [].concat(...values)
    let res = []
    if(typeof(f) == 'function'){
      let temp = []
      for (let i = 0; i < val.length; i++) {
        temp.push(f(val[i]))
      }
      
      for (let i = 0; i < array.length; i++) {
        if (temp.indexOf(f(array[i])) == -1){
          res.push(array[i])
        }
      }
    }else if(typeof(f) == 'string'){
      
    }



    return res

  }




  function join(array, separator = ','){
    var str = ''
    for(var i = 0; i < array.length; i++){
      str += array[i]
      if(i !== array.length -1){
        str += separator
      }
    }
    return str
  }

  function uniq(array){
    var res = []
    for(var i = 0; i < array.length; i++){
      if(res.indexOf(array[i]) == -1){
        res.push(array[i])
      }
    }
    return res
  }

  function drop(array, n = 1){
    var res = []
    for(var i = n; i < array.length; i++){
      res.push(array[i])
    }
    return res
  }

  function dropRight(array, n = 1){
    var res = []
    for(var i = 0; i < array.length - n; i++){
      res.push(array[i])
    }

    return res
  }

  function dropRightWhile(array, predicate) {
    var res = []

  }

  function fill(array, value, start = 0, end = array.length){
    for(var i = start; i < end; i++){
      array[i] = value
    }
    return array
  }
  
  function fromPairs(pairs){
    var obj = {}
    for(var i = 0; i < pairs.length; i++){
      obj[pairs[i][0]] = pairs[i][1]
    }
    return obj
  }

  function head(array){
    return array[0]
  }

  function indexOf(array, value, fromIndex = 0){
    if(fromIndex >= 0){
      for(var i = fromIndex; i < array.length; i++){
        if(array[i] == value){
          return i
        }
      }
    }else{
      for(var i = 0; i < array.length; i++){
        if(array[i] == value){
          return i
        }
      }
    }
    return -1
  }

  function initial(array){
    array.pop()
    return array
  }

  function last(array){
    return array[array.length - 1]
  }

  function lastIndexOf(array, value, fromIndex = array.length-1){
    for(var i = fromIndex; i >= 0; i--){
      if(array[i] == value){
        return i
      }
    }
    return -1
  }

  function nth(array, n = 0){
    if(n < 0){
      return array[array.length + n]
    }else{
      return array[n]
    }
  }

  function pull(array, ...values){
    
    for(var i = 0; i < values.length; i++){
      for(var j = 0 ; j < array.length; j++){
        if(array[j] == values[i]){
          array.splice(j, 1)
        }
      }
    }
    return array
  }

  function pullAll(array, values) {
    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < array.length; j++) {
        if (array[j] == values[i]) {
          array.splice(j, 1)
        }
      }
    }
    return array
  }

  function pullAllBy(array, values, iteratee= identity) {

  }

  function reverse(array){
    var c = array.length - 1
    for(var i = 0; i < Math.floor(array.length / 2); i++){
      var temp = array[i]
      array[i] = array[c]
      array[c] = temp
      c--
    }
    return array
  }

  function union(...arrays){
    var ary = concat(...arrays)
    return uniq(ary)
  }

  // function zip(...arrays){
  //   var ary = concat(...arrays)
  //   var res = [[],[]]
  //   for(var i = 0; i < ary.length; i++){
  //     if(i % 2 == 0){
  //       res[0].push(ary[i])
  //     }else{
  //       res[1].push(ary[i])
  //     }
  //   }
  //   return res
  // }
  function zip(...arrays){
    var res = []
    var maxLength = 0
    for(var i = 0; i < arrays.length; i++){
      if(arrays[i].length > maxLength){
        maxLength = arrays[i].length
      }
    }
    for(var i = 0; i < maxLength; i ++){
      var a = []
      
      for(var j = 0; j < arrays.length; j++){
        a.push(arrays[j][i])
      }
      res.push(a)
    }
    return res 
  }

  function unzip(array){
    var res = []
    var maxLength = 0
    for(var i = 0; i < array.length; i++){
      if(array[i].length > maxLength){
        maxLength = array[i].length
      }
    }
    for(var i = 0; i < maxLength; i ++){
      var a = []
      
      for(var j = 0; j < array.length; j++){
        a.push(array[j][i])
      }
      res.push(a)
    }
    return res 
  }

  function without(array, ...values){
      var res = []
      for(var i = 0; i < array.length; i++){
        var flag = true
        for(var j = 0; j < values.length; j++){
          if(values[j] == array[i]){
            flag = false
            break
          }
        }
        if(flag){
          res.push(array[i])
        }
      }
      return res
  }

  function xor(...arrays){
    var res = []
    var ary = concat(...arrays)
    
    for(var i = 0; i < ary.length; i++){
      var flag = true
      for(var j = i + 1; j < ary.length; j++){
        if(ary[i] == ary[j]){
          ary.splice(j, 1)
          flag = false
         
        }
      }
      if(flag){
        res.push(ary[i])
      }
    }
    return res
  }


  function sum(array){
    var sum = 0
    for(var i = 0; i < array.length; i++){
      sum += array[i]
    }
    return sum 
  }

  function sumBy(array, iteratee=identity) {
    
    if(typeof iteratee == 'function') {
      array = array.map(it => iteratee(it))
    }
    if(typeof iteratee == 'string') {
      array =  array.map(it => it[iteratee])
    }
    return sum(array)
  }

  function add(augend, addend){
    return augend + addend
  }

  function divide(dividend, divisor) {
    return dividend / divisor
  }


  function max(array){
    var max = array[0]
    for(var i = 1; i < array.length; i++){
      if(array[i] > max){
        max = array[i]
      }
    }
    return max 
  }

  function maxBy(array, iteratee = identity) {
    if (typeof iteratee == 'function') {
      array = iteratee(array)
    } else {
      array =  array.map(it => it.iteratee)
    }
    return max(array)
  }

  function min(array){
    if(array.length == 0){
      return undefined
    }
    var min = array[0]
    for(var i = 1; i < array.length; i++){
      if(array[i] < min){
        min = array[i]
      }
    }
    return min
  }

  function minBy(array, iteratee = identity) {
    let array1 
    if (typeof iteratee == 'function') {
      array1 = iteratee(array)
    }else {
      array1 = array.map(it => it.iteratee)
    }
    let minArr = min(array1)
    return matchesProperty(minArr)
  }

  function mean(array){
    return sum(array) / array.length
  }

  function meanBy(array, iteratee = identity) {
    if(typeof iteratee == 'function') {
      array = iteratee(array)
    }else {
      array = array.map(it => it.iteratee)
    }
    return mean(array)
  }

  function filter(collection, predicate) {

  }

  function iteratee (value) {
    
  }

  function findIndex(array, predicate, fromIndex = 0) {
    if (typeof(predicate) == 'function') {
      for (let i = fromIndex; i < array.length; i++) {
        if(predicate(array[i])) {
          return i 
        }
      }
      return -1 
    }
    if(Array.isArray(predicate)) {
      let key = predicate[0]
      let val = predicate[1]
      for (let i = fromIndex; i < array.length; i++ ){
        if(array[i][key] == val) {
          return i
        }
      }
      return -1
    }

    if(typeof(predicate) == 'object') {
      let str = JSON.stringify(predicate)
      for (let i = fromIndex; i < array.length; i++) {
        if(JSON.stringify(array[i]) == str) {
          return i
        }
      }
      return -1
    }

    if(typeof(predicate) == 'string') {
      let key = predicate
      for (let i = fromIndex; i < array.length; i++) {
        if(array[i][key]) {
          return i
        }
      }
      return -1
    }
  }

  function findLastIndex(array, predicate, fromIndex=array.length-1) {
    if(typeof(predicate) == 'function') {
      for (let i = fromIndex; i >= 0; i--) {
        if (predicate(array[i])){
          return i
        }
      }
      return -1
    }
    if (Array.isArray(predicate)) {
      let key = predicate[0]
      let val = predicate[1]
      for (let i = fromIndex; i >= 0; i--) {
        if(array[i][key] == val) {
          return i
        }
      }
      return -1
    }
    if (typeof(predicate) == 'object') {
      let str = JSON.stringify(predicate)
      for (let i = fromIndex; i >= 0; i--) {
        if(JSON.stringify(array[i]) == str) {
          return i
        }
      }
      return -1
    }
    if (typeof(predicate) == 'string') {
      let key = predicate
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i][key]) {
          return i
        }
      }
      return -1
    }
  }

  function flatten (array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        for (let k of array[i]) {
          res.push(k)
        }
      }else {
        res.push(array[i])
      }
    }
    return res
  }

  function flattenDeep(array) {
    let res = []
    for (let i = 0; i < array.length; i++){
      if (Array.isArray(array[i])) {
        let flattenArr = flattenDeep(array[i])
        for (let k = 0; k < flattenArr.length; k++) {
          res.push(flattenArr[k])
        }
      }else {
        res.push(array[i])
      }
    }
    return res
  }

  function flattenDepth(array, depth = 1) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (depth > 0 && Array.isArray(array[i])) {
        let flattenArr = flattenDepth(array[i], depth - 1)
        for (let j = 0; j < flattenArr.length; j++) {
          res.push(flattenArr[j])
        }
      }else {
        res.push(array[i])
      }
    }
    return res
  }

  function intersection(...arrays) {
    let res = arrays[0]
    for (let i = 0; i < arrays.length; i++) {
      res = res.filter(val => arrays[i].includes(val))
    }
    return res
  }

  function intersectionBy(arrays, iteratee = identity) {

  }

  function identity(...values) {
    return values[0]
  }

  function isUndefined(value) {
    if(typeof(value) == 'undefined') {
      return true
    }
    return false
  }

  function property(path) {
    if(!Array.isArray(path)) {
      path = path.split('.')
    }
    return function (object) {
      let res = object
      for (let i = 0; i < path.length; i++) {
        res = res[path[i]]
      }
      return res 
    }
  }

  function matches(source) {
    return function(object) {
      for (let k in source) {
        if(source[k] !== object[k]){
          return false
        }
      }
      return true
    }
  }

  function matchesProperty(path, srcValue) {
    return function(obj) {
      return obj[path] == srcValue
    }
  }

  function isEqual(value, other) {
    if (typeof(value) !== typeof(other)) {
      return false
    }
    
    if (Array.isArray(value)) {
      if (value.length !== other.length) {
        return false
      }
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== other[i]) {
          return false
        }
      }
      return false
    }

    if (typeof(value) == 'object') {
      if(Object.keys(value).length !== Object.keys(other).length) {
        return false
      }
      for (let k  in value) {
        if(!isEqual(value, other)) {
          return false
        }
        return true
      }
    }

    if(value == other) {
      return true
    }
    
    return false
  }

  function escape(string = '') {
    //转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
    let res = ''
    for(let i = 0; i < string.length; i++) {
      switch(string[i]) {
        case '&' :
          res += '&amp;'
          break
        case '<' :
          res += '&lt;'
          break
        case '>' :
          res += '&gt;'
          break
        case '\"' :
          res += '&quot;'
          break
        case '\'' :
          res += '&apos'
          break
        default:
          res += string[i]
      }
    }
    return res
  }

  function map (collection, iteratee=identity) {
    if (typeof iteratee == 'string') {
      iteratee = property(iteratee)
    }
    if(Array.isArray(iteratee)) {
      iteratee = matchesProperty(iteratee)
    }
    if(typeof iteratee == 'object') {
      iteratee = matches(iteratee)
    }

    let res = []
    for (let k in collection) {
      res.push(iteratee(collection[k], Number(k), collection))
    }
    return res
  }

  return {
    chunk : chunk,
    compact : compact,
    concat : concat,
    difference : difference,
    join : join,
    uniq : uniq,
    drop : drop,
    dropRight : dropRight,
    fill : fill,
    fromPairs : fromPairs,
    head : head,
    indexOf : indexOf,
    initial : initial,
    last : last,
    lastIndexOf : lastIndexOf,
    nth : nth,
    pull : pull,
    reverse : reverse,
    union : union,
    zip : zip,
    without : without,
    xor : xor,
    sum : sum,
    add : add,
    max : max,
    unzip : unzip,
    min : min,
    mean : mean,
    differenceBy: differenceBy,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten : flatten,
    flattenDeep : flattenDeep,
    flattenDepth: flattenDepth,
    intersection: intersection,
    identity: identity,
    isUndefined: isUndefined,
    property: property,
    pullAll: pullAll,
    isEqual: isEqual,
    matches: matches,
    escape: escape,
    map: map,
    sumBy: sumBy,
    divide: divide,
    maxBy: maxBy,
    meanBy: meanBy,
    minBy: minBy,
  }
})()