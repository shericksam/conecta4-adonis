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
   const us = await auth.attempt(user, pass);
   const userO = await User.query().where('username','=',user).first();
   return response.json({
     tokenObj:us,
     id:userO.id}
     ,200);
    //const user = await User.find(1);    
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store ({ request, response ,auth}) {
    console.log("WTF");
    const user = new User();
    user.username = request.body.username;
    user.password = request.body.password;
    if(!request.body.username || !request.body.password){
      return response.badRequest({message:"Parametros invalidos."});
    }
    const userExists = await User.query().where('username','=',request.body.username).first();
    if(userExists){
      return response.badRequest({message:"El usuario ya existe!"});
    }
    await user.save();
    const us = await auth.attempt(request.body.username, request.body.password);
    const userO = await User.query().where('username','=',request.body.username).first();
    return response.json({
      tokenObj:us,
      id:userO.id}
      ,200);
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
        return response.json({
          user:user,
          estadisticas:user.estadistica().fetch()
        });
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
