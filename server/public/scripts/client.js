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
      self.avgSalaryOutput = 0;
      for (var i = 0; i < self.employees.length; i++) {
        var employee = self.employees[i];
        if (employee.status=='active') {
        self.avgSalaryOutput += (employee.yearly_salary / 12);
        }
      }
      self.avgSalaryOutput = self.avgSalaryOutput.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    });
  };  // get Employees function ends

  self.updateEmployee = function(employee) {
    console.log(employee);
    var id = employee.id
    if(employee.status == 'active') {
      employee.status = 'inactive';
      console.log(employee.status);
    } else if(employee.status == 'inactive') {
      employee.status = 'active';
      console.log(employee.status);
    }

    $http.put('/employees/' + id, employee)
    .then(function(response) {
      getEmployees();
    });
  };  // updateEmployee function ends



}]);
