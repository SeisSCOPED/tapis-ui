import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader, LoadingSpinner, Icon } from 'tapis-ui/_common';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
} from 'reactstrap';
import { useTapisConfig } from 'tapis-hooks';
import { useList as useSystemsList } from 'tapis-hooks/systems';
import { useList as useJobsList } from 'tapis-hooks/jobs';
import { useList as useAppsList } from 'tapis-hooks/apps';
import styles from './Dashboard.module.scss';
import './Dashboard.scss';
import { ListTypeEnum } from '@tapis/tapis-typescript-systems'


type DashboardCardProps = {
  icon: string;
  link: string;
  counter: string;
  name: string;
  text: string;
  loading: boolean;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  link,
  counter,
  name,
  text,
  loading,
}) => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <div className={styles['card-header']}>
          <div>
            <Icon name={icon} className="dashboard__card-icon" />
          </div>
          <div>{name}</div>
        </div>
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">
          {loading ? (
            <LoadingSpinner placement="inline" />
          ) : (
            <div>{counter}</div>
          )}
        </CardTitle>
        <CardText>{text}</CardText>
      </CardBody>
      <CardFooter className={styles['card-footer']}>
        <Link to={link}>Go to {name}</Link>
        <Icon name="push-right" />
      </CardFooter>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { accessToken, claims } = useTapisConfig();
  const systems = useSystemsList({listType: ListTypeEnum.All});
  const jobs = useJobsList({});
  const apps = useAppsList({ select: 'jobAttributes,version' });

  return (
    <div>
      <SectionHeader className="dashboard__section-header">
        Dashboard for {claims['tapis/tenant_id']?.toUpperCase()}
      </SectionHeader>
      <div className={styles.cards}>
        {accessToken ? (
          <>
            <Link to='/systems' style={{color: 'black', textDecoration: 'none'}}>
              <DashboardCard
                icon="data-files"
                name="Systems"
                text="View TAPIS systems"
                link="/systems"
                counter={`${systems?.data?.result?.length} systems`}
                loading={systems?.isLoading}
              />
            </Link>
            <Link to='/files' style={{color: 'black', textDecoration: 'none'}}>
              <DashboardCard
                icon="folder"
                name="Files"
                text="Access files available on TAPIS systems"
                link="/files"
                counter={`Files available on ${systems?.data?.result?.length} systems`}
                loading={systems?.isLoading}
              />
            </Link>
            <Link to='/apps' style={{color: 'black', textDecoration: 'none'}}>
              <DashboardCard
                icon="applications"
                name="Applications"
                text="View SCOPED applications and launch jobs"
                link="/apps"
                counter={`${apps?.data?.result?.length} apps`}
                loading={apps?.isLoading}
              />
            </Link>
            <Link to='/jobs' style={{color: 'black', textDecoration: 'none'}}>
              <DashboardCard
                icon="jobs"
                name="Jobs"
                text="View status and details for previously launched SCOPED jobs"
                link="/jobs"
                counter={`${jobs?.data?.result?.length} jobs`}
                loading={jobs?.isLoading}
              />
            </Link>
          </>
        ) : (
          <Link to='/login' style={{color: 'black', textDecoration: 'none'}}>
            <Card>
              <CardHeader>
                <div className={styles['card-header']}>
                  <div>
                    <Icon name="user" className="dashboard__card-icon" />
                  </div>
                  <div>You are not logged in</div>
                </div>
              </CardHeader>
              <CardBody>
                <CardTitle>Please log in to use SCOPED</CardTitle>
              </CardBody>
              <CardFooter className={styles['card-footer']}>
                <Link to="/login">Proceed to login</Link>
                <Icon name="push-right" />
              </CardFooter>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
