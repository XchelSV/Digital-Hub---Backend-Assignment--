/**
 * @swagger
 *  components:
 *    schemas:
 *      Payload:
 *        type: object
 *        required:
 *          - fromAccount
 *          - toAccount
 *          - amount
 *        properties:
 *          fromAccount:
 *            type: integer
 *          toAccount:
 *            type: integer
 *          amount:
 *            type: number
 *        example:
 *           fromAccount: 987654321
 *           toAccount: 123456789
 *           amount: 99.54
 *      Transactions:
 *        type: object
 *        properties:
 *          transactions:
 *            type: array
 *            items:
 *               type: object
 *               properties:
 *                 fromAccount:
 *                  type: integer
 *                 toAccount:
 *                  type: integer
 *                 amount:
 *                  type: number
 *                 sentAt:
 *                  type: string
 *      Balance:
 *        type: object
 *        properties:
 *          balance:
 *            type: object
 *            properties:
 *                 account:
 *                  type: integer
 *                 balance:
 *                  type: number
 *                 owner:
 *                  type: integer
 *                 createdAt:
 *                  type: string
 *                 
 */