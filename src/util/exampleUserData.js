const exampleUserData = {
  name: `Nombre de Prueba`,
  data: JSON.stringify({
    error: false,
    aniosLect: ["2021-2022"],
    anioLect: "2021-2022",
    cedula: "09999999",
    sede: "Guayaquil",
    nombres: "Nombres",
    apellidos: "Apellidos",
    carrera: "Ing. Genérica",
    facultad: "Ciencias Genéricas",
    semestres: ["Primero"],
    promedios: {
      Primero: [
        { materia: "Materia 1", total: "6" },
        { materia: "Materia 1", total: "7" },
        { materia: "Materia 2", total: "8" },
      ],
    },
    parciales: {
      Primero: [
        {
          materia: "Materia 1",
          primero: "6",
          segundo: "6",
          recuperacion: "5",
          total: "6",
        },
        {
          materia: "Materia 2",
          primero: "8",
          segundo: "8",
          recuperacion: "-",
          total: "8",
        },
      ],
    },
  }),
  cedula: "09999999",
};

export default exampleUserData;
