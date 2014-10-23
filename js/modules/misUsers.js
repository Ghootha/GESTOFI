
var app = angular.module("myAppUsers", []);

app.controller("userController", function($scope) {

    $scope.ced='';
    $scope.nombre = '';
    $scope.pApellido = '';
    $scope.sApellido = '';
    $scope.passw1 = '';
    $scope.passw2 = '';
    $scope.role = '';
    $scope.users = [
        {id:1, ced:'2-0596-0618', nombre:'Michael',   pApellido:"González", sApellido:"Murillo", role:"Profesor"  },
        {id:2, ced:'1-1553-0965', nombre:'Andres',   pApellido:"Rodríguez", sApellido:"Morales", role:"Director" },
        {id:3, ced:'4-0217-0111', nombre:'Natasha',   pApellido:"Arteaga", sApellido:"Guerrero", role:"Asistente" },
        {id:4, ced:'4-0217-0123', nombre:'José',  pApellido:"Alvarado", sApellido:"Villalobos", role:"Secretario" }
    ];
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function(id) {
        if (id == 'new') {
            $scope.edit = true;
            $scope.incomplete = true;
            $scope.ced='';
            $scope.nombre = '';
            $scope.pApellido = '';
            $scope.sApellido = '';
            $scope.role='';
        } else {

            for(var i = 0; i<$scope.users.length; i++) {           
                if($scope.users[i].id === id) {
                    $scope.edit = false;
                    $scope.ced = $scope.users[i].ced;
                    $scope.nombre = $scope.users[i].nombre;
                    $scope.pApellido = $scope.users[i].pApellido;
                    $scope.sApellido = $scope.users[i].sApellido;
                    $scope.role = $scope.users[i].role;
                    $scope.actualizarUser(id);
                }
            } 
            
        }
    };

    $scope.deleteUser = function(id) {
        $('#Modal3').modal({ backdrop: false})
        .one('click', '#confirm', function () {
            for(var i = 0; i<$scope.users.length; i++) {           
                if($scope.users[i].id === id) {
                    $scope.$apply($scope.users.splice(i, 1));
                }
            }    
        });
    };

    $scope.actualizarUser = function(id) {
       $('#Modal').modal({ backdrop: false})
        .one('click', '#confirm', function () { 
             var objetoJSON;
                for(var i = 0; i<$scope.users.length; i++) {           
                    if($scope.users[i].id === id) {
                           objetoJSON = {
                            "cedula": $scope.users[i].ced,            
                            "nombre": $scope.users[i].nombre,
                            "pApellido": $scope.users[i].pApellido,
                            "sApellido": $scope.users[i].sApellido,
                            "role": $scope.users[i].role,

                        };
                        alert("manda put al servidor el user: "+$scope.users[i].nombre+$scope.users[i].pApellido+$scope.users[i].sApellido+" con ced: "+$scope.users[i].ced+" y Role "+$scope.users[i].role );
                        // $http.put("webservice/Documento/update/"+id, objetoJSON).success(
                        //         function(){
                        //             $http.get("webservice/Documento")
                        //                 .success(function(response) {$scope.users = response;});
                        //          });
                    }
                }
        }); 
        
    };

    $scope.$watch('passw1',function() {$scope.test();});
    $scope.$watch('passw2',function() {$scope.test();});
    $scope.$watch('ced', function() {$scope.test();});    
    $scope.$watch('nombre', function() {$scope.test();});
    $scope.$watch('pApellido', function() {$scope.test();});
    $scope.$watch('sApellido', function() {$scope.test();});
    $scope.$watch('role', function() {$scope.test();});

    $scope.test = function() {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if ($scope.edit && (!$scope.ced.length || !$scope.nombre.length ||
            !$scope.pApellido.length || !$scope.sApellido.length || !$scope.role.length ||
            !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        }
    };

});