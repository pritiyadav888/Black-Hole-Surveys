let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */

router.get('/about', indexController.displayAboutPage);



/* GET services page. */

router.get('/service', indexController.displayServicePage);


/* GET Survey page. */
// router.get('/book', indexController.displayBookPage);


//get router for displaying the login page- create operation
router.get('/login', indexController.displayloginPage);


//post router for processing the login page- create operation
router.post('/login', indexController.processLoginPage );


//get router for displaying the registration page- create operation
router.get('/register', indexController.displayRegisterPage);


//post router for processing the registration page- create operation
router.post('/register', indexController.processRegisterPage );


//get router to perform -logout operation
router.get('/logout',indexController.performLogout );


module.exports = router;
