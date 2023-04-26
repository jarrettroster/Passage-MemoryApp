import { useState } from "react";
import { CAMPSITES } from "../shared/campsites";
import DirectoryScreen from './DirectoryScreens';

const Main = () => {
    const [campsites, setCampsites] = useState(CAMPSITES);

    return <DirectoryScreen campsites ={campsites} />
};

export default Main;