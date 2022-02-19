/**
 * @swagger
 * tags:
 *  name: Login User
 *  description: This is to login user
 * /api/users/loginUser:
 *  post:
 *      tags: [Login User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              default: shubham@gmail.com
 *                          password:
 *                              type: string
 *                              default: Logan@13
 *      responses:
 *          '200':
 *              description: Login Successfull
 * 
 *
 */

/**
 * @swagger
 * tags:
 *  name: Register User
 *  description: This is to Register user
 * /api/users/registerUser:
 *  post:
 *      tags: [Register User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              default: shubham
 *                          email:
 *                              type: string
 *                              default: shubham@gmail.com
 *                          password:
 *                              type: string
 *                              default: Logan@13
 *      responses:
 *          '201':
 *              description: Registration Successfull
 * 
 *
 */

/**
 * @swagger
 * tags:
 *  name: Add Plan
 *  description: This is to add a treatment plan
 * /api/treatement/addPlan:
 *  post:
 *      tags: [Add Plan]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              default: typhoid
 *                          description:
 *                              type: string
 *                              default: high fever
 *                          status:
 *                              type: string
 *                              enum: ['Draft','PUBLISHED']
 *                              default: DRAFT
 *      responses:
 *          '201':
 *              description: Plan Added Successfully
 * 
 *
 */



/**
 * @swagger
 * tags:
 *  name: Delete Plan
 *  description: This is to delete a treatment plan
 * /api/treatement/deletePlan:
 *  delete:
 *      tags: [Delete Plan]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              default: covid
 *                          version:
 *                              type: number
 *                              default: 1
 *      responses:
 *          '200':
 *              description: Deleted Successfully
 * 
 *
 */


/**
 * @swagger
 * tags:
 *  name: Get Plan
 *  description: This is to get all treatment plan
 * /api/treatement/getPlan:
 *  get:
 *      tags: [Get Plan]
 *      responses:
 *          '200':
 *              description: All Records
 * 
 *
 */



/**
 * @swagger
 * tags:
 *  name: Update Plan
 *  description: This is to update plan
 * /api/treatement/updatePlan:
 *  patch:
 *      tags: [Update Plan]
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *            required: true
 *            default: covid
 *        - in: query
 *          name: version
 *          schema:
 *            type: number
 *            required: true
 *            default: 0.001
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                              type: string
 *                              enum: ['Draft','PUBLISHED']
 *                              default: DRAFT
 *      responses:
 *          '200':
 *              description: Updated Successfully
 */



/**
 * @swagger
 * tags:
 *  name: Filter Plan
 *  description: This is to filter a treatment plan
 * /api/treatement/planList:
 *  post:
 *      tags: [Filter Plan]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          page:
 *                              type: number
 *                              default: 1
 *                          size:
 *                              type: number
 *                              default: 2
 *      responses:
 *          '200':
 *              description: Matching Records
 * 
 *
 */