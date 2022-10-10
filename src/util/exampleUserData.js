const exampleUserData = {
  name: "Nombre de Prueba",
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
          ac1: "3.3",
          aa1: "3.2",
          ap1: "3",
          primero: "6",
          ac2: "-",
          aa2: "-",
          ap2: "-",
          segundo: "6",
          recuperacion: "5",
          total: "6",
        },
        {
          materia: "Materia 2",
          ac1: "-",
          aa1: "-",
          ap1: "-",
          primero: "8",
          ac2: "-",
          aa2: "-",
          ap2: "-",
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
