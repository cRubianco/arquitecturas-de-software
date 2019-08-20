## Organización del desarrollo

---

## Introducción

En este apartado abordaremos las diferentes cuestiones que contribuyen a
mantener organizados algunos aspectos del desarrollo

* Estándares de codificación
* Semántica del versionado
* Seguimiento por tickets
* Versionado de la base de datos
* Versionado del código
* Tests

---

## Estándares de codificación

* Aplicar estos estándares mejoran la calidad de un sistema completo
* La clave es la consistencia
	* _Evita contradicciones en la forma de codificar_
* La lectura del código estandarizado es armoniosa:
	* _Como si el código completo fuese escrito por un único desarrollador_

---

## Estándares de codificación

* Cuanto más legible es el código, más simple es entenderlo y desarrollar nuevas
  funcionalidades:
	* _Simplifica el hallazgo de problemas_
	* _Aumenta las posibilidades de reutilizar código: DRY_
	* _Afecta el esfuerzo y costo del desarrollo_

---

## Semántica del versionado

El manejo de versiones es fundamental para manejar las dependencias y organizar
los despliegues de forma cuidada. 

**La característica fundamental del versionado semántico es que nunca existirán
dos versiones diferentes de código con el mismo número de versión.**

El esquema de versionado más conocido es [semver](https://semver.org)

---

## Semántica del versionado

Si asumimos un número de versión MAJOR.MINOR.PATCH, se incrementa:

* **MAJOR version** cuando se realizan cambios incompatibles en la API.
* **MINOR version** cuando se agrega funcionalidad que sea backwards-compatible.
* **PATCH version** cuando se solucionan errores que sean backwards-compatible.

<small>
Además de esta nomenclatura, se agregan labels adicionales para manejo de
pre-releases, metadatos producto de compilaciones, etc.
</small>

---

### Versionado semántico vs de fuentes

* No deben confundirse los conceptos.
* Un proyecto con versionado de fuentes irá generando versiones semánticas:
	* Que pueden reflejarse como un TAG.
	* Que dispare la generación de un paquete con el release.
	* Que inicie el proceso de generación de binarios para diferentes
    arquitecturas, SO, etc y publique en un repositorio de binarios.
* Usar una herramienta como Git no significa que se aplique semver.

---

## Semver como un anti patrón

* En el siguiente [post](https://surfingthe.cloud/semantic-versioning-anti-pattern/)
  se considera el uso de SemVer como un anti patrón
* Es que en determinados desarrollos, generalmente aquellos que no deben
  mantener muchas versiones, y que utilizan despliege/entrega continua podrían
  verlo como una traba o demora.
* **No es el caso de librerías**, donde es fundamental para los gestores de
  bundles determinar qué librería es la más adecuada. Así es el caso de `npm,
  budler, pip, composer, etc`.

---

## Seguimiento por tickets

No nos adentraremos en nada relacionado al trabajo de un equipo, ni al uso de
una herramienta en particular. Sólo se **pone en valor** el uso de **cualquier
herramienta o metodología** de gestión de proyectos.

Para organizar un proyecto, no alcanza con usar una metodología, sino ser
metódicos.

---

## Seguimiento por tickets

* Los tickets deben reflejar las necesidades del usuario diferenciando errores,
  de nuevos requerimientos, de mejoras técnicas.
* Un conjunto de tickets resueltos darán lugar a un nuevo release que se
  identificará con versionado semántico.
	* _Este conjunto compone el Changelog_.
* Cuando se esté resolviendo un ticket y se encuentre un nuevo problema, generar
  otro ticket para tratar luego, **no resolverlo en el momento**.

---

## Changelog

* El changelog es un registro de cambios cronológicamente ordenados, agrupados
  por cada versión de un proyecto.
* Mantener el changelog no es una tarea simple.
* Está dirigido a personas, no máquinas.
* No se agrupan los commits, tienen mucha información que no es útil.
* Debe mostrar la fecha de la versión.

[Keep a changelog](https://keepachangelog.com/es-ES/1.0.0/)

<small>
<a href="https://github.com/lob/generate-changelog">Herramienta de generación de changelog</a>
</small>

---

### Versionado de la base de datos

* Sin importar el lenguaje o framework es importante que la base de datos
  pueda versionarse acompañando el código.
* De ser posible, este versionado debe poder aplicarse de forma idempotente:
	* Si el código desplegado requiere aplicar cambios en la BD, deberían
    aplicarse.
	* Si ya se han aplicado, entonces no hacer nada.
* Si bien hay herramientas que manejan estas cuestiones, el desarrollador debe
  considerar:
	* Evitar cambios destructivos.
	* Considerar siempre la necesidad de un rollback.

---

### Versionado de la base de datos

No hay recetas mágicas para el uso/desarrollo de parches a la base de datos.
Las restricciones para automatizar los despliegues al 100%, muchas veces radican
en cuestiones relacionadas a los datos.

---

## Versionado del código

Hoy todos usamos Git. La mejor fuente de aprendizaje es el [Pro Git
Book](https://git-scm.com/book/es/v1).

Pero Git es una herramienta, y el problema no es su uso como tal, sino **de qué
forma trabajamos en conjunto usando Git.**

Son los flujos de trabajo basados en Git los que definen un adecuado esquema de
trabajo grupal.

---

## Git Flow

* Diseñado por [Vincent Driessen](https://nvie.com/posts/a-successful-git-branching-model/)
* Define el uso estricto de ramas.
* Diseñado específicamente para el lanzamiento de releases.
* Asigna roles a las diferentes ramas y define cómo y cuándo deben
  interactuar dichas ramas. 
  * Utiliza ramas específicas para preparar, mantener y generar nuevos releases.
* Existe un [conjunto de extensiones para trabajar con git
  flow](https://github.com/petervanderdoes/gitflow-avh).

---

### Git Flow

<img src="images/git-flows/git-flow-00.png" alt="Git flow" height="550px">

---

### Git Flow

* La rama **master** almacena la historia de versiones oficiales.
* La rama **develop** sirve como rama de integración de *feature branches*.

![Git Flow](images/git-flows/git-flow-01.svg)<!-- .element: height="300px" -->

---

## Git Flow: incializando

[![asciicast](https://asciinema.org/a/236238.png)](https://asciinema.org/a/236238?autoplay=1&speed=2&size=medium)

---

## Git Flow: Features branches

* Cada nueva funcionalidad debe desarrollarse en su propia rama.
* En vez de crearse a partir de **master**, lo hacen a partir de **develop**.
  * _Se espera que develop esté lo más actualizado posible_.
* Los features branches nunca deben interactuar con **master**.
* Al finalizar un feature branch, se mergea con **develop**.
---
## Git Flow: Features branches
![Git flow features](images/git-flows/git-flow-02.svg)
---
## Git Flow: Features branches

[![asciicast](https://asciinema.org/a/236239.png)](https://asciinema.org/a/236239?speed=2&autoplay=1&size=medium)

---
## Git Flow: Release branches

* Se crean cuando la rama **develop** acumuló varios features o
  porque se aproxima la fecha de lanzar un release.
* Se crea una rama **release** desde **develop**.
* En la rama no se agregan nuevas fucionalidades, sólo admiten:
  * Solución a errores: bugfix.
  * Generación de documentación, Changelog, etc.
  * Correr version bumping scripts.
* Una vez lista para empaquetarse, se procede a:
  * Mergear la rama con **master**.
  * Crear un **tag** en master que refleje la nueva versión.
  * Mergear la rama con **develop**.
      * _Pudo haber avanzado durante la creación del release_.

---
## Git Flow: Release branches
![Git flow releases](images/git-flows/git-flow-03.svg)

---
## Git Flow: Release branches


[![asciicast](https://asciinema.org/a/236240.png)](https://asciinema.org/a/236240?speed=2&autoplay=1&size=medium)

---
## Git Flow: Hotfix branches

* Se utilizan para solucionar problemas en releases de producción.
* Son muy parecidas a las ramas **feature** y **release**, salvo que se basan en
  **master** en vez de **develop**.
* Son las únicas ramas que nacen de **master**.
* Cuando se arriba a una solución del problema, se deben mergear con **master** y
  **develop** (o si existe una **release branch**):
  * Además se debe crear un nuevo **tag en master** con un número de versión
    actualizado.
---
## Git Flow: Hotfix branches

<img src="images/git-flows/git-flow-04.svg" alt="Git flow hotfix" height="550px">

---
## Git Flow: Hotfix branches

[![asciicast](https://asciinema.org/a/236354.png)](https://asciinema.org/a/236354?speed=2&autoplay=1&size=medium)
---
## Los problemas de Git Flow

* Usa como rama por defecto **develop**, mientras que muchas herramientas asumen
  que es **master** tal rama. Tener que cambiar esto, se vuelve molesto.
* La complejidad introducida por los flujos de las ramas release y hotfix:
  * Si bien parecen una buena idea, son complejos.
  * Al implementar CD, la rama principal puede desplegarse. O sea que las ramas
    hotfix y release podrían omitirse, ahorrándose así  la ceremonia que implica
    hacer un merge de múltiples ramas.
* No aplica a proyectos que deben dar soporte a múltiples versiones.
---
## GitHub Flow

[GitHub propone un flujo liviano y basado en ramas](https://guides.github.com/introduction/flow/index.html)

Las ramas donde se trabaja se llaman **feature branches**. La rama **master**
siempre dispone código listo para poner en producción.

El principal concepto introducido por GitHub es el de **Pull Request**, cuya
principal característica consiste en la posibilidad de realizar **code review**.

---
## GitLab Flow

* GitLab propone varios flujos:
  * Production branch
  * Environment branches
  * Release branches

Además, utiliza un concepto parecido a los PR de GitHub que llama **Merge
Requests** y que también permiten realizar **code review**.

<small>
GitLab con sus flujos promociona sus pipelines de CD
</small>
---
## Gitlab: production branch
![Gitlab production branch flow](images/git-flows/gitlab-flow-00.png)
---
## Gitlab: production branch

* Gitlab indica que con el flujo de GitHub se asume que es posible desplegar a
  producción cada vez que se mergea un **feature branch**.
* En algunos proyectos esto no es posible. Por ejemplo:
  * _Aplicaciones de iOS que deben ser validadas por App Store_.
  * _Cuando existen ventanas de despliegue (por ejemplo de lunes a viernes de 10
    a 16hs cuando el personal de operaciones está completo) pero además se
    desean mergear cambios en otros momentos_.
---
## Gitlab: production branch
* Mergear master en la rama **production** desplegará una nueva versión.
* La rama production siempre tiene el código en producción.
* El momento (fecha y hora) del despliegue queda autodocumentado en el merge
* Se elimina el overhead de manejo de tags, versiones y merges común en git
  flow.
---
## Gitlab: environment branches
<img src="images/git-flows/gitlab-flow-01.png" alt="GitLab environment branches
flow" height="550px">

---
## Gitlab: environment branches

* Cada vez que se actualiza la rama **master** automáticamente se actualiza un
  ambiente.
  * Sólo en este caso, el nombre de la rama no coincide con el del ambiente.
* Cuando alguien desea desplegar en un ambiente, digamos **pre-production**, se
  debe crear un Merge Request desde la rama **master** a **pre-production**.
* En este flujo los commits fluyen en un único sentido hacia producción, 
  asegurando que todo ha sido testeado en **cada uno de los ambientes**.
---
## Gitlab: release branches

<img src="images/git-flows/gitlab-flow-02.png" alt="GitLab release branches
flow" height="550px">

---
## Gitlab: release branches

* Sólo si se entregan versiones a diferentes clientes tiene sentido este flujo.
  Lo deben usar:
  * Productos liberados
  * Librerías
  * Frameworks
* Cada rama contiene una **minor version** (2-3-stable, 2-4-stable, etc).
* Las ramas **x-x-stable** utiliza **master** como base y debe crearse lo más
  tarde posible.
---
## Gitlab: release branches
* Cuando se anuncia una una nueva rama **release**, únicamente se agregarán
  hotfixes en esta rama:
  * _Si es posible los hotfixes primero se deben solucionar en master y luego
    cherry picked en el release branch_.
  * Cada vez que se mergea un hotfix, se incrementa el **patch number**
    (cumpliendo con semver) y crea un nuevo **tag**.
* Algunos proyectos agregan una rama llamada **stable** que apunta al mismo
  commit del último **release branch**.
---
## Tests: TDD (Test Driven Development)

* Aplicar TDD es una práctica que se complementa muy bien con las metodologías
  ágiles:
  * _El problema es que no aprendimos a desarrollar con TDD_.
  * Promueve código de mayor calidad.
  * Desarrollar los tests de unidad, funcionales e integración es responsabilidad del
  desarrollador.
* Análisis de cobertura:
  * _La paranoia del 100%_.
---
## Tests: BDD (Behavior Driven Development)
* Conjunto de prácticas que intentan reducir algunas actividades de desperdicio
  propias en el desarrollo de software:
  * Retrabajo causado por el malentendido o escasos requerimentos.
  * Dudas técnicas causadas por la reticencia o desgano en refactorizar código.
  * Ciclos lentos de feedback causados por silos o ceder demasiado.
* BDD intenta achicar los gaps de comunicación entre los miembros del equipo,
  fomentando un mejor entendimiento del cliente y promoviendo comunicación
continua mediante ejemplos reales.
---
## Tests: BDD (Behavior Driven Development)
_There are many reasons why software projects go wrong. A very common reason is that different people in the organisation or on the team have very different understandings of how the software should behave, and what problems it’s trying to solve._

**_Ignorance is the single greatest impediment to throughput_**

_Teams that deliberately seek to discover what they are ignorant about before
development starts are more productive, because there is less rework._
---
## Tests: BDD (Behavior Driven Development)
* Aplicar BDD se complementa muy bien con TDD porque extiende una práctica de
  desarrollo con la de análisis:
  * Utiliza un lenguaje natural que permite unir la parte técnica y la de
    negocio mediante historias de usuario, acompañadas con criterios de
    aceptación en términos de escenarios.
  * _Dado [contexto inicial], cuando [se produce el evento], entonces [resultados]_.
  * Los criterios se escriben en una DSL llamada [Gherkin](https://docs.cucumber.io/gherkin/reference/).
  * Productos: [Cucumber](https://cucumber.io/), [Behave](https://github.com/behave/behave).
---
## Tests: Acceptance Testing

* Se realizan pruebas de caja negra de forma automatizada.
* Hay diferentes herramientas para implementarlos:
  * [Selenium](https://www.seleniumhq.org/)
  * [Cypress](https://www.cypress.io/)
  * [Capybara](https://github.com/teamcapybara/capybara)
  * [Robot Framework](http://robotframework.org/)

---
## Una confusión acerca de BDD/TDD

* Testear luego de escribir código no significa BDD ni TDD, porque los tests no
  dirigen la implementación.
* Se cree que TDD/BDD son técnicas de test.
  * **No lo son**
  * TDD y BDD, como su nombre lo indica, son técnicas de desarrollo.
* Automatizar los tests es producto de implementar TDD y BDD.
---
## Linting

Muchas veces es importante además de testear el código, verificar que se
respetan los estándares de codificación o potenciales errores de codificación.

Para ello existen [herramientas de linting para los diferentes lenguajes](https://github.com/caramelomartins/awesome-linters).

<small>Incluso hoy día se promueve implementar
[SAST](https://docs.gitlab.com/ee/user/project/merge_requests/sast.html)
</small>


