const BACKEND_URL = "https://glowbook-backend.onrender.com";

export const getImageUrl = (image) => {
    if (!image) {
        return null;
    }

    if (image.startsWith("http")) {
        return image;
    }

    return `${BACKEND_URL}${image}`;
};