
var app = angular.module('sosialApp', ['ngMaterial','ngCookies']);

app.controller('signUpCtrl', function($scope,$cookies) {
   $scope.message = "";
   $scope.showMessage = "false";
   $scope.showMessagePassword = "false";
   $scope.showMessagePasswordRepit = "false";
   $scope.user = {
      email   : '',
      fisrtName: '',
      lastName: '',
      dateBirthday: '',
      phone_number: '',
      password: '',
      passwordRepit: '',
      dirr:''
   };

  $scope.userState = '';
  $scope.states = ('Guatemala,Santa Catarina Pinula,San José Pinula,Palencia,Chinautla,San Pedro Ayampuc,Mixco,San Pedro Sacatepéquez,San Juan Sacatepéquez,San Raymundo,Chuarrancho,Fraijanes,Amatitlán,Villa Nueva,Villa Canales,San Miguel Petapa').split(',').map(function (state) { return { abbrev: state }; });
   
   $scope.signUp = function(){
      $scope.validateForm();
   }

   $scope.validateForm = function(){

      var continueForm = false;
     if($scope.user.password != $scope.user.passwordRepit){
         $scope.showMessagePasswordRepit = "true";  
         $scope.messagePasswordRepit = "La contraseña no coincide"; 
         continueForm = false;
     }else{
         $scope.showMessagePasswordRepit = "false"; 
         $scope.messagePasswordRepit = "";  
         continueForm = true;
     }


    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!re.test($scope.user.email)){
         $scope.showMessageEmail = "true";  
         $scope.messageEmail = "Correo invalido"; 
         continueForm = false;
     }else{
         $scope.showMessageEmail = "false"; 
         $scope.messageEmail = "";  
         continueForm = true;
     }

      var phoneno = /^[0-9]+[0-9]$/;  
      if(phoneno.test($scope.user.phone_number)) {  
         $scope.showMessageCell = "false";  
         $scope.messageCell = ""; 
         continueForm = true;
      }  
      else{  
         $scope.showMessageCell = "true";  
         $scope.messageCell = "Telefono invalido"; 
         continueForm = false;
      }  


      if($scope.user.email != '' && $scope.user.fisrtName != '' && 
         $scope.user.lastName != '' && $scope.user.dateBirthday != '' && 
         $scope.user.phone_number != '' && $scope.user.password != '' && 
         $scope.user.passwordRepit != '' && $scope.user.dirr != '')
      {
         $scope.messageLogin = "false"; 
         $scope.message = "";  
         continueForm = true;
      }else{

         $scope.messageLogin = "true"; 
         $scope.message = "Complete los datos del formulario";  
         continueForm = false;
      }

   }
})
