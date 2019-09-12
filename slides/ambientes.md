## Ambientes o entornos de despliegue

---

## Introducción

* No disponer de diferentes ambientes implicaría:
  * La única versión que es igual a producción, es la de producción.
      * Se cambió algo en producción que no funcionaba y no se actualizó el
        código versionado.
  * Las pruebas se realizan en la PC del desarrollador o directamente en
    producción.
  * Lo que funciona en desarrollo no anda en producción.

<small class="fragment">
Pareciera imposible que esto suceda, pero muchas organizaciones siguen
gestionando sus desarrollos de esta forma.
</small>

---

## Ambientes

* Diferentes ambientes permiten:
  * Validar los cambios con los usuarios.
  * Realizar pruebas de calidad y seguridad del software.
  * Minimizar los problemas en producción.
* Estos ambientes deben gestionarse:
  * Sobrecarga de trabajo.
  * Idealmente, todos idénticos entre sí.
      * ¿Cómo garantizamos esto?

---

## Ambientes o entornos

* **Desarrollo:** en el cuál se construye el software.
* **Testing:** se publica el software para que sea probado por un grupo definido
  de personas, que debería incluir al usuario final o representantes del mismo.
* **Staging (QA):** idéntico y previo a producción. Permite probar el despliegue
  y el funcionamiento, realizando cualquier ajuste necesario en esta instancia,
  evitando problemas en producción.
* **Producción:** tiene todos los servicios productivos. Este ambiente cuenta
  con políticas estrictas en cuanto al acceso y la seguridad del mismo.

<small>
Dependiendo de la organización y el flujo de trabajo adoptado, pueden definirse
más o menos ambientes.
</small>


