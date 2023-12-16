import { useState } from "react";
import { Mision, RedSocial } from "../interfaces/Interfaces.ts";
import '../style/Agregar_R_M.css'
import { useParams } from "react-router-dom";


export default function AgregarRedes() {

    const [nuevaRed, setRedes] = useState<RedSocial>({});

    const {id} = useParams();

    const handleInputChangeRed = (e) => {
        const { name, value } = e.target;
        setRedes((prevMision) => ({
            ...prevMision,
            [name]: value
        }));
    };
console.log(id)
console.log(nuevaRed)
    const enviarRed = () => {
        fetch('https://localhost:7115/redes/'+id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaRed)
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
         <div className="forms">
                        <p className="title">Agregar Red Social</p>
                        <label>
                            <input
                                className="input"
                                type="text"
                                name="Tipo"
                                value={nuevaRed.tipo}
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
                                value={nuevaRed.enlace}
                                placeholder=""
                                onChange={handleInputChangeRed}
                                required
                            />
                            <span>Link</span>
                        </label>

                        <button className="submit" onClick={enviarRed}>
                    Agregar Red Social
                </button>
                    </div>

        </div>
    )
}