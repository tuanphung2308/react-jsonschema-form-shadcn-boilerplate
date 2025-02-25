export default {
    schema: {
        type: "object",
        properties: {
            profileImage: {
                type: "string",
                title: "Profile Image"
            },
            captchaVerification: {
                type: "array",
                title: "Verification",
                items: {
                    type: "string"
                }
            },
            interests: {
                type: "array",
                title: "Select Your Interests",
                items: {
                    type: "string",
                    enum: ["sports", "music", "art", "technology", "travel", "food"]
                },
                uniqueItems: true
            }
        },
    },
    formData: {},
    uiSchema: {
        profileImage: {
            "ui:widget": "ImageUploadWidget"
        },
        captchaVerification: {
            "ui:widget": "CustomCaptchaWidget"
        },
        interests: {
            "ui:widget": "CustomMultiSelectWidget"
        }
    }
}

