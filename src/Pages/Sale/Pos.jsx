// eslint-disable-next-line no-unused-vars
import React from 'react'
import CommonTopNab from '../../Shared/CommonTopNav/CommonTopNab'
import useLoader from '../../Shared/Loader/Loader';
import FinalLoader from '../../Shared/Loader/FinalLoader';

export default function Pos() {
    const { loading, online } = useLoader();
    if (loading || !online) {
        return <FinalLoader />;
    }
    return (
        <div>
            <div>
                <CommonTopNab />
            </div>
        </div>
    )
}
