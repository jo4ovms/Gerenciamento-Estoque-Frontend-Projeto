import React from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const Icons = () => (
  <PageContainer title="Icons" description="this is Icons">
    <DashboardCard title="Icons">
      <iframe
        src="https://tabler-icons.io/"
        title="Inline Frame Example"
        frameBorder={0}
        width="100%"
        height="650"
      />
    </DashboardCard>
  </PageContainer>
);

export default Icons;
