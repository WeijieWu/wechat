/**
 *  @author       wu.weijie
 *  @email        wu.weijie@teyide.cn
 *  @description  wechat
 *  @requires
 *  @date         2016-05-08 10:42:54
 */
"use strict";
import fs from "fs";
import path from "path";
const basename = path.basename(module.filename);
const services = {};
fs
  .readdirSync(__dirname)// eslint-disable-line
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function(file) {
    try {
      var service = require(`./${file}`);
      var filename = file.replace(".js", "");
      services[filename] = service;
    } catch (e) {
      console.log(`loading${__dirname}/${file}`);// eslint-disable-line
      console.log("☠️", e, e.stack, "☠️");
    }
  });

export default services;