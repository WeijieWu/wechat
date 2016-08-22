import request from "request";
import querystring from 'querystring';

export default function(url, query) {
  url = `${url}?${querystring.stringify(query)}`;
  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      if (error) {
        reject(error);
        return;
      }
      resolve({response, body});
    });
  });
}

export function post(url, query, data) {
  url = `${url}?${querystring.stringify(query)}`;
  data = JSON.stringify(data);
  return new Promise(function(resolve, reject) {
    request.post({url, form: data}, function(error, response, body) {
      if (error) {
        reject(error);
        return;
      }
      resolve({response, body});
    });
  });
}
