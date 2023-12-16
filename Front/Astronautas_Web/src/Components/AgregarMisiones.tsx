import { useState } from "react";
import { Mision } from "../interfaces/Interfaces.ts";
import '../style/Agregar_R_M.css'
import { useParams } from "react-router-dom";


export default function AgregarMisiones() {

    const [nuevaMision, setNuevaMision] = useState<Mision>({});

    const {id} = useParams();

    const handleInputChangeMision = (e) => {
        const { name, value } = e.target;
        setNuevaMision((prevMision) => ({
            ...prevMision,
            [name]: value
        }));
    };
console.log(id)
console.log(nuevaMision)
    const enviarMision = () => {
        fetch('https://localhost:7115/mision/'+id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaMision)
        })
            .then(res => res.text())
            .then(res => {
                console.log(res);
               window.location.href = '/detalles/'+id;
            })
            .catch(err => console.error(err))
    }

    return (
        <div className=' '>
            <div className="formM" onSubmit={e => e.preventDefault()} >
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

                <button className="submit" onClick={enviarMision}>
                    Agregar Mision
                </button>
            </div>

        </div>
    )
}