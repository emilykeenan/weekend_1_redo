var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/employees', {
    templateUrl: '/views/templates/employees.html',
    controller: 'EmployeesController',
    controllerAs: 'employees'
  })
  .otherwise({
    redirectTo: 'employees'
  });
}]);

app.controller("EmployeesController", ["$http", function($http){

  var self = this;
  self.employees = [];
  self.avgSalaryOutput = 0;

  getEmployees();

  function getEmployees() {


    $http.get('/employees')
    .then(function(response) {
      self.employees = response.data;
      for (var i = 0; i < self.employees.length; i++) {
        var employee = self.employees[i];
        if (employee.status=='active') {
        self.avgSalaryOutput += (employee.yearly_salary / 12);
        }
      }
      self.avgSalaryOutput.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    });

  }; // get Employees function ends



}]);
