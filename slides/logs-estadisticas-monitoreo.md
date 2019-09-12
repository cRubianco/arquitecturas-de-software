## Logs, estadísticas y monitoreo

---

## Logs durante el desarrollo

* Los logs son un concepto que toda aplicación debería explotar al máximo.
* Desafortunadamente es muy poco utilizado por los desarrolladores.
* Cuando aprendemos a desarrollar, generalmente usamos logs (mediante alguna
  función que imprima en consola tipo printf):
  * Es una forma de verificación de que el código hace lo que se espera.
  * Pero esto se hace con testing.
  * Entonces ya no aplico la estrategia de logueo.

---

## Logs durante el desarrollo

* Muchos desarrolladores usan muy poco (o no usan) logs en su código:
  * Algunos menos, no acostumbran a leer los logs. Esperan los errores surjan en
    el navegador.
  * Un ejemplo del no uso de logs en php sería lo que llamamos **VDDD**: _Vardump Die
    Driven Development_.
* Incluso algunas librerías no hacen un buen uso de los logs.
* **Pareciera que la norma es: _No usar logs_**.
  * En realidad el problema muchas veces es no saber qué loguear.

---

## ¿Qué loguear?

* Todo lo que nos parezca útil:
  * ¿Y si todo nos parece útil? Loguear las llamadas a una función, sus
    argumentos y valores de retorno.
      * _Entonces loguearlo_.
  * Si algo nos parece que debería escribirse en el log, es porque seguramente
    deba escribirse en el log.
* No hay que sacar las líneas de logs de nuestro código para pasar el código a
  producción.
  * Para ello se usan niveles de logs.

---

## Logs: beneficios

Loguear más, parecería ensuciar el código, pero por el contrario termina
simplificando:

* El entendimiento del código y tests.
* Durante el desarrollo se obtiene información importante y detallada para saber
  qué está sucediendo:
  * Acelera entonces el proceso de desarrollo.
  * Explica qué hace el código mejor que los comentarios.
* Es muy fácil de implementar. Mucho más que cualquier otra herramienta o técnica.

---

## Logs: visibilidad

* Los logs además ofrecen visibilidad para entender qué hace el código.
  * _Esto es algo que los tests de unidad también hacen_.
* Sin embargo, los logs permiten observar además qué está sucediendo con datos
  directamente en producción.
* Esta visibilidad puede ayudar también durante el desarrollo.

---

### Logs: visibilidad para el negocio/operaciones

Sin entrar en detalle de herramientas estadísticas o de BI, es posible loguear
información que ofrezca visibilidad de apectos de alto nivel.

#### Ejemplos

* En una API conocer cantidad de hits de cada endpoint, así como los tiempos de
  respuesta.
* En una aplicación poder contabilizar la cantidad de productos que más se
  solictan.

<small>
A medida que más datos se loguean, más información se genera que puede luego ser
procesada.
</small>

---

## Logs: niveles

* Toda librería/framework de logs implementa niveles.
* Es un mecanismo por el cual es posible garantizar en la etapa de desarrollo,
  que todo es logueable,
  pero que alguien puede elegir _sintonizar_ qué logs visualizar.
* Los niveles más usados:
  * Error
  * Warning
  * Info
  * Debug

---

## ¿Dónde loguear?

El mundo cambia... Quién diría que la respuesta es:

* STDOUT
* STDERR

---

## Log: análisis

* Existen numerosas herramientas para el analisis de logs.
* Muchos se ofrecen como servicios en la nube:
  * [Loggly](https://www.loggly.com/)
  * [Datadog](https://www.datadoghq.com)
  * [New Relic](https://newrelic.com/)
  * [Splunk](https://www.splunk.com/)
* Otros son un stack stack de productos:
  * [ELK](https://www.elastic.co/elk-stack)
  * [Fluentd](https://www.fluentd.org/)
  * [Graylog](https://www.graylog.org/)

---

## Ejemplo de kibana

![kibana](images/kibana-sample.png)<!-- .element: height="500px" -->

---

## Monitoreo

* Monitorizar algo es observarlo y alertar ante algún problema.
* Si no agregamos lógica a este proceso, se obtiene algo lineal:
  * Un problema, una alerta.
  * Una solución a un problema, otra alerta.
* Por ejemplo, si nos interesa saber que un servidor tiene todos sus procesadores
  al 100%, podría dispararse una alerta.
  * ¿Pero es lo que queremos?
  * Si una instancia EC2 xxxlarge nos sale cara, usarla menos del 50% mucho
    tiempo debería generar una alerta.

---

## Estadísticas

* Consiste en recolectar datos de diferentes recursos con cierta frecuencia.
* Guardar estos datos nos permite realizar análisis estadísticos.
  * Cuando un valor sale del desvío estándar durante un período de tiempo se
    puede emitir una alerta.
  * Correlación de eventos.
* Utilizan bases de datos Time Series.
* Se apoyan en herramientas de visualización.

---

## Monitoreo y estadísticas

* Esta tarea pareciera ser únicamente de operaciones.
* Pero qué tal si podemos analizar además:
  * Las rutas de nuestras aplicaciones que más tardan.
  * Dentro de una ruta, desmenuzar los tiempos necesarios para:
      * Base de datos
      * Renderizado de vistas
      * Invocación a APIs externas
      * Caché HIT/MISS

---

## Productos

* Generalmente los productos de monitoreo/estadísticas requieren de colectores o
  agentes.
  * _Se instalan en cada servidor, consultan el estado de los recursos que
    observan_.
* Para desarrollo es interesante usar agentes que no sean bloqueantes.
  * Usando UDP.
  * Usando agentes fuera de banda.

---

## Productos en la nube
* [Datadog](https://www.datadoghq.com)
* [New Relic](https://newrelic.com/)
* [AppOptics](https://www.appoptics.com/)

---

## Productos dedicados

* [Nagios](https://www.nagios.org/)
* [Zabbix](https://www.zabbix.com/)
* [Icinga 2](https://www.icinga.com/products/icinga-2)
* [Cacti](https://www.cacti.net/)
* [Monit](https://mmonit.com/monit/)
* [Prometheus](https://prometheus.io/)
* [Influx DB](https://www.influxdata.com/)
* [OpenTSDB](http://opentsdb.net/)
* [Grafana](https://grafana.com/)
