(function(window) {
  window.environment = window.environment || {};

  switch (window.location.hostname) {
    case 'localhost1':
      window.environment.BASE_URL = 'http://localhost:5000/api';
      break;
    default:
      window.environment.BASE_URL = 'http://localhost:5000/api/v1';
      break;
  }
})(this);
