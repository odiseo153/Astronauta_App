using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTO;
using Modelos.Modelos;
using System.Data;
using Connection = Controlador.Context.Connection;

namespace Controlador.Controllers
{
    public class AstronautaControlador
    {

        private IDbConnection db = Connection.Open();
        public List<Astronauta> get()
        {
            var astronautas = db.Query<Astronauta>("select * from Astronauta").ToList();
           
            return astronautas;
        }

        public IActionResult AstronautaById(int id)
        {
            var astro = db.Query<Astronauta>($"select * from astronauta where ID = {id}").FirstOrDefault();

            if (astro == null)
            {
                return new JsonResult(new
                {
                    message = "no existe astronauta con ese id",
                    code = StatusCodes.Status404NotFound
                });
            }

            var misiones = db.Query<Mision>($"select * from mision where AstronautaID = {id}");
            var redes = db.Query<RedSocial>($"select * from redessociales where AstronautaID = {id}");



            return new JsonResult(new
            {
                Astronauta = astro,
                Misiones = misiones,
                Redes_Sociales = redes
            });
        }

        public IActionResult EliminarAstronauta(int id)
        {
            var astro = db.Query<Astronauta>($"select * from astronauta where ID = {id}").FirstOrDefault();

            if (astro == null)
            {
                return new JsonResult(new
                {
                    message ="no existe astronauta con ese id",
                    code = StatusCodes.Status404NotFound
                });
            }

            try
            {
                db.Query($"delete from astronauta where ID = {id}");
                db.Query($"delete from mision where AstronautaID = {id}");
                db.Query($"delete from redessociales where AstronautaID = {id}");


                return new JsonResult(new
                {
                    message = "astronauta con sus misiones y redes eliminadas con exito",
                    code = StatusCodes.Status404NotFound
                });

            }
            catch(Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        public IActionResult AgregarAstronauta(AgregarAstronautaDTO ast)
        {
            // Agregar el astronauta
            var astronauta = new Astronauta
            {
                Fotos = ast.Fotos,
                Nombre = ast.Nombre,
                Nacionalidad = ast.Nacionalidad,
                Descripcion = ast.Descripcion,
                FechaNacimiento = ast.FechaNacimiento,
                Edad = ast.Edad
            };

            // Insertar el astronauta en la base de datos
            db.Query(
                 $"INSERT INTO astronauta (Fotos, Nombre, Nacionalidad, Descripcion, FechaNacimiento, Edad,Activo) " +
                 $"VALUES ('{astronauta.Fotos}', '{astronauta.Nombre}', '{astronauta.Nacionalidad}', '{astronauta.Descripcion}', '{astronauta.FechaNacimiento}', {astronauta.Edad},{astronauta.Activo});");

            var astronautaId = db.Query<int>("SELECT MAX(ID) FROM astronauta.astronauta;").FirstOrDefault();

            // Agregar redes sociales del astronauta
            foreach (var redSocial in ast.RedesSociales)
            {
              db.Query(
                        $"INSERT INTO redessociales (AstronautaId, Tipo, Enlace) " +
                        $"VALUES ({astronautaId}, '{redSocial.Tipo}', '{redSocial.Enlace}');");
            }

            // Agregar misiones del astronauta
            foreach (var mision in ast.Misiones)
            {
                db.Query(
                        $"INSERT INTO mision (AstronautaID, NombreMision, DescripcionMision,ResultadosMision) " +
                        $"VALUES ({astronautaId}, '{mision.NombreMision}', '{mision.DescripcionMision}','{mision.ResultadosMision}');");
            }

            // Confirmar la transacción
            

            // Puedes retornar una respuesta de éxito o el ID del astronauta agregado, según tus necesidades
            return new JsonResult(new
            {
                message = "Astronauta agregado",
                code = StatusCodes.Status201Created
            });
        }
        }

    }

