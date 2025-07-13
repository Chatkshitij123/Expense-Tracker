import { asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import { ApiError } from "../utils/ApiError.js"

export const verifyJWT = asyncHandler(async(req,res,next) => {
    try {
        //how to takes the access of the token - by cookies
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        //if we have token and then we have to verify it with jwt
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        
    
        if(!user) {
           
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user = user; //new object added
        
        next();
    } catch (error) {
       
         throw new ApiError(401, error?.message || "Invalid Access Token")
    }

})

//it only verify user
//my straetegy is like i will add new objet in req