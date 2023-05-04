import React, { useState } from 'react'
import Head from 'next/head'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Image from 'next/image';
import categorias from '../../categorias/categorias.json'

const Form = () => {
    const [value, setValue] = useState(new Date())
    const [service, setService] = useState(null)
    const [date, setDate] = useState(null)
    const [horario, setHorario] = useState(null)

    const handleClickDay = (e) => {
        setDate(e)
    }

    function handleServiceClick(nombre) {

        setService(nombre)

    }

    const disablePastDates = ({ date, view }) => {
        if (date < new Date()) {
            return true;
          }
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        window.alert('confirmar el turno para' + service + ' el dia' + date.toLocaleDateString() + ' en el horario ' + horario )
    }
    return (
        <>
            <Head >
                <title>CP COSMETO - RESERVA TU TURNO</title>
            </Head>
            <div className='mt-2 py-3'>
                <h1 className='text-center text-xl text-white'>Reserva tu turno</h1>
                <form className='flex flex-col items-center gap-2' onSubmit={handleSubmit}>
                    {
                        !service ?
                            <label className='text-white' htmlFor="servicio">Selecciona el servicio</label> :
                            <>
                                <label className='text-white' htmlFor="servicio">Seleccionaste el servicio de : {service}</label>
                                <button className='bg-white px-2 py-2 text-black' onClick={() => { setService(null) }}>Cambiar servicio</button>
                            </>
                    }

                    <div className='  md:grid md:grid-cols-3 md:gap-10  py-4'>

                        {!service && categorias.categories.map((e, i) => (
                            <div key={i} className='mb-2 md:mb-0 relative hover:scale-110 hover:cursor-pointer transition-all ease-in-out'
                                onClick={() => handleServiceClick(e.nombre)}
                                data-service={e.nombre}
                            >
                                <Image className='brightness-50 w-[300px] h-[300px]' src={e.img} width={300} height={300} alt='categoria cejas' />
                                <p className='absolute top-1/2 text-black text-xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 '>{e.nombre}</p>
                            </div>
                        ))}



                    </div>
                    {service &&
                        <div>
                            <p className='text-center'>Selecciona una fecha</p>
                            <Calendar calendarType='US' locale='es' allowPartialRange={false} onClickDay={handleClickDay} onChange={(e) => { setValue(e) }} value={value} selectRange={false} tileDisabled={disablePastDates} />

                            <label>Seleccione un horario</label>
                            <div>
                                <div className='flex gap-2'>
                                    <input type="radio" name="horario" value={"9:00"} onClick={(e) => { setHorario(e.target.value) }} />
                                    <p>9:00</p>
                                </div>

                                <div className='flex gap-2'>
                                    <input type="radio" name="horario" value={"10:00"} onClick={(e) => { setHorario(e.target.value) }} />
                                    <p>10:00</p>
                                </div>
                                
                                <div className='flex gap-2'>
                                    <input type="radio" name="horario" value={"11:00"} onClick={(e) => { setHorario(e.target.value) }} />
                                    <p>11:00</p>
                                </div>
                            </div>

                            <button type='submit' className='flex justify-center bg-red-800 p-3 text-white'>Reserva tu turno</button>
                        </div>

                    }

                </form>
            </div>
        </>
    )
}

export default Form