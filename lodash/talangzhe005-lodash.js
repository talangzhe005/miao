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
    if (typeof predicate == 'function') {

    }
    if (typeof predicate == 'string') {

    }
    if (Array.isArray(predicate)) {

    }
    if (typeof predicate == 'object') {

    }
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
      res.push([k, object[k]])
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
      return func(reverse(...args))
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
  }
})()