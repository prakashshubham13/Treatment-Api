import responseCodes from './response_codes.js';
import applogger from '../api/utils/logger.js';

/** 
 * returns response for a successful operation based on various status codes
 * @param {Response} res response 
 * @param {Number} donestatuscode http response code
 * @param {JsonObject} result the data to be sent with the response. 
 * @return {Response} response with http successful status code, response body and message 
 */
export const done = (req, res, donecode, result = {}) => {
    const code = Number(donecode);
    const data = result;
    switch (code) {
        case 200:
            applogger.info(`200 - ${responseCodes["successResponse"].status} - ${responseCodes["successResponse"].message} - ${req.originalUrl} - ${req.method}`);
            return res.status(200).json({
                message: responseCodes["successResponse"].message,
                status: responseCodes["successResponse"].status,
                data: data
            });

        case 201:
            applogger.info(`201 - ${responseCodes["resourceCreatedSuccess"].status} - ${responseCodes["successResponse"].message} - ${req.originalUrl} - ${req.method}`);
            return res.status(201).json({
                message: responseCodes["resourceCreatedSuccess"].message,
                status: responseCodes["resourceCreatedSuccess"].status,
                data: data
            });


    }
}

/** 
 * returns response for a un-successful operation based on various status codes
 * @param {Response} res response 
 * @param {Number} notdonestatuscode http response code
 * @return {Response} response with http un-successful status code and message
 */
export const notDone = (res, notdonecode) => {
    const code = Number(notdonecode);
    switch (code) {
        case 204:
            applogger.error(`204 - ${responseCodes["noContent"].status} - ${responseCodes["noContent"].message} `);
            return res.status(204).json({
                message: responseCodes["noContent"].message,
                status: responseCodes["noContent"].status,
            });
        case 400:
            applogger.error(`400 - ${responseCodes["badRequest"].status} - ${responseCodes["badRequest"].message}`);
            return res.status(400).json({
                message: responseCodes["badRequest"].message,
                status: responseCodes["badRequest"].status,
            });
        case 401:
            applogger.error(`401 - ${responseCodes["unauthorized"].status} - ${responseCodes["unauthorized"].message} `);
            return res.status(401).json({
                message: responseCodes["unauthorized"].message,
                status: responseCodes["unauthorized"].status,
            });
        case 403:
            applogger.error(`403 - ${responseCodes["forbidden"].status} - ${responseCodes["forbidden"].message} `);
            return res.status(403).json({
                message: responseCodes["forbidden"].message,
                status: responseCodes["forbidden"].status,
            });
        case 404:
            applogger.error(`404 - ${responseCodes["notFound"].status} - ${responseCodes["notFound"].message}`);
            return res.status(404).json({
                message: responseCodes["notFound"].message,
                status: responseCodes["notFound"].status,
            });
        case 409:
            applogger.error(`409 - ${responseCodes["conflict"].status} - ${responseCodes["conflict"].message}`);
            return res.status(409).json({
                message: responseCodes["conflict"]["message"],
                status: responseCodes["conflict"]["status"],
            });
        case 500:
            applogger.error(`500 - ${responseCodes["internalError"].status} - ${responseCodes["internalError"].message}`);
            return res.status(500).json({
                message: responseCodes["internalError"].message,
                status: responseCodes["internalError"].status,
            });
    }
};