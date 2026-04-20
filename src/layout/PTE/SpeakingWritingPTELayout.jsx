import GridBackgroundView from '@/components/common/GridBackgroundView';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SpeakingWritingPTELayout = () => {
    return (
        <div className="relative min-h-screen">
            {/* Background Layer */}
            <div className="fixed inset-0 -z-10 h-full w-full">
                <GridBackgroundView />
            </div>

            {/* Main Content Layer */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default SpeakingWritingPTELayout;