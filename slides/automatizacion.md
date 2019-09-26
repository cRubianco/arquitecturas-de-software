## Automatización

---

## ¿A qué llamamos automatización?

DevOps define una serie de principios que deben cumplirse. Uno de ellos es la
automatización y puede tomar dos formas:

* **Infraestructura subyacente:** comúnmente IaC (Infraestructure as Code).
* **Desarrollo de aplicaciones y entrega:** uso de pipelines de CI/CD.

---

## IaC

* Proceso de manejo y aprovisionamiento de servidores mediante código.
* Promueve la ejecución desantendida, evitando la interactivad.
* Evita el uso de documentación: el código documenta la infraestructura.
* Idempotencia.
* Se traen prácticas del desarrollo:
  * Versionado del código
  * Testing
  * Colaboración (uso de librerías)

---

## Beneficios de automatizar

* Se reducen los costos.
* Se acelera la ejecución de cualquier proceso sobre la infraestructura.
  * _Instalar un servidor nuevo, modificar un load balancer o actualizar los
certificados de múltiples servidores._
* Minimizar errores humanos o problemas de seguridad inherentes al proceso
  manual.

---

## Tipos de IaC

Existen diversas herramientas para poder automatizar la infraestructura. Algunas
de tipo _push_ y otras _pull_.

La primera (push) promueve un servidor central que envía las instrucciones a ejecutar
al nodo que debe configurarse.

La segunda (pull) es el nodo quien toma las instrucciones a ejecutar
periódicamente desde un servidor central.

---

## Herramientas

Los productos más destacados en éste área son:

* [Puppet](https://puppet.com/)
* [Chef](https://www.chef.io/)
* [Saltstack](https://www.saltstack.com/)
* [Ansible](https://www.ansible.com/)

---

## Más herramientas

A diferencia de las herramientas antes mencionadas, existen otras que se
utilizan para realizar el despliegue de aplicaciones.

Las anteriores, podrían preparar un (o múltiples) servidor(es) para que una
aplicación se instale en ellos.

### Herramientas de despliegue:

* [Capistrano](https://capistranorb.com/)
* [dpl](https://github.com/travis-ci/dpl)

---

## Cómo es el flujo de trabajo con IaC

* El ambiente de desarrollo del código IaC en general se prueba con virtuales
  locales o contenedores.
  * [Vagrant](https://www.vagrantup.com/)
* Idealmente aplicar CI/CD
* TDD
  * [Kitchen CI](https://kitchen.ci/)

---

## Taller de Vagrant

![vagrant logo](./images/vagrant.png)<!-- .element: height="300px" style="border: none; box-shadow: none; background: none;" -->

[Iniciar el taller](https://github.com/chrodriguez/arquitecturas-de-software/tree/master/talleres/vagrant)

---

## Taller de Ansible

![ansible logo](./images/ansible.png)<!-- .element: height="300px" style="border: none; box-shadow: none; background: none;" -->

[Iniciar el taller](https://github.com/chrodriguez/arquitecturas-de-software/tree/master/talleres/ansible)

---

