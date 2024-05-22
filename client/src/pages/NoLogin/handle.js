import React, { useState } from "react";
import './styles.scss';
import useWindowSize from "../../utils/hooks/useWindowSize";

export default function Handle() {
    const windowWidth = useWindowSize().width

    return{
        windowWidth
    }
}