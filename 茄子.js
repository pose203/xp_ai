/**
 * @param {number} x
 * @return{number}
 */
var reverse= function(x) {
    let carry = 0
    const max = Math.pow(2,31) - 1
    const min = -Math.pow(2,31)
    
    while(x !== 0){
     carry = carry*10 + x%10
     x = parseInt(x/10)
    }    
    if(carry > max || carry < min){
      return 0
    }
    
    return carry
 }
 
 console.log(reverse(123))      
 