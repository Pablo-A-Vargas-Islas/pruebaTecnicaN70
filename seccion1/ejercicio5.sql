/*A partir de las siguientes tablas, generar una consulta SQL que identifique los libros que la alumna Sonia tiene prestados, que no ha devuelto y cuyo préstamo está vencido al día 30/07/2021.

//Creación de las tablas
DROP TABLE IF EXISTS prestamo;
DROP TABLE IF EXISTS libro;
DROP TABLE IF EXISTS alumno;

CREATE TABLE alumno (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    carrera VARCHAR(100) NOT NULL
);

CREATE TABLE libro (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    editorial VARCHAR(100) NOT NULL,
    dias_limite_prestamo INT NOT NULL
);

CREATE TABLE prestamo (
    id SERIAL PRIMARY KEY,
    id_alumno INT REFERENCES alumno(id),
    id_libro INT REFERENCES libro(id),
    fecha_prestamo VARCHAR(20) NOT NULL,
    entregado BOOLEAN NOT NULL
);

INSERT INTO alumno (id, nombres, apellidos, carrera) VALUES
(1, 'Rosa', 'Torres', 'Sistemas'),
(2, 'Angel', 'Perez', 'Electronica'),
(3, 'Sonia', 'Ríos', 'Industrial');

INSERT INTO libro (id, nombre, editorial, dias_limite_prestamo) VALUES
(1, 'Administración', 'Norma', 30),
(2, 'Redes neuronales', 'Santillana', 30),
(3, 'Estadistica', 'Regio', 10),
(4, 'Desarrollo web', 'Limusa', 10);

INSERT INTO prestamo (id, id_alumno, id_libro, fecha_prestamo, entregado) VALUES
(1, 1, 1, '23/7/2021', false),
(2, 1, 2, '22/7/2021', false),
(3, 1, 3, '15/6/2021', false),
(4, 2, 1, '12/7/2021', false),
(5, 3, 1, '28/7/2021', true),
(6, 3, 2, '16/7/2021', true),
(7, 3, 3, '28/7/2021', true),
(8, 3, 4, '10/5/2021', false),
(9, 2, 2, '28/7/2021', false),
(10, 3, 2, '5/4/2021', false);*/


SELECT 
    libro.nombre,
    libro.editorial,
    prestamo.fecha_prestamo
FROM prestamo
JOIN alumno ON prestamo.id_alumno = alumno.id
JOIN libro ON prestamo.id_libro = libro.id
WHERE alumno.nombres = 'Sonia'
  AND prestamo.entregado = false
  AND (TO_DATE(prestamo.fecha_prestamo, 'DD/MM/YYYY') + (libro.dias_limite_prestamo || ' days')::INTERVAL) < '2021-07-30';