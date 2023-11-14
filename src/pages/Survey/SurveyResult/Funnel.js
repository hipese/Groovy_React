import { ResponsivePie } from '@nivo/pie'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Piechart = ({array}) => {
    if(!array){
        return;
    }
    const handle = {
        padClick: (data) => {
            console.log(data);
        },

        legendClick: (data) => {
            console.log(data);
        },
    };

    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
            {/* <ResponsiveFunnel
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                valueFormat=">-.4s"
                colors={{ scheme: 'spectral' }}
                borderWidth={20}
                labelColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            3
                        ]
                    ]
                }}
                beforeSeparatorLength={100}
                beforeSeparatorOffset={20}
                afterSeparatorLength={100}
                afterSeparatorOffset={20}
                currentPartSizeExtension={10}
                currentBorderWidth={40}
                motionConfig="wobbly"
            /> */}
        </div>
    );
};
export default Piechart;