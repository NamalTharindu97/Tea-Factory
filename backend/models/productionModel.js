const mongoose = require("mongoose");

const productionSchema = mongoose.Schema(
    {
        ProdutionID: {
          type: String,
          required:[true, "please add the production id"],
          unique: [true, "this id already taken"],
        },
        description: {
          type: String,
          required: [true, "please enter production description"],
        },
        startDate: {
            type: String,
            required: [true, "please enter production start date"],
          },
          endDate: {
            type: String,
            required: [true, "please enter production end date"],
          },
          status: {
            type: String,
            required: [true, "please enter production status"],
          },
          teaType: {
            type: String,
            required: [true, "please enter production tea type"],
          },  
          batchNumber: {
            type: String,
            required: [true, "please enter production batch number"],
          },  
            
        },
        
          {
            timestamps: true,
          }

);

module.exports = mongoose.model("Production", productionSchema);