import { FormInput } from '../form-components/FormInput';
import { WhiteBlock } from '../WhiteBlock';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({className}) => {
  return (
    <WhiteBlock title="2. Personal data"  className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput name="firstName" placeholder="First name" className="text-base" />
        <FormInput name="lastName" placeholder="Last name" className="text-base" />
        <FormInput name="email" placeholder="Email" className="text-base" />
        <FormInput name="phone" placeholder="Phone" className="text-base" />
      </div>
    </WhiteBlock>
  );
};
