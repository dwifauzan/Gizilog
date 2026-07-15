import { LoginDesktop } from './desktop/LoginDesktop';
import { LoginMobile } from './mobile/LoginMobile';

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
