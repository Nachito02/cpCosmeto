// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Category from "../models/Categoria";

const services = [
  {
    nombre: "Cosmetologia",
    descripcion:
      "La cosmetología es una disciplina dedicada al cuidado y embellecimiento de la piel, cabello y uñas. Es un campo de la estética que combina conocimientos científicos y técnicas prácticas para mejorar la apariencia física y promover la salud de la piel.",
    imagen: "/assets/categorias/cosmeto.jpg",
  },

  {
    nombre: "Estetica Corporal",
    descripcion:
      "La estética corporal es un campo especializado dentro de la cosmetología que se centra en el cuidado y embellecimiento del cuerpo. Se enfoca en mejorar la apariencia física, la salud y el bienestar general del cuerpo, tanto a nivel estético como emocional.",
    imagen: "/assets/categorias/estetica.jpg",
  },
  {
    nombre: "Depilacion Definitiva",
    descripcion:
      "La depilación definitiva, también conocida como depilación permanente, es un procedimiento estético diseñado para eliminar el vello no deseado de manera duradera o permanente. A diferencia de la depilación temporal, como el afeitado o la depilación con cera, la depilación definitiva busca eliminar el vello de forma más duradera, ofreciendo resultados a largo plazo.",
    imagen: "/assets/categorias/definitiva.jpg",
  },
  {
    nombre: "Pestañas",
    descripcion:
      "El servicio de pestañas es un tratamiento estético que se enfoca en realzar y embellecer las pestañas, logrando un aspecto más largo, espeso y curvado. Este servicio es especialmente popular entre las personas que desean resaltar y mejorar la apariencia de sus ojos.",
    imagen: "/assets/categorias/lifting.jpg",
  },
  {
    nombre: "Diseño de Cejas",
    descripcion:
      "El diseño de cejas es un servicio estético que se enfoca en dar forma, definir y embellecer las cejas para resaltar y enmarcar el rostro. El diseño de cejas es una parte importante del cuidado de la apariencia facial, ya que unas cejas bien diseñadas pueden mejorar la simetría facial y realzar los rasgos.",
    imagen: "/assets/categorias/cejas.jpg",
  },
  {
    nombre: "Podoestetica",
    descripcion:
      "La podoestética es una disciplina que combina la podología y la estética, centrándose en el cuidado y embellecimiento de los pies. Esta práctica se basa en el diagnóstico, tratamiento y prevención de afecciones podológicas, al tiempo que ofrece servicios estéticos para mejorar la apariencia y el bienestar de los pies.",
    imagen: "/assets/categorias/pedicuria.jpg",
  },
];

export default async function handler(req, res) {
  try {
    for (const service of services) {
      const services = await Category.findOne({ nombre: service.nombre });
      if (!services) {
        await Category.create(service);
      }
    }
    
    res.status(200).json("Categorias agregadas correctamente");
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
