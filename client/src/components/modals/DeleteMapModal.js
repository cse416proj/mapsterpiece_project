import { useContext } from "react";
import * as React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";


export default function DeleteMapModal(){
    const { store } = useContext(GlobalStoreContext);

    const buttonStyle = {
        backgroundColor: "#649a92",
        color: "white",
    };

    function handleDeleteModal(event) {
        console.log("delete this map")
    }

    function handleCloseModal(event) {
        event.stopPropagation();
        event.preventDefault();
        store.closeModal();
    }

    return (
        <t>test</t>
    );
}