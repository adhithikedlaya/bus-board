import React from "react";
import { ApiService } from "../ApiService"
import { HomePage } from "./HomePage/HomePage";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}