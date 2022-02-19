// Routes parameters
export const createRoomParameters = {
  schema: {
    body: {
      type: "object",
      required: ["roomName", "roomType"],
      properties: {
        roomName: {
          type: "string",
          maxLength: 10,
        },
        roomType: {
          type: "string",
          enum: ["PUBLIC", "PRIVATE"],
        },
        roomPasswd: {
          type: "string",
          minLength: 6,
          default: "public"
        }
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      400: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
};
