'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/* ERROR 404 */
Route.on('/404').render('error');

Route.get('/', 'AuthController.index').as('auth.index');
Route.post('/login', 'AuthController.store').as('auth.store');
Route.get('/sair', 'AuthController.destroy').as('auth.destroy');

Route.group( () => {
    Route.get('/', 'DashboardController.index').as('dashboard.index').middleware('auth');
}).prefix('dashboard');

Route.group( () => {
    Route.get('/', 'ConsultationController.index').as('consultation.index');
    Route.get('/ver/:id', 'ConsultationController.show').as('consultation.show');
    Route.get('/criar', 'ConsultationController.create').as('consultation.create');
    Route.post('/salvar', 'ConsultationController.store').as('consultation.store');
    Route.get('/editar/:id', 'ConsultationController.edit').as('consultation.edit');
    Route.put('/atualizar', 'ConsultationController.update').as('consultation.update');
    Route.delete('/excluir/:id', 'ConsultationController.destroy').as('consultation.destroy');
}).prefix('consulta').middleware('auth');

Route.group( () => {
    Route.get('/', 'UserController.index').as('users.index');
    Route.get('/criar', 'UserController.create').as('users.create');
}).prefix('usuario').middleware('auth');

/* ROOM ROUTE */
Route.get('/room', 'RoomController.enter').as('room.enter');
Route.get('/canal-de-atendimento/:id', 'RoomController.index').as('room.index');
Route.post('/loginroom/:id', 'RoomController.store').as('room.store');
Route.get('/logout/:room', 'RoomController.destroy').as('room.destroy');
