export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR = "password must have lowercase...etc"
export const ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
export const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024;  // 5MB