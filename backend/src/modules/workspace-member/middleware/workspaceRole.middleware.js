import ApiError from "../../../utils/ApiError.js";

export const verifyWorkspaceRole =
(roles)=>{

    return (req,res,next)=>{

        if(
            !roles.includes(
                req.workspaceMember.role
            )
        ){

            return next(

                new ApiError(

                    403,

                    "Permission denied"

                )

            );

        }

        next();

    };

};