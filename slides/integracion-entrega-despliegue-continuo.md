## Integración, Entrega y Despliegue Continuo

---

## Integración continua o CI

* Es una práctica del desarrollo que promueve integrar frecuentemente (varias
  veces al día) ramas derivadas con la principal.
	* _Relación con los flujos de uso de git_.
* Al integrar frecuentemente:
	* Se minimizan los errores y el trabajo para hacer los merge.
	* Se detectan de forma temprana los problemas.
* Esta integración es además verificada por algún proceso de automatización,
  que debería ser capaz de construir el código e incluso testearlo
  automáticamente.

---

## Integración continua

Habiendo analizado los diferentes flujos de Git todos van en sintonía con CI

* Cuanto más frecuente se mergea a master, más frecuente habrán releases.
* En releases con pocos cambios, es más fácil detectar problemas.
* Si se integra frecuentemente se mejora la colaboración.
* Si se corre una batería de tests en cada integracón, se maximiza la calidad.

<small>
Si crear un nuevo release implica ponerlo en producción, este proceso debe
aceitarse.
</small>

---

## CI: prácticas

* Mantener un repositorio central donde se mergean los cambios.
* Automatización de:
	* Compilación de fuentes
	* Ejecución de todo tipo de tests asociados
* Cada commit podría lanzar un proceso de integración.

---

## CI: herramientas

* [Travis](https://travis-ci.org/)
* [Semaphore](https://semaphoreci.com/)
* [Circle CI](https://circleci.com/)
* [GitLab CI](https://about.gitlab.com/gitlab-ci/)
* [GoCD](https://www.gocd.org)
* [Concourse](https://concourse-ci.org/)
* [Jenkins](https://jenkins.io/)

---

## Entrega continua y despliegue continuo

* Generalmente se confunden ambos conceptos.
	* Entrega continua hace que cada cambio esté *disponible* para producción,
    pero la puesta en producción requiere intervención humana.
	* Despliegue continuo significa que cada cambio se aplica directamente en
    producción.
* Ambos mecanismos son posteriores en el tiempo a la integración continua.

---

## Entrega continua

* Los proyectos basados en lenguajes que requieren algún tipo de compilación
  como por ejemplo C, C++, Objective C, Java, .Net, Go, etc. utilizan mucho este
  concepto.
* Como resultado del proceso de compilación, y luego de haber pasado
  los tests pertinentes, se procede con el almacenamiento del **artefacto** en
  algún repositorio binario.
	* [JFrog Bintray](https://jfrog.com/bintray/)
	* [JFrog Artifactory](https://jfrog.com/artifactory/)
	* [Sonartype Nexus](https://www.sonatype.com/nexus-repository-sonatype)
	* [Apache Archiva](https://archiva.apache.org/)

---

## Entrega continua

 ¿Cómo impacta en los lenguajes interpretados como Node, PHP, Ruby, Python?

---

## Despliegue continuo

Para lograr el despliegue continuo, los proyectos deben seguir algunas buenas
prácticas de desarrollo, como de operaciones.

Un proyecto que implemente [Twelve Factor apps](https://12factor.net/es/) aplica
perfectamente.

---

## Despliegue continuo

* Las formas de implementarlo pueden variar según el tipo de aplicación a
desplegar y el servicio donde se aloje:
  * **Sitios estáticos:** GitHub / Gitlab Pages, [Jekykll](https://jekyllrb.com/),
    [Hugo](https://gohugo.io/), [Hexo](https://hexo.io/), etc.
  * **Servidores con acceso ssh:** usando ssh directamente, o herramientas más
    sofisticadas como [capistrano](https://capistranorb.com/) o [dpl](https://github.com/travis-ci/dp)
  * **Proveedores de Cloud:** generalmente disponen de APIs que se utilizan con
    herramientas provistas por ellos mismos que simplifican el despliegue.
    Por ejemplo [Heroku](https://www.heroku.com/), Digital Ocean, AWS, Azure,
    GCP, k8s, etc.

---

## Ejemplos

* **[Integración continua en Gitlab](https://gitlab.com/chrodriguez/ci-test-php-example):** PHPUnit testing con php, MySQL y Postgres
* **[Entrega continua en Gitlab](https://gitlab.com/chrodriguez/cd-artifact-sample-go/):**
  Hello World en go que genera un binario cuando se crea un tag
* **[Despliegue continuo en Gitlab pages](https://gitlab.com/chrodriguez/cd-jekyll-sample):** un sitio estático usando Jekyll
	* [Ver sitio](https://chrodriguez.gitlab.io/cd-jekyll-sample)
* **[Despliegue continuo en Github pages](https://github.com/chrodriguez/arquitecturas-de-software):** esta presentación usando [RevealJS](https://github.com/hakimel/reveal.js/)

---

## Más sobre Gitlab

* [Documentación de Gitlab CI](https://docs.gitlab.com/ee/ci/)
* [Ejemplos de Gitlab](https://docs.gitlab.com/ee/ci/examples/)
* Conviene instalarse localmente gitlab-runner y probar los pipelines antes de
  hacer push

```
gitlab-runner exec docker paso-a-ejecutar
```
