import axios from "axios";


// ========================================
// Axios instance
// ========================================

const api = axios.create({
    baseURL: "https://glowbook-backend.onrender.com/api",
});


// ========================================
// Add access token to every request
// ========================================

api.interceptors.request.use(
    (config) => {

        const accessToken =
            localStorage.getItem("access_token");

        if (accessToken) {

            config.headers.Authorization =
                `Bearer ${accessToken}`;

        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ========================================
// Refresh access token
// ========================================

let isRefreshing = false;

let failedQueue = [];


const processQueue = (error, token = null) => {

    failedQueue.forEach((promise) => {

        if (error) {

            promise.reject(error);

        } else {

            promise.resolve(token);

        }

    });

    failedQueue = [];
};


// ========================================
// Handle 401 errors
// ========================================

api.interceptors.response.use(

    (response) => {
        return response;
    },


    async (error) => {

        const originalRequest = error.config;


        // If server returns 401
        // and this request has not already
        // been retried

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            // Don't refresh the token for
            // login itself

            if (
                originalRequest.url.includes(
                    "/auth/login/"
                )
            ) {

                return Promise.reject(error);

            }


            originalRequest._retry = true;


            // Get refresh token

            const refreshToken =
                localStorage.getItem(
                    "refresh_token"
                );


            // No refresh token
            // User must login again

            if (!refreshToken) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                window.location.href = "/login";

                return Promise.reject(error);

            }


            // Another request is already
            // refreshing the token

            if (isRefreshing) {

                return new Promise(
                    (resolve, reject) => {

                        failedQueue.push({
                            resolve,
                            reject,
                        });

                    }
                ).then((token) => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`;

                    return api(originalRequest);

                });

            }


            isRefreshing = true;


            try {

                // =================================
                // IMPORTANT
                // =================================
                // Change this URL if your Django
                // refresh endpoint is different.
                //
                // Standard Simple JWT:
                // /api/token/refresh/
                //
                // Because baseURL already contains
                // /api, we use /token/refresh/

                const response = await axios.post(
                    "https://glowbook-backend.onrender.com/api/token/refresh/",
                    {
                        refresh: refreshToken,
                    }
                );


                const newAccessToken =
                    response.data.access;


                // Save new access token

                localStorage.setItem(
                    "access_token",
                    newAccessToken
                );


                // If refresh rotation is enabled,
                // Django may also return a new
                // refresh token.

                if (response.data.refresh) {

                    localStorage.setItem(
                        "refresh_token",
                        response.data.refresh
                    );

                }


                // Process waiting requests

                processQueue(
                    null,
                    newAccessToken
                );


                // Retry original request

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                return api(originalRequest);


            } catch (refreshError) {

                // Refresh token is also expired
                // or invalid

                processQueue(
                    refreshError,
                    null
                );


                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );


                window.location.href = "/login";


                return Promise.reject(
                    refreshError
                );


            } finally {

                isRefreshing = false;

            }

        }


        return Promise.reject(error);

    }

);


export default api;

