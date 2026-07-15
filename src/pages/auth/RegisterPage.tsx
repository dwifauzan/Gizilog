import { RegisterDesktop } from './desktop/RegisterDesktop';
import { RegisterMobile } from './mobile/RegisterMobile';

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
