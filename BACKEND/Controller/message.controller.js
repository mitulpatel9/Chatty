const User = require("../Models/user");
const Message = require("../Models/message")
const cloudinary = require("cloudinary").v2;
const getUserAtSlidebar = async(req, res) => {
    try {
        const loggedInuserid = req.user._id;
        const filteredUser = await User.find({ id: { $ne: loggedInuserid._id } }).select("-passwoed");

        return res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getUserAtSlidebar", error.message);
        returnres.status(400).json({ message: "internal server error" });
    }
}

const getMessages = async(req, res) => {
    try {
        const { id: Usertochatid } = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or: [{
                senderId: myId,
                receiverId: Usertochatid
            }, {
                senderId: Usertochatid,
                receiverId: myId,
            }, ]
        });
        return res.status(200).json(message);
    } catch (error) {
        console.log("Error in GetMessage", error.message);
        returnres.status(400).json({ message: "internal server error" });
    }

}

const sendMessages = async(req, res) => {
    try {
        const { text, img } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imgUrl;
        if (img) {
            const uploadResponse = await cloudinary.uploader.upload(img);
            imgUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            receiverId,
            senderId,
            text,
            img: imgUrl,
        })

        await newMessage.save();
        return res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage", error.message);
        returnres.status(400).json({ message: "internal server error" });
    }
}

module.exports = { getUserAtSlidebar, getMessages, sendMessages }