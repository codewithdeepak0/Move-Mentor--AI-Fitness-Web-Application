const {CreateClub , FetchAllClubs , GetById , JoinClub , LeaveClub , DeleteClub, fetchAllMembers, EditClub } = require("../controllers/Club");
const express  =  require("express");
const {verifyToken} = require("../middlewere/VerifyToken");
const router =   express.Router();


// create club 

router.post("/" , verifyToken , CreateClub);

// Fetch all  clubs 

router.get("/" ,  FetchAllClubs);

// get  club by id 

router.get("/:id" , verifyToken , GetById );

// join club

router.put("/:id/join" , verifyToken , JoinClub);

// Leave club 
router.put("/:id/leave" , verifyToken , LeaveClub);

//  delete club (Admin only)

router.delete("/:id" , verifyToken , DeleteClub);


// fetch all member of the club
router.get("/:id/members" , verifyToken , fetchAllMembers);

// edit the clubs 
router.put("/:id" , verifyToken , EditClub);



module.exports = router;


