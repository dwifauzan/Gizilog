import { LoginDesktop } from './LoginDesktop';
import { LoginMobile } from './LoginMobile';

export function LoginPage() {
  return (
    <>
      <div className="hidden lg:block">
        <LoginDesktop />
      </div>
      <div className="block lg:hidden">
        <LoginMobile />
      </div>
    </>
  );
}
