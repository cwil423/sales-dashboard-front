import React from 'react';
import { useSelector } from 'react-redux';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SideMenu from './SideMenu';
import Header from './Header';
import PageHeader from './PageHeader';

export default function Reports() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <SideMenu />
      <Header quickbooksButton={false} />
      <PageHeader
        icon={<AssessmentIcon fontSize="large" />}
        title="Home Dashboard"
        subtitle="General graphs and trends."
        user={user}
      />
    </div>
  );
}
