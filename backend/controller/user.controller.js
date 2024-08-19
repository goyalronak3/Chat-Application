const User = require("../models/user.model")

const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id
        const users = await User.find({_id : { $ne : loggedInUserId }}).select("-password");
        res.status(200).json(users)
    }catch(error){
        console.log("Error in getUsersForSidebar controller: ", error)
        res.status(500).send({error: "Internal server error"})
    }
}

module.exports = { getUsersForSidebar }