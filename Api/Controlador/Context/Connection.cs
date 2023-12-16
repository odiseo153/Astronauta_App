using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Modelos.Modelos;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Controlador.Context
{
 
    public class Connection
    {
        private static MySqlConnection db;
        private static string conexcion = "Server=odiseo\\ODISEO;Database=Astronauta;User Id=sa;Password=1234;";
        private static string conexcion1 = "Server=localhost;Database=astronauta;User=root;Password=;ConvertZeroDateTime=True;";
        public Connection() { }

        public static IDbConnection Open()
        {
            if (db == null)
            {
                db = new MySqlConnection(conexcion1);
            }

            if (db.State != ConnectionState.Open)
            {
                db.Open();
            }

            return db;
        }

        // Método para cerrar la conexión a la base de datos
        public static void Close()
        {
            if (db == null && db.State == ConnectionState.Open)
            {
                db.Close();
            }
        }



    }

}
