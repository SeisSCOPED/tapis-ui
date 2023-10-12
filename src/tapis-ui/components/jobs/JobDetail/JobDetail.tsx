import React from 'react';
import { useDetails } from 'tapis-hooks/jobs';
import { Jobs } from '@tapis/tapis-typescript';
import { DescriptionList } from 'tapis-ui/_common';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Link } from 'react-router-dom';

const JobDetail: React.FC<{ jobUuid: string }> = ({ jobUuid }) => {
  const { data, isLoading, error } = useDetails(jobUuid);
  const job: Jobs.Job | undefined = data?.result;

  console.log(job?.execSystemOutputDir);

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <h3>{job?.name}</h3>
      <h5>{job?.uuid}</h5>
      <Link to={`/files/${job?.execSystemId}${job?.execSystemOutputDir}`}>
        See Files
      </Link>
      r
      <a href="http://frontera.tacc.utexas.edu:26412/lab?token=9p6UHJyh5h3pe0xp1b8x">
        Jupyter Notebook
      </a>
      {job && <DescriptionList data={job} />}
    </QueryWrapper>
  );
};

export default JobDetail;
