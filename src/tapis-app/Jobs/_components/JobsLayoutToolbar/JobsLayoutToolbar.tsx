import React, { useState, useCallback } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'tapis-ui/_common';
import styles from './JobsToolbar.module.scss';
import { useLocation } from 'react-router-dom';
import ConfirmModal from 'tapis-ui/_common/ConfirmModal';
import useHideJob from 'tapis-hooks/jobs/useHideJob';
import { useQueryClient } from 'react-query';
import { default as queryKeys } from 'tapis-hooks/systems/queryKeys';

type ToolbarButtonProps = {
  text: string;
  icon: string;
  onClick: () => void;
  disabled: boolean;
};

export type ToolbarModalProps = {
  toggle: () => void;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  text,
  icon,
  onClick,
  disabled = true,
  ...rest
}) => {
  return (
    <div>
      <Button
        disabled={disabled}
        onClick={onClick}
        className={styles['toolbar-btn']}
        {...rest}
      >
        <Icon name={icon}></Icon>
        <span> {text}</span>
      </Button>
    </div>
  );
};

const JobsLayoutToolbar: React.FC = () => {
  //Allows the system list to update without the user having to refresh the page
  const queryClient = useQueryClient();
  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.list);
  }, [queryClient]);

  const url = window.location.href;
  const jobUuid = url.substring(url.indexOf('jobs/') + 5);
  console.log(jobUuid.includes('jobs'));
  const [modal, setModal] = useState<string | undefined>(undefined);
  const { pathname } = useLocation();
  const { isLoading, isError, isSuccess, error, hideJob } = useHideJob();

  const toggle = () => {
    setModal(undefined);
    onSuccess();
  };

  return (
    <div id="file-operation-toolbar">
      {pathname && (
        <div className={styles['toolbar-wrapper']}>
          <ToolbarButton
            text="Hide Job"
            icon="trash"
            disabled={jobUuid.includes('jobs')}
            onClick={() => setModal('ConfirmModal')}
            aria-label="createSystem"
          />

          {modal === 'ConfirmModal' && (
            <ConfirmModal
              toggle={toggle}
              onConfirm={() => {
                hideJob(jobUuid);
              }}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              error={error}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default JobsLayoutToolbar;
