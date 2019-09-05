// Este ejemplo siempre va a funcionar
test('¡¡Este test, siempe va a pasar!!', function(assert) {
  var result = 1 + 1;
  assert.equal(result, 2);
});

// A failing test will be RED:
test('Este es un ejemplo de como se ve un test que falla', function(assert) {
  var result = [1,2,3].indexOf(1);  // Esto debería devolver 0
  assert.equal(result, -1); // *esperamos* que acá falle
});

