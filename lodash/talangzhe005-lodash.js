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

  function unionBy(...arrays) {
    let iteratee = arrays.pop()
    let res = []
    let temp = []
    var ary = concat(...arrays)
    if (typeof iteratee == 'function') {
      for (let k in ary) {
        if (!(temp.includes(iteratee(ary[k])))){
          res.push(ary[k])
          temp.push(iteratee(ary[k]))
        }
      }
    }
    if (typeof iteratee == 'string') {
      for (let i = 0; i < ary.length; i++) {
        if(!((ary[i][iteratee] in temp))) {
          res.push(ary[i])
          temp.push(ary[i][iteratee])
        }
      }
    }
    return res 

  }

  function uniqWith(array, comparator) {

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
      array1 = array.map(it => iteratee(it))
    } else {
      array1 =  array.map(it => it[iteratee])
    }
    let max = max(array)
    return filter(array, matches(max))
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
      array1 = array.map(it => iteratee(it))
    }else {
      array1 = array.map(it => it[iteratee])
    }
    let minArr = min(array1)
    return filter(array, matches(minArr))
  }

  function multiply(multiplier, multiplicand){
    return multiplier * multiplicand
  }

  function subtract(minuend, subtrahend) {
    return minuend - subtrahend
  }

  function mean(array){
    return sum(array) / array.length
  }

  function meanBy(array, iteratee = identity) {
    if(typeof iteratee == 'function') {
      array = array.map(it => iteratee(it))
    }else {
      array = array.map(it => it[iteratee])
    }
    return mean(array)
  }

  function clamp(number, lower, upper) {
    if (number < lower) {
      return lower
    }else if(number > upper) {
      return upper
    }else {
      return number
    }
  }

  function inRange(number, start = 0, end) {
    if (end == undefined) {
      end = start
      start = 0 
    }
    if (start > end) {
      let temp = start
      start = end
      end = temp
    }
    if(number >= start && number < end) {
      return true
    }else {
      return false
    }
  }

  function filter(collection, predicate = identity) {
    if (typeof predicate == 'string') {
      predicate = property(predicate)

    }
    if (Array.isArray(predicate)) {
      predicate = matchesProperty(predicate)
    }
    if (typeof predicate == 'object') {
      predicate = matches(...predicate)
    }
    let res = []
    for (let key in collection) {
      if(predicate(collection[key], key, collection) === true) {
        res.push(collection[key])
      }
    }
    return res
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

  // function isUndefined(value) {
  //   if(typeof(value) == 'undefined') {
  //     return true
  //   }
  //   return false
  // }

  function isUndefined(value) {
    return value === undefined
  }

  //创建一个返回给定对象的 path 的值的函数。
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
    
    if (Array.isArray(value) && Array.isArray(other)) {
      if (value.length !== other.length) {
        return false
      }
      for (let i = 0; i < value.length; i++) {
        if(typeof(value[i]) !== typeof(other[i])) {
          return false
        }
        if(typeof(value[i]) == 'object') {
          if(!(isEqual(value[i], other[i])) ) {
            return false
          }
        }
        // if (value[i] !== other[i]) {
        //   return false
        // }
      }
      return true
    } 

    if (typeof(value) == 'object') {
      if(Object.keys(value).length !== Object.keys(other).length) {
        return false
      }
      for (let k  in value) {
        if(!isEqual(value[k], other[k])) {
          return false
        }
      }
      return true
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

  function tail(array){
    let res = array.slice()
    res.shift()
    return res 
  }

  function take(array,  n = 1) {
    return array.slice(0, n)
  }

  function lt(value, other) {
    return value < other
  }

  function lte(value, other) {
    return value <= other
  }

  function toArray(value) {
    let res = []
    if(typeof value == 'object' || typeof value == 'string') {
      for(let k in value) {
        res.push(value[k])
      }
    }
    return res 
  }

  function toFinite(value) {
    if(value === Infinity) {
      return Number.MAX_VALUE
    }
    if(value === -Infinity) {
      return Number.MIN_VALUE
    }
    return Number(value)
  }

  function toInteger(value) {
    let val = toFinite(value)
    let digit  = val % 1
    if(digit) {
      return val - digit
    }else {
      return val 
    }
  }
  
  function toLength(value) {
    const MAX_ARRAY_LENGTH = 4294967295
    if(! value) {
      return 0
    }
    value = toInteger(value)
    if(value > MAX_ARRAY_LENGTH ) {
      return MAX_ARRAY_LENGTH
    }
    return value
  }

  function toNumber(value) {
    return Number(value)
  }

  function assign(object, ...sources) {
    for (let i = 0 ; i < sources.length; i++) {
      for (let k of Object.keys(sources[i])) {
        object[k] = sources[i][k]
      }
    }
    return object
  }

  function toSafeInteger(value) {
    if(value > Number.MAX_SAFE_INTEGER) {
      return Number.MAX_SAFE_INTEGER
    }
    if(value < Number.MIN_SAFE_INTEGER) {
      return Number.MIN_SAFE_INTEGER
    }
    return toInteger(value)
  }

  function values(object) {
    let res = []
    for(let k in object) {
      res.push(object[k])
    }
    return res
  }

  function repeat(string='', n = 1) {
    let res = ''
    for (let i = 0; i < n; i++) {
      res += string
    }
    return res
  }

  function replace(string='', pattern, replacement) {
    return string.replace(pattern, replacement)
  }

  function toPairs(object) {
    let res = []
    for (let k in object) {
      if(object.hasOwnProperty(k)){
        res.push([k, object[k]])
      }
    }
    return res 
  }

  function sortedIndex(array, value) {
    for (let i =0; i < array.length; i++) {
      if (array[i] >= value) {
        return i 
      }
    }
  }
  
  function sortedIndexBy(array, value, iteratee = identity) {
    if (typeof iteratee == 'function') {
      array = map(array, it => iteratee(it))
      return sortedIndex(array, iteratee(value))
    }
    if (typeof iteratee == 'string') {
      array = map(array, it => it[iteratee])
      return sortedIndex(array, value[iteratee])
    }
    
  }

  function sortedIndexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
      if(array[i] == value) {
        return i 
      }
    }
    return -1 
  }

  function sortedLastIndex(array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if(array[i] <= value) {
        return i + 1
      }
    }
    return 0
  }

  function sortedLastIndexBy(array, value, iteratee = identity) {
    if (typeof iteratee == 'function') {
      array = map(array, it => iteratee(it)) 
      return sortedLastIndex(array, iteratee(value))
    }
    if(typeof iteratee == 'string') {
      array = map(array, it => it[iteratee]) 
      return sortedLastIndex(array, value[iteratee])
    }
  }

  function sortedLastIndexOf(array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if(array[i] == value) {
        return i
      }
    }
  }

  function sortedUniq(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if(!res.includes(array[i])) {
        res.push(array[i])
      }
    }
    return res.sort((a,b) => a-b)
  }

  function sortedUniqBy(array, iteratee) {
    let res = []
    let temp = []
    for (let i = 0; i < array.length; i++) {
      if(!temp.includes(iteratee(array[i]))) {
        res.push(array[i])
        temp.push(iteratee(array[i]))
      }
    }
    return res.sort((a,b) => a - b)
  }

  function takeRight(array, n = 1) {
    let res = []
    if (n > array.length) {
      n = array.length
    }
    for (let i = array.length - 1; n > 0; i--, n--  ) {
      res.unshift(array[i])
    }
    return res
  }

  function takeRightWhile(array, predicate = identity) {
    let res = []
    for (let i = array.length - 1; i >= 0; i--) {
      if (typeof predicate == 'function') {
        if (predicate(array[i])) {
          res.unshift(array[i])
        }else {
          break
        }
      }else if (typeof predicate == 'string') {
        if(!(predicate in array[i])){
          res.unshift(array[i])
        }else {
          break
        }
      }else if (Array.isArray(predicate)) {
        if(array[i][predicate[0]] == predicate[1]) {
          res.unshift(array[i])
        }else {
          break
        }
      }else if (typeof predicate == 'object') {
        let isSame = true
        for(let k in array[i]) {
          if (predicate[k] !== array[i][k]){
            isSame = false
          }
        }
        if(isSame) {
          res.unshift(array[i])
        }else {
          break
        }
      }

    }
    return res
  }

  function takeWhile(array, predicate = identity) {
    let res = []
    if (typeof predicate == 'function') {
      for (let i = 0; i < array.length; i++) {
        if(predicate(array[i])){
          res.push(array[i])
        }else {
          break
        }
      }
    }else if (typeof predicate == 'string') {
      for (let i = 0; i < array.length; i++) {
        if(!(predicate in array[i])){
          res.push(array[i])
        }else {
          break
        }
      }
    }else if (Array.isArray(predicate)) {
      for (let i = 0; i < array.length; i++) {
        if(array[i][predicate[0]] == predicate[1]){
          res.push(array[i])
        }else {
          break
        }
      }
    }else if (typeof predicate == 'object') {
      let isSame = true
      for (let i = 0; i < array.length; i++) {
        
          
          for (let k in array[i]) {
            if(array[i][k] !== predicate[k]){
              isSame = false
            }
          }
          if(isSame) {
            res.push(array[i])
          }else {
            break
          }
          
        
      }
    }
    return res 
  }

  function ary(func,  n = func.length) {
    return function (...args) {
      return func(...args.slice(0, n))
    }
  }

  function unary(func) {
    return function (...args) {
      let args1 = [].concat(...args)
      return func(args1[0])
    }
  }

  function negate(predicate) {
    return function (...args) {
      return !predicate(...args)
    }
  }

  function once(func) {
    let flag = true
    let res = null
    return function(...args) {
      if(flag){
        res = func(...args)
        flag = false
      }
      return res
    }
  }

  function spread(func, start = 0) {
    return function(ary) {
      return func.apply(this, ary)
    }
  }
  
  function memoize(func, resolver) {
    let map = new Map()
    let that = this
    return function(args) {
      if(map.has(args)){
        return map.get(args)
      }else {
        let res = func.apply(that, arguments)
        if (resolver !== undefined) {
          res = resolver(res)
        }
        map.set(args, res)
        return res
      }
    }
  }

  function flip(func) {
    return function(...args) {
      return func(...args.reverse())
    }
  }

  function conforms(source) {
    let keys = Object.keys(source)
    return function(obj){
      for(let k of keys) {
        if(!(source[k] (obj[k]))) {
          return false
        }
      }
      return true
    }
  }

  function constant(value) {
    return function() {
      return value
    }
  }

  function flow(...funcs) {
    const length = funcs.length
    return function(...args) {
      let index = 0
      let result = length ? funcs[index].apply(this, args) : args[0]
      while (++index < length) {
        result = funcs[index].call(this, result)
      }
      return result
    }
  }

  function isArray(value) {
    return Array.isArray(value)
  }

  function isArrayBuffer(value) {
    return value.toString() === '[object ArrayBuffer]'
  }

  function isArrayLike(value) {
    return typeof(value) !== 'function' && value.length >=0
  }

  function isArrayLikeObject(value) {
    return isArrayLike(value) && typeof(value) == 'object'
  }

  function isBoolean(value) {
    return Object.prototype.toString.call(value) == '[object Boolean]'
  }

  function isDate(value) {
    return Object.prototype.toString.call(value) == '[object Date]'
  }

  function isElement(value) {
    return toString.call(value) == '[object HTMLBodyElement]'
  }

  function isEmpty(value) {
    if (isArray(value)){
      return value.length == 0
    }else if(typeof value == 'object') {
      let res = []
      for (let k in value) {
        res.push(k)
      }
      if(res.length > 0) {
        return false
      }
    }
    return true
  }

  function isError(value) {
    return toString.call(value) == '[object Error]'
  }

  function isFinite(value) {
    return Number.isFinite(value)
  }

  function isFunction(value) {
    return typeof(value) == 'function'
  }

  function isInteger(value) {
    return value % 1 == 0 && typeof(value) == 'number'
  }

  function isLength(value) {
    return isInteger(value) && value >= 0
  }

  function isMap(value) {
    return toString.call(value) == '[object Map]'
  }

  function isArguments(value) {
    return toString.call(value) == '[object Arguments]'
  }

  function isNull(value) {
    return value === null
  }

  function isNative(value) {
    return toString.call(value)
  }
  
  function isObject(value) {
    if (value == null) {
      return false
    }
    return typeof(value) == 'object' || typeof(value) == 'function'
  }

  function gte(value, other) {
    return value >= other
  }

  function gt(value, other) {
    return value > other
  }

  function eq(value, other) {
    if(value !== value && other !== other) {
      return true 
    }
    return value === other
  }

  function times(n, iteratee = identity) {
    let res = []
    for (let i = 0; i < n; i++) {
      res.push(iteratee(i))
    }
    return res
  }

  function castArray(value) {
    if(arguments.length == 0) {
      return []
    }
    if(Array.isArray(value)) {
      return value
    }
    return [value]
  }

  function toPath(value) {
    let reg = /\w+/g
    return value.match(reg)
  }

  function pullAt(array, ...indexes) {
    let arr = [].concat(...indexes)
    let ary = []
    let pulled = []
    for (let i = 0; i < array.length; i++) {
      if(arr.includes(i)) {
        pulled.push(array[i])
      }else {
        ary.push(array[i])
      }
    }
    array = ary
    return pulled
  }

  function omit(object, props) {
    let obj = {}
    for (let k in object) {
      if (!(props.includes(k))){
        obj[k] = object[k]
      }
    }
    return obj
  }

  function omitBy(object, predicate = identity) {
    let obj = {}
    for (let k in object) {
      if (!(predicate(object[k], k))) {
        obj[k] = object[k]
      }
    }
    return obj
  }

  function  pick(object, props) {
    let obj = {}
    for (let k in object) {
      if(props.includes(k)) {
        obj[k] = object[k]
      }
    }
    return obj
  }

  function pickBy(object, predicate = identity) {
    let obj = {}
    for (let key in object) {
      if (predicate(object[key], key)) {
        obj[key] = object[key]
      }
    }
    return obj

  }

  function get(object, path, defaultValue) {
    if(!(Array.isArray(path))) {
      path = toPath(path)
    }
    for (let i = 0; i < path.length; i++) {
      if (object == undefined) {
        return defaultValue
      }else {
        object = object[path[i]]
      }
    }
    return object
  }

  function forIn(object, iteratee = identity) {
    for (let k in object) {
      if(iteratee(object[k], k, object) == false) {
        break
      }
    }
    return object
  }

  function forInRight(object, iteratee = identity) {
    let arr = []
    for (let k in object) {
      arr.push(k)
    }
    for (let i = arr.length - 1; i >=0; i--) {
      let key = arr[i]
      if(iteratee(object[k], k, object) == false) {
        break
      }
    }
    return object

  }

  function isNumber(value) {
    return toString.call(value) == '[object Number]'
  }

  function isNaN(value) {
    if(typeof value == 'object') {
      value = value.valueOf()
    }
    return value !== value
  }

  function isNil(value) {
    return value == undefined
  }

  function isObjectLike(value) {
    return value !== null && typeof value == 'object'
  }

  function isPlainObject(value) {
    return value.__proto__ == Object.prototype || value.__proto__ === null
  }

  function isRegExp(value) {
    return toString.call(value) == "[object RegExp]"
  }

  function isSafeInteger(value) {
    return isInteger(value) && value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER
  }

  function isSet(value) {
    return toString.call(value) == '[object Set]'
  }

  function isString(value) {
    return typeof value == 'string'
  }

  function isSymbol(value) {
    return typeof value == "symbol"
  }

  function isTypedArray(value) {
    return toString.call(value) == "[object Uint8Array]"
  }

  function isWeakMap(value) {
    return toString.call(value) == "[object WeakMap]"
  }

  function isWeakSet(value) {
    return toString.call(value) == '[object WeakSet]'
  }

  function isNative(value) {
    return typeof value == 'function' && Function.prototype.toString.call(value).includes('[native code]')
  }

  function conformsTo(object, source) {
    for (let key in  source) {
      if(source[key](object[key])) {
        return true
      }
    }
    return false
  }

  function size(collection) {
    if (typeof collection == 'string' || Array.isArray(collection)) {
      return collection.length
    }
    if (typeof collection == 'object') {
      return Object.keys(collection).length
    }
  }

  function find(collection, predicate = identity, fromIndex = 0) {
    for(let i = fromIndex; i < collection.length; i++) {
      if(typeof predicate == 'function') {
        if (predicate(collection[i])){
          return collection[i]
        }
      }
      
      if (typeof predicate == 'string') {
        if (collection[i][predicate]) {
          return collection[i]
        }
      }
      if (Array.isArray(predicate)) {
        if (collection[i][predicate[0]] == predicate[1]) {
          return collection[i]
        }
      }else if (typeof predicate == 'object') {
        return filter(collection, matches(predicate))[0]
      }
    }

  }

  function findLast(collection, predicate = identity, fromIndex = collection.length-1) {
    for(let i = fromIndex; i >= 0; i--) {
      if(typeof predicate == 'function') {
        if (predicate(collection[i])){
          return collection[i]
        }
      }
      
      if (typeof predicate == 'string') {
        if (collection[i][predicate]) {
          return collection[i]
        }
      }
      if (Array.isArray(predicate)) {
        if (collection[i][predicate[0]] == predicate[1]) {
          return collection[i]
        }
      }else if (typeof predicate == 'object') {
        return filter(collection, matches(predicate))[0]
      }
    }
  }

  function flatMap(collection, iteratee = identity) {
    let res = []
    for (let i = 0; i < collection.length; i++) {
      let arr = iteratee(collection[i])
      res.push(...arr)
    }
    return res
  }

  function flatMapDeep(collection, iteratee = identity) {
    let res = []
    for (let i = 0; i < collection.length; i++) {
      let arr = iteratee(collection[i])
      while (Array.isArray(arr[0])) {
        arr = arr[0]
      }
      res.push(...arr)
    }
    return res
  }

  function flatMapDepth(collection, iteratee = identity, depth = 1) {
    let res = []
    let d = depth
    for (let i = 0; i < collection.length; i++) {
      let arr = iteratee(collection[i])
      d = depth
      while (Array.isArray(arr[0]) && depth > 0) {
        arr = arr[0]
        d--
      }
      res.push(arr)
    }
    return res 
  }

  function forEach(collection, iteratee = identity) {
    for (let key in collection) {
      if (iteratee(collection[key], key, collection) == false) {
        break
      }
    }
    return collection
  }

  function forEachRight(collection, iteratee = identity) {
    for (let i = collection.length - 1; i >=0; i--) {
      if (iteratee(collection[i], i, collection) == false) {
        break
      }
    }
    return collection
  }

  function groupBy(collection, iteratee = identity) {
    let res = {}
    if (typeof iteratee == 'string') {
      for (let i = 0 ; i < collection.length; i++) {
        let key = collection[i][iteratee]
        if (!(key in res)) {
          res[key] = []
        }
        res[key].push(collection[i])
      }
    }

    if(typeof iteratee == 'function') {
      for (let i = 0; i < collection.length; i++) {
        let key = iteratee(collection[i])
        if(key in res) {
          res[key].push(collection[i])
        }else {
          res[key] = [collection[i]]
        }
      }
    }
    return res 
  }

  function includes(collection, value, fromIndex = 0) {

  }

  function invokeMap(collection, path, ...args) {
    let res = []
    if (typeof(path) == 'string') {
      for (let i = 0; i < collection.length; i++) {
        res.push(collection[i][path](...args))
      }
    } 
    if (typeof path == 'function') {
      for (let i = 0; i < collection.length; i++) {
        res.push(path.call(collection[i],...args))
      }
    }
    return res
  }

  function keyBy(collection, iteratee = identity) {
    let obj = {}
    if (typeof iteratee == 'function') {
      for (let i = 0; i < collection.length; i++) {
        let key = iteratee(collection[i])
        obj[key] = collection[i]
      }
    }
    if (typeof iteratee == 'string') {
      for (let i = 0; i < collection.length; i++) {
        let key = collection[i][iteratee]
        obj[key] = collection[i]
      }
    }
    return obj
  }

  function orderBy(collection, iteratee = [identity], orders = ['asc', 'asc']) {
    let ary = collection.slice()
    for (let i = orders.length - 1; i >= 0; i--) {
      if(orders[i] == 'asc') {
        ary.sort((a,b) => {
          if(a[iteratee[i]] > b[iteratee[i]]) {
            return 1
          }else if(a[iteratee[i]] < b[iteratee[i]]) {
            return -1
          }else {
            return 0
          }
        })
      }else {
        ary.sort((a, b) => {
          if (a[iteratee[i]] < b[iteratee[i]]) {
            return 1
          }else if (a[iteratee[i]] > b[iteratee[i]]) {
            return -1
          }else {
            return 0
          }
        })
      }
    }
    return ary
  }

  function partition(collection, predicate = identity) {
    let res = []
    let trueArr = []
    let falseArr = []
    for (let i = 0; i < collection.length; i++) {
      if(typeof predicate == 'function') {
        if(predicate(collection[i])){
          trueArr.push(collection[i])
        }else {
          falseArr.push(collection[i])
        }
      } else if (typeof predicate == 'string') {
        if(collection[i][predicate]) {
          trueArr.push(collection[i])
        }else {
          falseArr.push(collection[i])
        }
      }else if (Array.isArray(predicate)) {
        if(collection[i][predicate[0]] == predicate[1]) {
          trueArr.push(collection[i])
        }else {
          falseArr.push(collection[i])
        }
      }else if (typeof predicate == 'object') {
        let flag = true
        for (let key in predicate) {
          if (predicate[key] !== collection[i][key]){
            falseArr.push(collection[i])
            flag = false
            break
          }
        }
        if(flag) {
          trueArr.push(collection[i])
        }
      }
    }
    res.push(trueArr, falseArr)
    return res
  }

  function reduce(collection, iteratee = identity, accumulator) {
    let res = accumulator
    let start = 0
    if (accumulator == undefined) {
      res = collection[start]
      start = 1
    }
    if (Array.isArray(collection)) {
      for (let i = start; i < collection.length; i++) {
        res = iteratee(res, collection[i], i, collection)
      }
    }else if (typeof collection == 'object') {
      for (let key in collection) {
        res = iteratee(res, collection[key], key, collection)
      }
    }
    return res
  }

  function reduceRight(collection, iteratee = identity, accumulator) {
    let res = accumulator
    let start = collection.length - 1
    if (accumulator == undefined) {
      res = collection[start]
      start = collection.length - 2
    }
    if (Array.isArray(collection)) {
      for (let i = start; i >= 0; i--) {
        res = iteratee(res, collection[i], i, collection)
      }
    }else if (typeof collection == 'object') {
      for (let key in collection) {
        res = iteratee(res, collection[key], key, collection)
      }
    }
    return res
  }

  function reject(collection, predicate = identity) {
    let res = []
    for (let i = 0; i < collection.length; i++) {
      if (typeof predicate == 'function') {
        if(!(predicate(collection[i]))) {
          res.push(collection[i])
        }
      }else if (typeof predicate == 'string') {
        if(!(collection[i][predicate])) {
          res.push(collection[i])
        }
      }else if (Array.isArray(predicate)) {
        if (collection[i][predicate[0]] !== predicate[1]) {
          res.push(collection[i])
        }
      }else if (typeof predicate == 'object') {
        for (let key in predicate) {
          if (predicate[key] !== collection[i][key]) {
            res.push(collection[i])
            break
          }
        }
      }
    }
    return res 
  }

  function sample(collection) {
    let i = Math.floor(Math.random() * collection.length)
    return collection[i]
  }

  function sampleSize(collection, n = 1) {
    let res = []
    for (let i = 0; i < n && i < collection.length; i++) {
      let j = Math.floor(Math.random() * collection.length)
      if (!(res.includes(collection[j]))) {
        res.push(collection[j])
      }else{
        while (res.includes(collection[j])) {
          res.push(collection[j])
        }
      }
    }
    return res 
  }

  function shuffle(collection) {
    let res = []
    let arr = collection
    for (let i = 0; i < collection.length; i++) {
      let j = Math.floor(Math.random() * arr.length)
      res.push(arr[j])
      arr = arr.slice(0, j).concat(arr.slice(j + 1))
    }
    return res 
  }

  function some(collection, predicate = identity) {
    for (let i = 0; i < collection.length; i++) {
      if (typeof predicate == 'function') {
        if (predicate(collection[i])) {
          return true
        }
      }else if (typeof predicate == 'string') {
        if(collection[i][predicate]) {
          return true
        }
      }else if (Array.isArray(predicate)) {
        if (collection[i][predicate[0]] == predicate[1]) {
          return true 
        }
      }else if (typeof predicate == 'object') {
        let flag = true
        for (let key in predicate) {
          if((predicate[key] !== collection[i][key])){
            flag = false
            break
          }
        }
        if (flag) {
          return true
        }
      }
    }
    return false
  }

  function sortBy(collection, iteratee = identity) {
    for (let i = 0; i < iteratee.length; i++) {
      if (typeof iteratee[i] == 'function') {
        collection.sort((a,b) => {
          if (iteratee[i](a) > iteratee[i](b)) {
            return 1
          }else if (iteratee[i](a) < iteratee[i](b)) {
            return -1
          }else {
            return 0
          }
        })
      }else if (typeof iteratee[i] == 'string') {
        collection.sort((a, b) => {
          if (a[iteratee[i]] > b[iteratee[i]]) {
            return 1
          }else if ([iteratee[i]] < b[iteratee[i]]) {
            return -1
          }else {
            return 0
          }
        })
      }
    }
    return  collection
  }

  function defer(func, ...args) {
    return setTimeout(func, 1, ...args) - 1 
  }

  function delay(func, wait, ...args) {
    return setTimeout(func, wait , ...args) - 1 
  }

  function isEqualWith(value, other, customizer) {
    if (customizer == undefined) {
      return isEqual(value, other)
    }

    if(typeof value == typeof other) {
      if(typeof value == 'object') {
        if(Object.keys(value).length == Object.keys(other).length){
          for (let key in value) {
            if(customizer(value[key], other[key])) {
              return true 
            }
          }
        }else {
          return false
        }
      }else {
        return customizer(value, other)
      }
    }else {
      return false
    }
    return false 
  }

  function isMatch(object, source) {
    for (let key in source) {
      if (!(isEqual(source[key], object[key]))){
        return false
      }
    }
    return true
  }

  function isMatchWith(object, source, customizer) {
    for (let key in source) {
      if (!(customizer(object[key], source[key], key, object, source))){
        return false
      }
    }
    return true 
  }

  function ceil(number, precision = 0) {
    return Math.ceil(number * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  function floor(number, precision = 0) {
    return Math.floor(number * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  function round(number, precision = 0) {
    return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
  } 

  function assignIn(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      for (let key in sources[i]) {
        object[key] = sources[i][key]
      }
    }
    return object 
  }

  function at(object, path) {
    let res = []
    for (let i = 0; i < path.length; i++){
      res.push(get(object, path[i]))
    } 
    return res
  }

  function defaults(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      for (let key in sources[i]) {
        if (!(key in object)) {
          object[key] = sources[i][key]
        }
      }
    }
    return object
  }

  function defaultsDeep(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      for (let key in sources[i]) {
        if(key in object) {
          if (typeof object[key] == 'object'){
            defaultsDeep(object[key], sources[i][key]) 
          }
        } else {
          object[key] = sources[i][key]
        }
      }
    }
    return object
  }

  function findKey(object, predicate = identity) {
    for (let key in object) {
      if (typeof predicate == 'function') {
        if(predicate(object[key])){
          return key
        }
      }else if (typeof predicate == 'string') {
        if(object[key][predicate]) {
          return key
        }
      }else if(Array.isArray(predicate)){
        if(object[key][predicate[0]] == predicate[1]) {
          return key
        }
      }else if (typeof predicate == 'object') {
        let flag = true
        for (let preKey in predicate) {
          if (object[key][preKey] !== predicate[preKey]) {
            flag = false
            break
          }
        }
        if (flag) {
          return key
        }
      }
    }
  }

  function findLastKey(object, predicate = identity) {
    let keyArr = Object.keys(object) 
    for (let i = keyArr.length - 1; i >= 0; i--) {
      if (typeof predicate == 'function') {
        if(predicate(object[keyArr[i]])){
          return keyArr[i]
        }
      }else if (typeof predicate == 'string') {
        if(object[keyArr[i]][predicate]) {
          return keyArr[i]
        }
      }else if(Array.isArray(predicate)){
        if(object[keyArr[i]][predicate[0]] == predicate[1]) {
          return keyArr[i]
        }
      }else if (typeof predicate == 'object') {
        let flag = true
        for (let preKey in predicate) {
          if (object[keyArr[i]][preKey] !== predicate[preKey]) {
            flag = false
            break
          }
        }
        if (flag) {
          return keyArr[i]
        }
      }
    }
  }

  function forOwn(object, iteratee = identity) {
    for (let key in object) {
      if (!(iteratee(object[key], key, object))){
        break
      }
    }
    return object
  }

  function forOwnRight(object, iteratee = identity) {
    let keyArr = Object.keys(object)
    for (let i = keyArr.length - 1; i >= 0; i--) {
      if (!(iteratee(object[keyArr[i]], keyArr[i], object))){
        break
      }
    }
    return object
  }

  function functions(object) {
    let res = []
    for (let key in object) {
      if (typeof object[key] == 'function') {
        res.push(key)
      }
    }
    return res
  }

  function functionsIn(object) {
    let res = []
    for (let key in object) {
      if (typeof object[key] == 'function') {
        res.push(key)
      }
    }
    return res
  }


  function result(object, path, defaultValue) {
    let res = get(object, path)
    if(typeof res == 'function') {
      return res()
    }else if (typeof res == 'undefined') {
      if(typeof defaultValue == 'function') {
        return defaultValue()
      }else {
        return defaultValue
      }
    }else {
      return res
    }
  }

  function set(object, path, value) {
    if (!(Array.isArray(path))) {
      path = toPath(path)
    }
    path = path.map(it => Number.isNaN( parseInt(it)) ? [it] : [parseInt(it)])
    let str = 'object'
    for (let i = 0; i < path.length; i++) {
      if(Number.isNaN(parseInt(path[i]))) {
        path[i] = "'" +  path[i]  + "'"
      }
      str = str + '[' + path[i] + ']'
    }
    str = str + '=' + value
    eval(str)
    return object
  }

  function toPairsIn(object) {
    let res = []
    for (let k in object) {
      res.push([k, object[k]])
    }
    return res 
  }

  function has(object, path) {

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
    multiply: multiply,
    subtract: subtract,
    clamp: clamp,
    inRange: inRange,
    tail: tail,
    take:  take,
    lt: lt,
    lte: lte,
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toNumber: toNumber,
    assign: assign,
    toSafeInteger: toSafeInteger,
    values: values,
    repeat: repeat,
    replace: replace,
    toPairs: toPairs,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    unionBy: unionBy,
    ary: ary,
    unary: unary,
    negate: negate,
    once: once,
    spread: spread,
    memoize: memoize,
    flip: flip,
    conforms: conforms,
    constant: constant,
    flow: flow,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isArguments: isArguments,
    isNull: isNull, 
    isObject: isObject, 
    gte: gte,
    gt: gt,
    eq: eq,
    times: times,
    castArray: castArray,
    toPath: toPath,
    pullAt: pullAt,
    omit: omit,
    omitBy: omitBy,
    pick: pick,
    pickBy: pickBy,
    filter: filter,
    get: get,
    forIn: forIn,
    forInRight: forInRight,
    isNumber: isNumber,
    isNaN: isNaN,
    isNil: isNil,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    isNative: isNative,
    conformsTo: conformsTo,
    size: size,
    find: find,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    forEach: forEach,
    forEachRight: forEachRight,
    groupBy: groupBy,
    invokeMap: invokeMap,
    keyBy: keyBy,
    orderBy: orderBy,
    partition: partition,
    reduce: reduce,
    reduceRight: reduceRight,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    shuffle: shuffle,
    some: some,
    sortBy: sortBy,
    defer: defer,
    delay: delay,
    isEqualWith: isEqualWith,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    ceil: ceil,
    floor: floor,
    round: round,
    assignIn: assignIn,
    at: at,
    defaults: defaults,
    defaultsDeep: defaultsDeep,
    findKey: findKey,
    findLastKey: findLastKey,
    forOwn: forOwn,
    forOwnRight: forOwnRight,
    functions: functions,
    functionsIn: functionsIn,
    result: result,
    set: set,
    toPairsIn: toPairsIn,
  }
})()