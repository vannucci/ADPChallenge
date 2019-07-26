const greatestCommonDivisor = function(a, b){
    console.log(a,b);
    if(b == 0)
      return a;
    else 
      return greatestCommonDivisor(b, a%b);
}


console.log(greatestCommonDivisor(12,9));