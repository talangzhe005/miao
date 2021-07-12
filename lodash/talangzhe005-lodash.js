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
  return {
    chunk : chunk
    
  }
})()