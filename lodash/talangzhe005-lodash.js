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

  return {
    chunk : chunk,
    compact : compact,
    concat : concat
    
  }
})()