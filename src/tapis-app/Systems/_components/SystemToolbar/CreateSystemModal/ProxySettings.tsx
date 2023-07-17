import { FormikInput, Collapse } from 'tapis-ui/_common';
import { FormikCheck } from 'tapis-ui/_common/FieldWrapperFormik';
import { useMemo } from 'react';
import { Systems } from '@tapis/tapis-typescript';
import { useFormikContext } from 'formik';

const ProxySettings: React.FC= () => {
    const { values } = useFormikContext();

  const useProxy = useMemo(
    () => (values as Partial<Systems.ReqPostSystem>).useProxy,
    [values]
  );
  console.log(useProxy)

    return (
        <div>
            <Collapse title="Proxy Settings">
                <FormikCheck
                name="useProxy"
                required={false}
                label="Use Proxy"
                description={'Decides if the system can use proxy'}
                />
                {useProxy ? 
                <div>
            <FormikInput
            name="proxyHost"
            label="Proxy Host"
            required={false}
            description={`Host of the proxy`}
            aria-label="Input"
            />
            <FormikInput
            name="proxyPort"
            label="Proxy Port"
            required={false}
            description={`Port of the proxy`}
            aria-label="Input"
            />    
            </div>: null  }
                
            </Collapse>

        </div>
    );
};

export default ProxySettings;
