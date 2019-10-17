## Docker Compose

---

## ¿Qué es Docker Compose?

* Herramienta que permite levantar aplicaciones compuestas por múltiples
  contenedores.
* La arquitectura se define y configura en un archivo de texto
  ([YAML](http://yaml.org)).
  * Simple e intuitivo.
* Se vale de un comando para:
  * Iniciar, detener y reconstruir servicios.
  * Construir imágenes.
  * Ver el estado de los servicios, los logs, etc.

---

## Versiones de Docker Compose

* Hay tres versiones mayores diferentes, la 1, la 2 y la 3.
* Entre la 1 y la 2 no son compatibles entre sí, entre la 2 y la 3 comparten
  estructura, pero se quitan algunas opciones en la 3.
* Veremos la sintaxis de la versión 3.

---

## Docker Compose: ejemplo

* Instalación de Wordpress.
  * Vamos a crear un archivo llamado docker-compose.yml.
  * Definiremos allí la arquitectura de la aplicación.
  * Nos valdremos del comando `docker-compose` para levantar Wordpress e
    interactuar con los contenedores generados.

---

## Configuración

```bash
version: '3'

volumes:
  dbdata:

services:
  db:
    image: mysql:5.7
    volumes:
      - "dbdata:/var/lib/mysql"
    restart: on-failure
    environment:
      MYSQL_ROOT_PASSWORD: wordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8080:80"
    restart: on-failure
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_PASSWORD: wordpress

```
<small>
Analizar cada opción y relacionar con las opciones de docker run
</small>

---

## Conceptos de docker-compose

* La configuración sirve para definir en forma declarativa la interacción entre contenedores (services).
* La configuración (`docker-compose.yml`) define un proyecto, cuyo nombre es el directorio que contiene dicha configuración.
  * Puede cambiarse con la [variable de ambiente `COMPOSE_PROJECT_NAME`](https://docs.docker.com/compose/reference/envvars/) o la opción -p.
  * El nombre de proyecto se usa como prefijo para los contenedores, volumenes y redes creadas.

---

## Conceptos de docker-compose

* Compose creará una red propia en docker: `docker network list`
  * Las redes pueden definise usando una sección principal llamada `networks` en la configuración.
  * Los contenedores pueden asociarse a las diferentes redes creadas.
* Compose creará volumenes declarados en la sección `volumes` de la configuración.

---

## Iniciando el proyecto

```bash
docker-compose up [-d]
  Creating network "wordpress_default" with the default driver
  Creating volume "wordpress_dbdata" with default driver
  Creating wordpress_db_1
  Creating wordpress_wordpress_1
```
<small>Crea las redes, volúmenes, e inicia los contenedores</small>

Podemos observar el estado de los contenedores con

```bash
docker-compose ps
```

---

## Accediendo al servicio

http://localhost:8080

### Para ver los logs:

```bash
docker-compose logs -f
```

---

## Deteniendo el proyecto

```bash
docker-compose stop
  Stopping wordpress_wordpress_1 ... done
  Stopping wordpress_db_1 ... done
```

<small>Puede verificarse con `docker-compose ps` que se han detenido los servicios.</small>

Luego, puede reiniciarse con:

```bash
docker-compose start
  Starting db ... done
  Starting wordpress ... done
```

---

## Destruyendo los contenedores

Para destruir los contenedores puede usarse:

* `docker-compose rm` sólo si no corren los contenedores.
* `docker-compose down` baja los contenedores y luego elimina.

---

## Forzar la recreación

Es posible reiniciar un contenedor con:

```bash

docker-compose up --force-recreate

```

---

## Construyendo imágenes

* Durante el desarrollo, es tedioso tener que generar una imagen docker y luego
  pushearla a una registry para luego descargarla.
* Por ello, se proporciona la opción de configurar con [la sección build](https://docs.docker.com/compose/compose-file/#build)
* El comando `docker-compose build` construye una imagen.
  * El subcomando `up` soporta además la opción `--build`

---

## Observaciones

* Es importante usar volúmenes para persistir datos.
* Las redes de cada proyecto son diferentes.
* El uso de links no es necesario.
* Las políticas de reinicio simplifican el problema de qué servicio arranca primero.

