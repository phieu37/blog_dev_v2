import React from 'react';
import {Spin} from 'antd';

const Loading = () => (
    <div className="w-full h-full bg-[#f0f0f080] flex justify-center items-center">
        <Spin/>
    </div>
);

export default Loading;