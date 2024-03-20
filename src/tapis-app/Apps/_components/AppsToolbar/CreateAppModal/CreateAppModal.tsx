import { Button, Input, FormGroup, Label } from 'reactstrap'; // might need for advanced settings
import { GenericModal } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { ToolbarModalProps } from '../AppsToolbar';
import { Form, Formik } from 'formik';
import { FormikInput } from 'tapis-ui/_common'
import { useEffect, useCallback, useState } from 'react';
import styles from "./CreateAppModal.module.scss";
import * as Yup from 'yup';
import { useQueryClient } from 'react-query';
import { default as queryKeys } from 'tapis-hooks/apps/queryKeys';
// import AdvancedSettings from './Settings/AdvancedSettings';

import { useCreateApp } from "tapis-hooks/apps";
import { RuntimeEnum, RuntimeOptionEnum } from "@tapis/tapis-typescript-apps";





//Arrays that are used in the drop-down menus
// const systemTypes = Object.values(SystemTypeEnum);//////
// const authnMethods = Object.values(AuthnEnum);//////





const CreateAppModal: React.FC<ToolbarModalProps> = ({ toggle }) => {
  const queryClient = useQueryClient();
  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.list);
  }, [queryClient]);

  const { isLoading, isSuccess, error, reset, createApp } =
    useCreateApp();

  useEffect(() => {
    reset();
  }, [reset]);


  const [simplified, setSimplified] = useState(false);
  const onChange = useCallback(() => {
    setSimplified(!simplified);
  }, [setSimplified, simplified]);


  const validationSchema = Yup.object({
    id: Yup.string()
      .min(1)
      .max(80, "App name should not be longer than 80 characters")
      .matches(
        /^[a-zA-Z0-9_.-]+$/,
        "Must contain only alphanumeric characters and the following: '.', '_', '-'"
      )
      .required("App name is a required field"),
    version: Yup.string()
      .min(1)
      .max(80, "App ID should not be longer than 80 characters")
      .matches(
        /^[a-zA-Z0-9_.-]+$/,
        "Must contain only alphanumeric characters and the following: '.', '_', '-'"
      )
      .required("App version is a required field"),
    containerImage: Yup.string()
      .min(1)
      .max(80, "Container Image should not be longer than 80 characters")
      .matches(
        /^[a-zA-Z0-9_.\-/:]+$/,
        "Must contain only alphanumeric characters and the following: '.', '_', '-', '/', ':'"
      )
      .required("Container Image is a required field"),
    description: Yup.string().max(
      2048,
      "Description schould not be longer than 2048 characters"
    ),
    owner: Yup.string().max(
      60,
      "Owner should not be longer than 60 characters"
    ),
    runtime: Yup.string().max(
      60,
      "Runtime should not be longer than 60 characters"
    ),
  });

  const initialValues = {
    id: "",
    version: "1.0",
    containerImage: "docker://hello-world:latest",
    description: undefined,
    // eslint-disable-next-line no-template-curly-in-string
    owner: "${apiUserId}", //apiUserId,
    runtime: RuntimeEnum.Singularity,
    runtimeOptions:  [RuntimeOptionEnum.SingularityRun]
  };
  
  const onSubmit = ({
    id,
    version,
    containerImage,
    description,
    owner,
    runtime,
    runtimeOptions
  }: {
    id: string;
    version: string;
    containerImage: string;
    description: string | undefined;
    owner: string | undefined;
    runtime: RuntimeEnum | undefined;
    runtimeOptions: RuntimeOptionEnum[] | undefined;
  }) => {
    console.log("Submitting form with values:", {
      id,
      version,
      containerImage,
      description,
      owner,
      runtime,
      runtimeOptions,
    });
    createApp(
      {
        reqPostApp: {
          id,
          version,
          containerImage,
          description,
          owner,
          runtime,
          runtimeOptions
        },
      },
      true,
      { onSuccess }
    );
  };

  return (
    <GenericModal
      toggle={toggle}
      title="Create New App"
      body={
        <div className={styles["modal-settings"]}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form id="newapp-form">
                {/* <FormGroup check>
                  <Label check size="sm" className={`form-field__label`}>
                    <Input type="checkbox" onChange={onChange} />
                    Advanced Settings
                  </Label>
                </FormGroup> */}
                <FormikInput
                  name="id"
                  label="Application ID"
                  required={true}
                  description={`App ID`}
                  aria-label="Input"
                />
                <FormikInput
                  name="version"
                  label="Application Version"
                  required={true}
                  description={`App Version`}
                  aria-label="Input"
                />
                <FormikInput
                  name="containerImage"
                  description="Container Image"
                  label="Container Image"
                  required={true}
                  aria-label="Input"
                />
                <FormikInput
                  name="description"
                  label="Description"
                  required={false}
                  description={`App Description`}
                  aria-label="Input"
                />
                <FormikInput
                  name="owner"
                  label="Application Owner"
                  required={false}
                  description={`App Owner`}
                  aria-label="Input"
                />
                {/* <AdvancedSettings simplified={simplified} /> */}
              </Form>
            )}
          </Formik>
        </div>
      }
      footer={
        <SubmitWrapper
          className={styles["modal-footer"]}
          isLoading={isLoading}
          error={error}
          success={isSuccess ? `Successfully created a new app` : ""}
          reverse={true}
        >
          <Button
            form="newapp-form"
            color="primary"
            disabled={isLoading || isSuccess}
            aria-label="Submit"
            type="submit"
          >
            Create a new app
          </Button>
        </SubmitWrapper>
      }
    />
  );
}

export default CreateAppModal;
