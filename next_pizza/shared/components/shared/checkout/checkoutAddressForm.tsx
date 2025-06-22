import { WhiteBlock } from '../WhiteBlock';

import { FormTextarea } from '../form-components/form-textarea';
import { FormInput } from '../form-components/FormInput';

interface Props {
  className?: string;
}

export const CheckoutAddressForm:React.FC<Props> = ({className}) => {
  return (
    <WhiteBlock title="3. Address" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" placeholder="Enter address..." className="text-base" />
        <FormTextarea name="comment" className="text-base" placeholder="Comments" rows={5} />
      </div>
    </WhiteBlock>
  );
};
