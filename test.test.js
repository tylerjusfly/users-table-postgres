const request = require('supertest');
const express = require('express');
const {getUsers, getUserById, createUser, updateUser, deleteUser, homePage} = require('./queries');


describe('test handlers', function(){

  test("responds to Homepage /", ()=> {
    const req = {};

    const res = { text: '',
    json: function(input) { this.text = input } 
  };
  homePage(req, res);

  expect(res.text).toEqual({"message": "welcome to the postgreSQL world"});
  })

  
});

