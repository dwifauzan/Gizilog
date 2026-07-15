import { RegisterDesktop } from './RegisterDesktop';
import { RegisterMobile } from './RegisterMobile';

export function RegisterPage() {
  return (
    <>
      <div className="hidden lg:block">
        <RegisterDesktop />
      </div>
      <div className="block lg:hidden">
        <RegisterMobile />
      </div>
    </>
  );
}
