const url = process.env.URL;
const token = process.env.TOKEN;
const axios = require("axios");

/**
 * @description Send Sms
 * @param {*} req
 * @param {*} res
 */
async function sendSMS(req, res) {
  const { numero, mensaje } = req.body;
  try {
    const body = {
      to_number: numero,
      message: mensaje,
    };
    axios({
      method: "post",
      url: url,
      data: body,
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
/**
 * @description Get all SMS
 * @param {*} req
 * @param {*} res
 */
async function getAllSMS(req, res) {
  try {
    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description Get one sms
 * @param {*} req
 * @param {*} res
 */
async function getOneSMS(req, res) {
  const { id } = req.params;
  try {
    axios({
      method: "get",
      url: url + "/" + id,
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description get one sms by response
 * @param {*} req 
 * @param {*} res 
 */
async function getOneResponseSMS(req, res) {
  const { id } = req.params;
  try {
    axios({
      method: "get",
      url: url + "/" + id + '/responses',
      headers: {
        "Content-Type": "x-www-form-urlencoded",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllSMS,
  sendSMS,
  getOneSMS,
  getOneResponseSMS
};
