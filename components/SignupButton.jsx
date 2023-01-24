import React from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignupButton = () => {
  const router = useRouter();
  const { ssr } = useRouter();

  React.useEffect(() => {
    if (!ssr) {
      // component only rendered on the client side
    }
  }, []);
  const handleClick = () => {
    // perform login action here
    router.push('/signup');
  };

  return (
    <Button
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      /Signup
    </Button>
  );
};

export default SignupButton;
