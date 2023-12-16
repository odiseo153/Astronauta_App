using Controlador.Context;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTO;
using Modelos.Modelos;
using System.Data;

namespace Controlador.Controllers
{
    public class RedesControlador
    {
        private IDbConnection db = Connection.Open();


        public IActionResult BorrarRedSocial(int id)
        {
            try
            {
                db.Query($"delete from redessociales where ID = {id}");

                return new JsonResult(new
                {
                    message = "Msion Eliminada con exito",
                    code = StatusCodes.Status201Created
                });

            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    message = ex.Message,
                    code = StatusCodes.Status500InternalServerError
                });
            }
        }

        public IActionResult AgregarRedSocial(AgregarRedesDTO red)
        {
            try
            {
                db.Query(
                      $"INSERT INTO redessociales (AstronautaId, Tipo, Enlace) " +
                $"VALUES ({red.AstronautaID}, '{red.Tipo}', '{red.Enlace}');");

                return new JsonResult(new
                {
                    message = "Red Social agregada con exito",
                    code = StatusCodes.Status201Created
                });

            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    message = ex.Message,
                    code = StatusCodes.Status500InternalServerError
                });
            }
        }
    }
}
