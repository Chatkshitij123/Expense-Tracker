import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/User.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
// import path from "path"


const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const {fullName, email, password} = req.body
    
    if (
        [fullName, email, password].some((field) =>
        field?.trim() === "" )
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [
            {fullName}, {email}
        ]
    })

    if (existedUser) {
        throw new ApiError(409, "User with Email or fullname already exists")
    }

   

const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath);
    

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {
    const {email,password,fullName} = req.body;

    if(!(email || fullName)) {
        throw new ApiError(400, "Fullname or email is required")
    }

    //find the user on the basis of email
    const user = await User.findOne({
        $or: [{fullName}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User doesnot exist")
    }

    //password check
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
         throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);

    //now send it in cookies
    const loggedInUser = await User.findById(user._id);

    const isProduction = process.env.NODE_ENV === "production";

    //options for cookies
    const options = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax" 
    }

    return res.status(200).
    cookie("accessToken",accessToken, options).
    cookie("refreshToken",refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $unset: {
                refreshToken: 1 //this removes the field from the document
            }
        },
        {
            new: true
        }
    )

    const options = {
    httpOnly: true,
    secure: true //server can modify it but not the user
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200, {}, "User logged Out"))

});

const getUserInfo = asyncHandler(async (req, res) => {
    // console.log("req.user =", req.user);
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found")
    }

     return res.status(200).json(
        new ApiResponse(200,
            user,
            "Current user fetched successfully"
        )
     );
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo
}