using Controlador.Controllers;
using Microsoft.AspNetCore.Mvc;
using Modelos.DTO;
using System.ComponentModel.DataAnnotations;

namespace Api_Astronauta.Controllers
{
    public class MisionController : Controller
    {
        private MisionControlador mision;

        public MisionController(MisionControlador mision)
        {
            this.mision = mision;
        }

        [HttpPost("mision/{AstronautaId}")]
        public IActionResult Index([Required] int AstronautaId, [FromBody] AgregarMisionesDTO nuevaMision)
        {
            nuevaMision.AstronautaID = AstronautaId;
            return mision.AgregarMision(nuevaMision);
        }

        [HttpDelete("mision/{Id}")]
        public IActionResult Index([Required] int Id)
        {
            return mision.BorrarMision(Id);
        }
    }
}
