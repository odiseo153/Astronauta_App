using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos.Modelos
{
    public class Mision
    {
        public int ID { get; set; }
        public int AstronautaID { get; set; }
        public string NombreMision { get; set; }
        public DateTime FechaMision { get; set; }
        public string DescripcionMision { get; set; }
        public string ResultadosMision { get; set; }

        public Astronauta Astronauta { get; set; }
    }
}
