import React from 'react';
import AdminStatistics from '../AdminStatistic/AdminStatistic';
import UserStatistic from '../UserStatistic/UserStatistic';
import AgentStatistic from '../AgentStatistic/AgentStatistic';

const DashboardHome = () => {
    return (
        <div>
            {/* role set kora add kortahbe */}
            {/* <UserStatistic/>
            <AgentStatistic/> */}
            <AdminStatistics/>
        </div>
    );
};

export default DashboardHome;