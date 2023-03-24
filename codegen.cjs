const path = require("path")
const dotenv = require("dotenv")
const { generateApi } = require("swagger-typescript-api")

dotenv.config({ path: ".env.local" })

const codegen = async () => {
  try {
    await generateApi({
      name: "api.model.ts",
      output: path.resolve(process.cwd(), "./src/models"),
      url: process.env.OPENAPI_DOC_URL,
      extractRequestParams: true,
      extractRequestBody: true,
      generateClient: false,
      templates: "",
    })
  } catch (error) {
    console.error(error)
  }
}

codegen()
