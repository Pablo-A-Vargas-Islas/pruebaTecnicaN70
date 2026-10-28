# pruebaTecnicaN70
Prueba técnica para Desarrollador Web

-NOTAS SOBRE IMPLEMENTACIÓN DE IA: Utilicé la ayuda de la IA unicamente y estrictamente en situaciones donde por rapidez consideraba adecuado consultar información o dudas rápidas, y se le prohibió enseñarme código. Solo se utilizó como ayuda para recordar temas ya olvidados, nunca para resolver la lógica de cada uno de los ejercicios.

SECCIÓN 1 - EJERCICIO 1
- Para este ejercicio retomé un poco de información de la página de freeCodeCamp para recordar el metodo de separación (https://www.freecodecamp.org/espanol/news/el-split-de-javascript-como-dividir-una-cadena-de-caracteres-en-un-arreglo-con-js/).
- Obté por una solución básica basada en metodos funcionales de JavaScript y bucles anidados.

SECCIÓN 1 - EJERCICIO 2
- En este ejercicio con la respuesta automática de IA de google investigué sobre los metodos más utilizados para recuperar valores determinados de un arreglo, y una vez decidido el metodo .filter procedí a investigar su ejecución en código y terminar el ejercicio.
- Consulte https://www.freecodecamp.org/espanol/news/tutorial-de-arrayfilter-de-javascript-como-iterar-a-traves-de-los-elementos-en-un-arreglo/.

SECCIÓN 1 - EJERCICIO 3
- En este ejercicio tuve que investigar el concepto de numeros primos gemelos con ayuda de la IA.
- Consulté cuales eran los métodos más eficaces para sacar numeros primos en JavaScript en Stack Overflow.
- Para este ejercicio si necesité la ayuda de revisar un algoritmo para solucionar el problema, me basé en un codigo realizado por un desarrollador de la india mediante un blog publicado por el (Kabir Sharma) y lo adapté a los requisitos del ejercicio.

SECCIÓN 1 - EJERCICIO 4
- Al leer el problema investigué cómo se abordaba la búsqueda de combinaciones que sumaran un valor objetivo y encontré que comúnmente se soluciona con backtracking, pero la verdad no entendí muy bien esos conceptos e intenté primero ordenar los numeros de menor a mayor para después intentar hacer los cálculos pero me quedé sin ideas.

SECCIÓN 1 - EJERCICIO 5
- Para el ejercicio 5 solo tuve que consultar cada uno de los conceptos básicos y la sintaxis correcta de las consultas sql ya que no los recordaba del todo, después cree las tablas utilizando postgresql e hice pruebas para validar la información y al final poder obtener la consulta completa.
- Decidí que se usara Postgresql porque es con el que más he trabajado

SECCIÓN 2 - EJERCICIO 1
- Ya que llevo 2 años sin programar, tuve que ayudarme de videos y documentación de lo necesario así como de la ayuda de la IA para corregir mis errores y guiarme por los pasos correctos, y algunos de los sitios que visité fueron estos:
https://www.freecodecamp.org/news/create-crud-api-project/
https://typeorm.io/docs/data-source/data-source/
https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/
https://www.youtube.com/watch?v=xiW3lsji5l8&start=0&themeRefresh=1
- Decidí no meterme con AWS porque no he tenido la oportunidad de trabajar con eso

SECCIÓN 2 - EJERCICIO 2
- Utilicé el mismo método que en el ejercicio pasado, y estos son los sitios que ocupé:
https://www.youtube.com/watch?v=gwcca_zd4IE&start=0
https://www.youtube.com/watch?v=RUJ2l6FNTvo
https://www.youtube.com/watch?v=xib-22Ulvrc
https://sweetalert2.github.io/
https://getbootstrap.com/docs/5.3/getting-started/introduction/


SECCIÓN 3 - PREGUNTAS TEÓRICAS

Pregunta 1: Arquitectura de Backend El documento sugiere usar Node.js con los frameworks Express o NestJS. ¿Cuáles son las principales diferencias arquitectónicas entre Express y NestJS, y en qué tipo de proyectos o escenarios recomendarías utilizar uno sobre el otro?
 
- Por lo que entiendo Express es más simple y NestJS es mucho más robusto con una arquitectura clara, por ende Express conviene usarlo cuando son proyectos pequeños o rápidos y NestJS para proyectos a gran escala

Pregunta 2: Bases de Datos (SQL vs NoSQL) Para la persistencia de datos, la prueba da la opción de elegir entre MongoDB (usando Mongoose) o PostgreSQL (usando TypeORM). Explica las diferencias teóricas clave entre un motor de base de datos relacional y uno no relacional. ¿Qué factores tomarías en cuenta para elegir la base de datos ideal para una aplicación de tareas a gran escala?

- Bueno lo que yo tomaría en cuenta es el tipo de datos y el tipo de consultas que se van a realizar, ya que por una parte utilizar NoSQL puede resultar favorable en consultas simples cuando se hacen millones al día ya que son más rapidas sin pasar por tantos "filtros" como si lo haría una SQL, pero ahora el panorama cambiaría por completo si hablamos de datos sensibles los cuales forzozamente necesitan un mejor control y para eso elejiría una base de datos relacional, para que a gran escala todo tenga un orden

Pregunta 3: Seguridad y Middlewares Se solicita proteger las rutas de la API mediante un middleware de autenticación. Describe teóricamente cómo funciona el ciclo de vida de una petición HTTP que pasa por un middleware de autenticación. Además, explica brevemente el flujo de trabajo de la autenticación basada en JWT (JSON Web Tokens) y por qué es preferida en APIs RESTful.

- Primero es la petición del cliente y se hace por medio de una solicitud http la cual es dirigida a una ruta protegida, luego el middleware valida las credenciales de acceso y si son correctas, deja que la petición se complete, y si no, bloquea la petición. Sobre porque es preferida la autenticación basada en JWT, la verdad no lo sé pero me imagino que es porque es más facil de utilizar, o porque brinda mejor seguridad

Pregunta 4: Gestión del Estado Global en Frontend En el desarrollo del frontend con Vue (Nuxt 3), se requiere explícitamente el uso de Pinia para manejar el estado global de la aplicación. ¿Qué problemas arquitectónicos resuelve un gestor de estado global como Pinia en comparación con pasar props y emitir eventos de forma tradicional entre múltiples componentes anidados?

- No me sé la respuesta a esta pregunta, ya que son tecnologías nuevas para mí

Pregunta 5: Estrategias de Renderizado El ejercicio de la interfaz de usuario específica que el candidato puede crear una SPA (Single Page Application) o una SSR (Server-Side Rendering). Define teóricamente ambos conceptos e indica cuáles son las ventajas y desventajas de utilizar SSR con Nuxt 3, haciendo especial énfasis en el impacto sobre el SEO y el rendimiento (First Contentful Paint).

- La verdad al principio de la prueba no entendía la diferencia entre uno y otro, hasta que tuve que investigar y ahora entiendo que la diferencia está en como se renderiza cada uno, ya que uno se renderiza directamente en el servidor y otro en el navegador y por eso es que ayuda utilizar SSR porque permite que los motores de busqueda puedan leer la pagina de forma inmediata y además se ve la diferencia de carga cuando el usuario la consulta  y se percibe como una carga instantanea