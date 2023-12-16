import { Avatar } from "@mui/material";
import '../style/Detalles.css'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Astronauta, Mision, RedSocial } from "../interfaces/Interfaces.ts";
import AgregarMisiones from "./AgregarMisiones.tsx";
import AgregarRedes from "./AgregarRedes.tsx";

export default function AstronautaDetails() {

    const { id } = useParams();


    const [astronauta, setAstronauta] = useState<Astronauta>({});
    const [Misiones, setMision] = useState<Mision[]>([]);
    const [RedesSociales, setRedSocial] = useState<RedSocial[]>([]);
    const [modalAbiertoMision, setModalAbierto] = useState(false);
    const [modalAbiertoRed, setModalAbiertoRed] = useState(false);


    console.log(id)

    useEffect(() => {
        const endpoint = "https://localhost:7115/astronauta/" + id;

        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                console.log(res.value);
                console.log(res.value.misiones)
                setAstronauta(res.value.astronauta);
                setMision(res.value.misiones)
                setRedSocial(res.value.redes_Sociales)
                // Puedes realizar acciones adicionales después de la respuesta del servidor
            })
            .catch(error => console.error(error));
    }, [])


    const eliminar = () => {
        fetch("https://localhost:7115/astronauta/" + id, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => { console.log(res); window.location.href = '/' })
            .catch(error => console.error(error))
    }

    const eliminarMision = (idMision: number) => {
        fetch("https://localhost:7115/mision/" + idMision, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => { console.log(res); window.location.href = '/detalles/' + id })
            .catch(error => console.error(error))
    }

    const eliminarRed = (idRed: number) => {
        fetch("https://localhost:7115/redes/" + idRed, { method: 'DELETE' })
            .then(res => res.json())
            .then(res => { console.log(res); window.location.href = '/detalles/' + id })
            .catch(error => console.error(error))
    }


    return (
        <div className="container d-flex align-items-center justify-content-center vh-80">

            <form className="form " onSubmit={(e) => e.preventDefault()}>
                <a className='btn btn-danger' href='/'><i className="fa-solid fa-arrow-left"></i></a>
                <p className="title">Detalles De {astronauta.nombre} </p>
                <Avatar
                    alt="Remy Sharp"
                    src={astronauta.fotos}
                    sx={{ width: 150, height: 150, left: 90, top: -20 }}
                />
                <div className='text-start'>
                    <a className='btn btn-danger' onClick={eliminar}><i className="fa-solid fa-trash"></i> Eliminar Astronauta</a>
                    <p className="messages"><strong>Nombre</strong> : {astronauta.nombre}</p>
                    <p className="messages"><strong>Nacionalidad</strong>  : {astronauta.nacionalidad}</p>
                    <p className="messages"><strong>Fecha de Nacimiento</strong>  : {astronauta.fechaNacimiento}</p>
                    <p className="messages"><strong>Edad </strong>  : {astronauta.edad}</p>
                    <p className="messages"><strong> Esta Activo?</strong>  : {astronauta.activo == 0 ? 'No' : 'Si'}</p>
                    <p className="messages"><strong>Descripcion</strong>  : {astronauta.descripcion}</p>

                    <a className='btn btn-success' onClick={() => setModalAbierto(!modalAbiertoMision)} ><i className="fa-solid fa-plus"></i> Agregar Mision</a>
                    {modalAbiertoMision && (
                        <div className="modal">
                            <button className='btn btn-danger addM' onClick={() => setModalAbierto(!modalAbiertoMision)}>.<i className="fa-solid fa-circle-xmark"></i></button>
                            <AgregarMisiones />

                        </div>

                    )}


                    <p className="title"> {Misiones.length > 0 ? 'Misiones De ' + astronauta.nombre : 'No tiene misiones'}</p>
                    {Misiones.map((e, i) => {
                        return (
                            <div key={i} className=" mb-3">
                                <div className="cardD">
                                    <h3 className="card__title">{e.nombreMision}
                                    </h3>
                                    <div className="card__content">

                                        <p className="messages"><strong>Descripcion:</strong>   {e.descripcionMision}</p>
                                        <p className="messages"><strong>Resultado:</strong>   {e.resultadosMision}</p>
                                    </div>
                                    <div className="card__date">
                                        Fecha {e.fechaMision}
                                    </div>
                                    <button className='btn btn-danger' onClick={() => eliminarMision(e.id)}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        )
                    })}
                    <button className='btn btn-success' onClick={() => setModalAbiertoRed(!modalAbiertoRed)}><i className="fa-solid fa-plus"></i> Agregar Red social</button>

                    {modalAbiertoRed && (
                        <div className="modal">
                            <button className='btn btn-danger addR' onClick={() => setModalAbiertoRed(!modalAbiertoRed)}>.<i className="fa-solid fa-circle-xmark"></i></button>
                            <AgregarRedes />

                        </div>

                    )}

                    <p className="title">{RedesSociales.length > 0 ? 'Redes De ' + astronauta.nombre : 'No tiene Redes sociales'}</p>
                    {RedesSociales.map((e, i) => {
                        return (
                            <div key={i} className=" mb-3">

                                <a href={e.enlace} target="_blank">

                                    <div className="cardCollection">
                                        <div className="cardCollectionimg"></div>
                                        <div className="cardCollectiontextBox">
                                            <div className="cardCollectiontextContent">
                                                <p className="cardCollectionh1">{e.tipo}</p>
                                                <span className="cardCollectionspan"
                                                >
                                                    <button className='btn btn-danger' onClick={() => eliminarRed(e.id)}>.<i className="fa-solid fa-trash"></i></button>
                                                    <label className="cardCollectioncheckbox-container">
                                                    </label>
                                                </span>
                                            </div>
  
                                            <div></div>
                                        </div>

                                    </div>

                                </a>
                            </div>
                        )
                    })}
                </div>

            </form>
        </div>
    )
}