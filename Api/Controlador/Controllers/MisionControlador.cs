using Controlador.Context;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTO;
using Modelos.Modelos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Controlador.Controllers
{
    public class MisionControlador
    {
        private IDbConnection db = Connection.Open();

        public IActionResult AgregarMision(AgregarMisionesDTO mision)
        {
            try
            {
            db.Query(
                      $"INSERT INTO mision (AstronautaID, NombreMision, DescripcionMision,ResultadosMision) " +
                      $"VALUES ({mision.AstronautaID}, '{mision.NombreMision}', '{mision.DescripcionMision}','{mision.ResultadosMision}');");
               
                
                return new JsonResult(new
                {
                    message = "Msion agregada con exito",
                    code = StatusCodes.Status201Created
                });

            }
            catch(Exception ex)
            {
                return new JsonResult(new
                {
                    message = ex.Message,
                    code = StatusCodes.Status500InternalServerError
                });
            }
        }
        public IActionResult BorrarMision(int id)
        {
            try
            {
                db.Query($"delete from mision where ID = {id}");

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
    }
}
