import Coupen from '../models/coupen.model.js';


export const getCoupen = async (req, res) => {
    try {
        const coupen = await Coupen.findOne({ userId: req.user._id, isActive: true });
        res.json(coupen || null);


    } catch (error) {
        console.log("error in getting", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }

}

export const validateCoupen = async (req,res) => {
 try {
            const{code} = req.body;

    const existing = await  Coupen.findOne({code:code ,userId: req.user._id , isActive : true });
if(!existing){
    return res.status(404).json({message:"coupen not found"});
}

    if(existing.expirationDate < new Date()){
             expirationDate.isActive = false;
             await existing.save();
               return res.status(404).json({message:"coupen expired"});
        
    }

    res.json({message:"Coupen is valid",
        code:existing.code,
        discountPercentage:existing.discountPercentage
    })
 } catch (error) {
         console.log("error in validating", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }

}  