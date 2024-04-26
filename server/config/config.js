const fs = require("fs");
const path = require("path");
const catchAsync = require("../util/catchAsync")
const { Kafka } =  require("kafkajs");

require("dotenv").config({ path: "./app.env" });

module.exports = Config = {
  privateKey: fs.readFileSync(
    path.join(__dirname, "..", "id_rsa_priv.pem"),
    "utf8",
  ),
  publicKey: fs.readFileSync(
    path.join(__dirname, "..", "id_rsa_pub.pem"),
    "utf8",
  ),
  header: {
    alg: "RS256", // Example algorithm (use the one you need)
    typ: "JWT", // Example token type
  },

  option: {
    algorithm: "RS256", // Algorithm used for signing
    expiresIn: process.env.JWT_EXPIRES_IN, // Expiration time in seconds
  },
};

module.exports = class kafkaConfig {
  constructor(){
    this.Kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["localhost:9093"]
    })
    this.producer = this.Kafka.producer();
    this.consumer = this.Kafka.consumer({groupId: "test-group"})

    this.produce = catchAsync( async (topic, messages) => {
        await this.producer.connect();
        await this.producer.send({
          topic: topic,
          messages: messages,
        });

        await this.producer.disconnect();
    })

    this.consume = catchAsync( async (topic, callback) => {
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: topic,
        fromBeginning: true,
      });
      await this.consumer.run({
        matchMessage: async ({topic, partition, message}) => {
          const value = message.value.toString();
          callback(value);
        }
      });
      await this.consumer.disconnect();
    });
  }
};
// module.exports = Config;
