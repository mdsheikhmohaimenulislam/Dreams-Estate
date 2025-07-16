import React from 'react';
import AdminStatistics from '../AdminStatistic/AdminStatistic';
// import useUserroll from '../../hooks/userRoll';
// import LoadingSpinner from '../../Components/Shared/LoadingSpinner';
// import UserStatistic from '../UserStatistic/UserStatistic';
// import AgentStatistic from '../AgentStatistic/AgentStatistic';

const DashboardHome = () => {
    // const [roll, isRoleLoading]= useUserroll();
    // if(isRoleLoading) return <LoadingSpinner/>


    return (
        <div>
            {/* role set kora add kortahbe
            {roll === "user" && <UserStatistic/>}
            
            {roll === "agent" && <AgentStatistic/>}
           {roll === "admin" &&  <AdminStatistics/>} */}
            <AdminStatistics/>
        </div>
    );
};

export default DashboardHome;