import { useState } from 'react';
import { Lock, ErrorOutline } from '@styled-icons/material-outlined';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import Button from 'components/Button';
import { FormLoading, FormWrapper, FormError } from 'components/Form';
import TextField from 'components/TextField';

import { FieldErrors, resetValidate } from 'utils/validations';

const FormResetPassword = () => {
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ password: '', confirm_password: '' });
  const { query } = useRouter();

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const errors = resetValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query.code
        })
      }
    );

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setFormError(data?.message[0]?.messages[0]?.message);
    } else {
      signIn('credentials', {
        email: data.user.email,
        password: values.password,
        callbackUrl: '/'
      });
    }
  };

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldError.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          error={fieldError.confirm_password}
          onInputChange={(v) => handleInput('confirm_password', v)}
          type="password"
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Reset password</span>}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default FormResetPassword;
