const BACKEND_URL = "http://127.0.0.1:8000";

export const getImageUrl = (image) => {
    if (!image) {
        return null;
    }

    if (image.startsWith("http")) {
        return image;
    }

    return `${BACKEND_URL}${image}`;
};