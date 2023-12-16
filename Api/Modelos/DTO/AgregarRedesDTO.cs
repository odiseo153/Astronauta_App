using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos.DTO
{
     public class AgregarRedesDTO
    {
        public int AstronautaID { get; set; }
        public string Tipo { get; set; } // Ejemplo: Twitter, Facebook, Instagram, etc.
        public string Enlace { get; set; }

    }
}
