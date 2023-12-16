import { useEffect, useState } from 'react'
import '../style/Astronauta.css'
import { Astronauta as Ast } from '../interfaces/Interfaces.ts'
import { Avatar } from '@mui/material'

export default function Astronauta() {
    const [Astronautas, setAstronauta] = useState<Ast[]>([])
    const [nacionalidades, setNacionalidades] = useState<string[]>([])
    const [nacionalidad, setNacionalidad] = useState<string>('')
    const [activo, setActivo] = useState<number>(3)

    useEffect(() => {
        fetch("https://localhost:7115/astronauta")
            .then(res => res.json())
            .then(async res => { await setAstronauta(res) })
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        setNacionalidades(prevArray => [...new Set([...prevArray, ...Astronautas.map(x => { return x.nacionalidad })])]);
    }, [Astronautas])

    console.log(nacionalidades)

    const DatosFiltrados = (): Ast[] => {
        let data = Astronautas;
        if (nacionalidad != '') {
            data = data.filter(x => x.nacionalidad.toLocaleLowerCase().includes(nacionalidad.toLocaleLowerCase()));
        }

        if (activo != 3) {
            data = data.filter(x => x.activo === activo);
        }

        return data
    }

    return (
        <div className=' d-flex flex-wrap '>


<div className='input-group mb-1 flex'>
    
  <div className="mb-5 ">
    <label className="form-label">Selecciona Nacionalidad</label>
    <select className="form-select" aria-label="Default select example" onChange={(e) => setNacionalidad(e.target.value)}>
      <option selected value=''>Selecciona nacionalidad</option>
      {nacionalidades.map((e, i) => {
        return (
          <option key={i}>{e}</option>
        );
      })}
    </select>
  </div>

  <div className="mb-3">
    <label className="form-label">Selecciona Estado</label>
    <select className="form-select" aria-label="Default select example" onChange={(e) => setActivo(Number.parseInt(e.target.value))}>
      <option  value='3'>Todos</option>
      <option selected value='1'> Activo</option>
      <option value='0'>No Activo</option>
    </select>
  </div>

  <div className='input-group ADD'>
    <a className='btn btn-success'>Agregar Astronauta</a>
</div>
</div>



            {DatosFiltrados().map((e, i) => {
                return (
                    <div key={i} className="col-md-3 cartas mb-5">
                        {/* Agregué la clase "col-md-4" para especificar que cada elemento debe ocupar 4 columnas en pantallas medianas y superiores */}
                        <a href={'/detalles/' + e.id}>

                            <div className="card-client">
                                <div className="user-picture">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={e.fotos}
                                        sx={{ width: 150, height: 150 }}
                                    />
                                </div>
                                <p className="name-client"> {e.nombre}
                                    <span>{e.nacionalidad}
                                    </span>
                                </p>

                            </div>
                        </a>
                    </div>
                );
            })}
        </div>
    );

}

