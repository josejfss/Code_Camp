use code_camp;

select * from estado;

CREATE VIEW consulta1
AS
SELECT COUNT(*) total_producto_activo
from producto p
where p.stock > 0
	AND (p.id_estado BETWEEN 34 AND 37);


select * from consulta1;
-- ------------------------------------------------
CREATE VIEW consulta2
AS
Select SUM (o.total_orden) total_quetzales_agosto
from pedido p
INNER JOIN orden o ON p.id_orden = o.id_orden
WHERE o.fecha_entrega BETWEEN '2024-08-01' AND '2024-08-31'
	AND NOT o.id_estado = 45;


select * from consulta2;

-- --------------------------------------------------
CREATE VIEW consulta3
AS
Select TOP(10) u.primer_nombre + ' '+ u.segundo_nombre + ' '+ u.primer_apellido+ ' ' +  u.segundo_apellido as nombre_completo, SUM(o.total_orden) consumo_en_quetzales
from pedido p
INNER JOIN orden o ON p.id_orden = o.id_orden
INNER JOIN usuario u ON o.id_usuario = u.id_usuario
WHERE o.id_estado = 45
GROUP BY u.id_usuario,u.primer_nombre, u.segundo_nombre, u.primer_apellido,  u.segundo_apellido;

select * from consulta3;


-- ------------------------------------------------------
CREATE VIEW consulta4
AS
WITH top_10_des_pr AS(
	SELECT TOP(10) pr.nombre nombre_producto, SUM(p.subtotal) cantidad_Q_vendido
	from pedido p
	INNER JOIN orden o ON p.id_orden = o.id_orden
	INNER JOIN producto pr ON p.id_producto = pr.id_producto
	WHERE o.id_estado = 45
	GROUP BY pr.nombre
	ORDER BY cantidad_Q_vendido DESC

)
SELECT TOP(10) *
FROM top_10_des_pr
ORDER BY cantidad_Q_vendido ASC;


select * from consulta4;


SELECT *
FROM (
	SELECT TOP(10) pr.nombre nombre_producto, SUM(p.subtotal) cantidad_Q_vendido
	from pedido p
	INNER JOIN orden o ON p.id_orden = o.id_orden
	INNER JOIN producto pr ON p.id_producto = pr.id_producto
	WHERE o.id_estado = 45
	GROUP BY pr.nombre
	ORDER BY cantidad_Q_vendido DESC
) t1
ORDER BY t1.cantidad_Q_vendido ASC





-----------------------------------------------------------

UPDATE orden
SET fecha_entrega = DATEFROMPARTS(2024, 07, DAY(fecha_entrega))
WHERE MONTH(fecha_entrega) = 09;


select *
from pedido;