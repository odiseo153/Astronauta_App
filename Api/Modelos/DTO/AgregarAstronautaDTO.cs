using Modelos.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos.DTO
{
    public class AgregarAstronautaDTO
    {
        public string Fotos { get; set; }
        public string Nombre { get; set; }
        public string Nacionalidad { get; set; }
        public string Descripcion { get; set; }
        public int Activo { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Edad { get; set; }

        public ICollection<AgregarRedesDTO> RedesSociales { get; set; }
        public ICollection<AgregarMisionesDTO> Misiones { get; set; }
    }
}
