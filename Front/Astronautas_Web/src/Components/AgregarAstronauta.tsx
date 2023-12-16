import { useState } from 'react'
import '../style/AgregarAstronauta.css'
import { Astronauta, Mision, RedSocial } from '../interfaces/Interfaces.ts'
import { Avatar } from '@mui/material';
import { mensajeEmergente } from './MensajeEmergente.ts';




export default function AgregarAstronauta() {
    const [astronauta, setAstronauta] = useState<Astronauta>({});
    const [nuevaMision, setNuevaMision] = useState<Mision>({});
    const [nuevaRedSocial, setNuevaRedSocial] = useState<RedSocial>({});

    const handleInputChangeMision = (e) => {
        const { name, value } = e.target;
        setNuevaMision((prevMision) => ({
            ...prevMision,
            [name]: value
        }));
    };



    const handleInputChangeRed = (e) => {
        const { name, value } = e.target;
        setNuevaRedSocial((prevRedSocial) => ({
            ...prevRedSocial,
            [name]: value
        }));
    };


    console.log(nuevaMision)
    // Limpia el formulario después de agregar la misión


    const agregarAstronauta = () => {




        console.log(astronauta.Misiones)
        if (validarAstronauta()) {
            const astronautaNuevo = {
                "fotos": astronauta.fotos,
                "nombre": astronauta.nombre,
                "nacionalidad": astronauta.nacionalidad,
                "descripcion": astronauta.descripcion,
                "activo": astronauta.activo,
                "fechaNacimiento": astronauta.fechaNacimiento,
                "edad": astronauta.edad,
                "redesSociales": [
                  {
                    "tipo": nuevaRedSocial.tipo,
                    "enlace": nuevaRedSocial.enlace
                  }
                ],
                "misiones": [
                  {
                    "nombreMision": nuevaMision.nombreMision,
                    "fechaMision": nuevaMision.fechaMision,
                    "descripcionMision": nuevaMision.descripcionMision,
                    "resultadosMision": nuevaMision.resultadosMision
                  }
                ]
              }

            const endpoint = "https://localhost:7115/astronauta";

            fetch(endpoint, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(astronautaNuevo)
              })
                .then(res => res.json())
                .then(res => {
                  console.log(res.value);
                  // Puedes realizar acciones adicionales después de la respuesta del servidor
                  window.location.href = '/';
                })
                .catch(error => console.error(error));
        }
    }


    ///console.log(astronauta)


    const validarAstronauta = (): boolean => {
        // Verificar campos obligatorios en Astronauta
        if (
            !astronauta.nombre ||
            !astronauta.nacionalidad ||
            !astronauta.fotos ||
            astronauta.activo === undefined || // Puedes ajustar esta verificación según el tipo real del campo
            !astronauta.descripcion ||
            !astronauta.fechaNacimiento ||
            !astronauta.edad
        ) {
            mensajeEmergente('Por favor, completa todos los campos obligatorios en Astronauta.')
            return false;
        }



        // Verificar campos obligatorios en cada Mision
  
console.log(nuevaMision)
        if (
            nuevaMision.nombreMision == '' ||
            nuevaMision.fechaMision == ''||
            nuevaMision.descripcionMision == ''||
            nuevaMision.resultadosMision == ''
        ) {

            mensajeEmergente('Por favor, completa todos los campos obligatorios en las misiones no seas un vago')
            return false;
        }

        // Verificar campos obligatorios en cada RedSocial

        if (nuevaRedSocial.tipo== '' || nuevaRedSocial.enlace== '') {
            mensajeEmergente('Por favor, completa todos los campos de redes sociales deja la vagesa')
            return false;
        }


        // Si todo está bien, retorna true
        return true;
    }





    return (
        <div className='container d-flex align-items-center justify-content-center vh-100' >

            <form className="form " onSubmit={(e) =>e.preventDefault()}>
                <a className='btn btn-danger' href='/'><i className="fa-solid fa-arrow-left"></i></a>
                <p className="title">Agregar Nuevo Astronauta</p>
                <p className="message">Ingresar un astronauta con sus respespectivas misiones y redes sociales</p>
                <label>
                    <input className="input" type="text" placeholder="" onChange={e => { setAstronauta({ ...astronauta, nombre: e.target.value }) }} required />
                    <span>Nombre Del Astronauta</span>
                </label>
                <div className='flex'>

                    <Avatar
                        alt="Remy Sharp"
                        src={astronauta.fotos}
                        sx={{ width: 56, height: 56 }}
                    />
                    <label>

                        <input className="input" type="text" placeholder="" onChange={e => { setAstronauta({ ...astronauta, fotos: e.target.value }) }} required />
                        <span>Url de la Foto</span>
                    </label>
                </div>

                <label>
                    <input className="input" type="text" placeholder="" onChange={e => { setAstronauta({ ...astronauta, nacionalidad: e.target.value }) }} required />
                    <span>Nacionalidad</span>
                </label>

                <label>
                    <input className="input" type="text" placeholder="" onChange={e => { setAstronauta({ ...astronauta, descripcion: e.target.value }) }} required />
                    <span>Descripcion</span>
                </label>
                <label>
                    <input className="input" type="date" placeholder="" onChange={e => { setAstronauta({ ...astronauta, fechaNacimiento: e.target.value }) }} required />
                    <span>Fecha Nacimiento</span>
                </label>
                <label>
                    <input className="input" type="number" placeholder="" onChange={e => { setAstronauta({ ...astronauta, edad: Number.parseInt(e.target.value) }) }} required />
                    <span>Edad</span>
                </label>

                <label>
                    <select className="input form-select" onChange={e => { setAstronauta({ ...astronauta, activo: Number.parseInt(e.target.value) }) }} aria-label="Default select example">
                        <option selected value='1'>Si</option>
                        <option selected value='0'>No</option>
                    </select>
                    <span>Esta Activo?</span>
                </label>

                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>


                    <form className="forms">
                        <p className="title">Agregar Mision</p>
                        <label>
                            <input
                                className="input"
                                type="text"
                                name="NombreMision"
                                value={nuevaMision.nombreMision}
                                placeholder=""
                                onChange={handleInputChangeMision}
                                required
                            />
                            <span>Nombre </span>
                        </label>

                        <label>
                            <input
                                className="input"
                                type="date"
                                name="FechaMision"
                                placeholder=""
                                onChange={handleInputChangeMision}
                                required
                            />
                            <span>Fecha de la Mision</span>
                        </label>
                        <label>
                            <textarea
                                className="input"
                                name="DescripcionMision"
                                value={nuevaMision.descripcionMision}
                                placeholder=""
                                onChange={handleInputChangeMision}
                                required
                            ></textarea>
                            <span>Descripcion</span>
                        </label>
                        <label>
                            <input
                                className="input"
                                type="text"
                                name="ResultadosMision"
                                value={nuevaMision.resultadosMision}
                                placeholder=""
                                onChange={handleInputChangeMision}
                                required
                            />
                            <span>Resultado</span>
                        </label>
                    </form>

                    <form className="forms">
                        <p className="title">Agregar Red Social</p>
                        <label>
                            <input
                                className="input"
                                type="text"
                                name="Tipo"
                                value={nuevaRedSocial.tipo}
                                placeholder=" "
                                onChange={handleInputChangeRed}
                                required
                            />
                            <span>Red Social </span>
                        </label>

                        <label>
                            <input
                                className="input"
                                type="text"
                                name="Enlace"
                                value={nuevaRedSocial.enlace}
                                placeholder=""
                                onChange={handleInputChangeRed}
                                required
                            />
                            <span>Link</span>
                        </label>
                    </form>

                </div>


                <button className="submit" onClick={agregarAstronauta}>
                    Agregar Astronauta
                </button>

            </form>
        </div>
    )
}
