## Docker

---

## Antecedentes

* Antiguamente, transportar bienes tenía muchos problemas:
  * Diferentes tamaños, formas, resistencias, etc.
  * Capacidad de transporte reducida.
  * Difícil realizar un seguimiento.
  * Pérdida parcial de mercadería.
  * Grandes costos.

---

## Contenedores

* Los contenedores solucionaron muchos de ellos:
  * Un vendedor pone todos sus productos en un contenedor y sólo debe preocuparse por ese contenedor.
  * Los productos nunca se manipulan individualmente.
  * Tamaños y formas estandarizadas, simplifica toda la cadena de transporte: el transporte sólo debe llevar contenedores.

---

## Contenedores

![contenedores tradicionales](images/traditional-containers.jpg)<!-- .element: height="550px" -->

---

## ¿Qué es docker?

* Contenedores de software.
  * Empaqueta aplicaciones en una unidad estándar de intercambio.
* Única pieza de software en un filesystem completo que contiene **todo lo necesario** para ejecutar una aplicación: código, librerías, herramientas, etc.
* Garantiza que el software **siempre correrá de igual forma** sin importar su ambiente.

---

## ¿Por qué Docker?

* Rápida configuración de entornos de desarrollo.
* Favorece las arquitecturas de microservicios.
* Minimiza las diferencias entre el ambiente de desarrollo, testing y producción.
* Instalación de una misma aplicación en diferentes plataformas.
* Despliegue de aplicaciones complejas.
* Ejecución de código antiguo.
* Escalamiento horizontal.

---

## Matriz del infierno

![matriz del infierno](images/matrix-of-hell-wo-docker.jpg)<!-- .element: height="550px" -->

---

## Matriz del infierno

![matriz del infierno](images/matrix-of-hell.jpg)<!-- .element: height="550px" -->

---

## Comparación con máquinas virtuales

![Docker vs. VMs](images/wid-vm-updated.png)<!-- .element: height="450px" style="border: none; box-shadow: none; background: none;" -->

---

## Características generales

* Emerge como proyecto de SL en 2013.
* Virtualización a nivel de sistema operativo.
* Contenedores independientes en una instancia Linux que evita el overhead de manipular VMs.

---

## Características generales

* [Cgroups](https://en.wikipedia.org/wiki/Cgroups) para restringir recursos como cpu, memoria, IO, red, etc.
* [Namespaces](https://en.wikipedia.org/wiki/Linux_namespaces) permiten aislar recursos de una colección de procesos como por ejemplo: PID, hostname, UID, acceso a la red, comunicación entre procesos, filesystem, etc.

---

## Características generales

* [Capabilities](http://man7.org/linux/man-pages/man7/capabilities.7.html) permiten segmentar los privilegios asociados normalmente a root en unidades, en contraposición con el clásico modo privilegiado y no privilegiado.
* [Filesystem de unión](https://docs.docker.com/engine/userguide/storagedriver/selectadriver/) como es el caso de AUFS, OverlayFS, Btrfs, Device Mapper, ZFS, etc.

---

## Imágenes y contenedores

* Imagen:
  * Filesystem y parámetros para utilizarla.
  * No cambia nunca y no tiene estados.
* Contenedor:
  * Instancia de una imagen (resultado de ejecutarla).
  * Tiene una capa de RW volátil.

---

## Imágenes y contenedores

![Imagen de Docker](images/image-layers.jpg)<!-- .element: height="550px" -->

---

## Imágenes y contenedores

![Contenedor de Docker](images/container-layers.jpg)<!-- .element: height="550px" -->

---

## Imágenes y contenedores

![Compartiendo una imagen](images/sharing-layers.jpg)<!-- .element: height="550px" -->

---

## Imágenes y contenedores

!["Imagen derivada](images/saving-space.png)<!-- .element: height="550px" -->

---

## Instalación de Docker

* Docker puede instalarse en:
  * Linux.
  * MacOS.
  * Windows.

---

## Instalación de Docker en Linux

* Requisitos:
  * Sistema de 64 bits.
  * Kernel 3 o superior. Preferible 4
* Existen binarios para la mayoría de las distribuciones y arquitecturas ARM.

---

## Instalación de Docker en Windows/MacOS

* Usando Docker Toolbox.
  * Utiliza Docker Machine (no nativo).
  * Windows 7/MacOS 10.8 o superior
* Docker for (Windows/Mac):
  * Corre una aplicación nativa usando (Hyper-V/xhyve para virtualizar la Docker Engine).
  * Windows 10/MacOS 10.10.3 o superior.

---

## Comandos básicos

```bash
# Más usados
docker run
docker ps
docker build
docker images
docker logs
docker inspect
docker volume

# Otros comandos comunes
docker commit
docker pull
docker push
docker tag
```

---

## Nuestro primer contenedor

```bash
$ docker run --rm -it alpine
Unable to find image 'alpine:latest' locally
latest: Pulling from library/alpine
cd784148e348: Pull complete 
Digest: sha256:46e71df1e5191ab8b8034c5189e325258ec44ea739bba1e5645cff83c9048ff1
Status: Downloaded newer image for alpine:latest
/ # 
```

---

## Otra forma de usar un contenedor

```bash
$ docker run --rm -it python:3-alpine python \
  -c 'print("Hello world")'
Unable to find image 'python:3-alpine' locally
3-alpine: Pulling from library/python
cd784148e348: Already exists 
a5ca736b15eb: Pull complete 
f320f547ff02: Pull complete 
2edd8ff8cb8f: Pull complete 
9381128744b2: Pull complete 
Digest: sha256:f708ad35a86f079e860ecdd05e1da7844fd877b58238e7a9a588b2ca3b1534d8
Status: Downloaded newer image for python:3-alpine
Hello world
```

---

## Dockerfile

* Archivo de texto plano para crear imágenes de Docker.
* Permite escribir instrucciones a ejecutar.
* Automatiza el proceso de la creación de imágenes.
* Permite repetir y modificar fácilmente una imagen.
* Generar de forma simple imágenes derivadas.

---

## Dockerfile

```bash
FROM alpine:3.8
# Instalar Nginx y configurar una página personalizada
RUN mkdir -p /run/nginx /www
RUN echo "<html><h1>Nginx en Docker</h1></html>" > /www/index.html
RUN apk add -U nginx
RUN echo 'server { listen 80; root /www; }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Nuestra primer imagen

```bash
$ docker build -t curso-docker/nginx:1.0.0 .
Sending build context to Docker daemon  2.048kB
Step 1/7 : FROM alpine:3.8
3.8: Pulling from library/alpine
c87736221ed0: Pull complete 
Digest: sha256:04696b491e0cc3c58a75bace8941c14c924b9f313b03ce5029ebbc040ed9dcd9
Status: Downloaded newer image for alpine:3.8
 ---> dac705114996
Step 2/7 : RUN mkdir -p /run/nginx /www
 ---> Running in ef0220ed9726
Removing intermediate container ef0220ed9726
 ---> 85d1af8aa692
Step 3/7 : RUN echo "<html><h1>Nginx en Docker</h1></html>" > /www/index.html
 ---> Running in cbfdf6cb63fa
Removing intermediate container cbfdf6cb63fa
 ---> 570e4c942dba
Step 4/7 : RUN apk add -U nginx
 ---> Running in c016e755367d
fetch http://dl-cdn.alpinelinux.org/alpine/v3.8/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.8/community/x86_64/APKINDEX.tar.gz
(1/2) Installing pcre (8.42-r0)
(2/2) Installing nginx (1.14.2-r1)
Executing nginx-1.14.2-r1.pre-install
Executing busybox-1.28.4-r3.trigger
OK: 6 MiB in 15 packages
Removing intermediate container c016e755367d
 ---> cb710d89f9f4
Step 5/7 : RUN echo 'server { listen 80; root /www; }' > /etc/nginx/conf.d/default.conf
 ---> Running in fa3f4e854ce4
Removing intermediate container fa3f4e854ce4
 ---> 7cc5141f5be4
Step 6/7 : EXPOSE 80
 ---> Running in fbec078dde9d
Removing intermediate container fbec078dde9d
 ---> d11a196fed8f
Step 7/7 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in 1fa668610607
Removing intermediate container 1fa668610607
 ---> 682592f28978
Successfully built 682592f28978
Successfully tagged curso-docker/nginx:latest
```

---

## Verificamos la imagen existe

```bash
$ docker images
  REPOSITORY          TAG    IMAGE ID       CREATED          SIZE
  ....
  curso-docker/nginx     1.0.0  682592f28978   2 minutes ago    7.11 MB
  ....
```

---

## Probamos la imagen

_Observar las opciones -d y -p_

```bash
docker run -d -p 8080:80 curso-docker/nginx:1.0.0
curl localhost:8080
```

---

## Reusando capas

Si volvemos a crear la misma imagen

```bash
$ docker build -t curso-docker/nginx:1.0.0 .
Sending build context to Docker daemon  2.048kB
Step 1/7 : FROM alpine:3.8
 ---> dac705114996
Step 2/7 : RUN mkdir -p /run/nginx /www
 ---> Using cache
 ---> 85d1af8aa692
Step 3/7 : RUN echo "<html><h1>Nginx en Docker</h1></html>" > /www/index.html
 ---> Using cache
 ---> 570e4c942dba
Step 4/7 : RUN apk add -U nginx
 ---> Using cache
 ---> cb710d89f9f4
Step 5/7 : RUN echo 'server { listen 80; root /www; }' > /etc/nginx/conf.d/default.conf
 ---> Using cache
 ---> 7cc5141f5be4
Step 6/7 : EXPOSE 80
 ---> Using cache
 ---> d11a196fed8f
Step 7/7 : CMD ["nginx", "-g", "daemon off;"]
 ---> Using cache
 ---> 682592f28978
Successfully built 682592f28978
Successfully tagged curso-docker/nginx:1.0.0
```

> Observar los textos **Using cache**

---

### ¿Qué sucede si se modifica el texto html?

---

## Historia de la imagen

```
$ docker history curso-docker/nginx:1.0.0 
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
682592f28978        6 minutes ago       /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B
d11a196fed8f        6 minutes ago       /bin/sh -c #(nop)  EXPOSE 80                    0B
7cc5141f5be4        6 minutes ago       /bin/sh -c echo 'server { listen 80; root /w…   33B
cb710d89f9f4        6 minutes ago       /bin/sh -c apk add -U nginx                     2.7MB
570e4c942dba        6 minutes ago       /bin/sh -c echo "<html><h1>Nginx en Docker</…   38B
85d1af8aa692        6 minutes ago       /bin/sh -c mkdir -p /run/nginx /www             0B
dac705114996        6 months ago        /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
<missing>           6 months ago        /bin/sh -c #(nop) ADD file:38bc6b51693b13d84…   4.41MB
```

> Observar que se agregan 6 capas a la imagen orginal de `alpine:3.8`, pudiendo determinar qué capa consume qué cantidad de bytes

---

### Reducir la historia de nuestra imagen

```
FROM alpine:3.8
# Instalar Nginx y configurar una página personalizada
RUN apk add -U nginx && \
    echo 'server { listen 80; root /www; }' > /etc/nginx/conf.d/default.conf && \
    mkdir -p /run/nginx /www && \
    echo "<html><h1>Nginx en Docker</h1></html>" > /www/index.html
EXPOSE 80
CMD    ["nginx", "-g", "daemon off;"]
```

Luego corremos:

```bash
docker build -t curso-docker/nginx:1.1.0 .
docker run --rm -d -p 8001:80 --name cd-nginx-1.1.0 curso-docker/nginx:1.1.0
curl localhost:8001
```

---

## Historia de la imagen nueva

```bash
$ docker build -t curso-docker/nginx:1.1.0 .
$ docker history curso-docker/nginx:1.1.0
IMAGE               CREATED             CREATED BY                                      SIZE                COMMENT
dcd0e8d70776        5 minutes ago       /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B                  
73460458b85c        5 minutes ago       /bin/sh -c #(nop)  EXPOSE 80                    0B                  
60b0d80c98eb        5 minutes ago       /bin/sh -c apk add -U nginx &&     echo 'ser…   2.7MB               
3f53bb00af94        2 weeks ago         /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B                  
<missing>           2 weeks ago         /bin/sh -c #(nop) ADD file:2ff00caea4e83dfad…   4.41MB    
```

---

## Reusando imágenes

* En el mundo docker existen [imágenes oficiales](https://docs.docker.com/docker-hub/official_images/) que:
  * Proveen imágenes base de diferentes OS.
  * Proveen una solución inmediata para lenguajes de programación, bases de datos y otros servicios.
  * Ejemplifican buenas prácticas para generación de `Dockerfile`.
  * Aseguran la aplicación de actualizaciones de seguridad.

---

## Repensando el ejemplo de nginx

```bash
docker run -d -p 9000:80 nginx
curl localhost:9000
```

> Podemos pensar en reescribir nuestra imagen partiendo de la librería nginx

---

## Refactorizando la imagen de nginx

```bash
FROM nginx
RUN echo "<html><h1>Nginx en Docker</h1></html>" > /usr/share/nginx/html/index.html
```

La construimos y probamos

```bash
docker build -t curso-docker/nginx:1.2.0 .
docker run --rm -d -p 9001:80 --name cd-nginx-1.2.0 curso-docker/nginx:1.2.0
curl localhost:9001
```

---

### Y por qué es mejor la version refactoriozada

## Por el manejo de logs<!-- .element: class="fragment" -->

---

## Análisis de contenedores

* El comando `docker ps` lista los contenedores.
  * La opción `-a` permite visualizar todos, incluso los que ya no corren.
  * La opción `-s` permite visualizar el tamaño de la capa volátil.
* El comando `docker inspect` permite analizar cada contenedor.

### Ejemplos con formato
```bash
docker ps --format  '{{ .ID }} - {{ .Names }}  - {{ .Size }}'

docker inspect -f  '{{ .Name }}: {{ .NetworkSettings.IPAddress }}' <ID>
```

---

## Verificación

Generamos mucho tráfico a los contenedores:

```bash
while true; do
  curl -o /dev/null -s localhost:8001;
  curl -o /dev/null -s localhost:9001;
done
```

Mientras corre, podemos verificar:

```bash
docker ps -s --filter name=cd-nginx*
```

---

## Parar y eliminar contenedores

* Los contenedores que no estén corriendo pueden eliminarse usando `docker rm`.
  * Si se desea eliminar un conenedor corriendo puede usarse `-f`.
* Los contenedores pueden pararse con `docker kill` o `docker stop`.
  * Si cuando se inició con `docker run` usó `--rm` entonces se elimina.
  * Caso contrario, podrá reiniciarse con `docker start`.

---

# Registry

---

## Registry docker

* Servicio para almacenar y distribuir imágenes de Docker.
* Siempre funcionan con SSL.
* Las imágenes en la [registry oficial de docker](https://hub.docker.com/) no usan FQDN.
* Las imágenes en registries privadas deben utilizar FQDN para indicar la URI.
  * `registry.gitlab.com/chrodriguez/my-app:0.1.1-beta.5`
* Pueden requerir autenticación.
  * `docker login registry.gitlab.com`

---

## Docker Hub

* Gratis para imágenes públicas.
* Soporta builds automáticos (desde Github / Bitbucket / Travis).
* Cuentas para organizaciones.
* Plan pago para imágenes privadas.
* https://hub.docker.com

---

## Registries privadas

* Instalación privada
* Acceso local para mayor velocidad de descarga.
* Imágenes en un ambiente controlado y gestionado por la organización.
* Para usarslas hay que iniciar sesión

```bash
docker login registry.example.net
```

---

## Productos de registries privadas

* Gitlab ofrece este servicio de forma gratuita en la versión online o on-premises.
* [Docker registry](https://docs.docker.com/registry/#requirements).
* [Sonatype Nexus Repository](https://help.sonatype.com/repomanager3/private-registry-for-docker).

---

## Ejemplo de la registry docker

```bash
docker run -d -p 5000:5000 --name registry registry:2
docker pull alpine
docker tag alpine localhost:5000/myfirstimage
docker push localhost:5000/myfirstimage
docker pull localhost:5000/myfirstimage
```


> Los comandos pull y push, descargan y suben respectivamente, imágenes a una registry.

---

## Consideraciones para trabajar con docker

---

## ¿Qué considerar?

* Ya sabemos que:
  * Las imágenes Docker son inmutables.
  * Los contenedores crean una capa con las diferencias correspondientes respecto de la imagen original.
* Entonces los contenedores deberían minimizar los cambios respecto de la imagen original.
  * Optimizando el uso de espacio y evitando impactos de performance.
  * Promoviendo la reusabilidad.

---

## Inmutabilidad en la infraestructura

* Desplegar una actualización de una aplicación, consiste en crear nuevas intancias y destruir las anteriores, en vez de actualizarlas sobre la instancia productiva.
* Una vez que una aplicación está corriendo, **¡evitamos tocarla!** promoviendo así:
  * Repetibilidad.
  * Reducir costos de mantenimiento.
  * Simplificar rollbacks.

---

## Inmutabilidad en la infraestructura

* Para lograr este tipo de inmutabilidad deben cumplirse los siguientes
  requerimientos:
  * La aplicación debe ser stateless. Su estado debe almacenarse en un servicio
    por fuera del alcance de la *infraestructura inmutable*.
  * Existe un template y/o conjunto de instrucciones que permiten desplegar una
    instancia de la aplicación desde cero.
* El segundo punto lo resuelve fácilmente Docker.

---

## ¿Qué es dinámico entonces?

* La creación de las imágenes debe conocer bien el dominio para identificar las
  partes que son dinámicas:
  * Archivos que se generan por la aplicación.
  * Uploads desde la aplicación.
  * Logs.
  * Spool.

---

## ¿Cómo verificar si mis contenedores crecen?

Un mal diseño de las imágenes impactará en la performance de los contenedores que generarán grandes capas con datos dinámicos.

Ante la actualización del contenedor, estos datos se perderán.

---

## Verificando el crecimiento

```bash
docker run --rm -it --name disk-grow \
  alpine ash -c \
  'dd if=/dev/zero of=/tmp/grow.img bs=1M count=10 && tail -f /dev/null'
10+0 records in
10+0 records out
```
Luego verificamos si el contenedor creció 10M

```bash
docker ps -s -f name=disk-grow
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES               SIZE
7d0619c4aec8        alpine              "ash -lc 'dd if=/dev…"   35 secon
```

---

## ¿Cómo verificar qué cambió?

Es posible ver en los contenedores qué archivos cambiaron.

```bash
docker diff disk-grow
C /tmp
A /tmp/grow.img
```

---

## Buenas prácticas

* **Los contenedores deben ser efímeros:** pararlos, destruirlos y volverlos a iniciar con una mínima configuración.
* **Evitar paquetes innecesarios:** las imágenes no deben incluir paquetes que no se utilicen.
* **Logs en salida estandar:** las imágenes deben usar STDOUT y STDERR para sus
  logs.

---

## Buenas prácticas

* **Un proceso por contenedor:** en la mayoría de los casos, se debe correr un proceso por contenedor. Desacoplar aplicaciones en múltiples contenedores hace mucho más simple el escalamiento horizontal y reuso de contenedores.
* **La (in)necesidad de ssh**: acceder a un contenedor es algo que debemos evitar. En términos de infraestructura inmutable, el servicio no debería considerar SSH.
* **Aplicar Twelve Factor App**

---

## Volúmenes

---

## ¿Cómo guardo la información?

* Los contenedores son volátiles e inmutables.
* Debemos preservar la información importante.
* ¿Dónde?
  * En volúmenes de datos.

---

## Características de los volúmenes

* No utilizan un sistema de archivos de unión (UFS).
* Pueden compartirse y reusarse entre contenedores.
* Los cambios se hacen directamente en el volumen.
* La información del volumen **no se incluye** en la imagen.
* Persisten aún cuando se eliminen todos los contenedores que los usan.
  * Pueden quedar volúmenes sin referenciar.

---

## Tipos de volúmenes

* Volúmenes anónimos.
* Volúmenes nombrados.
* Volúmenes desde el SO host.

---

## Tipos de volúmenes

* Al crear un volúmen anónimo o nombrado, la información que exista en el punto
  de montaje se copia al volumen.
* Con volúmenes desde el SO host o desde otro contenedor, se oculta la
  información que exista en el punto de montaje.
  * Correspondencia con el comando mount.

---

## Volúmenes anónimos

```bash
docker volume ls
  DRIVER    VOLUME NAME
```

Creamos un contenedor con un volumen anónimo

```bash
docker run -it -v /opt alpine
  /# ls /opt/
  /# echo "Prueba" > /opt/archivo
  /# exit
```

Verificamos

```bash
docker ps -a
docker volume ls
```

---

## Volúmenes anónimos

```bash
$ docker volume inspect <ID>
  [
      {
          "Name": "<ID>",
          "Driver": "local",
          "Mountpoint": "/var/lib/docker/volumes/<ID>/_data",
          "Labels": null,
          "Scope": "local"
      }
  ]
```

Verificando

```bash
$ ls /var/lib/docker/volumes/<ID>/_data
  archivo
$ cat /var/lib/docker/volumes/<ID>/_data/archivo
  Prueba
```

---

## Volúmenes anónimos

Si se repite el proceso, entonces:

```bash
docker run -it -v /opt alpine ls /opt
```

Debería estar vacía


```bash
docker volume ls
  DRIVER    VOLUME NAME
  local     483ea67555fb592d25e51fe513b42f4a611398ad2824c029d7767a605eb7967d
  local     e9c7022b8c7bec55891ca44b8c40de1e5f41cf0fe9505a334bca06a484a5ff1f
```
Ahora hay dos volúmenes anónimos

---

## Volúmenes anónimos

Los volúmenes anónimos se eliminan cuando:

* Se corre `docker run --rm`
* Si el contenedor asociado al volumen usa `docker rm -v`
* Explícitamente usando `docker volume rm`

---

## Volúmenes nombrados

```bash
docker run -it --rm -v test:/opt alpine
  /# ls /opt/
  /# echo "Prueba" > /opt/archivo
  /# exit
```

Ahora podemos comprobarlo

```bash
docker volume ls
  DRIVER    VOLUME NAME
  local     test
```

> Observar el uso de `--rm`

---

## Volúmenes nombrados

```bash
$ docker volume inspect test
  [
      {
          "Name": "test",
          "Driver": "local",
          "Mountpoint": "/var/lib/docker/volumes/test/_data",
          "Labels": null,
          "Scope": "local"
      }
  ]
```

Verificando

```bash
$ ls /var/lib/docker/volumes/test/_data
  archivo
$ cat /var/lib/docker/volumes/test/_data/archivo
  Prueba
```

---

## Volúmenes nombrados

Es posible usar reutilizarlos

```bash
docker run --rm -it -v test:/opt alpine ls /opt/

prueba
```

> Principio usado para bases de datos por ejemplo

---

## Volúmenes desde el SO host

Creamos un directorio en el sistema operativo host.

```bash
mkdir -p /tmp/data && ls /tmp/data
```

Ejecutamos el contenedor montando el directorio creado.

```bash
docker run --rm -it -v /tmp/data:/opt alpine
```

---

## Volúmenes desde el SO host

Dentro del contenedor, vemos que nada existe en /opt.

```bash
/# ls /opt/
```
Desde el host, creamos un archivo con contenido.

```bash
echo "Prueba" > /tmp/data/archivo
```

Verificamos /opt en el contenedor

```bash
/# ls /opt/
  archivo
```

---

## Volúmenes desde el SO host

Agregamos contenido desde el contenedor

```bash
/# echo "Otra prueba" >> /opt/archivo
```

Finalmente, en el host, vemos el archivo actualizado.

```bash
cat /tmp/data/archivo
Prueba
Otra prueba
```

---

## Volúmenes desde el SO host

* Cuando se usan volúmenes montados desde el host, no se crea ningún volumen de Docker.
  * Igual lógica que al montar un recurso en un equipo Linux.
* Se pisa el contenido

```bash
docker run --rm -v /tmp/data:/bin alpine
```
> ¿Qué pasaría?

---

## Volúmenes desde otro contenedor


```bash
docker run -v /opt --name alpine-test alpine \
  sh -c 'echo Hola > /opt/ejemplo'

docker run --rm  --volumes-from alpine-test alpine \
  cat /opt/ejemplo

docker volume ls && \
  docker rm -v alpine-test && \
  docker volume ls
```

---

## Más comandos docker

---

## Ingresar a un contenedor

* No es una buena práctica abrir un puerto para acceder por ssh.
  * Sólo un proceso por contenedor.
  * Expone vulnerabilidades por las formas de acceso.
  * Agrega logica innecesaria como usuarios innecesarios.
* Utilizar `docker exec`.
* Incluso en contenedores que corren con un usuario sin privilegios, puede cambiar el usuario.

---

## Commit

* Una forma de crear una imágen a partir de un contenedor.
* Similar a crear un snapshot
* Uso: `docker commit <ID> <IMAGE>:<TAG>`

---

## Datos acerca de docker

El comando docker puede leer diferenes datos del ecosistema docker:

```bash
docker info
docker system info
docker system events
docker system df
```

---

## Prune de espacio

* **Contentendores:** `docker container prune`
* **Imágenes:** `docker images prune`
* **Volúmenes:** `docker volume prune`
* **System:** `docker system prune`
  * `docker system prune -a --volumes`

---

## Límite de recursos: memoria

Para poder probarlo, necesitamos deshabilitar la swap: `swapoff -a` y luego creamos un archivo de 10M

```
dd if=/dev/zero bs=1k count=10240 of=/tmp/file-10M
```

Finalmente probamos el siguiene código:

```
docker run -v /tmp/file-10M:/tmp/file-10M --rm -it \
  php:cli-alpine -r 'file("/tmp/file-10M"); echo "Leido";'
```

Y luego

```
docker run -m 10m -v /tmp/file-10M:/tmp/file-10M --rm -it \
  php:cli-alpine -r 'file("/tmp/file-10M"); echo "Leido";'
```

---

## Límite de recursos: CPU

Usando el 100% de la CPU

```bash
docker run --rm -it -v /tmp/file-10M:/tmp/file-10M alpine \
  time md5sum /tmp/file-10M
```

Usando el 10% de la CPU

```bash
docker run --cpus="0.1" --rm -it -v /tmp/file-10M:/tmp/file-10M alpine \
  time md5sum /tmp/file-10M
```

---

## Límite de recursos: IO

Limitando las escrituras a 1kb por segundo

```bash
docker run -it --device-write-bps /dev/sda:1kb ubuntu \
  dd bs=4k count=2 oflag=direct if=/dev/zero of=/tmp/testwrite
```

Limitando las escrituras a 8kb por segundo

```bash
docker run -it --device-write-bps /dev/sda:8kb ubuntu \
  dd bs=4k count=2 oflag=direct if=/dev/zero of=/tmp/testwrite
```

---

## Límite de recursos: IO

Pueden limitarse:

```
--device-read-bps list           Limit read rate (bytes per second) from a device (default [])
--device-read-iops list          Limit read rate (IO per second) from a device (default [])
--device-write-bps list          Limit write rate (bytes per second) to a device (default [])
--device-write-iops list         Limit write rate (IO per second) to a device (default [])
--blkio-weight uint16            Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0)
--blkio-weight-device list       Block IO weight (relative device weight) (default [])
```

---

## Multistage builds

Creado con el fin de ahorrar espacio en término de capas y espacio.

```bash
FROM golang:1.7.3 as builder
WORKDIR /go/src/github.com/alexellis/href-counter/
RUN go get -d -v golang.org/x/net/html  
COPY app.go    .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/github.com/alexellis/href-counter/app .
CMD ["./app"]  
```
