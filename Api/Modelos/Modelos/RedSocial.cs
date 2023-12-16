using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos.Modelos
{
    public class RedSocial
    {
        public int ID { get; set; }
        public int AstronautaID { get; set; }
        public string Tipo { get; set; }
        public string Enlace { get; set; }

        
        public Astronauta Astronauta { get; set; }
    }

}
