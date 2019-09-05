test('getChange(100,100) debería dar vuelto vacio => un arreglo vacío', function(assert) {
  var result = getChange(100, 100);
  assert.deepEqual(result, []);
});

/* 
 * 100 - 75 = 25
 * Se espera entonces [ 20, 5 ]
 */
test('getChange(75, 100) deberia dar 25 de vuelto => [20, 5]', function(assert) {
  var result = getChange(75, 100);
  assert.deepEqual(result, [20, 5]);
});

/* 
 * 200 - 75 = 25
 * Se espera entonces [ 100, 20, 5 ]
 */
test('getChange(75, 200) deberia dar 125 de vuelto => [100, 20, 5]', function(assert) {
  var result = getChange(75, 200);
  assert.deepEqual(result, [100, 20, 5]);
});

/* 
 * 1000 - 442 = 558
 * Se espera entonces [ 500, 50, 5, 2, 1]
 */
test('getChange(442, 1000) deberia dar 558 de vuelto => [500, 50, 5, 2, 1]', function(assert) {
  var result = getChange(442, 1000);
  assert.deepEqual(result, [500, 50, 5, 2, 1]);
});

/* 
 * 1889 - 1 = 1888
 * Se espera entonces [ 500, 50, 5, 2, 1]
 */
test('getChange(1, 1889) deberia dar 1888. La suma de todos las denominaciones  => [ 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1 ]', 
    function(assert) {
  var result = getChange(1, 1889);
  assert.deepEqual(result, [ 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1 ]);
});

