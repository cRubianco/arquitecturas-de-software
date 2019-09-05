function getChange(totalPayable, cashPaid) {
  'use strict';
  let change = []
  let coins = [ 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1 ];
  let diff = cashPaid - totalPayable;
  coins.sort((a,b) => b - a).forEach( (coin) => {
    let coin_times = Math.floor(diff / coin);
    if (coin_times >  0) {
      change=change.concat(Array(coin_times).fill(coin));
      diff -= coin*coin_times;
    }
  });
  return change;
}
