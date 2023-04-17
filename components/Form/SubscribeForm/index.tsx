import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import * as Yup from 'yup';

import { SubscribeRequest } from '../../../models/subscription';
import ArrowRight from '../../../public/svg/arrow_right.svg';

type Props = {
  handleSubmit: (value: SubscribeRequest) => Promise<void>;
};

const SubscribeForm = ({ handleSubmit }: Props) => {
  const { t } = useTranslation();

  const subscribeSchema = Yup.object().shape({
    email: Yup.string().email().required(t('form_required')),
  });

  return (
    <Formik
      initialValues={{ email: '' } as SubscribeRequest}
      validationSchema={subscribeSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, values, handleChange, touched, errors }) => (
        <Form onSubmit={handleSubmit}>
          <Stack>
            <Flex alignItems='flex-end'>
              <Input
                variant='flushed'
                type='email'
                mt='1rem'
                placeholder={t('your_email')}
                _focusVisible={{ boxShadow: 'none !important' }}
                value={values.email}
                onChange={handleChange('email')}
              />
              <Button
                css={css`
                  svg {
                    transition: all 200ms ease-in-out;
                  }
                  &:hover svg {
                    transform: translateX(10px);
                  }
                `}
                variant='unstyled'
                w='24px'
                h='24px'
                type='submit'
              >
                <ArrowRight
                  style={{
                    strokeWidth: 1.5,
                  }}
                />
              </Button>
            </Flex>
            {errors.email && touched.email && (
              <Text fontSize='smaller' color='red'>
                {errors.email}
              </Text>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SubscribeForm;
