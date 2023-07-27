const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createBootcamp = (bootcamp) => {
  return Bootcamp.create({
    title: bootcamp.title,
    cue: bootcamp.cue,
    description: bootcamp.description,
  })
    .then((bootcamp) => {
      console.log(
        `El bootcamp: ${JSON.stringify(
          bootcamp,
          null,
          4
        )}, se ha creado satisfactoriamente`
      );
      return bootcamp;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! ¡El bootcamp ${err} no se ha creado!`);
    });
};

exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("¡El bootcamp no se ha podido localizar!");
        return null;
      }

      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("El usuario no se ha podido localizar!");
          return null;
        }

        bootcamp.addUser(user);
        console.log(
          `El usuario id=${user.id} ha sido agregado satisfactoriamente al bootcamp con id=${bootcamp.id}`
        );
        return bootcamp;
      });
    })
    .catch((err) => {
      console.log("¡¡¡Error!!! ¡El usuario no se ha agregado al bootcamp", err);
    });
};

exports.findById = (Id) => {
  return Bootcamp.findByPk(Id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then((bootcamp) => {
      return bootcamp;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! El bootcamp:${err}, no se ha podido localizar`);
    });
};

exports.findAll = () => {
  return Bootcamp.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: { attributes: [] },
      },
    ],
  })
    .then((bootcamps) => {
      return bootcamps;
    })
    .catch((err) => {
      console.log("¡¡¡Error!!! No se han encontrado los proyectos: ", err);
    });
};
