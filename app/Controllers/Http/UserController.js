'use strict'

const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index ({ request, response, view }) {
    
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   */
  async create ({ request, response, view }) {
    
  }

  async login({request, auth,response }){
    var user = request.body.username;
    var pass = request.body.password;
   //  return userQ;
    //const user = await User.find(1);
    const us = await auth.attempt(user, pass);
    return response.json(us,200);
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response }) {
    console.log("WTF");
    const user = new User();
    user.username = request.body.username;
    user.password = request.body.password;
    await user.save();
    return response.json({
      mas:"Usuario creado!"
    },201);
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show ({ params, request, response, view, auth }) {
    const head = request.header('Authorization')
    try {
      if(await auth.check()){
        var user = await auth.getUser();
        
      }
    } catch (error) {
      response.send('Missing or invalid jwt token')
    }
    //return head;


  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update ({ params, request, response }) {

  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
