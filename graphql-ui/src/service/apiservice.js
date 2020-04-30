import axios from "axios";
 var adminUrl = "http://localhost:3000/wohlig";

export default {
 

  getProject: (data, callback) => {
    return axios
      .post(adminUrl , data)
      .then(responseData => {
        callback(responseData);
      })
      .catch(err => {
        callback(err);
      });
  }
};
