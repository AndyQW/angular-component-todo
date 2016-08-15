angular.module('myApp')
    .factory('store', function ($http) {
        'use strict';
        var todos = [{ title:'hello', completed: false}]; //store.todos
        // Detect if an API backend is present. If so, return the API module, else
        // hand off the localStorage adapter
        return {
            todos: function() {
                return todos;
            },

            delete: function(todo) {
                todos.splice(todos.indexOf(todo), 1);
            },

            put: function(todo) {
                todos.push(todo);
            },

            clearCompletedTodos: function() {
                for ( var i=todos.length; i>=0; i--) {
                    if (todos[i].completed) {
                        todos.splice(i, 1);
                    }
                };
            }
        }
    })

    