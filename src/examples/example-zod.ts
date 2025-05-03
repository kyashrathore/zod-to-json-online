export const exampleZodSchema = `z.object({
  name: z.string().min(2).max(50),
  age: z.number().int().positive().optional(),
  email: z.string().email(),
  website: z.string().url().optional(),
  tags: z.array(z.string()),
  settings: z.object({
    notifications: z.boolean().default(true),
    theme: z.enum(['light', 'dark', 'system']).default('system')
  }),
  createdAt: z.date().default(() => new Date())
})`;

export const exampleJsonSchema = `{
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "description": "The person's first name"
    },
    "lastName": {
      "type": "string",
      "description": "The person's last name"
    },
    "age": {
      "type": "integer",
      "description": "Age in years",
      "minimum": 0
    },
    "contactDetails": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        },
        "phone": {
          "type": "string",
          "pattern": "^\\\\d{3}-\\\\d{3}-\\\\d{4}$"
        }
      },
      "required": ["email"]
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": ["firstName", "lastName"]
}`;