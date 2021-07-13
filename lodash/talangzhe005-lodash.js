var talangzhe005 = (function(){
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

  function zip(...arrays){
    var ary = concat(...arrays)
    var res = []
    for(var i = 0; i < ary.length; i++){
      if(i % 2 == 0){
        res[0].push(ary[i])
      }else{
        res[1].push(ary[i])
      }
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
  }
})()