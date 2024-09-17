import ResetPassword from '../../../components/reset-password';
import { notFound } from 'next/navigation';

export default async function ResetPasswordPage({ params }) {
  const { token } = params;

  if (!token) {
    notFound(); // Show 404 if token is not provided
  }

  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}
