using Controlador.Controllers;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTO;
using Modelos.Modelos;
using System.ComponentModel.DataAnnotations;

namespace Api_Astronauta.Controllers
{
    public class AstronautaController : Controller
    {
        private AstronautaControlador astronauta;

        public AstronautaController(AstronautaControlador astronauta) 
        {

           this.astronauta = astronauta;

        }

        [HttpGet("astronauta")]
        public IActionResult getAstronautas()
        {
            return new JsonResult(astronauta.get());
        }

        [HttpGet("astronauta/{id}")]
        public IActionResult getAstronautaById([Required] int id)
        {
            return new JsonResult(astronauta.AstronautaById(id));
        }

        [HttpPost("astronauta")]
        public IActionResult AgregarAstronautas([FromBody] AgregarAstronautaDTO ast)
        {

            return new JsonResult(astronauta.AgregarAstronauta(ast));
        }

        [HttpDelete("astronauta/{id}")]
        public IActionResult BorrarAstronauta([Required]int id)
        {
            return new JsonResult(astronauta.EliminarAstronauta(id));
        }







    }
}
