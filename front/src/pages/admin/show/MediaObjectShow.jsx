import { ShowGuesser, FieldGuesser } from '@api-platform/admin';
import { FunctionField } from 'react-admin';

export const MediaObjectShow = () => (
  <ShowGuesser>
    <FieldGuesser source="contentUrl" label="Url" />
    <FunctionField
      label="Image"
      render={(record) => (
        <div>
          <img
            src={`http://127.0.0.1:8000${record.contentUrl}`}
            height="200px"
            alt={`Image : ${record.contentUrl.split('/').pop() || 'no image'}`}
          />
        </div>
      )}
    />
  </ShowGuesser>
);
