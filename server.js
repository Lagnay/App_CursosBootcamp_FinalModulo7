const db = require("./app/models");
const userController = require("./app/controllers/user.controller");
const bootcampController = require("./app/controllers/bootcamp.controller");

const run = async () => {
  const user1 = await userController.createUser({
    firstName: "Mateo",
    lastName: "Díaz",
    email: "mateo.diaz@correo.com",
  });
  const user2 = await userController.createUser({
    firstName: "Santiago",
    lastName: "Mejias",
    email: "santiago.mejias@correo.com",
  });
  const user3 = await userController.createUser({
    firstName: "Lucas",
    lastName: "Rojas",
    email: "lucas.rojas@correo.com",
  });
  const user4 = await userController.createUser({
    firstName: "Facundo",
    lastName: "Fernandez",
    email: "facundo.fernandez@correo.com",
  });

  const bootcamp1 = await bootcampController.createBootcamp({
    title: "Introduciendo El Bootcamp De React.",
    cue: 10,
    description:
      "React es la librería más usada en JavaScript para el desarrollo de interfaces.",
  });
  const bootcamp2 = await bootcampController.createBootcamp({
    title: "Bootcamp Desarrollo Web Full Stack.",
    cue: 9,
    description:
      "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.",
  });
  const bootcamp3 = await bootcampController.createBootcamp({
    title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
    cue: 8,
    description:
      "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.",
  });

  const bootcamp4 = await bootcampController.createBootcamp({
    title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
    cue: 18,
    description:
      "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.",
  });

  await bootcampController.addUser(1, 1);
  await bootcampController.addUser(1, 2);
  await bootcampController.addUser(2, 1);
  await bootcampController.addUser(3, 1);
  await bootcampController.addUser(3, 2);
  await bootcampController.addUser(3, 3);

  const datosUnBootcampID = await bootcampController.findById(bootcamp1.id);
  console.log("Bootcamp ", JSON.stringify(datosUnBootcampID, null, 2));

  const datosTodosBootcamp = await bootcampController.findAll();
  console.log(">> bootcamps: ", JSON.stringify(datosTodosBootcamp, null, 2));

  const datosUnUsuarioID = await userController.findUserById(user1.id);
  console.log(">> usuario: ", JSON.stringify(datosUnUsuarioID, null, 2));

  const datosTodosUsuarios = await userController.findAll();
  console.log(">> usuarios: ", JSON.stringify(datosTodosUsuarios, null, 2));

  await userController.updateUserById(
    1,
    "Pedro",
    "Sánchez",
    "pedro.sanchez@test.com"
  );

  const actualizandoUsuario = await userController.findUserById(user1.id);
  console.log("Usuario: ", JSON.stringify(actualizandoUsuario, null, 2));

  await userController.deleteUserById(1);
  const eliminarUsuario = await userController.findUserById(user1.id);
  console.log("Usuario: ", JSON.stringify(eliminarUsuario, null, 2));
};

db.sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log(
      "La base de datos está trabajando, eliminando y resincronizando"
    );
    run();
  });
