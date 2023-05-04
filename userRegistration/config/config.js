const config = {
    secret_jwt: 'secretkey123'
}

module.exports = config;










    // const check1 = userModel.aggregate([{
    //     $match: { status: false },
    // },
    // {
    //     $project: {
    //         _id: 1,
    //     },
    // },
    // ])
    //     .then((data) => {
    //         console.log("userDAtaaa", data);
    //         if (data.length > 0) {
    //             res.status(404).send({
    //                 status: false,
    //                 data: data,
    //                 msg: "user already exists."
    //             })
    //         }
    //         else {}
    //         })