// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "./config/db";
import Category from "./models/Category";

const services = [
  {
    name: "Cosmetologia",
    description:
      "La cosmetología es un servicio que se enfoca en la aplicación de tratamientos para mejorar el aspecto y la salud de la piel, el cabello y las uñas. Los profesionales de la cosmetología están capacitados para ofrecer una amplia variedad de servicios, desde tratamientos faciales y corporales, hasta manicuras y pedicuras, depilación y maquillaje. Además, los cosmetólogos también pueden brindar asesoramiento sobre cuidado personal, ayudando a sus clientes a identificar y abordar problemas específicos de la piel y el cabello. La cosmetología se ha convertido en un servicio muy popular en todo el mundo, ya que cada vez más personas buscan mejorar su apariencia y sentirse mejor consigo mismas. Con los avances tecnológicos y las innovaciones en la industria de la belleza, la cosmetología continúa evolucionando y ofreciendo nuevas opciones para satisfacer las necesidades de sus clientes.",
      img_service : '/assets/categorias/cosmeto.jpg'
  },

  {
    name: "Lifting de pestañas",
    description:
      'El lifting de pestañas es un tratamiento de belleza que ayuda a realzar y darle un aspecto más despierto a los ojos. Se trata deun procedimiento que consiste en aplicar un producto químico suaveen las pestañas para levantarlas desde la raíz y hacerlas máscurvadas y definidas. Este procedimiento es una alternativa noinvasiva y temporal a las extensiones de pestañas, ya que no sutilizan extensiones adicionales. El lifting de pestañas pueddurar de cuatro a seis semanas, dependiendo del ciclo decrecimiento natural de las pestañas, y no requiere ningún cuidadoespecial después del tratamiento. Además, el lifting de pestañases un tratamiento seguro y no causa daño a las pestañas naturales.En resumen, el lifting de pestañas es una excelente opción paraquellos que buscan un cambio temporal en su aparienciaresaltando la belleza natural de sus ojos y pestañas.',
      img_service : '/assets/categorias/cosmeto.jpg'
  },

  {
    name: "Cejas",
    description:
      'El servicio de cejas es un tratamiento estético que se enfoca en dar forma y definición a las cejas para realzar su belleza natural y enmarcar los ojos. Este servicio puede incluir diferentes técnicas, como el depilado con cera, pinzas o hilo, el tintado para dar color y profundidad a las cejas, y el maquillaje para rellenar y dar forma. El objetivo es crear unas cejas simétricas y equilibradas que complementen el rostro y mejoren la expresión facial.',
      img_service : '/assets/categorias/cosmeto.jpg'
  },

  {
    name: "Pedicuria",
    description:
      'La pedicura es un tratamiento de cuidado y embellecimiento de los pies. Este servicio se enfoca en eliminar la piel muerta y las callosidades, limpiar y suavizar las uñas, hidratar la piel y masajear los pies para mejorar la circulación y relajación muscular. Además, también puede incluir la aplicación de esmalte de uñas y/o decoraciones para embellecer las uñas y darles un aspecto más atractivo. La pedicura no solo tiene un efecto estético, sino que también ayuda a mantener los pies saludables, evita la acumulación de bacterias y previene problemas como las uñas encarnadas.',
      img_service : '/assets/categorias/cosmeto.jpg'
  },
];

export default async function handler(req, res) {
  connectDB();
  try {
    
      
        for(const service of services) {

            const services = await Category.findOne({name: service.name});

            if(!services)  {
                await Category.create(service)
            }
        }

    res.status(200).json('Categorias agregadas correctamente');
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
