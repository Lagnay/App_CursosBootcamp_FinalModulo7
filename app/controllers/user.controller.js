const db = require("../models");
const User = db.users;
const Bootcamp = db.bootcamps;

exports.createUser = (user) => {
  return User.create({
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
    .then((user) => {
      console.log(
        `El usuario: ${JSON.stringify(
          user,
          null,
          4
        )} se ha creado satisfactoriamente`
      );
      return user;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! ¡El usuario ${err} no se ha creado!`);
    });
};

exports.findUserById = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["title", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  })

    .then((user) => {
      if (!user) {
        return "El usuario es inexistente";
      }

      return user;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! ¡El usuario:${err} no se encuentra!`);
    });
};

exports.findAll = () => {
  return User.findAll({
    include: [
      {
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["title", "description"],
        through: { attributes: [] },
      },
    ],
  })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! ¡Los usuarios:${err} no se encuentran!`);
    });
};

exports.updateUserById = (_id, _firstName, _lastName, _email) => {
  let newData = { firstName: _firstName, lastName: _lastName, email: _email };

  return User.update(newData, {
    where: {
      id: _id,
    },
  })
    .then((response) => {
      console.log(response);
      console.log(`El user con id ${_id} se ha actualizado satisfactoriamente`);
      response.close;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! ¡El usuario:${err} no se ha actualizado!`);
    });
};

exports.deleteUserById = (_id) => {
  return User.destroy({
    where: {
      id: _id,
    },
  })
    .then((response) => {
      console.log(response);
      console.log(`El user con id ${_id} se ha eliminado satisfactoriamente`);
      response.close;
    })
    .catch((err) => {
      console.log(`¡¡¡Error!!! ¡El usuario:${err} no se ha eliminado!`);
    });
};
