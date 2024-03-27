const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

class Verify_mail {
  constructor() {
    this.schema = new Schema({
      email: {
        type: String,
      },
      secret_code: {
        type: String,
      },
      is_used: {
        type: Boolean,
        default: false,
      },
    });
  }
}

const verify_mail = new Verify_mail();
const Verify_mailModel = mongoose.model("verify_mail", verify_mail.schema);
module.exports = Verify_mailModel;
