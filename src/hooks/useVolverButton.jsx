export function useVolverButton(turno, router, clearService, clearProfessional, clearEstudio) {
    let handleClick;
  
    if (!turno.service) {
      handleClick = router.back;
    } else if (turno.service && !turno.professional) {
      handleClick = clearService;
    } else if (turno.service && !turno.estudio && turno.professional) {
      handleClick = clearProfessional;
    } else if (turno.service && turno.estudio && turno.professional) {
      handleClick = clearEstudio;
    }
  
    return (
      <button className="text-black bg-white py-2 px-7 my-2" onClick={handleClick}>Volver</button>
    );
  }