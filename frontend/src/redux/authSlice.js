import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/axios";


export const loginUser = createAsyncThunk(
    "auth/login",

    async (data, { rejectWithValue }) => {

        try {

            const response = await api.post(
                "auth/login/",
                data
            );

            localStorage.setItem(
                "access_token",
                response.data.access
            );

            localStorage.setItem(
                "refresh_token",
                response.data.refresh
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            return response.data;

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                "Login failed"
            );
        }
    }
);


const storedUser =
    localStorage.getItem("user");


const authSlice = createSlice({

    name: "auth",

    initialState: {
        user: storedUser
            ? JSON.parse(storedUser)
            : null,

        accessToken:
            localStorage.getItem(
                "access_token"
            ),

        refreshToken:
            localStorage.getItem(
                "refresh_token"
            ),

        isAuthenticated:
            !!localStorage.getItem(
                "access_token"
            ),

        loading: false,

        error: null,
    },

    reducers: {

        logout: (state) => {

            state.user = null;

            state.accessToken = null;

            state.refreshToken = null;

            state.isAuthenticated = false;

            localStorage.removeItem(
                "access_token"
            );

            localStorage.removeItem(
                "refresh_token"
            );

            localStorage.removeItem(
                "user"
            );
        },
    },

    extraReducers: (builder) => {

        builder

            .addCase(
                loginUser.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                loginUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.user =
                        action.payload.user;

                    state.accessToken =
                        action.payload.access;

                    state.refreshToken =
                        action.payload.refresh;

                    state.isAuthenticated =
                        true;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            );
    },
});


export const {
    logout
} = authSlice.actions;


export default authSlice.reducer;