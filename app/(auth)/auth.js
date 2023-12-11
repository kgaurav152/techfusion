import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Toast } from 'react-hot-toast';

export const checkAuthentication = () => {
    const token = Cookies.get('token'); // Retrieve the token from cookies
    return !!token; // Return true if the token exists, indicating the user is authenticated
};

export const getUserRole = () => {
    const role = Cookies.get('role'); // Retrieve the user's role from cookies
    return role || 'guest'; // Return the role or 'guest' as a default value
};

export const withAuth = (WrappedComponent, allowedRoles) => {
  const WrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const EnhancedComponent = (props) => {
    const router = useRouter();
    // Check if the user is authenticated (e.g., by verifying the token in cookies)
    const isAuthenticated = checkAuthentication();

    // Check if the user's role is allowed to access the route
    const userRole = getUserRole();
    const isAllowed = allowedRoles.includes(userRole);

    // Redirect to a login page if not authenticated or not allowed
    if (!isAuthenticated) {
      router.push('/sign-in'); // Redirect to sign-in page
      return null; // Prevent rendering the component
    } else if (isAuthenticated || !isAllowed) {
      toast.error('You are not allowed to visit this page'); // Toast not-allowed message
      router.push('/dashboard'); // Redirect to dashboard page
      return null; // Prevent rendering the component
    }

    // If authenticated and allowed, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  EnhancedComponent.displayName = `withAuth(${WrappedComponentName})`;

  return EnhancedComponent;
};

