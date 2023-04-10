import { Select, Stack, Text, Textarea } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { ChangeEvent, useState } from 'react';

import { ContentFormType } from '../../../../models/api/cms';
import { Language } from '../../../../models/template';

type CmsTemplateContentProps = {
  onDelete?: () => void;
  contents: ContentFormType[];
  handleUpdate: (result: ContentFormType[]) => void;
  title?: string;
};

const CmsTemplateContent = ({
  onDelete,
  contents,
  handleUpdate,
  title,
}: CmsTemplateContentProps) => {
  const [contentLang, setContentLang] = useState(Language.english);

  const handleEditContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (contents.findIndex((item) => item.lang === contentLang) > -1) {
      if (isEmpty(e.target.value)) {
        handleUpdate(contents.filter((item) => item.lang !== contentLang));
      } else {
        handleUpdate(
          contents.map((item) =>
            item.lang === contentLang
              ? { ...item, content: e.target.value }
              : item
          )
        );
      }
    } else {
      handleUpdate([
        ...contents,
        { lang: contentLang, content: e.target.value },
      ]);
    }
  };

  return (
    <Stack>
      <Stack direction='row' justifyContent='space-between'>
        {title && (
          <Text fontWeight='semibold' fontSize='xl'>
            {title}
          </Text>
        )}
        <Select
          w='auto'
          value={contentLang}
          onChange={(e) => setContentLang(e.target.value as Language)}
        >
          {Object.values(Language).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </Stack>
      <Textarea
        value={
          contents?.find((item) => item.lang === contentLang)?.content || ''
        }
        onChange={handleEditContent}
      />
    </Stack>
  );
};

export default CmsTemplateContent;
