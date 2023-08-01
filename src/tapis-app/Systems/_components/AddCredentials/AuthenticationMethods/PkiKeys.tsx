import { FormikInput } from 'tapis-ui/_common';
import { Systems } from '@tapis/tapis-typescript';

type PkiKeysProps = {
  system: Systems.TapisSystem | undefined;
};

const PkiKeys: React.FC<PkiKeysProps> = ({ system }) => {
  return (
    <>
      <FormikInput
        name="publicKey"
        label="Public Key"
        required={true}
        description="Your public key from the machine"
      />
      <FormikInput
        name="privateKey"
        label="Private Key"
        required={true}
        description="Your private key from the machine"
      />
      <div> Host: {system?.host}</div>
      <a
        style={{ whiteSpace: 'pre-line' }}
        href="https://github.com/jaeestee/scoped-tapis-ui/blob/main/src/tapis-app/Systems/_components/AddCredentials/AuthenticationMethods/README.md"
        target="_blank"
        rel="noreferrer"
      >
        {`Authentication Method Tutorial\n`}
      </a>
    </>
  );
};

export default PkiKeys;
