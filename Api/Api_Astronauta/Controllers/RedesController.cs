using Controlador.Controllers;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTO;
using Modelos.Modelos;
using System.ComponentModel.DataAnnotations;

namespace Api_Astronauta.Controllers
{
    public class RedesController : Controller
    {
        private RedesControlador redes;

        public RedesController(RedesControlador red)
        {

            this.redes = red;
        }

        [HttpPost("redes/{AstronautaId}")]
        public IActionResult Index([Required] int AstronautaId, [FromBody]AgregarRedesDTO red)
        {
            red.AstronautaID = AstronautaId;    
            return redes.AgregarRedSocial(red);
        }

        [HttpDelete("redes/{Id}")]
        public IActionResult Index([Required] int Id)
        {
            return redes.BorrarRedSocial(Id);
        }
    }
}
