test('getChange(100,100) debería dar vuelto vacio => un arreglo vacío', function(assert) {
  var result = getChange(100,100)
  assert.deepEqual(result, []);
});

