using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelos.Modelos
{
    public class Astronauta
    {
        public int ID { get; set; }
        public string Fotos { get; set; }
        public string Nombre { get; set; }
        public string Nacionalidad { get; set; }
        public int Activo { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int Edad { get; set; }

        public ICollection<RedSocial> RedesSociales { get; set; }
        public ICollection<Mision> Misiones { get; set; }

    }
}
