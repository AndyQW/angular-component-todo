'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp')
.component('todoList',{
        templateUrl: './components/todoList/todoList.html',
        controller: function($scope, $filter, store){
            var ctrl = this;
            this.todos = store.todos();

            this.newTodo = '';
            this.editedTodo = null;
            $scope.$on('$routeChangeSuccess', function () {
                    var status = $scope.status = $routeParams.status || '';

                    $scope.statusFilter = (status === 'active') ?
                        { completed: false } : (status === 'completed') ?
                        { completed: true } : null;
                });
            this.filter_active = function() {
                ctrl.statusFilter = { completed: false };
            };

            this.filter_completed = function() {
                ctrl.statusFilter = { completed: true };
            };

            this.filter_all = function() {
                ctrl.statusFilter = "";
            };


            this.addTodo = function () {
                var newTodo = {
                    title: ctrl.newTodo.trim(),
                    completed: false
                };

                if (!newTodo.title) {
                    return;
                }

                ctrl.saving = true;
                ctrl.todos.push(newTodo);
                ctrl.newTodo = '';
                
            };

            this.editTodo = function (todo) {
                ctrl.editedTodo = todo;
                // Clone the original todo to restore it on demand.
                ctrl.originalTodo = angular.extend({}, todo);
            };

            this.saveEdits = function (todo, event) {
                // Blur events are automatically triggered after the form submit event.
                // This does some unfortunate logic handling to prevent saving twice.
                if (event === 'blur' && ctrl.saveEvent === 'submit') {
                    ctrl.saveEvent = null;
                    return;
                }

                ctrl.saveEvent = event;

                if (ctrl.reverted) {
                    // Todo edits were reverted-- don't save.
                    ctrl.reverted = null;
                    return;
                }

                todo.title = todo.title.trim();

                if (todo.title === ctrl.originalTodo.title) {
                    ctrl.editedTodo = null;
                    return;
                }

                store[todo.title ? 'put' : 'delete'](todo)
                    .then(function success() {}, function error() {
                        todo.title = ctrl.originalTodo.title;
                    })
                    .finally(function () {
                        ctrl.editedTodo = null;
                    });
            };
            
            this.revertEdits = function (todo) {
                ctrl.todos[todos.indexOf(todo)] = ctrl.originalTodo;
                ctrl.editedTodo = null;
                ctrl.originalTodo = null;
                ctrl.reverted = true;
            };

            this.removeTodo = function (todo) {
                store.delete(todo);
            };

            this.saveTodo = function (todo) {
                store.put(todo);
            };

            this.toggleCompleted = function (todo, completed) {
                if (angular.isDefined(completed)) {
                    todo.completed = completed;
                }
                store.put(todo, todos.indexOf(todo))
                    .then(function success() {}, function error() {
                        todo.completed = !todo.completed;
                    });
            };

            this.clearCompletedTodos = function () {
                store.clearCompleted();
            };

            this.markAll = function (completed) {
                todos.forEach(function (todo) {
                    if (todo.completed !== completed) {
                        ctrl.toggleCompleted(todo, completed);
                    }
                });
            };
        }
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('todo', {
      url: '/todo',
      template: '<todo-list></todo-list>'
    });
}  
