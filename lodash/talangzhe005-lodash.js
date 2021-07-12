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






  return {
    chunk : chunk,
    compact : compact,
    concat : concat,
    difference : difference,
    join : join,
    uniq : uniq,
    drop : drop,
    dropRight : dropRight,
  }
})()