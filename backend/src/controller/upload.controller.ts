import { Request, Response } from "express";

export const uploadVehicleFile =
async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        if (!req.file) {

            res.status(400).json({
                success:false,
                message:"No file uploaded.",
            });

            return;

        }

        res.status(200).json({

            success:true,

            data:{

                fileName:req.file.originalname,

                fileUrl:req.file.path,

                mimeType:req.file.mimetype,

                fileSize:req.file.size,

            },

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:"Upload failed.",

        });

    }

};