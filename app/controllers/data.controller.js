const db = require("../models");
const Data = db.data;
const Op = db.Sequelize.Op;
const uuid = require('uuid');
const crypto = require('../middleware/crypto');

// CREATE DATA
exports.create = (req, res) => {
  // Validate request
  if (!req.body.phone && !req.body.provider) {
    res.status(400).send({
      message: "Phone number or provider is empty!"
    });
    return;
  }

  if (req.body.phone.length < 10 || req.body.phone.length > 12) {
      res.status(400).send({
        message: "Length number not correct"
      });
      return;
  }

  // VARIABLE DATA
  const varData = {
      id: uuid.v4(),
      phone: crypto.encrypt(req.body.phone),
      provider: crypto.encrypt(req.body.provider),
      is_even: req.body.is_even,
      created_by: crypto.encrypt(req.body.user_created),
  };
  // Save to Db
  Data.create(varData)
    .then((data) => {
      const sendData = {
          meta: {
            code: 200,
            message: `${req.body.phone} (${req.body.provider}) submitted`,
          },
          data: data,
      }
      
      res.send(sendData);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

exports.findPhoneNumber = (req, res) => {
  const phone = req.query.phone;
  const condition = phone ? { phone: { [Op.like]: `%${crypto.encrypt(phone)}%` } } : null;
  Data.findAll({ where: condition })
  .then(data => {
    const sendData = {
      meta: {
        code: 200,
        message: `Check data success`,
      },
      data: data,
    }

    res.send(sendData);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving phone number."
    });
  });
};

exports.getAllData = (req, res) => {
  Data.findAll()
  .then(data => {
    const sendData = {
      meta: {
        code: 200,
        message: `Get data success`,
      },
      data: data,
    }

    res.send(sendData);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving phone number."
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const phone = crypto.encrypt(req.body.phone_edit);

  Data.update({
    phone: phone
  }, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      const sendData = {
        meta: {
          code: 200,
          message: `Phone was updated.`,
        }
      }

      res.send(sendData);
    } else {
      const sendData = {
        meta: {
          code: 400,
          message: `Cannot update Phone`,
        }
      }

      res.send(sendData);
    }
  })
  .catch(err => {
    res.status(500).send({
      message: `Error updating phone with id ${id}`
    });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Data.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      const sendData = {
        meta: {
          code: 200,
          message: `Phone was deleted.`,
        }
      }

      res.send(sendData);
    } else {
      const sendData = {
        meta: {
          code: 400,
          message: `Error delete phone.`,
        }
      }

      res.send(sendData);
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete phone"
    });
  });
};