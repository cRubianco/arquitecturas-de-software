test('getChange(100,100) debería dar vuelto vacio => un arreglo vacío', function(assert) {
  var result = getChange(100, 100)
  assert.deepEqual(result, []);
});

/* 
 * 100 - 75 = 25
 * Se espera entonces [ 20, 5 ]
 */
test('getChange(75, 100) deberia dar 25 de vuelto => [20, 5]', function(assert) {
  var result = getChange(75, 100)
  assert.deepEqual(result, [20, 5]);
});

