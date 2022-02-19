// Json object with response code status and message
const responseCodes = {
    successResponse: {
        code: 200,
        status: "OK",
        message: "Operation Successful"
    },
    resourceCreatedSuccess: {
        code: 201,
        status: "Created",
        message: "Created Successfully"
    },
    noContent: {
        code: 204,
        status: "No Content",
        message: "No content available"
    },
    badRequest: {
        code: 400,
        status: "Bad Request",
        message: "Bad request"
    },
    unauthorized: {
        code: 401,
        status: "Unauthorized",
        message: "Authentication Failed"
    },
    forbidden: {
        code: 403,
        status: "Forbidden",
        message: "Unauthorized to perform action"
    },
    notFound: {
        code: 404,
        status: "Not Found",
        message: "Resource Not Found"
    },
    conflict: {
        code: 409,
        status: "Conflict",
        message: "Resource Already Exists / Resource Conflict"
    },
    internalError: {
        code: 500,
        status: "Error",
        message: "Internal Error"
    }
}

export default responseCodes;