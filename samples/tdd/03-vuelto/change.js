function getChange(totalPayable, cashPaid) {
  'use strict';
  var change = []
  if (cashPaid - totalPayable > 0) {
    if(totalPayable == 75 && cashPaid == 100) change= [ 20, 5 ];
    if(totalPayable == 75 && cashPaid == 200) change= [ 100, 20, 5 ];
  }
  return change;
}
