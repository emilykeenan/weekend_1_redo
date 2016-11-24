var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/employees', {
    templateUrl: '/views/templates/employees.html',
    controller: 'EmployeesController',
    controllerAs: 'employees'
  })
  .when('/budget', {
    templateUrl: '/views/templates/budget.html',
    controller: 'BudgetsController',
    controllerAs: 'budget'
  })
  .otherwise({
    redirectTo: 'employees'
  });
}]);

app.controller("EmployeesController", ["$http", function($http){

  var self = this;
  self.employees = [];
  self.avgSalaryOutput = 0;
  self.avgSalaryOutputDisplay = '';
  self.newEmployee = {};
  self.monthlyBudget = 0;
  self.budgetData = [];
  self.budgetMessage = '';

  getEmployees();
  getMonthlyBudget();

  function getEmployees() {
    $http.get('/employees')
    .then(function(response) {
      console.log(response.data);
      self.employees = response.data;
      self.avgSalaryOutput = 0;
      for (var i = 0; i < self.employees.length; i++) {
        var employee = self.employees[i];
        if (employee.status=='active') {
        self.avgSalaryOutput += (employee.yearly_salary / 12);
        }
      }
      self.avgSalaryOutputDisplay = self.avgSalaryOutput.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    });
  };  // get Employees function ends

  function getMonthlyBudget() {
    $http.get('/employees/budget')
    .then(function(response) {
      console.log(response.data);
      self.budgetData = response.data;
      self.monthlyBudget = self.budgetData[0].budget;
      if (self.monthlyBudget >= self.avgSalaryOutput) {
        self.budgetMessage = 'You are in budget!';
      } else {
        self.budgetMessage = 'You are not in budget! Better make some staff changes.';
      }
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
      getMonthlyBudget();
    });
  };  // updateEmployee function ends

  self.addEmployee = function() {
    self.newEmployee.status = 'active';
  console.log('new employee: ', self.newEmployee);
  $http.post('/employees', self.newEmployee)
    .then(function(response) {
      console.log('POST finished. Get employees again.');
      getEmployees();
      getMonthlyBudget();
      self.newEmployee = {}
    });
}



}]); // end employee controller

app.controller("BudgetsController", ["$http", function($http){

  var self = this;

  self.budgets = [];
  self.newBudget = {};
  self.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  self.years = [];

  for (var i = 1990; i <= 2080; i++) {
   self.years.push(i);
 }

  getBudgets();
  console.log("Array of budgets", self.budgets);



  function getBudgets() {
    $http.get('/budget')
    .then(function(response) {
      // console.log(response.data);
      self.budgets = response.data;
      // console.log("Client side", self.customers);
    });
  };

  self.addBudget = function() {
  console.log('new employee: ', self.newBudget);
  $http.post('/budget', self.newBudget)
    .then(function(response) {
      console.log('POST finished.');
      getBudgets();
      self.newBudget = {}
    });
}
}]);
