import swaggerAutogen from "swagger-autogen";

const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger API",
      version: "1.0.0",
      description: "Swagger API documentation",
      termsOfService: "",
      contact: {
        name: "Developer Xpulsar Technologies",
      },
    },
  },
};

const outputFile = "./../swagger-output.json";
const endpointsFiles = ["./routes/index.route.js"];

swaggerAutogen()(outputFile, endpointsFiles, swaggerOption).then(() => {
  console.log("Swagger documentation generated");
});